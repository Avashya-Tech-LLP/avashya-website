# Avashya Website - Static Version

A static HTML/CSS/JavaScript version of the Avashya Intelligence Platform website.

## Overview

This is a fully static website converted from the Next.js version, maintaining the same layout, design, and content. All animations and interactivity have been reimplemented using vanilla JavaScript and CSS animations.

## Features

- **Fully Responsive**: Works seamlessly on desktop, tablet, and mobile devices
- **Smooth Animations**: CSS animations and scroll-triggered effects
- **Interactive Navigation**: Smooth scrolling and mobile menu
- **Demo Request Modal**: Interactive form for scheduling platform demos
- **Contact Form**: Ready for backend integration
- **Modern Design**: Glass morphism effects, gradient text, and animated components

## File Structure

```
static-site/
├── index.html          # Main HTML file
├── css/
│   └── styles.css      # All styles and animations
├── js/
│   └── main.js         # JavaScript for interactivity
├── assets/
│   └── images/
│       └── logo.png    # Avashya logo
└── README.md           # This file
```

## Deployment

### Option 1: Simple HTTP Server

```bash
# Using Python 3
cd static-site
python -m http.server 8000

# Using Node.js
npx serve static-site

# Using PHP
cd static-site
php -S localhost:8000
```

Then open your browser to `http://localhost:8000`

### Option 2: Deploy to Any Static Host

This site can be deployed to:
- **GitHub Pages**: Push to a GitHub repo and enable Pages
- **Netlify**: Drag and drop the `static-site` folder
- **Vercel**: Deploy with `vercel static-site`
- **AWS S3**: Upload to an S3 bucket configured for static hosting
- **Cloudflare Pages**: Connect your git repo or upload files

### Example: GitHub Pages

1. Create a new repository on GitHub
2. Push the `static-site` folder contents to the repository
3. Go to Settings > Pages
4. Select the branch and root folder
5. Your site will be live at `https://yourusername.github.io/repo-name/`

### Example: Netlify

1. Sign up at netlify.com
2. Drag and drop the `static-site` folder into Netlify
3. Your site will be live instantly with a random URL
4. Configure custom domain if needed

## Customization

### Colors

Edit the CSS variables in `css/styles.css`:

```css
:root {
    --color-primary: #8B5CF6;        /* Purple */
    --color-secondary: #06B6D4;      /* Cyan */
    --color-accent: #10B981;          /* Green */
    --color-bg-primary: #0A0A0F;     /* Dark background */
    --color-text-primary: #FFFFFF;    /* White text */
    /* ... more variables */
}
```

### Content

Edit the text content directly in `index.html`. All sections are clearly labeled with comments.

### Logo

Replace `assets/images/logo.png` with your own logo. Recommended size: 80x80px or larger (will scale down).

### Demo Request Modal

The demo request modal opens when users click:
- "Request Platform Demo" button (hero section)
- "Get Started" buttons (navigation)

The form collects:
- Name (First & Last)
- Work Email
- Company
- Engineering Team Size
- Role
- Use Case (optional)
- Implementation Timeline

Currently logs to console. To integrate with a backend, edit the form handler in `js/main.js`.

### Contact Form

The contact form currently logs to console. To integrate with a backend:

1. Edit the form submission handler in `js/main.js`
2. Replace the console.log with a fetch request to your API
3. Example:

```javascript
fetch('https://your-api.com/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
})
.then(response => response.json())
.then(data => {
    alert('Thank you! We will contact you soon.');
    contactForm.reset();
})
.catch(error => {
    alert('Sorry, there was an error. Please try again.');
});
```

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- No external dependencies except Google Fonts
- Optimized CSS with minimal animations
- Lazy loading implemented via Intersection Observer
- Total page size: < 100KB (excluding images)

## Sections

1. **Hero Section**: Main headline with value propositions
2. **Problem Section**: Pain points and efficiency gaps
3. **Services Section**: Coding Agent Optimization and AIDLC Framework
4. **Platform Section**: Command Center dashboard and features
5. **Contact Section**: Contact form with process steps
6. **Footer**: Links and company information

## License

© 2026 Avashya. All rights reserved.

## Support

For questions or issues, contact hello@avashya.com
