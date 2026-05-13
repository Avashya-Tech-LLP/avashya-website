# Avashya Website

Modern, responsive website for Avashya - AI Governance & Coding Agent Optimization platform.

## 🚀 Tech Stack

- **Framework**: Next.js 16.2.6 (App Router, Turbopack)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion 12
- **Icons**: Lucide React
- **Backend**: AWS SES (Contact Form)

## 📦 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 🎯 Features

### Sections
- ✅ Hero with animated gradients
- ✅ Problem statement (The Efficiency Gap)
- ✅ Services (Coding Agent Optimization + AWS Partner)
- ✅ Platform showcase
- ✅ Contact form with AWS SES integration
- ✅ Footer with navigation

### Functionality
- ✅ Responsive mobile design
- ✅ Smooth scroll navigation
- ✅ Working contact form with validation
- ✅ Rate limiting (5 submissions/IP/hour)
- ✅ Toast notifications
- ✅ Glassmorphism UI effects
- ✅ Framer Motion animations

## 📁 Project Structure

```
avashya-site/
├── app/
│   ├── api/contact/route.ts  # Contact form API endpoint
│   ├── globals.css           # Global styles
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Homepage
├── components/
│   ├── contact-section.tsx
│   ├── fillout-modal.tsx
│   ├── footer.tsx
│   ├── hero-section.tsx
│   ├── navigation.tsx
│   ├── platform-section.tsx
│   ├── problem-section.tsx
│   ├── services-section.tsx
│   └── toast.tsx
└── lib/
    └── brand-config.ts       # Brand configuration
```

## 🔧 Environment Variables

Create `.env.local` (already configured for dev):

```env
# AWS SES for Contact Form
SES_AWS_ACCESS_KEY_ID=your_key
SES_AWS_SECRET_ACCESS_KEY=your_secret
SES_AWS_REGION=us-east-1
SES_FROM_EMAIL=varun.k@avashya.tech
SES_TO_EMAIL=varun.k@avashya.tech
```

## 🚢 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions including:
- Environment variable setup
- AWS SES configuration
- Platform-specific guides (Vercel, Netlify, AWS Amplify)

## 🎨 Design System

### Colors
- **Primary**: `#8B5CF6` (Purple)
- **Secondary**: `#06B6D4` (Cyan)
- **Accent**: `#10B981` (Green)
- **AWS Orange**: `#FF9900`
- **Background**: `#0A0A0F`, `#111118`

### Typography
- **Font**: Inter (weights 300-800)

## 📝 Scripts

```bash
npm run dev      # Development server (Turbopack)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 🔐 Security

- Input sanitization on contact form
- Rate limiting to prevent spam
- IAM user with minimal SES permissions
- Environment variables for sensitive data

## 📄 Documentation

- **DEPLOYMENT.md** - Deployment and production configuration
- **CLAUDE.md** - Instructions for AI assistants
- **AGENTS.md** - Next.js version warnings

## 📧 Contact

Contact form submissions go to: varun.k@avashya.tech

---

Built with Next.js 16 | © 2026 Avashya
