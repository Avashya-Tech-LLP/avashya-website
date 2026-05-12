# Avashya Website - Deployment Guide

## 🚀 Quick Start

The website is currently running at: **http://localhost:3000**

## 📦 Production Build

### 1. Build the Production Bundle

```bash
npm run build
```

This will:
- Optimize all JavaScript and CSS
- Generate static HTML pages
- Compress images
- Remove console logs
- Create production-ready bundles

### 2. Test Production Build Locally

```bash
npm start
```

This runs the production build on http://localhost:3000

## 🌐 Deployment Options

### Option 1: Vercel (Recommended)

Vercel is built by the creators of Next.js and offers zero-config deployment.

**Steps:**
1. Push your code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Import your repository
4. Vercel will auto-detect Next.js and deploy

**Custom Domain:**
- Add your domain in Vercel dashboard → Settings → Domains
- Update DNS records as instructed

### Option 2: Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build the site
npm run build

# Deploy
netlify deploy --prod
```

### Option 3: AWS Amplify

1. Connect your GitHub repository
2. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
3. Deploy

### Option 4: Self-Hosted (VPS/Docker)

**Using PM2:**
```bash
# Install PM2
npm install -g pm2

# Build
npm run build

# Start with PM2
pm2 start npm --name "avashya-site" -- start

# Save PM2 config
pm2 save
pm2 startup
```

**Using Docker:**
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

Build and run:
```bash
docker build -t avashya-site .
docker run -p 3000:3000 avashya-site
```

## 🔧 Environment Variables

Create a `.env.local` file for environment-specific configuration:

```env
# Analytics
NEXT_PUBLIC_GA_ID=your_google_analytics_id

# Form Submission (if using API)
FORM_SUBMISSION_ENDPOINT=your_api_endpoint
API_KEY=your_api_key

# Email Service (if needed)
SENDGRID_API_KEY=your_sendgrid_key
```

## ⚡ Performance Optimization Checklist

- [x] Next.js automatic code splitting
- [x] Image optimization with Next.js Image component (when images added)
- [x] Font optimization with next/font
- [x] CSS optimization with Tailwind CSS
- [x] Framer Motion lazy loading
- [x] Remove console logs in production
- [ ] Enable CDN caching headers
- [ ] Set up monitoring (Vercel Analytics, Google Analytics)
- [ ] Enable compression (automatic on most platforms)

## 🔒 Security Checklist

- [x] Remove `X-Powered-By` header
- [x] React strict mode enabled
- [ ] Set up CSP (Content Security Policy) headers
- [ ] Configure CORS if API routes are added
- [ ] Enable HTTPS (handled by hosting platform)
- [ ] Set up rate limiting for form submissions

## 📊 Analytics Integration

### Google Analytics
Add to `app/layout.tsx`:

```tsx
import Script from 'next/script'

// In the component
<Script
  src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
  strategy="afterInteractive"
/>
<Script id="google-analytics" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
  `}
</Script>
```

### Vercel Analytics
```bash
npm install @vercel/analytics
```

Add to `app/layout.tsx`:
```tsx
import { Analytics } from '@vercel/analytics/react';

// Before closing </body> tag
<Analytics />
```

## 🐛 Troubleshooting

### Build Fails
- Check Node.js version (requires v18+)
- Clear `.next` folder: `rm -rf .next`
- Clear node_modules: `rm -rf node_modules && npm install`

### Styles Not Loading
- Verify Tailwind CSS is configured correctly
- Check `globals.css` is imported in `layout.tsx`

### Animations Not Working
- Ensure Framer Motion is installed: `npm install framer-motion`
- Check browser compatibility (modern browsers only)

## 📝 Pre-Deployment Checklist

- [ ] Update metadata in `app/layout.tsx`
- [ ] Add real company logos to Hero section
- [ ] Configure form submission endpoint
- [ ] Test all links
- [ ] Test on mobile devices
- [ ] Run Lighthouse audit (target: 95+ score)
- [ ] Verify all images have alt text
- [ ] Test form validation
- [ ] Check console for errors
- [ ] Set up error tracking (Sentry, LogRocket, etc.)

## 🎯 Post-Deployment

1. **DNS Configuration**: Point your domain to hosting provider
2. **SSL Certificate**: Ensure HTTPS is enabled (automatic on most platforms)
3. **Monitoring**: Set up uptime monitoring
4. **Backup**: Configure automated backups if self-hosting
5. **CDN**: Consider Cloudflare for additional performance and security

## 📧 Form Submission Setup

The contact form currently logs to console. Integrate with:

### Option A: Email Service (SendGrid)
```typescript
// app/api/contact/route.ts
import { NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function POST(request: Request) {
  const data = await request.json();
  
  await sgMail.send({
    to: 'hello@avashya.com',
    from: 'noreply@avashya.com',
    subject: `New Contact: ${data.name}`,
    text: `Name: ${data.name}\nEmail: ${data.email}\nCompany: ${data.company}\nMessage: ${data.message}`,
  });

  return NextResponse.json({ success: true });
}
```

### Option B: Form Service (Formspree, HubSpot)
Update form action in `contact-section.tsx`:
```tsx
<form action="https://formspree.io/f/your-form-id" method="POST">
```

## 🔄 Continuous Deployment

### GitHub Actions Example
```yaml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run build
      - run: npm test # if tests exist
      # Deploy step depends on hosting provider
```

## 📱 Mobile Testing URLs

Test on actual devices or simulators:
- iOS: Safari, Chrome
- Android: Chrome, Firefox, Samsung Internet
- Tablets: iPad, Android tablets

## 🎨 Brand Assets Needed

Before launch, ensure you have:
- [ ] High-resolution logo (SVG preferred)
- [ ] Favicon (16x16, 32x32, 180x180)
- [ ] Open Graph image (1200x630)
- [ ] Company logos for social proof section
- [ ] Team photos (if adding team section)

---

**Need Help?** Contact the development team or refer to [Next.js Deployment Docs](https://nextjs.org/docs/deployment)
