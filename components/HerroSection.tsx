"use client";

import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import Image from 'next/image';
import { ContactForm } from './ContactForm';

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isLogoHovered, setIsLogoHovered] = useState(false);
  
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.3]);
  
  const isInView = useInView(titleRef, { once: true, margin: "-100px" });

  

  return (
    <motion.section 
      ref={sectionRef}
      className="relative flex overflow-hidden flex-col items-center min-h-screen w-full"
      style={{ opacity }}
    >
      {/* Animated Background */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-slate-900 via-black to-slate-800"
        style={{ y: y1 }}
      />
      
      {/* Floating Element Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute opacity-20 hover:opacity-40 transition-opacity duration-300"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${20 + Math.random() * 30}px`,
              height: `${20 + Math.random() * 30}px`
            }}
            initial={{ 
              scale: Math.random() * 0.3 + 0.2,
              rotate: Math.random() * 360
            }}
            animate={{
              y: [0, -40, 0],
              scale: [null, 1.2, 1],
              rotate: [null, 360]
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 4
            }}
            whileHover={{
              scale: 1.3,
              opacity: 0.6,
              transition: { duration: 0.3 }
            }}
          >
            <Image
              src="/images/element.svg"
              alt="Design Element"
              width={50}
              height={50}
              className="w-full h-full filter drop-shadow-lg"
              style={{ filter: 'brightness(1.2) saturate(1.1)' }}
            />
          </motion.div>
        ))}
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 lg:px-20">
        {/* Navigation */}
        <motion.header 
          className="absolute top-8 left-0 right-0 z-20"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="flex justify-between items-center max-w-7xl mx-auto px-6 lg:px-20">
        <motion.div
                className=" px-6 py-3 rounded-2xl cursor-pointer"
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
                      ? "brightness(1.2) drop-shadow(0 0 20px rgba(162, 255, 0, 0.8))" 
                      : "brightness(1) drop-shadow(0 0 10px rgba(162, 255, 0, 0.3))"
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src={isLogoHovered ? "/images/logo_v2.svg" : "/images/logo.svg"}
                    alt="Regent Studio Logo"
                    width={172}
                    height={37}
                    className="h-8 w-auto transition-all duration-300"
                    priority
                  />
                </motion.div>
              </motion.div>
            
            
            <nav className="hidden md:flex items-center space-x-8">
              {['INFORMATION', 'TEAM', 'PORTFOLIO'].map((item, index) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-white hover:text-lime-400 transition-colors duration-300 font-medium"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  whileHover={{ y: -2 }}
                >
                  {item}
                </motion.a>
              ))}
            </nav>
            
            <motion.button
              className="p-3 rounded-xl hover-lift"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-6 h-6 flex flex-col justify-center space-y-1">
                <div className="w-full h-0.5 bg-lime-400"></div>
                <div className="w-full h-0.5 bg-lime-400"></div>
                <div className="w-full h-0.5 bg-lime-400"></div>
              </div>
            </motion.button>
          </div>
        </motion.header>

        {/* Main Title */}
        <motion.div 
          ref={titleRef}
          className="text-center space-y-8 max-w-5xl mx-auto"
          
        >
          <motion.h1 
            className="text-6xl lg:text-8xl font-black text-white text-shadow-glow"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            CREATIVE
            <br />
            <span className="gradient-text">STUDIO</span>
          </motion.h1>
          
          <motion.p 
            className="text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ y: 50, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Crafting powerful visual experiences through cutting-edge 3D graphics, 
            cinematic storytelling, and innovative design solutions.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8"
            initial={{ y: 50, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.button
              onClick={() => setIsContactOpen(true)}
              className="btn-modern text-lg px-12 py-4 hover-lift"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Your Project
            </motion.button>
            
            <motion.a
              href="#portfolio"
              className="glass-effect px-12 py-4 rounded-xl text-white font-semibold hover-lift text-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Portfolio
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Floating 3D Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-1/4 left-1/4 w-24 h-24 glass-effect rounded-2xl opacity-40"
            
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          
          <motion.div
            className="absolute top-1/3 right-1/4 w-16 h-16 bg-gradient-to-br from-accent-lime/30 to-accent-blue/30 rounded-xl opacity-25"
           
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, -90, 0],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          <motion.div
            className="absolute bottom-1/4 left-1/3 w-12 h-12 border border-accent-lime/40 rounded-full opacity-35"
           
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.35, 0.5, 0.35],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <motion.div 
            className="flex flex-col items-center text-white"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-sm font-medium mb-2">Scroll to explore</span>
            <div className="w-6 h-10 border-2 border-lime-400 rounded-full flex justify-center">
              <motion.div 
                className="w-1 h-3 bg-lime-400 rounded-full mt-2"
                animate={{ y: [0, 16, 0], opacity: [1, 0, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Contact Form Modal */}
      <ContactForm 
        isOpen={isContactOpen} 
        onClose={() => setIsContactOpen(false)} 
      />
    </motion.section>
  );
}
