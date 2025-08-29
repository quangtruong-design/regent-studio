"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import React from "react"; // Added missing import

interface TeamMember {
  name: string;
  image: string;
  bioKey: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Lê Quang Trường",
    image:
      "/images/lequangtruong.jpg",
    bioKey: "leQuangTruong",
  },
  {
    name: "Lê Quỳnh Như",
    image:
      "/images/nhu.jpg",
    bioKey: "leQuynhNhu",
  },
  {
    name: "Cao Trường Kha",
    image:
      "/images/kha.jpg",
    bioKey: "caoTruongKha",
  },
  {
    name: "Nguyễn Hoài Bảo",
    image:
      "/images/bao.jpg",
    bioKey: "nguyenHoaiBao",
  },
  {
    name: "Trần Văn Anh Kiệt",
    image:
      "/images/kiet.jpg",
    bioKey: "tranVanAnhKiet",
  },
  {
    name: "Châu Anh Thư",
    image:
      "/images/thu.jpg",
    bioKey: "chauAnhThu",
  },
];

interface TeamSectionProps {
  audioEnabled?: boolean;
}

export function TeamSection({ audioEnabled = false }: TeamSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const [currentMember, setCurrentMember] = useState(0);
  const [isAudioMuted, setIsAudioMuted] = useState(true);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const [showAudioPrompt, setShowAudioPrompt] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { t } = useLanguage();
  
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const titleInView = useInView(titleRef, { once: true });
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  React.useEffect(() => {
    const audio = audioRef.current;
    if (audio && audioEnabled) {
      audio.volume = 0.3;
      
      // Try autoplay first
      const attemptAutoPlay = () => {
        audio.play().then(() => {
          setIsAudioMuted(false);
          setHasUserInteracted(true);
        }).catch(() => {
          // Autoplay failed, show prompt after delay
          setTimeout(() => {
            if (!hasUserInteracted) {
              setShowAudioPrompt(true);
            }
          }, 3000);
        });
      };

      // Wait for audio to load
      if (audio.readyState >= 2) {
        attemptAutoPlay();
      } else {
        audio.addEventListener('canplaythrough', attemptAutoPlay, { once: true });
      }
    }
  }, [hasUserInteracted, audioEnabled]);

  // Keep audio playing even when audioEnabled changes (e.g., exiting fullscreen)
  React.useEffect(() => {
    const audio = audioRef.current;
    if (audio && audioEnabled && !isAudioMuted) {
      // If audio was playing and we're re-enabling, continue playing
      if (audio.paused) {
        audio.play().catch(() => {
          // Silent error handling
        });
      }
    }
  }, [audioEnabled, isAudioMuted]);



         const enableAudio = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.play().then(() => {
        setIsAudioMuted(false);
        setHasUserInteracted(true);
        setShowAudioPrompt(false);
      }).catch(() => {
        // Handle play error silently
      });
    }
  };

  const toggleAudio = () => {
    const audio = audioRef.current;
    if (audio) {
      if (isAudioMuted) {
        enableAudio();
      } else {
        audio.pause();
        setIsAudioMuted(true);
      }
    }
  };

  return (
    <motion.section 
      ref={sectionRef}
      className="relative min-h-screen bg-gradient-to-br from-gray-50 to-white overflow-hidden pattern-dots"
      id="team"
    >
             {/* Background Audio Component - Only show when audio is enabled */}
       {audioEnabled && (
         <div className="fixed bottom-8 right-8 z-[9999]">
           <audio
             ref={audioRef}
             loop
             preload="auto"
             muted={false}
             controls={false}
             className="hidden"
           >
             <source src="/audios/uplifting-inspirational-music-379534.mp3" type="audio/mpeg" />
             <source src="/audios/uplifting-inspirational-music-379534.mp3" type="audio/mpeg" />
             Your browser does not support the audio element.
           </audio>
           
           {/* Audio Toggle Button */}
           <motion.button
             onClick={toggleAudio}
             className={`px-3 py-6 flex items-center justify-center transition-all duration-300 rounded-full backdrop-blur-md bg-black/20 border border-white/20 ${
               isAudioMuted 
                 ? 'text-red-400' 
                 : 'text-lime-400'
             }`}
             whileHover={{ scale: 1.1 }}
             whileTap={{ scale: 0.95 }}
             style={{ textOrientation: 'mixed' }}
             title={isAudioMuted ? "Click to enable audio" : "Click to mute audio"}
           >
             <div className="flex flex-col items-center space-y-1">
               <span className="text-sm font-bold tracking-wider">
                 {isAudioMuted ? t('audio.off') : t('audio.on')}
               </span>
               <span className="text-xs font-medium">
                 {t('audio.sound')}
               </span>
             </div>
           </motion.button>

           {/* Audio Prompt */}
           {showAudioPrompt && (
             <motion.div
               className="absolute bottom-20 right-0 w-64 p-4 glass-effect rounded-2xl border border-lime-400/30"
               initial={{ opacity: 0, y: 20, scale: 0.8 }}
               animate={{ opacity: 1, y: 0, scale: 1 }}
               exit={{ opacity: 0, y: 20, scale: 0.8 }}
               transition={{ duration: 0.3 }}
             >
               <div className="text-center">
                 <p className="text-white text-sm mb-3">
                   Enable background music for a better experience?
                 </p>
                 <div className="flex space-x-2">
                   <motion.button
                     onClick={enableAudio}
                     className="px-4 py-2 bg-lime-400 text-black rounded-lg text-sm font-medium"
                     whileHover={{ scale: 1.05 }}
                     whileTap={{ scale: 0.95 }}
                   >
                     Enable
                   </motion.button>
                   <motion.button
                     onClick={() => setShowAudioPrompt(false)}
                     className="px-4 py-2 bg-white/10 text-white rounded-lg text-sm font-medium"
                     whileHover={{ scale: 1.05 }}
                     whileTap={{ scale: 0.95 }}
                   >
                     Later
                   </motion.button>
                 </div>
               </div>
             </motion.div>
           )}
         </div>
       )}
      {/* Background Elements */}
      <motion.div
        className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-lime-400/20 to-blue-500/20 rounded-full blur-3xl"
        style={{ y }}
      />
      <motion.div
        className="absolute bottom-20 left-20 w-64 h-64 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"
        style={{ y: useTransform(scrollYProgress, [0, 1], [-50, 50]) }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-20 py-20">
        {/* Section Title */}
        <motion.div
          ref={titleRef}
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-5xl lg:text-7xl font-black text-white mb-6"
            initial={{ scale: 0.8 }}
            animate={titleInView ? { scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {t('team.title').split(' ')[0]} <span className="gradient-text">{t('team.title').split(' ')[1]}</span>
          </motion.h2>
          <motion.p
            className="text-xl text-slate-600 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={titleInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Meet the creative minds behind our innovative 3D experiences
          </motion.p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Team Members Cards - 3x2 Grid */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member.name}
                  className={`perspective-card cursor-pointer ${
                    currentMember === index ? "scale-105" : ""
                  }`}
                  onClick={() => setCurrentMember(index)}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className={`glass-effect p-4 rounded-2xl transition-all duration-500 h-full ${
                      currentMember === index
                        ? "bg-lime-400/10 border-lime-400/50 shadow-2xl"
                        : "hover:bg-white/60"
                    }`}
                    whileHover={{ rotateY: 2, rotateX: 2 }}
                  >
                    <div className="flex flex-col items-center text-center space-y-3">
                      <motion.div
                        className="w-14 h-14 rounded-2xl bg-gradient-to-br from-lime-400 to-blue-500 flex items-center justify-center"
                        animate={currentMember === index ? { rotate: 360 } : {}}
                        transition={{ duration: 0.8 }}
                      >
                        <span className="text-white font-bold text-lg">
                          {member.name.charAt(0)}
                        </span>
                      </motion.div>
                      <div>
                        <h3 className="text-lg font-bold text-white">
                          {member.name}
                        </h3>
                        <p className="text-slate-400 font-medium text-sm mt-1">
                          {t(`team.members.${member.bioKey}`)}
                        </p>
                      </div>
                    </div>
                    
                    {/* Mobile Modal - Hidden on desktop */}
                    <motion.div
                      className="mt-4 overflow-hidden md:hidden"
                      initial={false}
                      animate={{
                        height: currentMember === index ? "auto" : 0,
                        opacity: currentMember === index ? 1 : 0
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="pt-4 border-t border-white/20">
                        {/* Member Image */}
                        <div className="relative overflow-hidden rounded-2xl mb-4">
                          <img
                            src={member.image}
                            alt={member.name}
                            className="w-full h-48 object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        </div>
                        
                        {/* Member Info */}
                        <div className="text-center mb-4">
                          <h3 className="text-2xl font-black text-white mb-2">
                            {member.name}
                          </h3>
                        </div>
                        
                        {/* Member Bio */}
                        <p className="text-slate-300 leading-relaxed text-sm text-center mb-4">
                          {t(`team.members.${member.bioKey}`)}
                        </p>
                        
                        {/* Floating Elements */}
                        <div className="relative">
                          <motion.div
                            className="absolute -top-2 -right-2 w-4 h-4 bg-lime-400 rounded-full"
                            animate={{ 
                              scale: [1, 1.2, 1],
                              rotate: [0, 180, 360]
                            }}
                            transition={{ 
                              duration: 4, 
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                          />
                          <motion.div
                            className="absolute -bottom-2 -left-2 w-3 h-3 border-2 border-blue-500 rounded-full"
                            animate={{ 
                              scale: [1, 1.3, 1],
                              opacity: [0.7, 1, 0.7]
                            }}
                            transition={{ 
                              duration: 3, 
                              repeat: Infinity,
                              ease: "easeInOut",
                              delay: 1
                            }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Featured Member Display - Hidden on mobile */}
          <motion.div 
            className="relative hidden md:block"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <motion.div
              className="relative perspective-card"
              key={currentMember}
              initial={{ opacity: 0, rotateY: 90 }}
              animate={{ opacity: 1, rotateY: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Main Image */}
              <motion.div
                className="relative overflow-hidden rounded-3xl shadow-2xl"
                whileHover={{ scale: 1.05, rotateY: 5 }}
                transition={{ duration: 0.4 }}
              >
                <img
                  src={teamMembers[currentMember].image}
                  alt={teamMembers[currentMember].name}
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Member Info Overlay */}
                <motion.div
                  className="absolute bottom-6 left-6 right-6 text-white"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <h3 className="text-3xl font-black mb-2">
                    {teamMembers[currentMember].name}
                  </h3>
                </motion.div>
              </motion.div>

              {/* Floating Elements */}
              <motion.div
                className="absolute -top-4 -right-4 w-8 h-8 bg-lime-400 rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute -bottom-4 -left-4 w-6 h-6 border-2 border-blue-500 rounded-full"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Team Stats */}
        <motion.div
          className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-8"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          {[
            { number: "1", label: "Projects Completed" },
            { number: "1", label: "Years Experience" },
            { number: "1", label: "Happy Clients" },
            { number: "100%", label: "Satisfaction Rate" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center glass-effect p-6 rounded-2xl hover-lift"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
            >
              <motion.div
                className="text-3xl lg:text-4xl font-black gradient-text mb-2"
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{
                  duration: 0.8,
                  delay: 1 + index * 0.1,
                  type: "spring",
                  bounce: 0.5,
                }}
              >
                {stat.number}
              </motion.div>
              <p className="text-slate-600 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <motion.a
            href="#member-profile"
            className="btn-modern inline-block text-lg px-12 py-4"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(163, 230, 53, 0.4)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            {t('buttons.joinOurTeam')}
          </motion.a>
        </motion.div>
      </div>
    </motion.section>
  );
}
