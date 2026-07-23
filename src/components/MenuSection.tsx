"use client";

import { useState } from "react";
import BurgerModal from "./BurgerModal";

const BURGERS = [
  { id: 1, name: "Burger 1", price: "18$", folder: "/images/burger1" },
  { id: 2, name: "Burger 2", price: "24$", folder: "/images/burger2" },
  { id: 3, name: "Burger 3", price: "16$", folder: "/images/burger3" },
  { id: 4, name: "Burger 4", price: "19$", folder: "/images/burger4" },
];

export default function MenuSection() {
  const [selectedBurger, setSelectedBurger] = useState<{name: string, folder: string} | null>(null);

  return (
    <section className="relative w-full bg-[#FFB800] z-20 pb-32">
      {/* Wavy SVG Divider */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none transform -translate-y-full">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-full h-[150px]"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.47,130.83,115.3,192.73,101.4c31.33-7.14,62.33-17.65,92.93-27.16C302.26,70.52,311.53,67.8,321.39,56.44Z"
            className="fill-[#FFB800]"
          ></path>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-24 text-center">
        <h2 className="text-5xl font-bold text-[#0B0C10] mb-16 tracking-tight">
          Explore The Signature Collection
        </h2>
        
        {/* Changed to 4 columns on large screens for the 4 items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {BURGERS.map((burger) => (
            <div 
              key={burger.id}
              onClick={() => setSelectedBurger({ name: burger.name, folder: burger.folder })}
              className="group cursor-pointer flex flex-col items-center"
            >
              {/* Image using the first frame of its sequence */}
              <div className="w-full aspect-square bg-white rounded-3xl shadow-lg mb-6 overflow-hidden relative transition-transform duration-500 group-hover:scale-105 group-hover:shadow-2xl flex items-center justify-center">
                <img 
                  src={`${burger.folder}/ezgif-frame-001.jpg`} 
                  alt={burger.name} 
                  className="w-full h-full object-cover"
                />
                
                {/* Hover overlay hint */}
                <div className="absolute inset-0 bg-black/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                   <div className="bg-white/90 text-[#0B0C10] font-semibold px-4 py-2 rounded-full text-sm backdrop-blur-sm shadow-sm transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                     Click to Explode
                   </div>
                </div>
              </div>
              
              {/* Text Info - Removed the hover red text effect */}
              <h3 className="text-2xl font-bold text-[#0B0C10] transition-colors">
                {burger.name}
              </h3>
              <p className="text-xl font-bold text-[#0B0C10]/80 mt-2">
                {burger.price}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* The isolated modal for the burger explosion */}
      <BurgerModal 
        isOpen={selectedBurger !== null}
        burgerName={selectedBurger?.name || ""}
        folderPath={selectedBurger?.folder || ""}
        onClose={() => setSelectedBurger(null)}
      />
    </section>
  );
}
