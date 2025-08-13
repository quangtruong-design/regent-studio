
"use client";

import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const services = [
  {
    icon: "🎮",
    title: "Game Assets",
    description: "Character models, environments, and VFX optimized for performance"
  },
  {
    icon: "🎬",
    title: "Cinematic Teasers",
    description: "Powerful visual narratives that captivate audiences from first glance"
  },
  {
    icon: "📱",
    title: "Brand Identity",
    description: "Compelling 3D graphics that establish strong market presence"
  },
  {
    icon: "⚡",
    title: "Motion Graphics",
    description: "Dynamic animations and effects for engaging storytelling"
  }
];

export function BrandSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const brandTitleRef = useRef<HTMLDivElement>(null);
  const businessTitleRef = useRef<HTMLDivElement>(null);
  
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
            Brand Name <span className="gradient-text">Decoding</span>
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
                  The name <span className="text-lime-400 font-bold">&ldquo;Regent&rdquo;</span> originates from the concept of a regent—a
                  temporary ruler—symbolizing authority, stature, and leadership. It
                  represents a powerful, creative entity that consistently pioneers in
                  its field, while embodying a sense of elegance, sophistication, and
                  professionalism.
                </p>
              </motion.div>
              
              <motion.div 
                className="glass-effect p-8 rounded-3xl"
                whileHover={{ scale: 1.02, rotateY: -2 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-xl text-gray-300 leading-relaxed">
                  Regent Studio is a creative studio specializing in <span className="text-lime-400 font-bold">3D graphics</span>,
                  with a core focus on producing teasers for films, games, and
                  advertisements. We don&apos;t just deliver high-quality visuals—we craft
                  powerful emotions that captivate audiences from the very first
                  second.
                </p>
              </motion.div>
              
              <motion.div 
                className="glass-effect p-8 rounded-3xl"
                whileHover={{ scale: 1.02, rotateY: 2 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-xl text-gray-300 leading-relaxed">
                  We believe that a teaser is more than just a short video—it&apos;s a
                  medium for <span className="text-lime-400 font-bold">storytelling, emotional connection, and brand expression</span>.
                  With an unlimited creative spirit, Regent Studio strives to turn
                  ideas into cinematic visual experiences.
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
            Business <span className="gradient-text">Field</span>
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
                key={service.title}
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
                <h4 className="text-xl font-bold text-white mb-3">{service.title}</h4>
                <p className="text-gray-400 text-sm leading-relaxed">{service.description}</p>
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
                <h4 className="text-2xl font-bold text-lime-400 mb-4">Gaming Excellence</h4>
                <p className="text-lg text-gray-300 leading-relaxed">
                  In the gaming sector, we provide character models, environments,
                  vehicles, weapons, and visual effects (VFX)—all built to meet
                  high-quality standards while remaining optimized for smooth
                  performance across multiple platforms.
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
                <h4 className="text-2xl font-bold text-lime-400 mb-4">Creative Vision</h4>
                <p className="text-lg text-gray-300 leading-relaxed">
                  For promotional teasers, we go beyond 3D modeling—blending motion
                  graphics, cinematic effects, and storyboard-driven scene building
                  to deliver powerful and engaging narratives that define brand identity.
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
            Start Your Project
          </motion.a>
          
          <motion.a
            href="#portfolio"
            className="glass-effect px-12 py-4 rounded-xl text-white font-semibold hover-lift text-lg inline-block"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View Our Work
          </motion.a>
        </motion.div>
      </div>
    </motion.section>
  );
}
