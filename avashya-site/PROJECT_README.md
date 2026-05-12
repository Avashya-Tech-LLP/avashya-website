# Avashya Website

High-performance, professional static website for Avashya - specializing in Coding Agent Optimization and AI Governance.

## 🎨 Design Philosophy

- **Visual Reference**: Mirrors Arize.com's modern enterprise/technical aesthetic
- **Content Tone**: Emulates Entelligence.ai - engineer-centric, ROI-focused, technical
- **Color Palette**: Dark theme with deep purples (#8B5CF6), electric cyan (#06B6D4), and emerald green (#10B981)
- **Typography**: Inter font family with proper weights (300-800)

## 🏗️ Architecture

### Information Architecture

1. **Hero Section** - High-impact headline with value propositions
2. **Problem Section** - "The Efficiency Gap" - addressing AI coding assistant challenges
3. **Services Section**:
   - Coding Agent Optimization (Engineering Effectiveness Index)
   - AIDLC Framework Mapping
4. **Platform Section** - Avashya Intelligence Platform with Command Center dashboard
5. **Contact Section** - Professional lead capture form
6. **Footer** - Complete site navigation and social links

### Technology Stack

- **Framework**: Next.js 15+ (App Router)
- **Styling**: Tailwind CSS with custom theme
- **Animations**: Framer Motion for smooth transitions
- **Icons**: Lucide React
- **Font**: Google Fonts (Inter)

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
avashya-site/
├── app/
│   ├── globals.css          # Global styles with custom CSS variables
│   ├── layout.tsx            # Root layout with Inter font and metadata
│   └── page.tsx              # Main page assembling all sections
├── components/
│   ├── navigation.tsx        # Sticky glassmorphism nav
│   ├── hero-section.tsx      # Hero with animated background
│   ├── problem-section.tsx   # Efficiency Gap presentation
│   ├── services-section.tsx  # Coding Agent Optimization details
│   ├── platform-section.tsx  # Intelligence Platform features
│   ├── contact-section.tsx   # Lead capture form
│   └── footer.tsx            # Site footer
└── lib/
    └── brand-config.ts       # Brand colors and typography config
```

## 🎯 Key Features

### Visual Features
- Glassmorphism UI effects
- Animated gradient orbs
- Grid backgrounds with subtle animations
- Smooth scroll behavior
- Responsive mobile design
- Framer Motion page transitions

### Content Features
- Engineering Effectiveness Index presentation
- AIDLC (AI Development Life Cycle) framework mapping
- Command Center dashboard preview
- Bento-box style platform features
- ROI-focused value propositions

## 🎨 Design System

### Colors
- Primary: #8B5CF6 (Deep Purple)
- Secondary: #06B6D4 (Electric Cyan)
- Accent: #10B981 (Emerald Green)
- Background: #0A0A0F / #111118 / #1A1A24
- Text: #FFFFFF / #A1A1AA / #71717A

### Typography
- Font Family: Inter
- Weights: 300 (Light), 400 (Regular), 500 (Medium), 600 (Semibold), 700 (Bold), 800 (Extrabold)

### Components
- Glass Effect: `backdrop-filter: blur(12px)` with subtle borders
- Gradient Text: Linear gradient from primary to secondary
- Rounded Corners: 8px-24px depending on component size

## 📊 Performance Targets

- Lighthouse Score: 95+
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.5s
- Cumulative Layout Shift: < 0.1

## 🔧 Customization

### Brand Colors
Edit `lib/brand-config.ts` to update brand colors globally.

### Content
Update component files in `components/` to modify copy and content.

### Metadata
Edit `app/layout.tsx` to update SEO metadata, Open Graph tags, etc.

## 📝 TODO / Future Enhancements

- [ ] Add actual company logos to social proof section
- [ ] Implement form submission backend (e.g., API route or third-party service)
- [ ] Add blog section if needed
- [ ] Implement analytics tracking
- [ ] Add accessibility improvements (ARIA labels, keyboard navigation)
- [ ] Create case studies page
- [ ] Add testimonials section
- [ ] Implement dark/light mode toggle (currently dark only)

## 🤝 Contributing

This is a proprietary project for Avashya. Contact the development team for contribution guidelines.

## 📄 License

Proprietary - All rights reserved by Avashya.
