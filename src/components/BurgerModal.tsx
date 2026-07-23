"use client";

import { useEffect, useRef } from "react";
import CanvasSequence from "./CanvasSequence";

interface BurgerModalProps {
  isOpen: boolean;
  onClose: () => void;
  burgerName: string;
}

export default function BurgerModal({ isOpen, onClose, burgerName }: BurgerModalProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#0B0C10]">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 h-16 flex items-center justify-between px-6 z-50 bg-gradient-to-b from-[#0B0C10] to-transparent pointer-events-none">
        <h2 className="text-2xl font-bold text-white drop-shadow-md pointer-events-auto">
          {burgerName}
        </h2>
        <button
          onClick={onClose}
          className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center text-white pointer-events-auto transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* The isolated scroll container for the modal's Canvas Sequence */}
      <div 
        ref={scrollContainerRef}
        className="w-full h-full overflow-y-auto overflow-x-hidden relative"
      >
        {/* Render a separate instance of CanvasSequence bound to this scroll container */}
        <CanvasSequence scrollContainerRef={scrollContainerRef} />
        
        {/* The tall spacer to allow scrolling through the 240 frames */}
        <div className="relative z-10 w-full h-[800vh]">
           {/* We can add text overlays here inside the modal if needed, but for now we keep it pure animation */}
           <div className="h-screen flex items-center justify-center sticky top-0 pointer-events-none">
             {/* Optional: Add a subtle instruction to scroll */}
             <div className="absolute bottom-10 animate-bounce text-white/50 text-sm tracking-widest uppercase">
               Scroll to explode
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}
