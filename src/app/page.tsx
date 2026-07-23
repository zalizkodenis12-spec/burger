"use client";

import CanvasSequence from "@/components/CanvasSequence";
import Navbar from "@/components/Navbar";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Home() {
  const { scrollYProgress } = useScroll();

  // HERO / INTRO (0–15% scroll)
  const heroOpacity = useTransform(scrollYProgress, [0, 0.1, 0.15], [1, 1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.15], [0, -50]);

  // ENGINEERING REVEAL / CULINARY DECONSTRUCTION (15–40% scroll)
  const revealOpacity = useTransform(scrollYProgress, [0.15, 0.2, 0.35, 0.4], [0, 1, 1, 0]);
  const revealX = useTransform(scrollYProgress, [0.15, 0.2], [-50, 0]);

  // NOISE CANCELLING / FLAVOR PROFILE (40–65% scroll)
  const flavorOpacity = useTransform(scrollYProgress, [0.4, 0.45, 0.6, 0.65], [0, 1, 1, 0]);
  const flavorX = useTransform(scrollYProgress, [0.4, 0.45], [50, 0]);

  // SOUND & UPSCALING / SOURCING & CRAFT (65–85% scroll)
  const craftOpacity = useTransform(scrollYProgress, [0.65, 0.7, 0.8, 0.85], [0, 1, 1, 0]);
  const craftY = useTransform(scrollYProgress, [0.65, 0.7], [50, 0]);

  // REASSEMBLY & CTA (85–100% scroll)
  const ctaOpacity = useTransform(scrollYProgress, [0.85, 0.9, 1], [0, 1, 1]);
  const ctaY = useTransform(scrollYProgress, [0.85, 0.9], [50, 0]);

  return (
    <main className="relative w-full">
      <Navbar />
      
      {/* Background Canvas Sequence */}
      <CanvasSequence />

      {/* 
        Scrollable Content Container
        Extremely tall to allow 0-100% scroll progress mapping
      */}
      <div className="relative z-10 w-full h-[800vh]">
        
        {/* HERO / INTRO (0–15% scroll) */}
        <motion.section 
          style={{ opacity: heroOpacity, y: heroY }}
          className="h-screen fixed top-0 left-0 w-full flex items-center justify-center pointer-events-none"
        >
          {/* Ambient Glow */}
          <div className="absolute inset-0 flex items-center justify-center -z-10">
            <div className="w-[600px] h-[600px] bg-[#FF5E00]/10 blur-[120px] rounded-full mix-blend-screen" />
          </div>
          
          <div className="text-center px-4">
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-[#FFB800]/50 drop-shadow-2xl">
              THE SIGNATURE
            </h1>
            <p className="text-2xl md:text-3xl text-white/90 mb-4 font-medium tracking-tight">
              Taste, perfected.
            </p>
            <p className="text-lg md:text-xl text-white/60 max-w-lg mx-auto font-light">
              An uncompromising pursuit of flavor, crafted for the ultimate culinary experience.
            </p>
          </div>
        </motion.section>

        {/* ENGINEERING REVEAL / CULINARY DECONSTRUCTION (15–40% scroll) */}
        <motion.section 
          style={{ opacity: revealOpacity, x: revealX }}
          className="h-screen fixed top-0 left-0 w-full flex items-center justify-start px-8 md:px-24 pointer-events-none"
        >
          <div className="max-w-md text-left relative">
            <div className="absolute -inset-10 bg-[#FFB800]/5 blur-[80px] -z-10 rounded-full" />
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 drop-shadow-lg">
              Precision-crafted for the palate.
            </h2>
            <div className="space-y-4">
              <p className="text-xl text-white/60 font-light leading-relaxed drop-shadow-md">
                Artisan brioche, heirloom vegetables, and an optimized sauce-to-meat ratio deliver Michelin-grade satisfaction.
              </p>
              <p className="text-xl text-white/60 font-light leading-relaxed drop-shadow-md">
                Every layer is balanced for texture, umami, and comfort—bite after bite.
              </p>
            </div>
          </div>
        </motion.section>

        {/* NOISE CANCELLING / FLAVOR PROFILE (40–65% scroll) */}
        <motion.section 
          style={{ opacity: flavorOpacity, x: flavorX }}
          className="h-screen fixed top-0 left-0 w-full flex items-center justify-end px-8 md:px-24 pointer-events-none"
        >
          <div className="max-w-md text-right relative">
            <div className="absolute -inset-10 bg-[#FF5E00]/5 blur-[80px] -z-10 rounded-full" />
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-b from-[#FF5E00] to-[#FFB800]/80 drop-shadow-lg">
              Sensory elevation, redefined.
            </h2>
            <ul className="space-y-4 text-xl text-white/60 font-light drop-shadow-md flex flex-col items-end">
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full shadow-[0_0_8px_#FF5E00] bg-[#FF5E00]"></span>
                Hand-selected Wagyu beef.
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full shadow-[0_0_8px_#FF5E00] bg-[#FF5E00]"></span>
                Aged cheddar melted to perfection.
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full shadow-[0_0_8px_#FF5E00] bg-[#FF5E00]"></span>
                House-made truffle aioli cuts through the richness.
              </li>
            </ul>
          </div>
        </motion.section>

        {/* SOUND & UPSCALING / SOURCING & CRAFT (65–85% scroll) */}
        <motion.section 
          style={{ opacity: craftOpacity, y: craftY }}
          className="h-screen fixed top-0 left-0 w-full flex items-center justify-center pointer-events-none"
        >
          <div className="max-w-2xl text-center px-4 bg-[#15161A]/40 backdrop-blur-xl p-10 rounded-3xl border border-white/5 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden">
            <div className="absolute -inset-1/2 bg-gradient-to-br from-[#FFB800]/10 to-transparent blur-[60px] pointer-events-none" />
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-b from-[#FFB800] to-[#FF5E00]/80 drop-shadow-lg relative z-10">
              Immersive, lifelike taste.
            </h2>
            <div className="space-y-4 relative z-10">
              <p className="text-xl text-white/60 font-light leading-relaxed">
                Premium sourcing unlocks depth, richness, and texture in every bite.
              </p>
              <p className="text-xl text-white/60 font-light leading-relaxed">
                Culinary mastery elevates simple ingredients, so every flavor feels alive.
              </p>
            </div>
          </div>
        </motion.section>

        {/* REASSEMBLY & CTA (85–100% scroll) */}
        <motion.section 
          style={{ opacity: ctaOpacity, y: ctaY }}
          className="h-screen fixed top-0 left-0 w-full flex flex-col items-center justify-end pb-24 pointer-events-none"
        >
          <div className="text-center px-4 max-w-2xl pointer-events-auto relative">
            <div className="absolute -inset-20 bg-[#FF5E00]/10 blur-[100px] -z-10 rounded-full" />
            <h2 className="text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-[#FFB800]/60 drop-shadow-xl">
              Taste everything.<br />Regret nothing.
            </h2>
            <p className="text-xl text-white/60 mb-8 font-light tracking-wide">
              The Signature. Designed for indulgence, crafted for perfection.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="px-8 py-4 rounded-full text-lg font-semibold text-white drop-shadow-md bg-gradient-to-r from-[#FF5E00] to-[#FFB800] hover:scale-105 shadow-[0_0_20px_rgba(255,94,0,0.3)] hover:shadow-[0_0_30px_rgba(255,184,0,0.6)] transition-all">
                Taste The Signature
              </button>
              <button className="px-8 py-4 rounded-full text-lg font-medium text-white/90 bg-white/5 border border-white/10 hover:bg-white/10 backdrop-blur-md transition-all">
                See full ingredients
              </button>
            </div>
            <p className="mt-6 text-sm text-white/30 uppercase tracking-widest font-medium">
              Engineered for foodies, critics, and everyone in between.
            </p>
          </div>
        </motion.section>

      </div>
    </main>
  );
}
