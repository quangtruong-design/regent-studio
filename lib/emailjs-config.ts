// EmailJS Configuration
// To set up EmailJS:
// 1. Go to https://www.emailjs.com/
// 2. Create an account and get your credentials
// 3. Replace the values below with your actual EmailJS credentials

export const EMAILJS_CONFIG = {
    SERVICE_ID: 'contact_regentstudio',     // Your EmailJS service ID
    TEMPLATE_ID: 'template_bwnlyr4',   // Your EmailJS template ID for Contact Us form
    AUTO_REPLY_TEMPLATE_ID: 'template_7d1czuj', // Template ID for auto-reply
    PUBLIC_KEY: 'cH6v_gIe7Px1HTT2K',     // Your EmailJS public key
    SENDER_EMAIL: 'contactregentstudio@gmail.com', // Email address that sends the emails
};

// Template variables for main contact form:
// {{from_name}} - Sender's name
// {{from_email}} - Sender's email (user's email)
// {{message}} - Project details
// {{to_email}} - Recipient email (where you want to receive the form - your email)

// Template variables for auto-reply (using {{name}} and {{email}}):
// {{name}} - User's name
// {{email}} - User's email (recipient of auto-reply)
// Note: The template uses {{name}} and {{email}} format (with double braces)
