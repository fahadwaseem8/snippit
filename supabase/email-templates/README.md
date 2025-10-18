# Snippit Email Templates

Beautiful, branded email templates for Supabase authentication.

## Templates Included

### 1. **Confirm Signup** (`confirm-signup.html`)
- Terminal-style design with red/yellow/green dots
- Clean, developer-focused aesthetic
- Quick start feature list
- Professional branding

### 2. **Reset Password** (`reset-password.html`)
- Security-focused design
- Warning indicators
- Clear expiration notice
- Security best practices

## How to Use

### Step 1: Go to Supabase Dashboard
1. Navigate to your project: https://supabase.com/dashboard
2. Go to **Authentication** → **Email Templates**

### Step 2: Update Confirmation Email
1. Select **"Confirm signup"** template
2. Copy the entire contents of `confirm-signup.html`
3. Paste it into the **Message Body (HTML)** field
4. Update the **Subject** to: `Welcome to Snippit - Confirm Your Account 🧷`
5. Click **Save**

### Step 3: Update Password Reset Email
1. Select **"Reset Password"** template
2. Copy the entire contents of `reset-password.html`
3. Paste it into the **Message Body (HTML)** field
4. Update the **Subject** to: `Reset Your Snippit Password 🔐`
5. Click **Save**

## Features

✅ **Terminal-Style Design** - Matches your app's aesthetic with terminal dots and monospace fonts  
✅ **Dark Theme** - Beautiful dark background with proper contrast  
✅ **Responsive** - Works perfectly on mobile and desktop  
✅ **Professional** - Clean, modern design that builds trust  
✅ **Branded** - Includes Snippit logo, colors, and messaging  
✅ **Secure** - Clear security warnings and expiration notices  

## Variables Used

Supabase automatically replaces these variables:
- `{{ .ConfirmationURL }}` - The confirmation/reset link
- `{{ .SiteURL }}` - Your site URL
- `{{ now.Year }}` - Current year for copyright

## Customization

Feel free to modify:
- Colors and styling
- Copy and messaging
- Logo and branding
- Footer links
- Security warnings

## Preview

The emails include:
- 🧷 Snippit branding
- Terminal-style header with colored dots
- Code-block style content areas
- Clear call-to-action buttons
- Security notices
- Professional footer
- GitHub and website links

---

**Note:** Make sure your SMTP is configured in Supabase for emails to be sent!
