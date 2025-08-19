"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface FullscreenPromptProps {
  onFullscreenEnter: () => void;
}

export function FullscreenPrompt({ onFullscreenEnter }: FullscreenPromptProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [showContent, setShowContent] = useState(false);

  // Show content after initial animations
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 1500); // 1.5 seconds delay

    return () => clearTimeout(timer);
  }, []);

  // Check if already in fullscreen
  useEffect(() => {
    const checkFullscreen = () => {
      const fullscreenElement = document.fullscreenElement || 
                               (document as Document & { webkitFullscreenElement?: Element }).webkitFullscreenElement || 
                               (document as Document & { mozFullScreenElement?: Element }).mozFullScreenElement || 
                               (document as Document & { msFullscreenElement?: Element }).msFullscreenElement;
      
      if (fullscreenElement) {
        setIsVisible(false);
        onFullscreenEnter();
      }
    };

    checkFullscreen();
    document.addEventListener('fullscreenchange', checkFullscreen);
    document.addEventListener('webkitfullscreenchange', checkFullscreen);
    document.addEventListener('mozfullscreenchange', checkFullscreen);
    document.addEventListener('MSFullscreenChange', checkFullscreen);

    return () => {
      document.removeEventListener('fullscreenchange', checkFullscreen);
      document.removeEventListener('webkitfullscreenchange', checkFullscreen);
      document.removeEventListener('mozfullscreenchange', checkFullscreen);
      document.removeEventListener('MSFullscreenChange', checkFullscreen);
    };
  }, [onFullscreenEnter]);

  // Listen for F11 key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'F11') {
        event.preventDefault();
        enterFullscreen();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const enterFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      }
    } catch (error) {
      console.error('Error entering fullscreen:', error);
    }
  };

  const handleFullscreenClick = () => {
    enterFullscreen();
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[99999] bg-black flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Initial Loading Animation */}
        {!showContent && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Animated Logo */}
            <motion.div
              className="text-center"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, type: "spring", bounce: 0.4 }}
            >
              <motion.div
                className="text-8xl mb-6"
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                👑
              </motion.div>
              
              <motion.h1
                className="text-5xl lg:text-7xl font-black text-white mb-4"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                REGENT <span className="gradient-text">STUDIO</span>
              </motion.h1>
              
              <motion.div
                className="flex justify-center space-x-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <motion.div
                  className="w-3 h-3 bg-lime-400 rounded-full"
                  animate={{ 
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <motion.div
                  className="w-3 h-3 bg-blue-400 rounded-full"
                  animate={{ 
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.2
                  }}
                />
                <motion.div
                  className="w-3 h-3 bg-purple-400 rounded-full"
                  animate={{ 
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.4
                  }}
                />
              </motion.div>
            </motion.div>
          </motion.div>
        )}

        {/* Main Content - Only show after initial animation */}
        {showContent && (
          <>
            {/* Background Pattern */}
            <motion.div 
              className="absolute inset-0 pattern-grid opacity-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.1 }}
              transition={{ duration: 1 }}
            />
            
            {/* Floating Elements */}
            <div className="absolute inset-0 overflow-hidden">
              <motion.div
                className="absolute top-20 left-20 w-32 h-32 border border-lime-400/30 rounded-2xl"
                initial={{ scale: 0, rotate: 0 }}
                animate={{ 
                  scale: 1,
                  rotate: [0, 360]
                }}
                transition={{ 
                  scale: { duration: 0.8, delay: 0.2 },
                  rotate: { duration: 20, repeat: Infinity, ease: "linear" }
                }}
              />
              <motion.div
                className="absolute top-1/3 right-20 w-24 h-24 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full"
                initial={{ scale: 0, y: 0 }}
                animate={{ 
                  scale: 1,
                  y: [0, -30, 0],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{ 
                  scale: { duration: 0.8, delay: 0.4 },
                  y: { duration: 8, repeat: Infinity, ease: "easeInOut" },
                  opacity: { duration: 8, repeat: Infinity, ease: "easeInOut" }
                }}
              />
              <motion.div
                className="absolute bottom-1/4 left-1/3 w-16 h-16 border-2 border-lime-400/50 rotate-45"
                initial={{ scale: 0, rotate: 45 }}
                animate={{ 
                  scale: 1,
                  rotate: [45, 405]
                }}
                transition={{ 
                  scale: { duration: 0.8, delay: 0.6 },
                  rotate: { duration: 12, repeat: Infinity, ease: "easeInOut" }
                }}
              />
            </div>

            {/* Main Content */}
            <div className="relative z-10 text-center max-w-2xl mx-auto px-6">
              {/* Logo */}
              <motion.div
                className="mb-12"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="text-6xl mb-4">👑</div>
                <h1 className="text-4xl lg:text-6xl font-black text-white mb-4">
                  REGENT <span className="gradient-text">STUDIO</span>
                </h1>
                <p className="text-xl text-gray-400">
                  Professional 3D Creative Agency
                </p>
              </motion.div>

              {/* Fullscreen Prompt */}
              <motion.div
                className="glass-effect p-8 rounded-3xl mb-8"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <motion.div
                  className="text-6xl mb-6"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, 0]
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  🖥️
                </motion.div>
                
                <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                  Enter Fullscreen Mode
                </h2>
                
                <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                  For the best immersive experience, please enter fullscreen mode before exploring our creative world.
                </p>

                <div className="space-y-4">
                  {/* Fullscreen Button */}
                  <motion.button
                    onClick={handleFullscreenClick}
                    className="btn-modern text-lg px-8 py-4 w-full"
                    whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(163, 230, 53, 0.4)" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="flex items-center justify-center">
                      <span className="mr-3">🖥️</span>
                      Enter Fullscreen Mode
                    </span>
                  </motion.button>

                  {/* F11 Instructions */}
                  <div className="text-gray-400 text-sm">
                    <p>Or press <kbd className="px-2 py-1 bg-white/10 rounded text-lime-400 font-mono">F11</kbd> on your keyboard</p>
                  </div>
                </div>
              </motion.div>

              {/* Features */}
              <motion.div
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <div className="glass-effect p-6 rounded-2xl text-center">
                  <div className="text-3xl mb-3">🎵</div>
                  <h3 className="text-white font-bold mb-2">Immersive Audio</h3>
                  <p className="text-gray-400 text-sm">Background music for enhanced experience</p>
                </div>
                
                <div className="glass-effect p-6 rounded-2xl text-center">
                  <div className="text-3xl mb-3">🎨</div>
                  <h3 className="text-white font-bold mb-2">Visual Excellence</h3>
                  <p className="text-gray-400 text-sm">Optimized for fullscreen viewing</p>
                </div>
                
                <div className="glass-effect p-6 rounded-2xl text-center">
                  <div className="text-3xl mb-3">🚀</div>
                  <h3 className="text-white font-bold mb-2">Better Performance</h3>
                  <p className="text-gray-400 text-sm">Smooth animations and interactions</p>
                </div>
              </motion.div>

              {/* Footer Note */}
              <motion.p
                className="text-gray-500 text-sm mt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                Press ESC to exit fullscreen mode anytime
              </motion.p>
            </div>
          </>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
