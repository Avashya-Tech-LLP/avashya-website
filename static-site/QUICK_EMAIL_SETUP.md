# Quick Email Setup - 5 Minutes

## What You Need

Just 3 pieces of information from EmailJS:
1. **Public Key** (Your account key)
2. **Service ID** (Your Gmail connection)
3. **Template ID** (Your email template)

## Step-by-Step Setup

### 1. Sign Up for EmailJS (1 minute)
- Go to: https://www.emailjs.com/
- Click "Sign Up" (FREE)
- Verify your email

### 2. Connect Gmail (2 minutes)
- Dashboard → "Email Services" → "Add New Service"
- Choose "Gmail"
- Click "Connect Account"
- Sign in with: **varun.k@avashya.tech**
- Copy the **Service ID** (e.g., `service_abc123`)

### 3. Create Email Template (2 minutes)
- Dashboard → "Email Templates" → "Create New Template"
- **Template Name:** Demo Request
- **To Email:** varun.k@avashya.tech
- **Subject:** New Demo Request from {{from_name}} ({{company}})
- **Body:** (Copy from template below)
- Save and copy the **Template ID** (e.g., `template_xyz789`)

### 4. Get Your Public Key (30 seconds)
- Click your profile (top right)
- Go to "Account"
- Copy the **Public Key** (e.g., `AbCdEfGhIjKlMnOp`)

### 5. Update Your Code (1 minute)
Open `static-site/js/main.js` and replace:

**Line 53-55:**
```javascript
emailjs.init({
    publicKey: "YOUR_PUBLIC_KEY", // ← Replace this
});
```

**Line 88:**
```javascript
emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', emailParams)
//           ↑ Replace these ↑
```

**With your actual values:**
```javascript
emailjs.init({
    publicKey: "AbCdEfGhIjKlMnOp", // Your real public key
});

emailjs.send('service_abc123', 'template_xyz789', emailParams)
```

### 6. Test! (1 minute)
- Open `index.html`
- Click "Request Platform Demo"
- Fill form and submit
- Check varun.k@avashya.tech inbox!

## Email Template to Copy

Use this in EmailJS template content:

```html
<h2>🎯 New Platform Demo Request</h2>

<h3>Contact Information</h3>
<table style="border-collapse: collapse; width: 100%;">
  <tr>
    <td style="padding: 8px; border: 1px solid #ddd;"><strong>Name</strong></td>
    <td style="padding: 8px; border: 1px solid #ddd;">{{from_name}}</td>
  </tr>
  <tr>
    <td style="padding: 8px; border: 1px solid #ddd;"><strong>Email</strong></td>
    <td style="padding: 8px; border: 1px solid #ddd;"><a href="mailto:{{from_email}}">{{from_email}}</a></td>
  </tr>
  <tr>
    <td style="padding: 8px; border: 1px solid #ddd;"><strong>Company</strong></td>
    <td style="padding: 8px; border: 1px solid #ddd;">{{company}}</td>
  </tr>
</table>

<h3>Details</h3>
<table style="border-collapse: collapse; width: 100%;">
  <tr>
    <td style="padding: 8px; border: 1px solid #ddd;"><strong>Team Size</strong></td>
    <td style="padding: 8px; border: 1px solid #ddd;">{{team_size}} engineers</td>
  </tr>
  <tr>
    <td style="padding: 8px; border: 1px solid #ddd;"><strong>Role</strong></td>
    <td style="padding: 8px; border: 1px solid #ddd;">{{role}}</td>
  </tr>
  <tr>
    <td style="padding: 8px; border: 1px solid #ddd;"><strong>Timeline</strong></td>
    <td style="padding: 8px; border: 1px solid #ddd;">{{timeline}}</td>
  </tr>
</table>

<h3>Use Case</h3>
<div style="padding: 12px; background: #f5f5f5; border-left: 4px solid #8B5CF6;">
  {{use_case}}
</div>

<hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;">

<p style="color: #666; font-size: 12px;">
  📧 Reply to: <a href="mailto:{{reply_to}}">{{reply_to}}</a><br>
  🌐 Submitted from Avashya Website - Demo Request Form<br>
  📅 {{date}}
</p>
```

## What Happens After Setup?

✅ User fills demo request form  
✅ Email automatically sent to varun.k@avashya.tech  
✅ Email includes all form details  
✅ Reply-to set to user's email (easy to respond)  
✅ User sees success message  
✅ Form resets and closes  

## Free Tier Limits

✅ 200 emails per month (FREE)  
✅ More than enough for a landing page  
✅ Upgrade to 1,000/month for $7 if needed  

## Troubleshooting

**Email not sending?**
1. Check browser console (F12) for errors
2. Verify all 3 IDs are correct
3. Make sure Gmail is connected in EmailJS
4. Check EmailJS dashboard for logs

**Can't find Public Key?**
- EmailJS Dashboard → Your Name (top right) → Account → Public Key

**Want to test without form?**
```javascript
// Run in browser console:
emailjs.send('your_service_id', 'your_template_id', {
    to_email: 'varun.k@avashya.tech',
    from_name: 'Test User',
    from_email: 'test@example.com',
    company: 'Test Company',
    team_size: '11-50',
    role: 'Engineering Leader',
    use_case: 'Testing the email system',
    timeline: '1-3-months'
});
```

## Visual Guide

```
┌─────────────────────────────────────┐
│  1. Sign up → EmailJS.com          │
│  2. Connect Gmail                   │
│  3. Create Template                 │
│  4. Get 3 IDs                      │
│  5. Update js/main.js              │
│  6. Test form!                     │
└─────────────────────────────────────┘
         ↓
┌─────────────────────────────────────┐
│  User submits form                  │
│         ↓                           │
│  Email → varun.k@avashya.tech      │
│         ↓                           │
│  You reply directly!               │
└─────────────────────────────────────┘
```

## Alternative: Use Netlify Forms (Even Easier!)

If you deploy to Netlify, you can skip EmailJS entirely:

1. Add to form in `index.html`:
```html
<form class="demo-form" id="demoForm" 
      name="demo-request" 
      method="POST" 
      data-netlify="true"
      netlify-honeypot="bot-field">
```

2. Add hidden input:
```html
<input type="hidden" name="form-name" value="demo-request">
```

3. Deploy to Netlify

4. In Netlify dashboard:
   - Forms → Settings
   - Form notifications → Add notification
   - Email notification → varun.k@avashya.tech

Done! Free 100 submissions/month.

## Summary

**Recommended Setup:** EmailJS (what we implemented)
- ✅ Works with any hosting (GitHub Pages, Netlify, Vercel, etc.)
- ✅ No backend needed
- ✅ 200 emails/month free
- ✅ 5-minute setup

**Alternative:** Netlify Forms
- ✅ Only if deploying to Netlify
- ✅ 100 submissions/month free
- ✅ 2-minute setup

**Choose EmailJS** if you want flexibility and more emails.  
**Choose Netlify Forms** if you're already on Netlify and want simplicity.

---

Need help? See detailed guide in `EMAIL_SETUP_GUIDE.md`
