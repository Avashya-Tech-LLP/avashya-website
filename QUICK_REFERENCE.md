# Avashya Website - Quick Reference Card

## 🌐 Production URLs

**Primary:** https://d28xeaoop3xxok.cloudfront.net  
**S3 Direct:** http://avashya-site-prod.s3-website-us-east-1.amazonaws.com

---

## 🚀 Quick Deploy Commands

### Production (Recommended)
```bash
bash deploy-prod.sh          # Full deployment with invalidation
```

### Development/Testing
```bash
bash deploy-to-aws.sh        # Deploy to development environment
```

---

## 📋 Essential Information

| Environment | Account ID | Profile | Bucket | CloudFront ID |
|------------|------------|---------|--------|---------------|
| **Production** | 367101965834 | avashya-prod | avashya-site-prod | E1GNMI5UUH83RE |
| **Development** | 372041258366 | dynamitech | avashya-site | EDLH04KNJV2XP |

---

## 🔄 Common Tasks

### Update Website
```bash
# Production
aws s3 sync static-site/ s3://avashya-site-prod/ --profile avashya-prod --delete
aws cloudfront create-invalidation --distribution-id E1GNMI5UUH83RE --paths "/*" --profile avashya-prod
```

### Check Status
```bash
# Production CloudFront
aws cloudfront get-distribution --id E1GNMI5UUH83RE --profile avashya-prod --query "Distribution.Status"
```

### View Files
```bash
# Production S3
aws s3 ls s3://avashya-site-prod/ --recursive --profile avashya-prod
```

### Test Website
```bash
# Quick HTTP test
curl -I https://d28xeaoop3xxok.cloudfront.net
```

---

## 📁 File Structure

```
D:\Workspace\AvashyaWebsite\
├── static-site/              # Website source files
│   ├── index.html
│   ├── css/styles.css
│   ├── js/main.js
│   └── assets/images/logo.png
│
├── deploy-prod.sh            # Production deployment script
├── deploy-prod.bat           # Production deployment (Windows)
├── deploy-to-aws.sh          # Development deployment script
├── deploy-to-aws.bat         # Development deployment (Windows)
│
├── DEPLOYMENT_SUMMARY.md     # Complete deployment overview
├── AWS_DEPLOYMENT_INFO_PROD.md   # Production details
├── AWS_DEPLOYMENT_INFO.md        # Development details
└── QUICK_REFERENCE.md        # This file
```

---

## ⚡ One-Liners

```bash
# Quick production update
bash deploy-prod.sh

# Check if CloudFront is deployed
aws cloudfront get-distribution --id E1GNMI5UUH83RE --profile avashya-prod --query "Distribution.Status" --output text

# List all files in production
aws s3 ls s3://avashya-site-prod/ --recursive --human-readable --profile avashya-prod

# Create cache invalidation
aws cloudfront create-invalidation --distribution-id E1GNMI5UUH83RE --paths "/*" --profile avashya-prod

# Download current production site
aws s3 sync s3://avashya-site-prod/ ./backup/ --profile avashya-prod
```

---

## 🆘 Emergency Commands

### Rollback to Previous Version
```bash
# Restore from backup
aws s3 sync ./backup-YYYYMMDD/ s3://avashya-site-prod/ --profile avashya-prod --delete
aws cloudfront create-invalidation --distribution-id E1GNMI5UUH83RE --paths "/*" --profile avashya-prod
```

### Quick Health Check
```bash
# Test all URLs
curl -I https://d28xeaoop3xxok.cloudfront.net
curl -I http://avashya-site-prod.s3-website-us-east-1.amazonaws.com
```

---

## 📞 Support

**User:** varun.k@avashya.tech  
**Account:** 367101965834 (avashya-prod)  
**AWS Console:** https://console.aws.amazon.com/

**Documentation:**
- Full Guide: `DEPLOYMENT_SUMMARY.md`
- Production Details: `AWS_DEPLOYMENT_INFO_PROD.md`
- Development Details: `AWS_DEPLOYMENT_INFO.md`

---

## ⏱️ Deployment Timeline

1. **Deploy Script:** ~2 minutes (upload files)
2. **CloudFront Distribution:** 15-20 minutes (first time)
3. **Cache Invalidation:** 1-5 minutes (updates)

---

## 💰 Estimated Monthly Cost

**Low Traffic:** $1-3/month  
**Medium Traffic:** $3-10/month  
**High Traffic:** $10-50/month

*Costs include S3 storage, data transfer, and CloudFront distribution.*

---

**Last Updated:** May 12, 2026
