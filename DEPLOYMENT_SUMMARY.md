# Avashya Website - AWS Deployment Summary

**Deployment Date:** May 12, 2026  
**Status:** ✅ Successfully Deployed

---

## Production Deployment (Primary)

### Account Details
- **AWS Account ID:** 367101965834
- **Profile:** avashya-prod
- **User:** varun.k@avashya.tech

### Infrastructure
- **S3 Bucket:** `avashya-site-prod`
- **CloudFront Distribution:** `E1GNMI5UUH83RE`
- **Region:** us-east-1

### Public URLs
🌐 **Primary (CloudFront HTTPS):** https://d28xeaoop3xxok.cloudfront.net  
🌐 **S3 Direct (HTTP):** http://avashya-site-prod.s3-website-us-east-1.amazonaws.com

### Quick Deploy
```bash
# Use the production deployment script
bash deploy-prod.sh
# or on Windows
deploy-prod.bat
```

### Documentation
📄 **Full Details:** See `AWS_DEPLOYMENT_INFO_PROD.md`

---

## Development/Test Deployment (Secondary)

### Account Details
- **AWS Account ID:** 372041258366
- **Profile:** dynamitech
- **Organization:** DynamiTech

### Infrastructure
- **S3 Bucket:** `avashya-site`
- **CloudFront Distribution:** `EDLH04KNJV2XP`
- **Region:** us-east-1

### Public URLs
🌐 **Primary (CloudFront HTTPS):** https://d1x2a6wllw97iv.cloudfront.net  
🌐 **S3 Direct (HTTP):** http://avashya-site.s3-website-us-east-1.amazonaws.com

### Quick Deploy
```bash
# Use the standard deployment script
bash deploy-to-aws.sh
# or on Windows
deploy-to-aws.bat
```

### Documentation
📄 **Full Details:** See `AWS_DEPLOYMENT_INFO.md`

---

## Deployment Files

### Production Scripts
- `deploy-prod.sh` - Production deployment (Bash)
- `deploy-prod.bat` - Production deployment (Windows)
- `AWS_DEPLOYMENT_INFO_PROD.md` - Complete production documentation

### Development Scripts
- `deploy-to-aws.sh` - Development deployment (Bash)
- `deploy-to-aws.bat` - Development deployment (Windows)
- `AWS_DEPLOYMENT_INFO.md` - Complete development documentation

### Configuration Files
- `bucket-policy-prod.json` - S3 bucket policy (production)
- `bucket-policy.json` - S3 bucket policy (development)
- `cf-config-prod.json` - CloudFront configuration (production)
- `cf-config.json` - CloudFront configuration (development)

---

## Current Status

### Production (avashya-prod)
- ✅ S3 bucket created and configured
- ✅ Static files uploaded (4 files, 244.9 KiB)
- ✅ Public access enabled
- ✅ CloudFront distribution created
- ⏳ CloudFront deploying globally (15-20 minutes)

### Development (dynamitech)
- ✅ S3 bucket created and configured
- ✅ Static files uploaded
- ✅ Public access enabled
- ✅ CloudFront distribution created
- ⏳ CloudFront deploying globally (15-20 minutes)

---

## Common Operations

### Update Production Website
```bash
# Quick update with invalidation
aws s3 sync static-site/ s3://avashya-site-prod/ --profile avashya-prod --delete
aws cloudfront create-invalidation --distribution-id E1GNMI5UUH83RE --paths "/*" --profile avashya-prod
```

### Update Development Website
```bash
# Quick update with invalidation
aws s3 sync static-site/ s3://avashya-site/ --profile dynamitech --delete
aws cloudfront create-invalidation --distribution-id EDLH04KNJV2XP --paths "/*" --profile dynamitech
```

### Check CloudFront Status
```bash
# Production
aws cloudfront get-distribution --id E1GNMI5UUH83RE --profile avashya-prod --query "Distribution.Status"

# Development
aws cloudfront get-distribution --id EDLH04KNJV2XP --profile dynamitech --query "Distribution.Status"
```

### View Deployed Files
```bash
# Production
aws s3 ls s3://avashya-site-prod/ --recursive --human-readable --profile avashya-prod

# Development
aws s3 ls s3://avashya-site/ --recursive --human-readable --profile dynamitech
```

---

## Architecture Overview

```
                                          ┌─────────────────────┐
                                          │   Users/Browsers    │
                                          └──────────┬──────────┘
                                                     │ HTTPS
                                                     ▼
                          ┌──────────────────────────────────────────┐
                          │  CloudFront CDN (Global Edge Locations)  │
                          │  • SSL/TLS Termination                   │
                          │  • Gzip Compression                      │
                          │  • Caching (TTL: 1hr-1yr)               │
                          │  • DDoS Protection                       │
                          └──────────────┬───────────────────────────┘
                                         │ HTTP
                                         ▼
                          ┌──────────────────────────────────────────┐
                          │  S3 Static Website Hosting (us-east-1)   │
                          │  • HTML, CSS, JS, Images                 │
                          │  • Public Read Access                    │
                          │  • Index: index.html                     │
                          └──────────────────────────────────────────┘

PRODUCTION:    s3://avashya-site-prod/  →  https://d28xeaoop3xxok.cloudfront.net
DEVELOPMENT:   s3://avashya-site/       →  https://d1x2a6wllw97iv.cloudfront.net
```

---

## Security Configuration

### Implemented
- ✅ HTTPS enforced (HTTP → HTTPS redirect)
- ✅ Public read-only access (GetObject only)
- ✅ No write access from internet
- ✅ CloudFront compression enabled
- ✅ Modern TLS versions (1.0+)

### Recommended Next Steps
- 🔜 Add custom domain with ACM SSL certificate
- 🔜 Enable CloudFront access logging
- 🔜 Set up AWS WAF for additional protection
- 🔜 Configure CloudWatch alarms
- 🔜 Enable S3 versioning for rollback capability

---

## Cost Estimate

### Monthly Costs (Low-Medium Traffic)
- **S3 Storage:** ~$0.05-0.10 (245 KB static files)
- **S3 Requests:** ~$0.01 (minimal with CloudFront caching)
- **CloudFront Transfer:** 
  - First 1 TB: Free tier
  - Additional: ~$0.085/GB
- **CloudFront Requests:** ~$0.01 per 10,000 requests

**Estimated Total:** $1-10/month (depending on traffic)

### Cost Optimization Tips
- CloudFront caching reduces S3 requests (already configured)
- Compression reduces data transfer costs (enabled)
- Use invalidations sparingly (first 1,000/month free)

---

## Monitoring

### CloudFront Metrics
- Requests
- Data Transfer (bytes)
- Error Rates (4xx, 5xx)
- Cache Hit Ratio

### Access via AWS Console
1. Log into AWS Console
2. Navigate to CloudFront
3. Select distribution
4. View "Monitoring" tab

### CLI Monitoring
```bash
# CloudWatch metrics
aws cloudwatch get-metric-statistics \
  --namespace AWS/CloudFront \
  --metric-name Requests \
  --dimensions Name=DistributionId,Value=E1GNMI5UUH83RE \
  --start-time $(date -u -d '1 day ago' +%Y-%m-%dT%H:%M:%S) \
  --end-time $(date -u +%Y-%m-%dT%H:%M:%S) \
  --period 3600 \
  --statistics Sum \
  --profile avashya-prod
```

---

## Troubleshooting

### Website Not Loading
1. Check CloudFront status: `aws cloudfront get-distribution --id E1GNMI5UUH83RE --profile avashya-prod`
2. Verify S3 files: `aws s3 ls s3://avashya-site-prod/ --profile avashya-prod`
3. Test S3 directly: http://avashya-site-prod.s3-website-us-east-1.amazonaws.com

### Changes Not Appearing
1. Create CloudFront invalidation: `bash deploy-prod.sh` (includes invalidation)
2. Wait 1-5 minutes for invalidation to complete
3. Hard refresh browser (Ctrl+Shift+R)

### 403 Forbidden Error
1. Check bucket policy: `aws s3api get-bucket-policy --bucket avashya-site-prod --profile avashya-prod`
2. Verify public access settings: `aws s3api get-public-access-block --bucket avashya-site-prod --profile avashya-prod`

---

## Next Steps Checklist

### Immediate (Within 24 hours)
- [ ] Wait for CloudFront deployments to complete (~20 minutes)
- [ ] Test both production and development URLs
- [ ] Verify all pages load correctly
- [ ] Test on mobile devices

### Short-term (This Week)
- [ ] Purchase and configure custom domain (if needed)
- [ ] Request SSL certificate from ACM
- [ ] Set up DNS records in Route 53
- [ ] Enable CloudFront logging
- [ ] Configure CloudWatch alarms

### Long-term (This Month)
- [ ] Monitor costs and usage
- [ ] Set up automated backups
- [ ] Consider adding AWS WAF
- [ ] Implement CI/CD pipeline for automatic deployments
- [ ] Document custom domain setup

---

## Support Resources

- **AWS Documentation:** https://docs.aws.amazon.com/
- **CloudFront Guide:** https://docs.aws.amazon.com/cloudfront/
- **S3 Static Hosting:** https://docs.aws.amazon.com/s3/static-website-hosting/
- **AWS Support:** https://console.aws.amazon.com/support/

---

**Last Updated:** May 12, 2026  
**Maintained By:** Varun Kumar (varun.k@avashya.tech)
