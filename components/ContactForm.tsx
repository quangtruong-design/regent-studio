"use client";

import { motion } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG } from '@/lib/emailjs-config';

interface ContactFormProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  from_name: string;
  from_email: string;
  message: string;
}

interface FormErrors {
  from_name?: string;
  from_email?: string;
  message?: string;
}

export function ContactForm({ isOpen, onClose }: ContactFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState<FormData>({
    from_name: '',
    from_email: '',
    message: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
  }, []);



  // Email validation function
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Form validation function
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Name validation
    if (!formData.from_name.trim()) {
      newErrors.from_name = 'Name is required';
    } else if (formData.from_name.trim().length < 2) {
      newErrors.from_name = 'Name must be at least 2 characters';
    }

    // Email validation
    if (!formData.from_email.trim()) {
      newErrors.from_email = 'Email is required';
    } else if (!validateEmail(formData.from_email)) {
      newErrors.from_email = 'Please enter a valid email address';
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    } else if (formData.message.trim().length > 1000) {
      newErrors.message = 'Message must be less than 1000 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

             try {
      // Send the main contact form email using send() method
      const mainEmailData = {
        name: formData.from_name, // Template expects {{name}}
        email: formData.from_email, // Template expects {{email}} for reply_to
        message: formData.message, // Template expects {{message}}
        title: 'New Contact Form Submission', // Template expects {{title}} for subject
        time: new Date().toLocaleString(), // Template expects {{time}}
      };
      
      await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        mainEmailData,
        EMAILJS_CONFIG.PUBLIC_KEY
      );

      // Send auto-reply email to the user
      const autoReplyData = {
        name: formData.from_name,
        email: formData.from_email, // This will be used as the recipient
      };
      
      await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.AUTO_REPLY_TEMPLATE_ID,
        autoReplyData,
        EMAILJS_CONFIG.PUBLIC_KEY
      );
      
      setSubmitStatus('success');
      setFormData({ from_name: '', from_email: '', message: '' });
      setErrors({});
      
      setTimeout(() => {
        onClose();
        setSubmitStatus('idle');
      }, 3000);
      
             } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={onClose}
      />

      {/* Modal */}
      <motion.div
        className="relative w-full max-w-lg glass-effect rounded-2xl p-6"
        initial={{ scale: 0.8, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 50 }}
        transition={{ type: "spring", duration: 0.5 }}
      >
        {/* Close Button */}
        <motion.button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full glass-effect hover-lift cursor-pointer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <span className="text-white text-lg">×</span>
        </motion.button>

        {/* Header */}
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl lg:text-3xl font-black text-white mb-3">
            Let&apos;s Create <span className="gradient-text">Together</span>
          </h2>
          <p className="text-gray-300 text-base">
            Ready to bring your vision to life?
          </p>
        </motion.div>

        {/* Form */}
        <motion.form
          ref={formRef}
          onSubmit={handleSubmit}
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
                 >
           <div className="grid grid-cols-1 gap-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <label htmlFor="from_name" className="block text-white font-medium mb-1 text-sm">
                Full Name *
              </label>
              <input
                type="text"
                id="from_name"
                name="from_name"
                value={formData.from_name}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white placeholder-gray-400 focus:outline-none transition-colors text-sm ${
                  errors.from_name 
                    ? 'border-red-400 focus:border-red-400' 
                    : 'border-white/20 focus:border-lime-400'
                }`}
                placeholder="John Doe"
              />
              {errors.from_name && (
                <motion.p
                  className="text-red-400 text-xs mt-1"
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {errors.from_name}
                </motion.p>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <label htmlFor="from_email" className="block text-white font-medium mb-1 text-sm">
                Email Address *
              </label>
              <input
                type="email"
                id="from_email"
                name="from_email"
                value={formData.from_email}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white placeholder-gray-400 focus:outline-none transition-colors text-sm ${
                  errors.from_email 
                    ? 'border-red-400 focus:border-red-400' 
                    : 'border-white/20 focus:border-lime-400'
                }`}
                placeholder="john@example.com"
              />
              {errors.from_email && (
                <motion.p
                  className="text-red-400 text-xs mt-1"
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {errors.from_email}
                </motion.p>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <label htmlFor="message" className="block text-white font-medium mb-1 text-sm">
                Project Details *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={4}
                className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white placeholder-gray-400 focus:outline-none resize-none text-sm ${
                  errors.message 
                    ? 'border-red-400 focus:border-red-400' 
                    : 'border-white/20 focus:border-lime-400'
                }`}
                placeholder="Tell us about your project..."
              />
              {errors.message && (
                <motion.p
                  className="text-red-400 text-xs mt-1"
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {errors.message}
                </motion.p>
              )}
            </motion.div>
          </div>

          {/* Submit Button */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className={`btn-modern px-8 py-3 text-base ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              whileHover={!isSubmitting ? { scale: 1.05 } : {}}
              whileTap={!isSubmitting ? { scale: 0.95 } : {}}
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin mr-3" />
                  Sending...
                </span>
              ) : (
                'Send Message'
              )}
            </motion.button>

            {/* Status Messages */}
            {submitStatus === 'success' && (
              <motion.p
                className="text-lime-400 mt-4 font-medium"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                ✅ Message sent successfully! Check your email for confirmation.
              </motion.p>
            )}

            {submitStatus === 'error' && (
              <motion.p
                className="text-red-400 mt-4 font-medium"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                ❌ Failed to send message. Please try again or contact us directly.
              </motion.p>
            )}
          </motion.div>
        </motion.form>

        {/* Contact Info */}
        <motion.div
          className="mt-6 pt-4 border-t border-white/20 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          <p className="text-gray-400 mb-3 text-sm">
            Or reach us directly:
          </p>
          <div className="flex flex-col justify-center items-center space-y-2 text-sm">
            <a
              href="mailto:contact@regentstudio.com"
              className="text-lime-400 hover:text-white transition-colors"
            >
              📧 contact@regentstudio.com
            </a>
            <a
              href="tel:+1234567890"
              className="text-lime-400 hover:text-white transition-colors"
            >
              📞 +84 (794) 234-327
            </a>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
