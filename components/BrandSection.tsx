
"use client";

import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const services = [
  {
    icon: "🎮",
    key: "gameAssets"
  },
  {
    icon: "🎬",
    key: "cinematicTeasers"
  },
  {
    icon: "📱",
    key: "brandIdentity"
  },
  {
    icon: "⚡",
    key: "motionGraphics"
  }
];

interface BrandSectionProps {
  setIsVideoOpen: (isOpen: boolean) => void;
}

export function BrandSection({ setIsVideoOpen }: BrandSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const brandTitleRef = useRef<HTMLDivElement>(null);
  const businessTitleRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const brandTitleInView = useInView(brandTitleRef, { once: true });
  const businessTitleInView = useInView(businessTitleRef, { once: true });
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <motion.section 
      ref={sectionRef}
      className="relative min-h-screen bg-gradient-to-br from-slate-900 via-black to-slate-800 overflow-hidden"
      style={{ opacity }}
    >
      {/* Animated Background Elements */}
      <motion.div 
        className="absolute top-0 left-0 w-full h-full pattern-grid opacity-20"
        style={{ y }}
      />
      
      {/* Floating Geometric Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-20 w-32 h-32 border border-lime-400/30 rounded-2xl"
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute top-1/3 right-20 w-24 h-24 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full"
          animate={{ 
            y: [0, -30, 0],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/3 w-16 h-16 border-2 border-lime-400/50 rotate-45"
          animate={{ 
            rotate: [45, 405],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 12, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-20 py-20">
        {/* Brand Story Section */}
        <motion.div 
          ref={brandTitleRef}
          className="mb-32"
          initial={{ opacity: 0, y: 50 }}
          animate={brandTitleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 
            className="text-5xl lg:text-7xl font-black text-lime-400 mb-16 text-shadow-glow"
            initial={{ scale: 0.8 }}
            animate={brandTitleInView ? { scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {t('brand.nameDecodingTitle').split(' ')[0]} {t('brand.nameDecodingTitle').split(' ')[1]} <span className="gradient-text">{t('brand.nameDecodingTitle').split(' ')[2]}</span>
          </motion.h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Text Content */}
            <motion.div 
              className="space-y-8"
              initial={{ opacity: 0, x: -50 }}
              animate={brandTitleInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <motion.div 
                className="glass-effect p-8 rounded-3xl"
                whileHover={{ scale: 1.02, rotateY: 2 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-xl text-gray-300 leading-relaxed">
                  {t('brand.regentOrigin')}
                </p>
              </motion.div>
              
              <motion.div 
                className="glass-effect p-8 rounded-3xl"
                whileHover={{ scale: 1.02, rotateY: -2 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-xl text-gray-300 leading-relaxed">
                  {t('brand.studioDescription')}
                </p>
              </motion.div>
              
              <motion.div 
                className="glass-effect p-8 rounded-3xl"
                whileHover={{ scale: 1.02, rotateY: 2 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-xl text-gray-300 leading-relaxed">
                  {t('brand.visionStatement')}
                </p>
              </motion.div>
            </motion.div>
            
            {/* 3D Visual Element */}
            <motion.div 
              className="relative perspective-card"
              initial={{ opacity: 0, x: 50 }}
              animate={brandTitleInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <motion.div 
                className="relative"
                whileHover={{ rotateY: 10, rotateX: 5 }}
                transition={{ duration: 0.4 }}
              >
                <div className="w-full h-96 bg-gradient-to-br from-lime-400/20 to-blue-500/20 rounded-3xl glass-effect flex items-center justify-center">
                  <motion.div 
                    className="text-8xl"
                    animate={{ 
                      rotate: [0, 360],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      duration: 10, 
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  >
                    👑
                  </motion.div>
                </div>
                
                {/* Floating Elements */}
                <motion.div
                  className="absolute -top-4 -right-4 w-12 h-12 bg-lime-400 rounded-2xl opacity-80"
                  animate={{ 
                    rotate: [0, 180, 360],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ 
                    duration: 6, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <motion.div
                  className="absolute -bottom-4 -left-4 w-8 h-8 border-2 border-blue-500 rounded-full"
                  animate={{ 
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }}
                />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Business Fields Section */}
        <motion.div 
          ref={businessTitleRef}
          initial={{ opacity: 0, y: 50 }}
          animate={businessTitleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.h3 
            className="text-5xl lg:text-7xl font-black text-lime-400 mb-16 text-shadow-glow"
            initial={{ scale: 0.8 }}
            animate={businessTitleInView ? { scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {t('brand.businessFieldTitle').split(' ')[0]} <span className="gradient-text">{t('brand.businessFieldTitle').split(' ')[1]}</span>
          </motion.h3>
          
          {/* Services Grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={businessTitleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {services.map((service, index) => (
              <motion.div
                key={service.key}
                className="glass-effect p-6 rounded-2xl text-center hover-lift"
                initial={{ opacity: 0, y: 50 }}
                animate={businessTitleInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                whileHover={{ 
                  scale: 1.05,
                  rotateY: 5,
                  boxShadow: "0 25px 50px rgba(163, 230, 53, 0.2)"
                }}
              >
                <motion.div 
                  className="text-4xl mb-4"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, 0]
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.5
                  }}
                >
                  {service.icon}
                </motion.div>
                <h4 className="text-xl font-bold text-white mb-3">{t(`brand.services.${service.key}.title`)}</h4>
                <p className="text-gray-400 text-sm leading-relaxed">{t(`brand.services.${service.key}.description`)}</p>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Detailed Description */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, x: -50 }}
              animate={businessTitleInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <div className="glass-effect p-8 rounded-3xl">
                <h4 className="text-2xl font-bold text-lime-400 mb-4">{t('brand.gamingExcellence.title')}</h4>
                <p className="text-lg text-gray-300 leading-relaxed">
                  {t('brand.gamingExcellence.description')}
                </p>
              </div>
            </motion.div>
            
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, x: 50 }}
              animate={businessTitleInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <div className="glass-effect p-8 rounded-3xl">
                <h4 className="text-2xl font-bold text-lime-400 mb-4">{t('brand.creativeVision.title')}</h4>
                <p className="text-lg text-gray-300 leading-relaxed">
                  {t('brand.creativeVision.description')}
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          className="text-center mt-20"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <motion.a
            href="#contact"
            className="btn-modern inline-block text-lg px-12 py-4 mr-4"
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(163, 230, 53, 0.4)" }}
            whileTap={{ scale: 0.95 }}
          >
            {t('buttons.startYourProject')}
          </motion.a>
          
          <motion.button
            onClick={() => setIsVideoOpen(true)}
            className="glass-effect px-12 py-4 rounded-xl text-white font-semibold hover-lift text-lg inline-block"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {t('buttons.viewOurWork')}
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  );
}
