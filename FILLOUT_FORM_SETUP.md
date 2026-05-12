# 🎯 Fillout Form Setup Guide

## ✅ What's Been Done

I've integrated a Fillout form modal for "Request Platform Demo" with the following features:

### Form Fields (As Requested):
1. **Name** (Required)
2. **Organization** (Required)
3. **Title** (Required)
4. **Email** (Required)
5. **Phone Number** (Optional)

### Integration Points:
- ✅ Hero section "Request Platform Demo" button
- ✅ Navigation "Get Started" button (desktop & mobile)
- ✅ Professional modal with backdrop
- ✅ Escape key & click-outside to close
- ✅ Responsive design (mobile-optimized)
- ✅ Dark theme matching website design

---

## 🔧 Setup Steps

### Step 1: Create Your Fillout Form

1. **Go to** [Fillout.com](https://fillout.com)
2. **Sign up/Login** to your account
3. **Create New Form** → "Request Platform Demo"

### Step 2: Add Form Fields

Add these fields in order:

```
1. Short text field
   - Label: "Name"
   - Placeholder: "John Doe"
   - Required: Yes

2. Short text field
   - Label: "Organization"
   - Placeholder: "Company Name"
   - Required: Yes

3. Short text field
   - Label: "Title"
   - Placeholder: "VP of Engineering"
   - Required: Yes

4. Email field
   - Label: "Email"
   - Placeholder: "john@company.com"
   - Required: Yes
   - Validation: Email format

5. Phone field
   - Label: "Phone Number"
   - Placeholder: "+1 (555) 123-4567"
   - Required: No
   - Validation: Phone format (optional)
```

### Step 3: Configure Form Settings

**Design Settings:**
- Theme: Dark (to match website)
- Primary Color: #8B5CF6 (to match brand purple)
- Background: Dark

**Submission Settings:**
- Send email notifications to: hello@avashya.com
- Thank you message: "Thank you! We'll contact you within 24 hours to schedule your demo."
- Redirect after submission: (optional) back to website

**Integration (Optional):**
- Connect to HubSpot, Salesforce, or Zapier
- Set up Slack notifications for new submissions

### Step 4: Get Your Form ID

1. After creating the form, go to **Share** tab
2. Look for the form URL: `https://forms.fillout.com/t/YOUR_FORM_ID`
3. Copy `YOUR_FORM_ID` (example: `pRLAtvCzPGus`)

### Step 5: Update the Code

Replace the placeholder form ID in these files:

**File: `components/hero-section.tsx`** (Line ~174)
```tsx
<FilloutModal
  isOpen={isDemoModalOpen}
  onClose={() => setIsDemoModalOpen(false)}
  formId="YOUR_ACTUAL_FORM_ID"  // ← Replace this
/>
```

**File: `components/navigation.tsx`** (Line ~115)
```tsx
<FilloutModal
  isOpen={isDemoModalOpen}
  onClose={() => setIsDemoModalOpen(false)}
  formId="YOUR_ACTUAL_FORM_ID"  // ← Replace this
/>
```

Or update once in `components/fillout-modal.tsx` default value.

---

## 🎨 Current Setup

The modal is already configured with:
- Dark theme parameter: `?theme=dark`
- Full-screen responsive modal
- Professional header with title and close button
- Smooth animations (fade + scale)
- Keyboard shortcuts (ESC to close)
- Body scroll lock when open

---

## 🧪 Testing

After updating the form ID:

1. **Start dev server**:
   ```bash
   npm run dev
   ```

2. **Test the modal**:
   - Click "Request Platform Demo" in hero section
   - Click "Get Started" in navigation
   - Fill out the form
   - Submit and verify email notification

3. **Test responsiveness**:
   - Desktop view (1920px+)
   - Tablet view (768px - 1024px)
   - Mobile view (320px - 767px)

4. **Test interactions**:
   - ESC key closes modal
   - Click backdrop closes modal
   - Form submission works
   - Thank you message displays

---

## 📊 View Submissions

After form is live, view submissions at:
- Fillout Dashboard: https://fillout.com/dashboard
- Email notifications (if configured)
- CRM integration (if set up)

---

## 🔒 Privacy & GDPR

Add to your form:

1. **Privacy Policy Link**:
   - Add a checkbox field
   - Label: "I agree to the Privacy Policy"
   - Required: Yes
   - Link to: your-domain.com/privacy

2. **Data Storage Message**:
   - Add description text
   - "Your information will be used solely to schedule your demo. We'll never share your data."

---

## 🚀 Advanced Features

### Email Templates
Customize the email notification in Fillout:
```
Subject: New Platform Demo Request from [Name]

Name: [Name]
Organization: [Organization]
Title: [Title]
Email: [Email]
Phone: [Phone Number]

Follow up within 24 hours!
```

### Auto-Response
Set up automatic email to submitter:
```
Subject: Your Avashya Platform Demo Request

Hi [Name],

Thank you for requesting a demo of the Avashya Intelligence Platform!

Our team will review your request and contact you at [Email] within the next 24 hours to schedule a convenient time for your personalized demo.

In the meantime, feel free to explore our website or reach out directly at hello@avashya.com.

Best regards,
The Avashya Team
```

### Webhooks
Send form data to your backend:
- Webhook URL: https://your-api.com/webhooks/fillout
- Payload: JSON with all form fields
- Use for CRM integration, analytics, etc.

---

## 📁 File Structure

```
avashya-site/
├── components/
│   ├── fillout-modal.tsx       # NEW - Modal component
│   ├── hero-section.tsx        # UPDATED - Added modal trigger
│   └── navigation.tsx          # UPDATED - Added modal trigger
```

---

## 🆘 Troubleshooting

**Modal doesn't open:**
- Check console for errors
- Verify useState is imported
- Check that button onClick is set correctly

**Form doesn't load:**
- Verify form ID is correct
- Check that form is published in Fillout
- Check iframe permissions

**Styling issues:**
- Verify dark theme parameter in URL
- Check that Tailwind classes are compiled
- Test in different browsers

**Form submissions not received:**
- Check Fillout notification settings
- Verify email address in settings
- Check spam folder

---

## 📞 Support

- **Fillout Support**: https://fillout.com/help
- **Fillout Documentation**: https://fillout.com/docs

---

**Current Status:**
- ✅ Modal component created
- ✅ Integrated with hero and navigation
- ✅ Responsive design complete
- ⏳ Waiting for your Fillout form ID
- 🎯 Ready to go live once form ID is added!
