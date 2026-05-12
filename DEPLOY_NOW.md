# 🚀 Deploy to AWS EC2 - Quick Guide

## ✅ Changes Pushed to GitHub

All changes have been committed and pushed to: `https://github.com/Avashya-Tech-LLP/avashya-website.git`

**Commit**: Add AWS Partner services and mobile optimization

## 📋 Deployment Steps

### Option 1: SSH into EC2 Instance and Run Script

```bash
# 1. SSH into your EC2 instance
ssh -i /path/to/your-key.pem ubuntu@YOUR_EC2_IP

# 2. Run the deployment script
cd ~
wget https://raw.githubusercontent.com/Avashya-Tech-LLP/avashya-website/main/deploy-script.sh
chmod +x deploy-script.sh
./deploy-script.sh
```

### Option 2: Remote Execution (One Command)

```bash
# Replace YOUR_EC2_IP and /path/to/key.pem with actual values
ssh -i /path/to/your-key.pem ubuntu@YOUR_EC2_IP 'bash -s' < deploy-script.sh
```

### Option 3: Use AWS Systems Manager (SSM)

If SSM is configured on your instance:

```bash
aws ssm send-command \
  --document-name "AWS-RunShellScript" \
  --instance-ids "YOUR_INSTANCE_ID" \
  --parameters 'commands=[
    "cd /home/ubuntu",
    "rm -rf avashya-website",
    "git clone https://github.com/Avashya-Tech-LLP/avashya-website.git",
    "cd avashya-website/avashya-site",
    "npm install",
    "npm run build",
    "pm2 delete avashya-website || true",
    "pm2 start npm --name avashya-website -- start",
    "pm2 save"
  ]'
```

## 🔍 What Will Happen

1. ✅ Clone fresh code from GitHub (with all your changes)
2. ✅ Install dependencies
3. ✅ Build production bundle
4. ✅ Stop old version
5. ✅ Start new version with PM2
6. ✅ Website available on port 3000

## 🎯 Post-Deployment

After deployment completes, the script will show:
```
Website should be accessible at http://YOUR_EC2_IP:3000
```

Visit that URL to see the live website with:
- ✅ Mobile optimization
- ✅ AWS Partner Services section
- ✅ All responsive improvements

## 🔐 Security Notes

- Ensure your `.pem` key has proper permissions: `chmod 400 your-key.pem`
- Verify security group allows SSH (port 22) from your IP
- Verify security group allows HTTP (port 3000) or configure nginx/Apache reverse proxy

## 🌐 Production Setup (Recommended)

For production, consider:

1. **Nginx Reverse Proxy** (Port 80/443 → 3000)
```bash
sudo apt update
sudo apt install nginx
sudo nano /etc/nginx/sites-available/avashya
```

Nginx config:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

2. **SSL Certificate** (Let's Encrypt)
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

## 📊 Monitoring

Check deployment status:
```bash
ssh -i /path/to/key.pem ubuntu@YOUR_EC2_IP
pm2 status
pm2 logs avashya-website
```

## 🆘 Troubleshooting

### If deployment fails:

**Check logs:**
```bash
ssh -i /path/to/key.pem ubuntu@YOUR_EC2_IP
pm2 logs avashya-website --lines 50
```

**Manually restart:**
```bash
cd /home/ubuntu/avashya-website/avashya-site
pm2 restart avashya-website
```

**Check if port 3000 is in use:**
```bash
sudo lsof -i :3000
```

## 📝 Need the SSH Key?

If you need to retrieve the SSH key or EC2 instance details:
1. Check AWS Console → EC2 → Instances
2. Get the public IP address
3. Use the .pem key file you saved when creating the instance

---

**Ready to Deploy?** Run one of the options above!
