@echo off
REM AWS Deployment Script for Avashya Static Website
REM This script deploys the static site to S3 and creates a CloudFront distribution

set PROFILE=dynamitech
set BUCKET_NAME=avashya-site
set REGION=us-east-1
set SITE_DIR=static-site

echo.
echo ========================================
echo  Avashya AWS Deployment Script
echo ========================================
echo Profile: %PROFILE%
echo Bucket: %BUCKET_NAME%
echo Region: %REGION%
echo.

echo [1/7] Creating S3 bucket...
aws s3 mb s3://%BUCKET_NAME% --region %REGION% --profile %PROFILE% 2>nul
if %errorlevel% equ 0 (
    echo ✓ Bucket created successfully
) else (
    echo ℹ Bucket already exists or creation failed ^(continuing...^)
)

echo.
echo [2/7] Configuring public access settings...
aws s3api put-public-access-block --bucket %BUCKET_NAME% --public-access-block-configuration "BlockPublicAcls=false,IgnorePublicAcls=false,BlockPublicPolicy=false,RestrictPublicBuckets=false" --profile %PROFILE%

echo.
echo [3/7] Enabling static website hosting...
aws s3 website s3://%BUCKET_NAME%/ --index-document index.html --error-document index.html --profile %PROFILE%

echo.
echo [4/7] Setting bucket policy for public access...
echo { > bucket-policy.json
echo     "Version": "2012-10-17", >> bucket-policy.json
echo     "Statement": [ >> bucket-policy.json
echo         { >> bucket-policy.json
echo             "Sid": "PublicReadGetObject", >> bucket-policy.json
echo             "Effect": "Allow", >> bucket-policy.json
echo             "Principal": "*", >> bucket-policy.json
echo             "Action": "s3:GetObject", >> bucket-policy.json
echo             "Resource": "arn:aws:s3:::%BUCKET_NAME%/*" >> bucket-policy.json
echo         } >> bucket-policy.json
echo     ] >> bucket-policy.json
echo } >> bucket-policy.json

aws s3api put-bucket-policy --bucket %BUCKET_NAME% --policy file://bucket-policy.json --profile %PROFILE%

echo.
echo [5/7] Uploading static files to S3...
echo Uploading CSS, JS, and images with long cache...
aws s3 sync %SITE_DIR% s3://%BUCKET_NAME%/ --profile %PROFILE% --exclude "*.md" --exclude "*.sh" --exclude "*.bat" --exclude ".git*" --delete --cache-control "public, max-age=31536000" --exclude "index.html" --exclude "*.html"

echo.
echo [6/7] Uploading HTML files with shorter cache...
aws s3 sync %SITE_DIR% s3://%BUCKET_NAME%/ --profile %PROFILE% --exclude "*" --include "*.html" --cache-control "public, max-age=3600"

echo.
echo ✓ S3 upload complete!
echo.
echo S3 Website URL: http://%BUCKET_NAME%.s3-website-%REGION%.amazonaws.com
echo.

echo [7/7] Creating CloudFront distribution...
echo { > cf-config.json
echo     "CallerReference": "avashya-site-%random%%random%", >> cf-config.json
echo     "Comment": "CloudFront distribution for Avashya static website", >> cf-config.json
echo     "DefaultRootObject": "index.html", >> cf-config.json
echo     "Origins": { >> cf-config.json
echo         "Quantity": 1, >> cf-config.json
echo         "Items": [ >> cf-config.json
echo             { >> cf-config.json
echo                 "Id": "S3-%BUCKET_NAME%", >> cf-config.json
echo                 "DomainName": "%BUCKET_NAME%.s3-website-%REGION%.amazonaws.com", >> cf-config.json
echo                 "CustomOriginConfig": { >> cf-config.json
echo                     "HTTPPort": 80, >> cf-config.json
echo                     "HTTPSPort": 443, >> cf-config.json
echo                     "OriginProtocolPolicy": "http-only" >> cf-config.json
echo                 } >> cf-config.json
echo             } >> cf-config.json
echo         ] >> cf-config.json
echo     }, >> cf-config.json
echo     "DefaultCacheBehavior": { >> cf-config.json
echo         "TargetOriginId": "S3-%BUCKET_NAME%", >> cf-config.json
echo         "ViewerProtocolPolicy": "redirect-to-https", >> cf-config.json
echo         "AllowedMethods": { >> cf-config.json
echo             "Quantity": 2, >> cf-config.json
echo             "Items": ["GET", "HEAD"], >> cf-config.json
echo             "CachedMethods": { >> cf-config.json
echo                 "Quantity": 2, >> cf-config.json
echo                 "Items": ["GET", "HEAD"] >> cf-config.json
echo             } >> cf-config.json
echo         }, >> cf-config.json
echo         "Compress": true, >> cf-config.json
echo         "ForwardedValues": { >> cf-config.json
echo             "QueryString": false, >> cf-config.json
echo             "Cookies": { >> cf-config.json
echo                 "Forward": "none" >> cf-config.json
echo             } >> cf-config.json
echo         }, >> cf-config.json
echo         "MinTTL": 0, >> cf-config.json
echo         "DefaultTTL": 86400, >> cf-config.json
echo         "MaxTTL": 31536000 >> cf-config.json
echo     }, >> cf-config.json
echo     "CustomErrorResponses": { >> cf-config.json
echo         "Quantity": 1, >> cf-config.json
echo         "Items": [ >> cf-config.json
echo             { >> cf-config.json
echo                 "ErrorCode": 404, >> cf-config.json
echo                 "ResponsePagePath": "/index.html", >> cf-config.json
echo                 "ResponseCode": "200", >> cf-config.json
echo                 "ErrorCachingMinTTL": 300 >> cf-config.json
echo             } >> cf-config.json
echo         ] >> cf-config.json
echo     }, >> cf-config.json
echo     "Enabled": true, >> cf-config.json
echo     "PriceClass": "PriceClass_100" >> cf-config.json
echo } >> cf-config.json

aws cloudfront create-distribution --distribution-config file://cf-config.json --profile %PROFILE% > cf-output.json 2>&1

if %errorlevel% equ 0 (
    echo ✓ CloudFront distribution created successfully!
    echo.
    echo ========================================
    echo  Deployment Summary
    echo ========================================
    echo S3 Bucket: %BUCKET_NAME%
    echo S3 Website URL: http://%BUCKET_NAME%.s3-website-%REGION%.amazonaws.com
    echo.
    echo Check cf-output.json for CloudFront details
    echo.
    echo Note: CloudFront distribution is being deployed globally.
    echo This may take 15-20 minutes to complete.
) else (
    echo ! CloudFront creation encountered an issue
    echo Check cf-output.json for details
    echo.
    echo ========================================
    echo  Deployment Summary
    echo ========================================
    echo S3 Bucket: %BUCKET_NAME%
    echo S3 Website URL: http://%BUCKET_NAME%.s3-website-%REGION%.amazonaws.com
)

echo.
echo Cleaning up temporary files...
del bucket-policy.json 2>nul

echo.
echo ✓ Deployment complete!
echo.
pause
