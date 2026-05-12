# Quick Start Guide

## Test the Website Locally

### Windows
```bash
cd static-site
launch.bat
```

### Mac/Linux
```bash
cd static-site
./launch.sh
```

### Manual
```bash
cd static-site
python -m http.server 8080
# Open http://localhost:8080 in browser
```

## Test the Demo Modal

1. Open the website
2. Click "Request Platform Demo" button (in hero section)
   - OR click "Get Started" button (in navigation)
3. Fill out the form
4. Click "Request Demo" button
5. Check browser console (F12) to see logged data
6. Verify success message appears
7. Confirm modal closes automatically

## Connect to Your Backend

Edit `js/main.js` around line 70:

```javascript
// Replace this:
console.log('Demo request submitted:', formData);

// With this:
fetch('https://your-api.com/api/demo-request', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
})
.then(response => response.json())
.then(data => {
    alert(`Thank you, ${formData.firstName}!`);
    demoForm.reset();
    closeDemoModal();
})
.catch(error => {
    alert('Error submitting form. Please try again.');
});
```

## Deploy to Production

### GitHub Pages (Free)
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/avashya.git
git push -u origin main
```
Then enable Pages in repo settings.

### Netlify (Easiest)
1. Go to netlify.com
2. Drag the `static-site` folder
3. Done! Site is live

### Vercel
```bash
npm i -g vercel
cd static-site
vercel
```

## Customize

### Change Colors
Edit `css/styles.css` - lines 8-32 (CSS variables)

### Change Logo
Replace `assets/images/logo.png`

### Change Content
Edit `index.html` - all text is clearly labeled

### Change Form Fields
Edit `index.html` - lines 897-1028 (modal form)

## Files Structure

```
static-site/
├── index.html              # Main website
├── css/
│   └── styles.css          # All styles
├── js/
│   └── main.js            # Interactive features
├── assets/
│   └── images/
│       └── logo.png       # Your logo
├── README.md              # Full documentation
├── DEMO_MODAL_FEATURE.md  # Modal details
└── QUICK_START.md         # This file
```

## Button Locations

Demo modal opens from:
1. **Hero section**: "Request Platform Demo" (line 107)
2. **Desktop nav**: "Get Started" (line 28)
3. **Mobile nav**: "Get Started" (line 50)

## Form Fields Collected

1. First Name *
2. Last Name *
3. Work Email *
4. Company *
5. Engineering Team Size * (dropdown)
6. Your Role * (dropdown)
7. Primary Use Case (optional)
8. Implementation Timeline * (dropdown)

\* = Required field

## Key Features

✅ Fully responsive (mobile, tablet, desktop)
✅ Demo request modal with 8-field form
✅ Contact form at bottom
✅ Smooth scroll navigation
✅ Mobile hamburger menu
✅ Scroll-triggered animations
✅ Glass morphism effects
✅ No build process needed
✅ No dependencies (except Google Fonts)

## Browser Support

✅ Chrome/Edge 90+
✅ Firefox 88+
✅ Safari 14+
✅ Mobile browsers

## File Sizes

- HTML: ~58 KB
- CSS: ~52 KB
- JS: ~6 KB
- Logo: ~145 KB
- **Total**: ~260 KB

## Need Help?

📖 Full docs: `README.md`
🎯 Modal details: `DEMO_MODAL_FEATURE.md`
🚀 Deployment: `DEPLOYMENT_GUIDE.md`
📝 Summary: `../DEMO_MODAL_COMPLETE.md`

## Next Steps

1. ✅ Test locally
2. ✅ Test demo modal
3. ⏭️ Connect form to backend
4. ⏭️ Add analytics tracking
5. ⏭️ Deploy to production
6. ⏭️ Configure custom domain
7. ⏭️ Add CAPTCHA (optional)
8. ⏭️ Set up email notifications

---

**Ready to launch!** 🚀

Your static Avashya website with demo request modal is complete and ready for production deployment.
