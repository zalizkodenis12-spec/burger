"use client";

import CanvasSequence from "@/components/CanvasSequence";
import MenuSection from "@/components/MenuSection";

export default function Home() {
  return (
    <main className="relative w-full">
      {/* Background Canvas Sequence */}
      <CanvasSequence />

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
    </main>
  );
}
