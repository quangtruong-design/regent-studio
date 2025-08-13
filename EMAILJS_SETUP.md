# EmailJS Setup Guide for Regent Studio

## Steps to Configure EmailJS Contact Form

### 1. Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

### 2. Set Up Email Service
1. In your EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions
5. Note down your **Service ID**

### 3. Create Email Template
1. Go to **Email Templates** in your dashboard
2. Click **Create New Template**
3. Use this template structure:

```
Subject: New Project Inquiry from {{from_name}}

Hello Regent Studio Team,

You have received a new project inquiry:

From: {{from_name}} ({{from_email}})
Project Type: {{subject}}

Project Details:
{{message}}

Best regards,
Your Website Contact Form
```

4. Save the template and note down your **Template ID**

### 4. Get Public Key
1. Go to **Account** → **General**
2. Find your **Public Key**

### 5. Update Configuration
1. Open `lib/emailjs-config.ts`
2. Replace the placeholder values:

```typescript
export const EMAILJS_CONFIG = {
  SERVICE_ID: 'your_actual_service_id',
  TEMPLATE_ID: 'your_actual_template_id', 
  PUBLIC_KEY: 'your_actual_public_key',
};
```

### 6. Test the Contact Form
1. Run your development server: `npm run dev`
2. Click "Start Your Project" button in the hero section
3. Fill out and submit the contact form
4. Check your email for the message

## Template Variables Used
- `{{from_name}}` - Customer's name
- `{{from_email}}` - Customer's email
- `{{subject}}` - Selected project type
- `{{message}}` - Project details

## Contact Form Features
- ✅ Responsive design
- ✅ Form validation
- ✅ Loading states
- ✅ Success/error feedback
- ✅ Modal overlay
- ✅ Accessible form elements
- ✅ Professional styling with animations
