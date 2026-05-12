# 🚀 How to Deploy Avashya Website to AWS EC2

## 📍 Instance Information
- **Instance ID**: `i-0e6967ca91914d812`
- **Public IP**: `54.198.40.194`
- **Name**: `avashya-website-dev`
- **Key Name**: `avashya-eks-key`
- **Status**: Running ✅

## ⚠️ The Issue
The SSH key (`avashya-eks-key.pem`) is not currently accessible. Here are your options:

---

## ✅ SOLUTION 1: Use AWS Console Session Manager (EASIEST)

If Session Manager is enabled, you can deploy without SSH:

1. **Go to AWS Console** → EC2 → Instances
2. Select instance `i-0e6967ca91914d812`
3. Click **Connect** → **Session Manager** tab
4. Click **Connect** button
5. Run these commands in the browser terminal:

```bash
cd /home/ubuntu
rm -rf avashya-website
git clone https://github.com/Avashya-Tech-LLP/avashya-website.git
cd avashya-website/avashya-site
npm install
npm run build
pm2 delete avashya-website 2>/dev/null || true
pm2 start npm --name "avashya-website" -- start
pm2 save
pm2 status
```

---

## ✅ SOLUTION 2: Enable SSM and Deploy via CLI

Run these commands to enable SSM on the instance:

```bash
# 1. Get the instance role
aws ec2 describe-instances --instance-ids i-0e6967ca91914d812 \
  --query 'Reservations[0].Instances[0].IamInstanceProfile.Arn'

# 2. If no role, create and attach one with SSM permissions
aws iam attach-role-policy \
  --role-name <YourInstanceRole> \
  --policy-arn arn:aws:iam::aws:policy/AmazonSSMManagedInstanceCore

# 3. Wait 5 minutes for SSM agent to register

# 4. Deploy using SSM
aws ssm send-command \
  --instance-ids "i-0e6967ca91914d812" \
  --document-name "AWS-RunShellScript" \
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

---

## ✅ SOLUTION 3: Retrieve Original SSH Key

The key `avashya-eks-key` was created when the instance was launched. Check:

1. **Your Downloads folder**
2. **AWS Console** → EC2 → Key Pairs (you can't download again, but you can see if it exists)
3. **Your email** - sometimes keys are emailed after creation
4. **Password managers** - if you stored it there
5. **Other team members** - who might have a copy

If found, use it to connect:
```bash
ssh -i /path/to/avashya-eks-key.pem ubuntu@54.198.40.194
./deploy-script.sh
```

---

## ✅ SOLUTION 4: Create New Key and Replace

1. **Create new key pair in AWS Console**:
   - EC2 → Key Pairs → Create Key Pair
   - Name: `avashya-deploy-key`
   - Download the `.pem` file

2. **Stop the instance** (required to change key):
   ```bash
   aws ec2 stop-instances --instance-ids i-0e6967ca91914d812
   ```

3. **Wait for stopped state**:
   ```bash
   aws ec2 wait instance-stopped --instance-ids i-0e6967ca91914d812
   ```

4. **Detach root volume**:
   ```bash
   aws ec2 describe-instances --instance-ids i-0e6967ca91914d812 \
     --query 'Reservations[0].Instances[0].BlockDeviceMappings[0].Ebs.VolumeId'
   
   # Note the volume ID, then:
   aws ec2 detach-volume --volume-id <VOLUME_ID>
   ```

5. **Attach to temporary instance, add new key, reattach** (complex, see AWS docs)

**OR SIMPLER**: Just launch a new instance with the new key and migrate.

---

## ✅ SOLUTION 5: Use GitHub Actions (AUTOMATED)

I've created `.github/workflows/deploy.yml` for you.

**Setup Steps:**

1. **Get or create SSH key** (using any method above)

2. **Add key to GitHub Secrets**:
   - Go to: https://github.com/Avashya-Tech-LLP/avashya-website/settings/secrets/actions
   - Click **New repository secret**
   - Name: `EC2_SSH_KEY`
   - Value: Paste the entire `.pem` file content (including header/footer)

3. **Push the workflow** (already created locally):
   ```bash
   cd /d/Workspace/AvashyaWebsite
   git add .github/workflows/deploy.yml
   git commit -m "Add GitHub Actions deployment workflow"
   git push
   ```

4. **Deploy automatically**:
   - Every push to `main` triggers deployment
   - OR manually trigger: GitHub → Actions → Deploy to AWS EC2 → Run workflow

---

## ✅ SOLUTION 6: Use EC2 Instance Connect (if enabled)

```bash
# Generate temporary key
ssh-keygen -t rsa -f ~/.ssh/temp_key -N ""

# Send to instance (60 seconds validity)
aws ec2-instance-connect send-ssh-public-key \
  --instance-id i-0e6967ca91914d812 \
  --instance-os-user ubuntu \
  --ssh-public-key file://~/.ssh/temp_key.pub \
  --availability-zone us-east-1a

# Connect immediately
ssh -i ~/.ssh/temp_key ubuntu@54.198.40.194
```

---

## 🎯 RECOMMENDED APPROACH

**For immediate deployment:**
1. Try **Solution 1** (Session Manager via Console) - fastest if available
2. If that fails, try **Solution 6** (EC2 Instance Connect) 
3. For future: Set up **Solution 5** (GitHub Actions)

**After deployment, verify:**
```bash
# Check if site is running
curl http://54.198.40.194:3000
```

Visit: **http://54.198.40.194:3000** to see your deployed website!

---

## 🔧 What's Been Deployed

Once deployment succeeds, the live site will have:
- ✅ Mobile-optimized UI for all screen sizes
- ✅ AWS Partner Services section with Migrations & GenAI
- ✅ Touch-friendly navigation and forms
- ✅ Responsive components throughout
- ✅ All latest changes from GitHub

---

## 📞 Need Help?

If none of these work, you might need to:
1. Contact whoever originally set up the EC2 instance for the SSH key
2. Create a new EC2 instance with a new key you control
3. Use AWS Support to help recover access

---

**Current Status:**
- ✅ Code pushed to GitHub: https://github.com/Avashya-Tech-LLP/avashya-website
- ✅ Latest commit includes all mobile optimizations and AWS services
- ⏳ Waiting for deployment to EC2 instance
- 🎯 Target URL: http://54.198.40.194:3000
