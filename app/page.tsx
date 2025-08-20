"use client";

import { useState, useEffect } from "react";
import { BrandSection } from "@/components/BrandSection";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";
import { TeamSection } from "@/components/TermSection";
import { FullscreenPrompt } from "@/components/FullscreenPrompt";
import { AboutSection } from "@/components/AboutSection";

export default function Home() {
  const [isFullscreenEntered, setIsFullscreenEntered] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [hasShownPrompt, setHasShownPrompt] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  // Check if already in fullscreen on mount
  useEffect(() => {
    const checkFullscreen = () => {
      const fullscreenElement = document.fullscreenElement || 
                               (document as Document & { webkitFullscreenElement?: Element }).webkitFullscreenElement || 
                               (document as Document & { mozFullScreenElement?: Element }).mozFullScreenElement || 
                               (document as Document & { msFullscreenElement?: Element }).msFullscreenElement;
      
      if (fullscreenElement) {
        setIsFullscreenEntered(true);
        setAudioEnabled(true);
      }
    };

    checkFullscreen();
  }, []);

  const handleFullscreenEnter = () => {
    setIsFullscreenEntered(true);
    setAudioEnabled(true);
    setHasShownPrompt(true);
  };

  // Listen for fullscreen exit - but don't disable audio
  useEffect(() => {
    const handleFullscreenChange = () => {
      const fullscreenElement = document.fullscreenElement || 
                               (document as Document & { webkitFullscreenElement?: Element }).webkitFullscreenElement || 
                               (document as Document & { mozFullScreenElement?: Element }).mozFullScreenElement || 
                               (document as Document & { msFullscreenElement?: Element }).msFullscreenElement;
      
      if (!fullscreenElement && isFullscreenEntered) {
        setIsFullscreenEntered(false);
        // Keep audio enabled even when exiting fullscreen
        // setAudioEnabled(false); // Removed this line
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
    };
  }, [isFullscreenEntered]);

  return (
    <>
      {/* Fullscreen Prompt - Shows only on initial load when not in fullscreen */}
      {!isFullscreenEntered && !hasShownPrompt && (
        <FullscreenPrompt onFullscreenEnter={handleFullscreenEnter} />
      )}

      {/* Main Content - Always visible once fullscreen has been entered */}
      {(isFullscreenEntered || hasShownPrompt) && (
        <>
          <main className="flex overflow-hidden flex-col pb-11 bg-black">
            <HeroSection
              isVideoOpen={isVideoOpen}
              setIsVideoOpen={setIsVideoOpen}
              onOpenAbout={() => setIsAboutOpen(true)}
            />
            <TeamSection audioEnabled={audioEnabled} />
            <BrandSection setIsVideoOpen={setIsVideoOpen} />
            <Footer />
          </main>
          <AboutSection isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />
        </>
      )}
    </>
  );
}
