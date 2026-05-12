# AWS Deployment Information - Avashya Website

## Deployment Summary

**Date:** May 12, 2026  
**AWS Profile:** dynamitech  
**Region:** us-east-1

---

## S3 Configuration

- **Bucket Name:** `avashya-site`
- **S3 Website URL:** http://avashya-site.s3-website-us-east-1.amazonaws.com
- **Public Access:** Enabled
- **Static Website Hosting:** Enabled
  - Index Document: `index.html`
  - Error Document: `index.html`

### Cache Control Settings
- **HTML files:** `public, max-age=3600` (1 hour)
- **Assets (CSS, JS, images):** `public, max-age=31536000` (1 year)

---

## CloudFront Distribution

- **Distribution ID:** `EDLH04KNJV2XP`
- **CloudFront Domain:** `d1x2a6wllw97iv.cloudfront.net`
- **Public URL:** https://d1x2a6wllw97iv.cloudfront.net
- **Status:** In Progress (deployment takes 15-20 minutes)
- **ARN:** `arn:aws:cloudfront::372041258366:distribution/EDLH04KNJV2XP`

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
aws cloudfront get-distribution --id EDLH04KNJV2XP --profile dynamitech
```

### Update Website (Re-deploy)
```bash
# Upload files to S3
aws s3 sync static-site/ s3://avashya-site/ --profile dynamitech --exclude "*.md" --exclude "*.sh" --exclude "*.bat" --delete

# Create CloudFront invalidation to clear cache
aws cloudfront create-invalidation --distribution-id EDLH04KNJV2XP --paths "/*" --profile dynamitech
```

### List All CloudFront Distributions
```bash
aws cloudfront list-distributions --profile dynamitech
```

### View S3 Bucket Contents
```bash
aws s3 ls s3://avashya-site/ --recursive --profile dynamitech
```

### Delete Deployment (if needed)
```bash
# Disable CloudFront distribution first
aws cloudfront get-distribution-config --id EDLH04KNJV2XP --profile dynamitech > dist-config.json
# Edit dist-config.json and set Enabled to false, then update
aws cloudfront update-distribution --id EDLH04KNJV2XP --if-match <ETag> --distribution-config file://dist-config.json --profile dynamitech

# After distribution is disabled and deployed, delete it
aws cloudfront delete-distribution --id EDLH04KNJV2XP --if-match <ETag> --profile dynamitech

# Empty and delete S3 bucket
aws s3 rm s3://avashya-site/ --recursive --profile dynamitech
aws s3 rb s3://avashya-site/ --profile dynamitech
```

---

## Next Steps

1. **Wait for CloudFront deployment** (15-20 minutes)
   - Check status with: `aws cloudfront get-distribution --id EDLH04KNJV2XP --profile dynamitech`
   - Look for `Status: "Deployed"`

2. **Test the website**
   - S3 Direct: http://avashya-site.s3-website-us-east-1.amazonaws.com
   - CloudFront (HTTPS): https://d1x2a6wllw97iv.cloudfront.net

3. **Optional: Add Custom Domain**
   - Purchase/configure domain in Route 53
   - Request SSL certificate in AWS Certificate Manager
   - Add custom domain to CloudFront distribution
   - Update Route 53 DNS records

4. **Monitor and Maintain**
   - Set up CloudWatch alarms for errors
   - Monitor CloudFront usage and costs
   - Regular updates using the deployment scripts

---

## Deployment Scripts

Two deployment scripts are available:

- **Bash (Git Bash/WSL):** `deploy-to-aws.sh`
- **Windows Batch:** `deploy-to-aws.bat`

Both scripts will:
- Create/update S3 bucket
- Upload files with appropriate cache headers
- Create/update CloudFront distribution

---

## Cost Considerations

- **S3 Storage:** ~$0.023 per GB per month (minimal for static site)
- **S3 Requests:** GET requests are very cheap
- **CloudFront:** 
  - First 1 TB transfer: Free tier or ~$0.085/GB
  - Requests: ~$0.0075 per 10,000 HTTP requests
  - Typical small website: $1-5 per month

---

## Security Notes

- S3 bucket is publicly readable (required for static hosting)
- CloudFront enforces HTTPS
- No sensitive data should be in the static files
- Consider adding AWS WAF for DDoS protection (additional cost)

---

## Support

For AWS-specific issues, refer to:
- [AWS S3 Documentation](https://docs.aws.amazon.com/s3/)
- [AWS CloudFront Documentation](https://docs.aws.amazon.com/cloudfront/)
- [AWS CLI Reference](https://docs.aws.amazon.com/cli/)
