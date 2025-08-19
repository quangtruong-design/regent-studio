"use client";

import { BrandSection } from "@/components/BrandSection";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";
import { TeamSection } from "@/components/TermSection";

export default function Home() {
  return (
    <main className="flex overflow-hidden flex-col pb-11 bg-black">
      <HeroSection />
      <TeamSection />
      <BrandSection />
      <Footer />
    </main>
  );
}
