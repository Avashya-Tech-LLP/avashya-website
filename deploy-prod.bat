@echo off
REM AWS Deployment Script for Avashya Static Website - PRODUCTION
REM Account: 367101965834 (avashya-prod)

set PROFILE=avashya-prod
set BUCKET_NAME=avashya-site-prod
set REGION=us-east-1
set SITE_DIR=static-site
set CF_ID=E1GNMI5UUH83RE

echo.
echo ========================================
echo  PRODUCTION Deployment - Avashya
echo ========================================
echo Profile: %PROFILE%
echo Bucket: %BUCKET_NAME%
echo CloudFront: %CF_ID%
echo Region: %REGION%
echo ========================================
echo.

REM Verify AWS account
for /f "tokens=*" %%i in ('aws sts get-caller-identity --profile %PROFILE% --query Account --output text') do set ACCOUNT_ID=%%i
if not "%ACCOUNT_ID%"=="367101965834" (
    echo ERROR: Wrong AWS account! Expected 367101965834, got %ACCOUNT_ID%
    pause
    exit /b 1
)
echo ✓ Verified AWS Account: %ACCOUNT_ID%
echo.

echo [1/3] Uploading static assets (CSS, JS, images)...
aws s3 sync %SITE_DIR%/ s3://%BUCKET_NAME%/ --profile %PROFILE% --exclude "*.md" --exclude "*.sh" --exclude "*.bat" --exclude ".git*" --delete --cache-control "public, max-age=31536000" --exclude "index.html" --exclude "*.html"

echo.
echo [2/3] Uploading HTML files (shorter cache)...
aws s3 sync %SITE_DIR%/ s3://%BUCKET_NAME%/ --profile %PROFILE% --exclude "*" --include "*.html" --cache-control "public, max-age=3600"

echo.
echo ✓ S3 upload complete!
echo.

echo [3/3] Creating CloudFront invalidation...
aws cloudfront create-invalidation --distribution-id %CF_ID% --paths "/*" --profile %PROFILE% > invalidation-output.json

echo ✓ CloudFront invalidation created
echo.

echo ========================================
echo  DEPLOYMENT COMPLETE!
echo ========================================
echo.
echo Website URLs:
echo   S3: http://%BUCKET_NAME%.s3-website-%REGION%.amazonaws.com
echo   CloudFront: https://d28xeaoop3xxok.cloudfront.net
echo.
echo CloudFront invalidation in progress (takes 1-5 minutes)
echo Check invalidation-output.json for details
echo.
pause
