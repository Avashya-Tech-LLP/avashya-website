#!/bin/bash
set -e

cd /home/ubuntu
rm -rf avashya-website
git clone https://github.com/Avashya-Tech-LLP/avashya-website.git
cd avashya-website/avashya-site

npm install
npm run build

# Stop existing process
pm2 delete avashya-website 2>/dev/null || true

# Start with PM2
pm2 start npm --name "avashya-website" -- start
pm2 save

echo "==== Deployment Complete ===="
pm2 status
echo "Website should be accessible at http://$(curl -s http://169.254.169.254/latest/meta-data/public-ipv4):3000"
