# AWS Deployment Information - Avashya Website (PRODUCTION)

## Deployment Summary

**Date:** May 12, 2026  
**AWS Profile:** avashya-prod  
**AWS Account ID:** 367101965834  
**Region:** us-east-1  
**User:** varun.k@avashya.tech

---

## S3 Configuration

- **Bucket Name:** `avashya-site-prod`
- **S3 Website URL:** http://avashya-site-prod.s3-website-us-east-1.amazonaws.com
- **Public Access:** Enabled
- **Static Website Hosting:** Enabled
  - Index Document: `index.html`
  - Error Document: `index.html`

### Cache Control Settings
- **HTML files:** `public, max-age=3600` (1 hour)
- **Assets (CSS, JS, images):** `public, max-age=31536000` (1 year)

---

## CloudFront Distribution

- **Distribution ID:** `E1GNMI5UUH83RE`
- **CloudFront Domain:** `d28xeaoop3xxok.cloudfront.net`
- **Public URL:** https://d28xeaoop3xxok.cloudfront.net
- **Status:** In Progress (deployment takes 15-20 minutes)
- **ARN:** `arn:aws:cloudfront::367101965834:distribution/E1GNMI5UUH83RE`

### CloudFront Settings
- **HTTPS:** Enabled (redirects HTTP to HTTPS)
- **Compression:** Enabled
- **Price Class:** 100 (North America & Europe)
- **HTTP Version:** HTTP/2
- **IPv6:** Enabled
- **Error Handling:** 404 errors redirect to index.html (SPA support)

---

## Useful Commands

### Check CloudFront Status
```bash
aws cloudfront get-distribution --id E1GNMI5UUH83RE --profile avashya-prod
```

### Update Website (Re-deploy)
```bash
# Upload static assets
aws s3 sync static-site/ s3://avashya-site-prod/ --profile avashya-prod \
  --exclude "*.md" --exclude "*.sh" --exclude "*.bat" --exclude ".git*" --delete \
  --cache-control "public, max-age=31536000" --exclude "index.html" --exclude "*.html"

# Upload HTML files
aws s3 sync static-site/ s3://avashya-site-prod/ --profile avashya-prod \
  --exclude "*" --include "*.html" --cache-control "public, max-age=3600"

# Create CloudFront invalidation to clear cache
aws cloudfront create-invalidation \
  --distribution-id E1GNMI5UUH83RE \
  --paths "/*" \
  --profile avashya-prod
```

### Quick Update Script
```bash
# One-liner to update and invalidate
aws s3 sync static-site/ s3://avashya-site-prod/ --profile avashya-prod --delete && \
aws cloudfront create-invalidation --distribution-id E1GNMI5UUH83RE --paths "/*" --profile avashya-prod
```

### List All CloudFront Distributions
```bash
aws cloudfront list-distributions --profile avashya-prod --query "DistributionList.Items[*].[Id,DomainName,Comment]" --output table
```

### View S3 Bucket Contents
```bash
aws s3 ls s3://avashya-site-prod/ --recursive --profile avashya-prod
```

### Check Website Availability
```bash
# Test S3 website endpoint
curl -I http://avashya-site-prod.s3-website-us-east-1.amazonaws.com

# Test CloudFront endpoint (after deployment completes)
curl -I https://d28xeaoop3xxok.cloudfront.net
```

---

## Deployment Scripts

Create a custom deployment script for production:

**deploy-prod.sh:**
```bash
#!/bin/bash
PROFILE="avashya-prod"
BUCKET="avashya-site-prod"
CF_ID="E1GNMI5UUH83RE"

echo "Deploying to production..."
aws s3 sync static-site/ s3://$BUCKET/ --profile $PROFILE --delete
aws cloudfront create-invalidation --distribution-id $CF_ID --paths "/*" --profile $PROFILE
echo "Deployment complete!"
```

**deploy-prod.bat:**
```batch
@echo off
set PROFILE=avashya-prod
set BUCKET=avashya-site-prod
set CF_ID=E1GNMI5UUH83RE

echo Deploying to production...
aws s3 sync static-site/ s3://%BUCKET%/ --profile %PROFILE% --delete
aws cloudfront create-invalidation --distribution-id %CF_ID% --paths "/*" --profile %PROFILE%
echo Deployment complete!
pause
```

---

## Monitoring and Maintenance

### CloudFront Metrics
```bash
# View CloudFront metrics (requests, data transfer)
aws cloudwatch get-metric-statistics \
  --namespace AWS/CloudFront \
  --metric-name Requests \
  --dimensions Name=DistributionId,Value=E1GNMI5UUH83RE \
  --start-time 2026-05-11T00:00:00Z \
  --end-time 2026-05-12T00:00:00Z \
  --period 3600 \
  --statistics Sum \
  --profile avashya-prod
```

### View Recent Invalidations
```bash
aws cloudfront list-invalidations --distribution-id E1GNMI5UUH83RE --profile avashya-prod
```

### Enable CloudFront Logging (Optional)
```bash
# Create a logging bucket first
aws s3 mb s3://avashya-cloudfront-logs --profile avashya-prod

# Update distribution to enable logging
aws cloudfront get-distribution-config --id E1GNMI5UUH83RE --profile avashya-prod > dist-config.json
# Edit dist-config.json to add logging configuration
# Then update the distribution
```

---

## Cost Optimization

### Current Setup Costs (Estimated)
- **S3 Storage:** ~$0.023/GB/month (negligible for static site)
- **S3 Requests:** Very minimal
- **CloudFront Data Transfer:** 
  - First 1 TB/month: Free tier
  - Next 10 TB: ~$0.085/GB
- **CloudFront Requests:** ~$0.0075 per 10,000 requests
- **Estimated Monthly Cost:** $1-10 (depending on traffic)

### Cost Saving Tips
1. Use CloudFront caching effectively (already configured)
2. Compress assets before upload (images, CSS, JS)
3. Monitor usage with AWS Cost Explorer
4. Consider using S3 Intelligent-Tiering for backups

---

## Custom Domain Setup (Optional)

To add a custom domain (e.g., www.avashya.com):

1. **Request SSL Certificate (ACM)**
```bash
aws acm request-certificate \
  --domain-name www.avashya.com \
  --validation-method DNS \
  --region us-east-1 \
  --profile avashya-prod
```

2. **Validate Certificate** (add CNAME records to DNS)

3. **Update CloudFront Distribution**
```bash
# Add custom domain and SSL certificate to CloudFront
# This requires updating the distribution config
```

4. **Update Route 53 DNS**
```bash
# Point your domain to CloudFront distribution
# Create an A record (alias) pointing to d28xeaoop3xxok.cloudfront.net
```

---

## Security Best Practices

- ✅ HTTPS enforced via CloudFront
- ✅ S3 bucket policy limited to GetObject only
- ✅ No public write access
- ⚠️ Consider adding AWS WAF for DDoS protection
- ⚠️ Enable CloudFront access logs for security monitoring
- ⚠️ Set up CloudWatch alarms for unusual traffic patterns

### Recommended: Enable AWS WAF (Additional Cost)
```bash
# Create a basic WAF web ACL to protect against common attacks
aws wafv2 create-web-acl --name avashya-protection \
  --scope CLOUDFRONT \
  --default-action Allow={} \
  --region us-east-1 \
  --profile avashya-prod
```

---

## Backup and Disaster Recovery

### Backup Current Deployment
```bash
# Download current S3 contents
aws s3 sync s3://avashya-site-prod/ ./backup-$(date +%Y%m%d)/ --profile avashya-prod

# Export CloudFront configuration
aws cloudfront get-distribution-config --id E1GNMI5UUH83RE --profile avashya-prod > cf-backup.json
```

### Restore from Backup
```bash
# Upload backup to S3
aws s3 sync ./backup-20260512/ s3://avashya-site-prod/ --profile avashya-prod --delete

# Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id E1GNMI5UUH83RE --paths "/*" --profile avashya-prod
```

---

## Troubleshooting

### Issue: Website not loading
```bash
# Check S3 website hosting
aws s3api get-bucket-website --bucket avashya-site-prod --profile avashya-prod

# Check CloudFront status
aws cloudfront get-distribution --id E1GNMI5UUH83RE --profile avashya-prod --query "Distribution.Status"
```

### Issue: Changes not appearing
```bash
# Create invalidation to clear cache
aws cloudfront create-invalidation --distribution-id E1GNMI5UUH83RE --paths "/*" --profile avashya-prod
```

### Issue: 403 Access Denied
```bash
# Verify bucket policy
aws s3api get-bucket-policy --bucket avashya-site-prod --profile avashya-prod

# Verify public access block settings
aws s3api get-public-access-block --bucket avashya-site-prod --profile avashya-prod
```

---

## Support Contacts

- **AWS Support:** https://console.aws.amazon.com/support/
- **Account ID:** 367101965834
- **Primary User:** varun.k@avashya.tech

---

## Next Steps

1. ✅ S3 bucket created and configured
2. ✅ Static files uploaded
3. ✅ CloudFront distribution created
4. ⏳ Wait 15-20 minutes for CloudFront deployment
5. 🔜 Test the website at https://d28xeaoop3xxok.cloudfront.net
6. 🔜 (Optional) Configure custom domain
7. 🔜 (Optional) Enable CloudWatch alarms
8. 🔜 (Optional) Set up CloudFront logging
9. 🔜 (Optional) Add AWS WAF protection

---

**Last Updated:** May 12, 2026
