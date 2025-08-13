
"use client";

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ContactForm } from './ContactForm';
import Image from 'next/image';

const footerLinks = [
  {
    title: "Company",
    links: [
      { name: "About Us", href: "#about" },
      { name: "Our Team", href: "#team" },
      { name: "Careers", href: "#careers" },
      { name: "Contact", href: "#contact" }
    ]
  },
  {
    title: "Services",
    links: [
      { name: "3D Modeling", href: "#services" },
      { name: "Game Assets", href: "#services" },
      { name: "Cinematic Teasers", href: "#services" },
      { name: "Motion Graphics", href: "#services" }
    ]
  },
  {
    title: "Resources",
    links: [
      { name: "Portfolio", href: "#portfolio" },
      { name: "Case Studies", href: "#cases" },
      { name: "Blog", href: "#blog" },
      { name: "Downloads", href: "#downloads" }
    ]
  },
  {
    title: "Legal",
    links: [
      { name: "Privacy Policy", href: "#privacy" },
      { name: "Terms of Service", href: "#terms" },
      { name: "Cookie Policy", href: "#cookies" },
      { name: "GDPR", href: "#gdpr" }
    ]
  }
];

const socialLinks = [
  { name: "Instagram", href: "#", icon: "📷" },
  { name: "LinkedIn", href: "#", icon: "💼" },
  { name: "Twitter", href: "#", icon: "🐦" },
  { name: "Behance", href: "#", icon: "🎨" },
  { name: "Dribbble", href: "#", icon: "🏀" }
];

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const isInView = useInView(footerRef, { once: true, margin: "-100px" });
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isLogoHovered, setIsLogoHovered] = useState(false);

  return (
    <motion.footer 
      ref={footerRef}
      className="relative bg-gradient-to-br from-slate-900 via-black to-slate-800 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.8 }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 pattern-dots opacity-10" />
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 right-20 w-32 h-32 border border-lime-400/20 rounded-full"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-24 h-24 bg-gradient-to-br from-lime-400/10 to-blue-500/10 rounded-2xl"
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-20 py-20">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <motion.div 
            className="lg:col-span-1"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div 
              className="px-1 py-4 rounded-2xl inline-block mb-6 cursor-pointer "
              whileHover={{ 
                scale: 1.05,
                borderColor: "rgba(162, 255, 0, 0.3)",
                transition: { duration: 0.3 }
              }}
              onHoverStart={() => setIsLogoHovered(true)}
              onHoverEnd={() => setIsLogoHovered(false)}
            >
              <motion.div
                animate={{
                  filter: isLogoHovered 
                    ? "brightness(1.3) drop-shadow(0 0 15px rgba(162, 255, 0, 0.7))" 
                    : "brightness(1.1) drop-shadow(0 0 8px rgba(162, 255, 0, 0.2))"
                }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={isLogoHovered ? "/images/logo_v2.svg" : "/images/logo.svg"}
                  alt="Regent Studio Logo"
                  width={172}
                  height={37}
                  className="h-8 w-auto transition-all duration-300"
                />
              </motion.div>
            </motion.div>
            
            <p className="text-gray-400 leading-relaxed mb-6">
              Crafting powerful visual experiences through cutting-edge 3D graphics, 
              cinematic storytelling, and innovative design solutions.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  className="w-12 h-12 glass-effect rounded-xl flex items-center justify-center text-xl hover-lift"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ 
                    duration: 0.5, 
                    delay: 0.4 + index * 0.1,
                    type: "spring",
                    bounce: 0.5
                  }}
                  whileHover={{ 
                    scale: 1.1,
                    boxShadow: "0 10px 25px rgba(163, 230, 53, 0.3)"
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Footer Links */}
          {footerLinks.map((section, sectionIndex) => (
            <motion.div 
              key={section.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 + sectionIndex * 0.1 }}
            >
              <h3 className="text-xl font-bold text-white mb-6">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <motion.li 
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ 
                      duration: 0.5, 
                      delay: 0.5 + sectionIndex * 0.1 + linkIndex * 0.05 
                    }}
                  >
                    <motion.a
                      href={link.href}
                      className="text-gray-400 hover:text-lime-400 transition-colors duration-300 block"
                      whileHover={{ x: 5 }}
                    >
                      {link.name}
                    </motion.a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Newsletter Section */}
        <motion.div 
          className="glass-effect p-8 rounded-3xl mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-white mb-3">
                Stay Updated with Our Latest Projects
              </h3>
              <p className="text-gray-400">
                Get exclusive insights into our creative process and be the first to see our newest work.
              </p>
            </div>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 1 }}
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-lime-400 transition-colors"
              />
              <motion.button
                onClick={() => setIsContactOpen(true)}
                className="btn-modern px-8 py-3"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get In Touch
              </motion.button>
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div 
          className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <motion.p 
            className="text-gray-400 text-center md:text-left mb-4 md:mb-0"
            whileHover={{ color: "#a3e635" }}
          >
            © 2025 Regent Studio. All Rights Reserved
          </motion.p>
          
          <motion.div 
            className="flex items-center space-x-6"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            <span className="text-gray-400">Made with</span>
            <motion.span 
              className="text-red-500 text-xl"
              animate={{ 
                scale: [1, 1.2, 1],
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              ❤️
            </motion.span>
            <span className="text-gray-400">in Vietnam</span>
          </motion.div>
        </motion.div>
      </div>

      {/* Contact Form Modal */}
      <ContactForm 
        isOpen={isContactOpen} 
        onClose={() => setIsContactOpen(false)} 
      />
    </motion.footer>
  );
}
