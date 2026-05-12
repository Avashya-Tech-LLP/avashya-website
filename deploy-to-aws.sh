#!/bin/bash

# AWS Deployment Script for Avashya Static Website
# This script deploys the static site to S3 and creates a CloudFront distribution

set -e

PROFILE="dynamitech"
BUCKET_NAME="avashya-site"
REGION="us-east-1"
SITE_DIR="static-site"

echo "🚀 Starting deployment to AWS..."
echo "Profile: $PROFILE"
echo "Bucket: $BUCKET_NAME"
echo "Region: $REGION"
echo ""

# Create S3 bucket
echo "📦 Creating S3 bucket..."
if aws s3 mb s3://$BUCKET_NAME --region $REGION --profile $PROFILE 2>/dev/null; then
    echo "✅ Bucket created successfully"
else
    echo "ℹ️  Bucket already exists or creation failed (continuing...)"
fi

# Disable Block Public Access settings for the bucket
echo "🔓 Configuring public access settings..."
aws s3api put-public-access-block \
    --bucket $BUCKET_NAME \
    --public-access-block-configuration \
    "BlockPublicAcls=false,IgnorePublicAcls=false,BlockPublicPolicy=false,RestrictPublicBuckets=false" \
    --profile $PROFILE

# Enable static website hosting
echo "🌐 Enabling static website hosting..."
aws s3 website s3://$BUCKET_NAME/ \
    --index-document index.html \
    --error-document index.html \
    --profile $PROFILE

# Create bucket policy for public read access
echo "📝 Setting bucket policy for public access..."
cat > /tmp/bucket-policy.json <<EOF
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::$BUCKET_NAME/*"
        }
    ]
}
EOF

aws s3api put-bucket-policy \
    --bucket $BUCKET_NAME \
    --policy file:///tmp/bucket-policy.json \
    --profile $PROFILE

# Sync static files to S3
echo "📤 Uploading static files to S3..."
aws s3 sync $SITE_DIR/ s3://$BUCKET_NAME/ \
    --profile $PROFILE \
    --exclude "*.md" \
    --exclude "*.sh" \
    --exclude "*.bat" \
    --exclude ".git*" \
    --delete \
    --cache-control "public, max-age=31536000" \
    --exclude "index.html" \
    --exclude "*.html"

# Upload HTML files with shorter cache (for updates)
echo "📤 Uploading HTML files with shorter cache..."
aws s3 sync $SITE_DIR/ s3://$BUCKET_NAME/ \
    --profile $PROFILE \
    --exclude "*" \
    --include "*.html" \
    --cache-control "public, max-age=3600"

echo "✅ S3 upload complete!"
echo ""
echo "🌍 Website URL: http://$BUCKET_NAME.s3-website-$REGION.amazonaws.com"
echo ""

# Create CloudFront distribution
echo "☁️  Creating CloudFront distribution..."
cat > /tmp/cf-config.json <<EOF
{
    "CallerReference": "avashya-site-$(date +%s)",
    "Comment": "CloudFront distribution for Avashya static website",
    "DefaultRootObject": "index.html",
    "Origins": {
        "Quantity": 1,
        "Items": [
            {
                "Id": "S3-$BUCKET_NAME",
                "DomainName": "$BUCKET_NAME.s3-website-$REGION.amazonaws.com",
                "CustomOriginConfig": {
                    "HTTPPort": 80,
                    "HTTPSPort": 443,
                    "OriginProtocolPolicy": "http-only"
                }
            }
        ]
    },
    "DefaultCacheBehavior": {
        "TargetOriginId": "S3-$BUCKET_NAME",
        "ViewerProtocolPolicy": "redirect-to-https",
        "AllowedMethods": {
            "Quantity": 2,
            "Items": ["GET", "HEAD"],
            "CachedMethods": {
                "Quantity": 2,
                "Items": ["GET", "HEAD"]
            }
        },
        "Compress": true,
        "ForwardedValues": {
            "QueryString": false,
            "Cookies": {
                "Forward": "none"
            }
        },
        "MinTTL": 0,
        "DefaultTTL": 86400,
        "MaxTTL": 31536000
    },
    "CustomErrorResponses": {
        "Quantity": 1,
        "Items": [
            {
                "ErrorCode": 404,
                "ResponsePagePath": "/index.html",
                "ResponseCode": "200",
                "ErrorCachingMinTTL": 300
            }
        ]
    },
    "Enabled": true,
    "PriceClass": "PriceClass_100"
}
EOF

CF_OUTPUT=$(aws cloudfront create-distribution \
    --distribution-config file:///tmp/cf-config.json \
    --profile $PROFILE \
    --output json 2>&1) || true

if echo "$CF_OUTPUT" | grep -q "Distribution.*DomainName"; then
    CF_DOMAIN=$(echo "$CF_OUTPUT" | grep -o '"DomainName": "[^"]*"' | head -1 | cut -d'"' -f4)
    CF_ID=$(echo "$CF_OUTPUT" | grep -o '"Id": "[^"]*"' | head -1 | cut -d'"' -f4)

    echo "✅ CloudFront distribution created successfully!"
    echo ""
    echo "📋 Deployment Summary:"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "S3 Bucket: $BUCKET_NAME"
    echo "S3 Website URL: http://$BUCKET_NAME.s3-website-$REGION.amazonaws.com"
    echo "CloudFront Distribution ID: $CF_ID"
    echo "CloudFront URL: https://$CF_DOMAIN"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    echo "⏳ Note: CloudFront distribution is being deployed globally."
    echo "   This may take 15-20 minutes. You can check status with:"
    echo "   aws cloudfront get-distribution --id $CF_ID --profile $PROFILE"
else
    echo "⚠️  CloudFront creation encountered an issue (might already exist)"
    echo "   Checking for existing distributions..."

    EXISTING_CF=$(aws cloudfront list-distributions --profile $PROFILE --output json 2>/dev/null | grep -o '"DomainName": "[^"]*"' | head -1 | cut -d'"' -f4 || echo "")

    if [ -n "$EXISTING_CF" ]; then
        echo "   Found existing CloudFront distribution: https://$EXISTING_CF"
    fi

    echo ""
    echo "📋 Deployment Summary:"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "S3 Bucket: $BUCKET_NAME"
    echo "S3 Website URL: http://$BUCKET_NAME.s3-website-$REGION.amazonaws.com"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
fi

# Cleanup temp files
rm -f /tmp/bucket-policy.json /tmp/cf-config.json

echo ""
echo "✨ Deployment complete!"
