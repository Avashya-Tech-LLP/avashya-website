# Email Setup Guide - EmailJS Integration

## Overview

The demo request form now sends emails to **varun.k@avashya.tech** using EmailJS when submitted. EmailJS is a free service (up to 200 emails/month) that works perfectly with static websites.

## Quick Setup (5 minutes)

### Step 1: Create EmailJS Account

1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Click "Sign Up" (it's free!)
3. Create account with your email
4. Verify your email address

### Step 2: Add Email Service (Gmail)

1. In EmailJS dashboard, click **"Email Services"**
2. Click **"Add New Service"**
3. Select **"Gmail"**
4. Click **"Connect Account"**
5. Sign in with your Gmail account (varun.k@avashya.tech)
6. Grant permissions
7. Copy the **Service ID** (looks like: `service_abc123`)

### Step 3: Create Email Template

1. In EmailJS dashboard, click **"Email Templates"**
2. Click **"Create New Template"**
3. Use this template:

**Template Name:** Demo Request Notification

**Subject:**
```
New Demo Request from {{from_name}} ({{company}})
```

**Content:**
```html
<h2>New Platform Demo Request</h2>

<h3>Contact Information</h3>
<ul>
  <li><strong>Name:</strong> {{from_name}}</li>
  <li><strong>Email:</strong> {{from_email}}</li>
  <li><strong>Company:</strong> {{company}}</li>
</ul>

<h3>Details</h3>
<ul>
  <li><strong>Engineering Team Size:</strong> {{team_size}}</li>
  <li><strong>Role:</strong> {{role}}</li>
  <li><strong>Implementation Timeline:</strong> {{timeline}}</li>
</ul>

<h3>Use Case</h3>
<p>{{use_case}}</p>

<hr>

<p><small>Submitted from Avashya Website - Demo Request Form</small></p>
<p><small>Reply to: {{reply_to}}</small></p>
```

**To Email:**
```
varun.k@avashya.tech
```

4. Click **"Save"**
5. Copy the **Template ID** (looks like: `template_xyz789`)

### Step 4: Get Public Key

1. In EmailJS dashboard, click your profile (top right)
2. Click **"Account"**
3. Find **"Public Key"** section
4. Copy the **Public Key** (looks like: `AbCdEfGhIjKlMnOp`)

### Step 5: Update Website Code

Open `js/main.js` and replace these placeholders:

```javascript
// Line ~53-55
emailjs.init({
    publicKey: "YOUR_PUBLIC_KEY", // Replace with your actual public key
});

// Line ~88
emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', emailParams)
```

**Replace with:**
```javascript
emailjs.init({
    publicKey: "AbCdEfGhIjKlMnOp", // Your actual public key
});

emailjs.send('service_abc123', 'template_xyz789', emailParams)
```

### Step 6: Test It!

1. Open `index.html` in browser
2. Click "Request Platform Demo"
3. Fill out the form
4. Submit
5. Check varun.k@avashya.tech inbox (should receive email within seconds!)

## What Gets Sent

When a user submits the demo request form, you'll receive an email with:

**Subject:** New Demo Request from John Doe (Acme Corp)

**Body includes:**
- Full name
- Email address
- Company name
- Team size
- Role
- Implementation timeline
- Use case description
- Reply-to address (user's email for easy response)

## Free Tier Limits

EmailJS Free Plan:
- ✅ 200 emails per month
- ✅ 2 email services
- ✅ 2 email templates
- ✅ EmailJS branding in footer

This is perfect for a landing page! If you need more:
- **Personal Plan**: $7/month - 1,000 emails
- **Professional Plan**: $15/month - 5,000 emails

## Alternative: Using Gmail App Password (More Secure)

For better security, use Gmail App Password instead of OAuth:

1. Go to Google Account settings
2. Security → 2-Step Verification (enable if not already)
3. Search for "App passwords"
4. Select "Mail" and device "Other (Custom name)"
5. Name it "Avashya Website"
6. Copy the 16-character password
7. In EmailJS, add Gmail service with "App Password" method
8. Use your Gmail and the app password

## Backup Option: Direct Gmail SMTP (Requires Backend)

If you prefer not to use EmailJS, you can implement a simple backend:

### Option A: Node.js Backend

Create `server.js`:
```javascript
const nodemailer = require('nodemailer');
const express = require('express');
const app = express();

app.use(express.json());

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your-email@gmail.com',
        pass: 'your-app-password'
    }
});

app.post('/api/demo-request', (req, res) => {
    const { firstName, lastName, email, company, teamSize, role, useCase, timeline } = req.body;

    const mailOptions = {
        from: 'your-email@gmail.com',
        to: 'varun.k@avashya.tech',
        replyTo: email,
        subject: `New Demo Request from ${firstName} ${lastName} (${company})`,
        html: `
            <h2>New Platform Demo Request</h2>
            <h3>Contact Information</h3>
            <ul>
                <li><strong>Name:</strong> ${firstName} ${lastName}</li>
                <li><strong>Email:</strong> ${email}</li>
                <li><strong>Company:</strong> ${company}</li>
            </ul>
            <h3>Details</h3>
            <ul>
                <li><strong>Team Size:</strong> ${teamSize}</li>
                <li><strong>Role:</strong> ${role}</li>
                <li><strong>Timeline:</strong> ${timeline}</li>
            </ul>
            <h3>Use Case</h3>
            <p>${useCase || 'Not provided'}</p>
        `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        res.json({ message: 'Email sent successfully' });
    });
});

app.listen(3000, () => console.log('Server running on port 3000'));
```

### Option B: Netlify Functions (Serverless)

Create `netlify/functions/send-demo-request.js`:
```javascript
const nodemailer = require('nodemailer');

exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    const data = JSON.parse(event.body);

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_APP_PASSWORD
        }
    });

    try {
        await transporter.sendMail({
            from: process.env.GMAIL_USER,
            to: 'varun.k@avashya.tech',
            replyTo: data.email,
            subject: `New Demo Request from ${data.firstName} ${data.lastName}`,
            html: `...` // Same template as above
        });

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Email sent successfully' })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
};
```

## Troubleshooting

### Email not sending?
1. Check browser console for errors
2. Verify all 3 IDs are correct (Public Key, Service ID, Template ID)
3. Make sure EmailJS service is connected to Gmail
4. Check EmailJS dashboard for failed sends

### "Invalid public key" error?
- Double-check you copied the entire public key
- No spaces or extra characters
- Make sure you saved the file after editing

### Emails going to spam?
1. Add sender to contacts
2. Mark as "Not spam" once
3. Set up SPF/DKIM records (advanced, see EmailJS docs)

### Rate limit exceeded?
- Free plan: 200 emails/month
- Upgrade plan if needed
- Consider adding reCAPTCHA to prevent spam

## Security Best Practices

1. **Never commit API keys** - They're in the code but public key is safe for client-side
2. **Add reCAPTCHA** - Prevent spam submissions (see CAPTCHA_SETUP.md)
3. **Rate limiting** - EmailJS has built-in rate limiting
4. **Monitor usage** - Check EmailJS dashboard regularly
5. **Email validation** - Already implemented in form

## Email Notifications Setup

Want to get notified instantly on your phone?

### Gmail Mobile App
1. Install Gmail app
2. Enable notifications for varun.k@avashya.tech
3. You'll get instant push notifications!

### Email Forwarding
1. Set up Gmail filter
2. Forward demo requests to another email
3. Or forward to Slack/Teams (use their email integration)

## Testing Checklist

- [ ] Created EmailJS account
- [ ] Connected Gmail service
- [ ] Created email template
- [ ] Got Public Key, Service ID, Template ID
- [ ] Updated js/main.js with real IDs
- [ ] Tested form submission
- [ ] Received email at varun.k@avashya.tech
- [ ] Verified all form fields appear in email
- [ ] Tested reply-to functionality
- [ ] Tested error handling (disconnect internet, try submitting)

## Email Template Variables Reference

Available variables in your EmailJS template:

| Variable | Description | Example |
|----------|-------------|---------|
| `{{from_name}}` | Full name | "John Doe" |
| `{{from_email}}` | User's email | "john@company.com" |
| `{{company}}` | Company name | "Acme Corp" |
| `{{team_size}}` | Team size | "11-50" |
| `{{role}}` | User's role | "Engineering Leader" |
| `{{use_case}}` | Use case description | "We want to..." |
| `{{timeline}}` | Implementation timeline | "1-3-months" |
| `{{reply_to}}` | Reply email | Same as from_email |

## Advanced: Multiple Email Recipients

Want to send to multiple people?

**In EmailJS template, set "To Email":**
```
varun.k@avashya.tech, team@avashya.tech, sales@avashya.tech
```

Or create multiple templates and send multiple emails in JavaScript.

## Advanced: Auto-Reply to User

Create a second template for user confirmation:

**Template ID:** `template_user_confirmation`

**To Email:** `{{to_email}}` (dynamic)

**Subject:** "Thanks for your demo request!"

**Content:**
```html
<h2>Hi {{first_name}},</h2>

<p>Thank you for requesting a demo of the Avashya Intelligence Platform!</p>

<p>We've received your request and will contact you at {{from_email}} within 24 hours to schedule your personalized walkthrough.</p>

<h3>What happens next?</h3>
<ol>
  <li>Our team will review your information</li>
  <li>We'll send you available demo time slots</li>
  <li>We'll prepare a customized demo based on your use case</li>
</ol>

<p>In the meantime, feel free to explore our <a href="https://avashya.tech">documentation</a>.</p>

<p>Best regards,<br>
The Avashya Team</p>
```

Then in `js/main.js`, send two emails:
```javascript
// Send to admin
emailjs.send('service_id', 'template_admin', emailParams);

// Send auto-reply to user
emailjs.send('service_id', 'template_user_confirmation', {
    to_email: formData.email,
    first_name: formData.firstName,
    from_email: formData.email
});
```

## Cost Comparison

| Solution | Setup Time | Monthly Cost | Pros | Cons |
|----------|------------|--------------|------|------|
| **EmailJS** (Recommended) | 5 min | $0-7 | No backend needed, instant setup | 200/month limit |
| **Netlify Forms** | 2 min | $0-19 | Very easy, built-in | 100/month limit |
| **Custom Backend** | 1-2 hours | $5-10 | Unlimited, full control | Requires server |
| **Formspree** | 3 min | $0-10 | Easy setup | 50/month limit |
| **SendGrid** | 30 min | $0-15 | Professional, 100/day free | Requires backend |

**Recommendation:** Start with EmailJS (free 200/month). Upgrade to backend solution if you exceed limits.

## Support

**EmailJS Documentation:** https://www.emailjs.com/docs/

**Issues?**
- Check EmailJS dashboard for error logs
- Test with EmailJS online tester
- Verify Gmail connection status
- Check browser console for JavaScript errors

**Need Help?**
Contact EmailJS support or check their documentation for detailed troubleshooting.

---

Your demo form will now send emails to varun.k@avashya.tech automatically! 📧✅
