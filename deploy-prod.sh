#!/bin/bash

# AWS Deployment Script for Avashya Static Website - PRODUCTION
# Account: 367101965834 (avashya-prod)

set -e

PROFILE="avashya-prod"
BUCKET_NAME="avashya-site-prod"
REGION="us-east-1"
SITE_DIR="static-site"
CF_ID="E1GNMI5UUH83RE"

echo "🚀 Deploying to PRODUCTION..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Profile: $PROFILE"
echo "Bucket: $BUCKET_NAME"
echo "CloudFront: $CF_ID"
echo "Region: $REGION"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Verify we're in the right account
ACCOUNT_ID=$(aws sts get-caller-identity --profile $PROFILE --query Account --output text)
if [ "$ACCOUNT_ID" != "367101965834" ]; then
    echo "❌ ERROR: Wrong AWS account! Expected 367101965834, got $ACCOUNT_ID"
    exit 1
fi
echo "✅ Verified AWS Account: $ACCOUNT_ID"
echo ""

# Upload static assets with long cache
echo "📤 [1/3] Uploading static assets (CSS, JS, images)..."
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

echo ""
echo "📤 [2/3] Uploading HTML files (shorter cache)..."
aws s3 sync $SITE_DIR/ s3://$BUCKET_NAME/ \
    --profile $PROFILE \
    --exclude "*" \
    --include "*.html" \
    --cache-control "public, max-age=3600"

echo ""
echo "✅ S3 upload complete!"
echo ""

# Create CloudFront invalidation
echo "🔄 [3/3] Creating CloudFront invalidation..."
INVALIDATION_OUTPUT=$(aws cloudfront create-invalidation \
    --distribution-id $CF_ID \
    --paths "/*" \
    --profile $PROFILE \
    --output json)

INVALIDATION_ID=$(echo "$INVALIDATION_OUTPUT" | grep -o '"Id": "[^"]*"' | cut -d'"' -f4)

echo "✅ CloudFront invalidation created: $INVALIDATION_ID"
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✨ DEPLOYMENT COMPLETE!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "🌐 Website URLs:"
echo "   S3: http://$BUCKET_NAME.s3-website-$REGION.amazonaws.com"
echo "   CloudFront: https://d28xeaoop3xxok.cloudfront.net"
echo ""
echo "⏳ CloudFront invalidation in progress (takes 1-5 minutes)"
echo "   Check status: aws cloudfront get-invalidation --id $INVALIDATION_ID --distribution-id $CF_ID --profile $PROFILE"
echo ""
echo "📊 Monitor deployment:"
echo "   aws cloudfront get-distribution --id $CF_ID --profile $PROFILE --query 'Distribution.Status'"
echo ""
