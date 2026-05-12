# Quick Deployment Guide

## 🚀 Deploy to GitHub Pages (Free)

1. **Create a GitHub repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Static Avashya website"
   git branch -M main
   git remote add origin https://github.com/yourusername/avashya-website.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**
   - Go to repository Settings
   - Navigate to Pages section
   - Source: Deploy from branch
   - Branch: main, folder: / (root)
   - Save

3. **Access your site**
   - URL: `https://yourusername.github.io/avashya-website/`
   - Usually live within 1-2 minutes

## 🌐 Deploy to Netlify (Free)

### Method 1: Drag & Drop
1. Visit [netlify.com](https://netlify.com)
2. Sign up or log in
3. Drag the `static-site` folder onto the Netlify dashboard
4. Your site is live instantly!

### Method 2: Git
1. Push code to GitHub/GitLab/Bitbucket
2. Connect repository in Netlify
3. Build settings:
   - Build command: (leave empty)
   - Publish directory: `static-site`
4. Deploy

**Custom Domain**: Settings → Domain Management → Add custom domain

## ⚡ Deploy to Vercel (Free)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd static-site
vercel
```

Or via web:
1. Import project at [vercel.com](https://vercel.com)
2. Select repository
3. Framework: Other
4. Root Directory: `static-site`
5. Deploy

## 🔧 Deploy to Traditional Web Hosting (cPanel)

1. Log in to cPanel
2. Open File Manager
3. Navigate to `public_html`
4. Upload all files from `static-site` folder
5. Ensure `index.html` is in root
6. Visit your domain

## 🔒 Add Contact Form Backend

### Option 1: Formspree
```html
<!-- Replace form action in index.html -->
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

### Option 2: Netlify Forms
```html
<!-- Add to form tag -->
<form name="contact" method="POST" data-netlify="true">
```

## 📊 Add Analytics

### Google Analytics
```html
<!-- Add before </head> in index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

## ✅ Pre-Deployment Checklist

- [ ] Test all links work
- [ ] Verify mobile responsiveness
- [ ] Test contact form
- [ ] Check all images load
- [ ] Test on different browsers
- [ ] Add favicon
- [ ] Add meta tags for SEO
- [ ] Configure custom domain
- [ ] Enable HTTPS (automatic on most platforms)
