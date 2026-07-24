"use client";

import CanvasSequence from "@/components/CanvasSequence";
import MenuSection from "@/components/MenuSection";

export default function Home() {
  return (
    <main className="relative w-full bg-white">
      {/* Absolute Top Navigation Bar (Disappears on scroll) */}
      <div className="absolute top-0 left-0 w-full pt-4 pb-6 bg-[#FFB800] z-50">
        <div className="relative z-10 flex items-center justify-between px-6 md:px-12">
          {/* Left Navigation Links (Printed / Sans-serif) */}
          <div className="hidden md:flex items-center gap-8 font-sans font-semibold text-sm tracking-widest uppercase text-[#0B0C10]">
            <a href="#" className="hover:text-white transition-colors cursor-pointer">Головна</a>
            <a href="#" className="hover:text-white transition-colors cursor-pointer">Про нас</a>
          </div>

          {/* Center Logo (Handwritten / Caveat) */}
          <div className="absolute left-1/2 -translate-x-1/2 text-5xl font-bold text-[#0B0C10] whitespace-nowrap">
            BurgerMax
          </div>

          {/* Right Navigation Links (Printed / Sans-serif) */}
          <div className="hidden md:flex items-center gap-8 font-sans font-semibold text-sm tracking-widest uppercase text-[#0B0C10]">
            <a href="#" className="hover:text-white transition-colors cursor-pointer">Меню</a>
            <a href="#" className="hover:text-white transition-colors cursor-pointer">Локації</a>
          </div>
        </div>

        {/* Bottom Wavy SVG for Navbar */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none transform translate-y-[calc(100%-1px)] -scale-y-100">
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="relative block w-full h-[40px] md:h-[60px]"
          >
            <path
              d="M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z"
              className="fill-[#FFB800]"
            ></path>
          </svg>
        </div>
      </div>

      {/* Huge Background Text */}
      <div className="fixed inset-0 w-full h-screen flex items-center justify-between z-0 pointer-events-none px-[4vw]">
        <h1 
          className="text-[12vw] md:text-[14vw] font-serif text-[#0B0C10] font-bold opacity-90 flex w-full justify-between"
          style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}
        >
          {/* Left Side: B U R */}
          <div className="flex w-[40%] justify-between">
            <span>B</span>
            <span>U</span>
            <span>R</span>
          </div>

          {/* Large Center Gap for the Burger to prevent overlap */}
          <div className="w-[20%] flex-shrink-0"></div>

          {/* Right Side: G E R */}
          <div className="flex w-[40%] justify-between">
            <span>G</span>
            <span>E</span>
            <span>R</span>
          </div>
        </h1>
      </div>

      {/* Background Canvas Sequence with mix-blend-multiply to remove white background */}
      <div className="relative z-10 mix-blend-multiply">
        <CanvasSequence />
      </div>

      {/* 
        Scrollable Content Container
        Extremely tall to allow 0-100% scroll progress mapping
        We keep the height so the scroll animation still works,
        but we removed all the text sections as requested.
      */}
      <div className="relative z-10 w-full h-[800vh]">
        {/* Empty scroll area to drive the canvas sequence */}
      </div>

      {/* The new Menu Section that slides up after the animation finishes */}
      <MenuSection />

      {/* Empty White Block to receive the bottom transition wave */}
      <section className="relative w-full min-h-[200vh] bg-white flex items-start justify-center pt-32">
         {/* Can put future content here */}
      </section>
    </main>
  );
}
