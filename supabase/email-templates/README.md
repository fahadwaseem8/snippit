# Snippit Email Templates

Beautiful, branded email templates for Supabase authentication.

## 📧 Templates Included

### 1. **Confirm Signup** (`confirm-signup.html`)
- 🧷 Terminal-style design with red/yellow/green dots
- Clean, developer-focused aesthetic
- Quick start feature list
- Professional branding with emoji logo

### 2. **Reset Password** (`reset-password.html`)
- 🔐 Security-focused design
- Warning indicators
- Clear expiration notice (1 hour)
- Security best practices listed

### 3. **Invite User** (`invite-user.html`)
- ✉️ Welcome invitation design
- Feature highlights
- Clear call-to-action
- Professional onboarding experience

### 4. **Magic Link** (`magic-link.html`)
- ✨ Passwordless login design
- Quick access aesthetic
- Security information
- Expiration notice (60 minutes)

### 5. **Change Email** (`change-email.html`)
- 📧 Email update confirmation
- Clear before/after display
- Important security warnings
- Visual FROM → TO indicator

### 6. **Reauthentication** (`reauthentication.html`)
- 🔐 2FA/verification code display
- Large, readable code format
- Security best practices
- Quick expiration (5 minutes)

## 🚀 How to Use

### Step 1: Go to Supabase Dashboard
1. Navigate to your project: https://supabase.com/dashboard
2. Go to **Authentication** → **Email Templates**

### Step 2: Update Each Template

#### Confirm Signup
1. Select **"Confirm signup"** template
2. Copy the entire contents of `confirm-signup.html`
3. Paste into **Message Body (HTML)**
4. Subject: `Welcome to Snippit - Confirm Your Account 🧷`
5. Click **Save**

#### Reset Password
1. Select **"Reset Password"** template
2. Copy the entire contents of `reset-password.html`
3. Paste into **Message Body (HTML)**
4. Subject: `Reset Your Snippit Password 🔐`
5. Click **Save**

#### Invite User
1. Select **"Invite user"** template
2. Copy the entire contents of `invite-user.html`
3. Paste into **Message Body (HTML)**
4. Subject: `You're Invited to Join Snippit! ✉️`
5. Click **Save**

#### Magic Link
1. Select **"Magic Link"** template
2. Copy the entire contents of `magic-link.html`
3. Paste into **Message Body (HTML)**
4. Subject: `Your Snippit Magic Link ✨`
5. Click **Save**

#### Change Email
1. Select **"Change Email Address"** template
2. Copy the entire contents of `change-email.html`
3. Paste into **Message Body (HTML)**
4. Subject: `Confirm Your Email Change - Snippit 📧`
5. Click **Save**

#### Reauthentication
1. Select **"Confirm reauthentication"** template (if available)
2. Copy the entire contents of `reauthentication.html`
3. Paste into **Message Body (HTML)**
4. Subject: `Your Snippit Authentication Code 🔐`
5. Click **Save**

## ✨ Features

✅ **Terminal-Style Design** - Matches your app's aesthetic with terminal dots and monospace fonts  
✅ **Dark Theme** - Beautiful dark background with proper contrast  
✅ **Responsive** - Works perfectly on mobile and desktop  
✅ **Professional** - Clean, modern design that builds trust  
✅ **Branded** - Includes Snippit logo, colors, and messaging  
✅ **Secure** - Clear security warnings and expiration notices  
✅ **Emoji Icons** - Each template has a unique emoji for visual distinction  
✅ **Code Blocks** - Developer-friendly styling with code-like elements

## 🔧 Variables Used

Supabase automatically replaces these variables:
- `{{ .ConfirmationURL }}` - The confirmation/reset/magic link
- `{{ .SiteURL }}` - Your site URL
- `{{ .Email }}` - User's current email (change-email template)
- `{{ .NewEmail }}` - User's new email (change-email template)
- `{{ .Token }}` - Authentication code (reauthentication template)
- `{{ now.Year }}` - Current year for copyright

## 🎨 Customization

Feel free to modify:
- Colors and styling (gradients, borders, backgrounds)
- Copy and messaging
- Logo and branding
- Footer links
- Security warnings
- Emoji icons
- Expiration times

## 📱 Preview

All emails include:
- 🧷 Snippit branding with emoji logo
- Terminal-style header with red/yellow/green dots
- `~/snippit/auth/[context]` path indicator
- Code-block style content areas
- Clear call-to-action buttons
- Security notices and best practices
- Professional footer with GitHub and website links
- Responsive design for all devices

## 📋 Quick Reference

| Template | Emoji | Use Case | Expiration |
|----------|-------|----------|------------|
| Confirm Signup | 🧷 | New user registration | 24 hours |
| Reset Password | 🔐 | Forgot password flow | 1 hour |
| Invite User | ✉️ | Team invitations | 24 hours |
| Magic Link | ✨ | Passwordless login | 60 minutes |
| Change Email | 📧 | Email update | 24 hours |
| Reauthentication | 🔐 | 2FA/sensitive actions | 5 minutes |

---

**⚠️ Important:** Make sure your SMTP is configured in Supabase Dashboard → Project Settings → Auth for emails to be sent!

**💡 Tip:** Test each template by triggering the respective action in your app to ensure they look perfect.
