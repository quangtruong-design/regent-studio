"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import { ContactForm } from "./ContactForm";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useLanguage } from "../contexts/LanguageContext";
import React from "react";

// Separate Logo Component with hover functionality
function LogoComponent() {
  const [isLogoHovered, setIsLogoHovered] = useState(false);

  return (
    <motion.div
      className="px-6 py-3 rounded-2xl"
      whileHover={{
        scale: 1.05,
        borderColor: "rgba(162, 255, 0, 0.3)",
        transition: { duration: 0.3 },
      }}
      onHoverStart={() => setIsLogoHovered(true)}
      onHoverEnd={() => setIsLogoHovered(false)}
    >
      <motion.div
        animate={{
          filter: isLogoHovered
            ? "brightness(1.2) drop-shadow(0 0 20px rgba(162, 255, 0, 0.8))"
            : "brightness(1) drop-shadow(0 0 10px rgba(162, 255, 0, 0.3))",
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
  );
}

interface HeroSectionProps {
  isVideoOpen: boolean;
  setIsVideoOpen: (isOpen: boolean) => void;
  onOpenAbout?: () => void;
}

export function HeroSection({ isVideoOpen, setIsVideoOpen, onOpenAbout }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHeaderSticky, setIsHeaderSticky] = useState(false);
  const { t } = useLanguage();

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.3]);

  const isInView = useInView(titleRef, { once: true, margin: "-100px" });

  // Handle sticky header on scroll
  React.useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsHeaderSticky(scrollTop > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle keyboard events for menu and video modal closing
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (isMenuOpen) {
          setIsMenuOpen(false);
        }
        if (isVideoOpen) {
          setIsVideoOpen(false);
        }
      }
    };

    if (isMenuOpen || isVideoOpen) {
      document.addEventListener('keydown', handleKeyDown);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen, isVideoOpen]);

  return (
    <>
      {/* Header - Absolute Top Layer */}
      <motion.header
        className={`absolute top-0 left-0 right-0 z-[9999] ${
          isHeaderSticky
            ? "fixed top-0 backdrop-blur-md border-b border-lime-400/20"
            : ""
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Header Background Extension - Covers entire top area */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-transparent h-40 -top-32"></div>

        {/* Header Content with proper top padding */}
        <div className="pt-8 pb-4">
          <div className="flex justify-between items-center max-w-7xl mx-auto px-6 lg:px-20 relative z-10">
            {/* Logo Component - Separate hover functionality */}
            <LogoComponent />

            <nav className="hidden md:flex items-center space-x-8">
              {[t("nav.information"), t("nav.team"), t("nav.portfolio")].map(
                (item, index) => (
                  <motion.a
                    key={item}
                    href={`#${item.toLowerCase().replace(" ", "-")}`}
                    className="text-white hover:text-lime-400 transition-colors duration-300 font-medium"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    whileHover={{ y: -2 }}
                  >
                    {item}
                  </motion.a>
                )
              )}
            </nav>

            {/* Language Switcher */}
            <div className="hidden md:block">
              <LanguageSwitcher />
            </div>

            {/* Mobile Language Switcher */}
            <div className="md:hidden">
              <LanguageSwitcher />
            </div>

            <motion.button
              onClick={() => setIsMenuOpen(true)}
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
        </div>
      </motion.header>

      <motion.section
        ref={sectionRef}
        className="relative flex overflow-hidden flex-col items-center min-h-screen w-full"
        style={{ opacity }}
      >
        {/* Animated Background - Base Layer */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-slate-900 via-black to-slate-800 z-0"
          style={{ y: y1 }}
        />

        {/* Floating Element Particles - Background Layer */}
        <div className="absolute inset-0 overflow-hidden z-10">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute opacity-20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${20 + Math.random() * 30}px`,
                height: `${20 + Math.random() * 30}px`,
              }}
              initial={{
                scale: Math.random() * 0.3 + 0.2,
                rotate: Math.random() * 360,
              }}
              animate={{
                y: [0, -40, 0],
                scale: [null, 1.2, 1],
                rotate: [null, 360],
              }}
              transition={{
                duration: 6 + Math.random() * 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 4,
              }}
            >
              <Image
                src="/images/element.svg"
                alt="Design Element"
                width={50}
                height={50}
                className="w-full h-full filter drop-shadow-lg"
                style={{ filter: "brightness(1.2) saturate(1.1)" }}
              />
            </motion.div>
          ))}
        </div>

        {/* Hero Content - Main Content Layer */}
        <div className="relative z-20 flex flex-col items-center justify-center min-h-screen px-6 lg:px-20">
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
              {t("hero.title")}
              <br />
              <span className="gradient-text">{t("hero.subtitle")}</span>
            </motion.h1>

            <motion.p
              className="text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
              initial={{ y: 50, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {t("hero.description")}
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
                {t("buttons.getInTouch")}
              </motion.button>

              <motion.a
                href="#portfolio"
                className="glass-effect px-12 py-4 rounded-xl text-white font-semibold hover-lift text-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t("nav.portfolio")}
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Floating 3D Elements - Decorative Layer */}
          <div className="absolute inset-0 pointer-events-none z-30">
            <motion.div
              className="absolute top-1/4 left-1/4 w-24 h-24 glass-effect rounded-2xl opacity-40"
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "linear",
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
                ease: "easeInOut",
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
                ease: "easeInOut",
              }}
            />
          </div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            <motion.div
              className="flex flex-col items-center text-white"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="text-sm font-medium mb-2">
                {t("buttons.scrollToExplore")}
              </span>
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
      </motion.section>

      {/* Menu Modal */}
      {isMenuOpen && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={() => setIsMenuOpen(false)}
        >
          {/* Background Glow Effects */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Upper Left Glow */}
            <div className="absolute top-20 left-20 w-96 h-96 bg-white/10 rounded-full blur-3xl" />

            {/* Upper Middle Glow */}
            <div className="absolute top-32 left-1/2 transform -translate-x-1/2 w-80 h-80 bg-white/5 rounded-full blur-3xl" />

            {/* Upper Right Glow - Neon Green */}
            <div className="absolute top-16 right-16 w-[500px] h-[500px] bg-lime-400/20 rounded-full blur-3xl" />

            {/* Lower Left Glow - Neon Green */}
            <div className="absolute bottom-32 left-16 w-64 h-64 bg-lime-400/15 rounded-full blur-3xl" />
          </div>

          {/* Close Button - Outside content wrapper to ensure it works */}
          <div className="absolute top-8 right-8 z-20">
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                setIsMenuOpen(false);
              }}
              className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors cursor-pointer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </motion.button>
          </div>

          {/* Content Wrapper - Prevents closing when clicking content */}
          <div
            className="relative z-10 h-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Menu Items - Left Aligned */}
            <div className="relative z-10 flex items-center min-h-screen pl-20">
              <motion.div
                className="space-y-12"
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {[
                  t("menu.home"),
                  t("menu.aboutUs"),
                  t("menu.products"),
                  t("menu.team"),
                  t("menu.contact"),
                  t("menu.ourGame"),
                ].map((item, index) => (
                  <motion.div
                    key={item}
                    className="relative group pb-4"
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  >
                    <motion.button
                      className="block text-4xl font-bold text-white hover:text-lime-400 transition-colors duration-500 cursor-pointer text-left relative"
                      onClick={() => {
                        if (item === t("menu.products")) {
                          setIsVideoOpen(true);
                        }
                        if (item === t("menu.aboutUs")) {
                          if (onOpenAbout) onOpenAbout();
                        }
                        if (item === t("menu.home")) {
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }
                        if (item === t("menu.team")) {
                          const target = document.getElementById('team');
                          if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                        if (item === t("menu.contact")) {
                          setIsContactOpen(true);
                        }
                        setIsMenuOpen(false);
                      }}
                      whileHover={{ x: 20, scale: 1.05 }}
                    >
                      {item}
                    </motion.button>

                    {/* Animated Underline - Using CSS hover instead of Framer Motion */}
                    <div
                      className="absolute bottom-0 left-0 right-0 h-1 bg-lime-400 origin-left z-20 rounded-full transform scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"
                      style={{
                        boxShadow: "0 0 10px rgba(132, 204, 22, 0.8)",
                        filter: "brightness(1.2)",
                      }}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Graphic Elements - Bottom Right */}
            <div className="absolute bottom-8 right-32 z-10">
              <div className="flex items-center space-x-2">
                {/* Left X - Solid Green */}
                <motion.div
                  className="w-8 h-8 bg-lime-400 rounded-sm flex items-center justify-center"
                  initial={{ scale: 0, rotate: 0 }}
                  animate={{
                    scale: 1,
                    rotate: [0, 360],
                  }}
                  transition={{
                    scale: { duration: 0.6, delay: 0.8 },
                    rotate: {
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear",
                      delay: 0.8,
                    },
                  }}
                >
                  <span className="text-black font-bold text-lg">×</span>
                </motion.div>

                {/* Middle X - Outline Green */}
                <motion.div
                  className="w-8 h-8 border-2 border-lime-400 rounded-sm flex items-center justify-center relative"
                  initial={{ scale: 0, rotate: 0 }}
                  animate={{
                    scale: 1,
                    rotate: [0, 360],
                  }}
                  transition={{
                    scale: { duration: 0.6, delay: 0.9 },
                    rotate: {
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear",
                      delay: 0.9,
                    },
                  }}
                >
                  <span className="text-lime-400 font-bold text-lg">×</span>
                </motion.div>

                {/* Right X - Solid Green */}
                <motion.div
                  className="w-8 h-8 bg-lime-400 rounded-sm flex items-center justify-center"
                  initial={{ scale: 0, rotate: 0 }}
                  animate={{
                    scale: 1,
                    rotate: [0, 360],
                  }}
                  transition={{
                    scale: { duration: 0.6, delay: 1.0 },
                    rotate: {
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear",
                      delay: 1.0,
                    },
                  }}
                >
                  <span className="text-black font-bold text-lg">×</span>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Video Modal - Absolute Top Layer */}
      {isVideoOpen && (
        <motion.div 
          className="z-[9999] fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center modal-container p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div 
            className="relative w-full max-w-6xl mx-auto"
          >
            {/* Small X Close Button */}
            <motion.button
              onClick={() => setIsVideoOpen(false)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 border border-white/30 flex items-center justify-center text-white hover:bg-white/30 transition-colors cursor-pointer z-50 shadow-lg"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </motion.button>

            {/* Video Player */}
            <motion.div
              className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <video 
                className="w-full h-full object-cover" 
                autoPlay 
                loop 
                controls={false} 
                playsInline 
                preload="metadata"
              > 
                <source src="https://github.com/quangtruong-design/regent-studio/releases/download/v1.0.0/shot_1.mp4" type="video/mp4" /> 
                Your browser does not support the video tag. 
              </video>
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* Contact Form Modal - Absolute Top Layer */}
      {isContactOpen && (
        <div className="z-[9999] fixed inset-0">
          <ContactForm
            isOpen={isContactOpen}
            onClose={() => setIsContactOpen(false)}
          />
        </div>
      )}
    </>
  );
}
