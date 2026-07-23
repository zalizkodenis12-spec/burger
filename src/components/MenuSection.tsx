"use client";

import { useState } from "react";
import BurgerModal from "./BurgerModal";

const BURGERS = [
  { id: 1, name: "Гострий з халапеньйо", price: "18$", folder: "/images/burger1" },
  { id: 2, name: "Середземноморський веджі", price: "24$", folder: "/images/burger2" },
  { id: 3, name: "Хрусткий курячий", price: "16$", folder: "/images/burger3" },
  { id: 4, name: "BBQ Чізбургер з беконом", price: "19$", folder: "/images/burger4" },
];

export default function MenuSection() {
  const [selectedBurger, setSelectedBurger] = useState<{name: string, folder: string} | null>(null);

  return (
    <section className="relative w-full bg-[#FFB800] z-20 pb-32">
      {/* Smoother Wavy SVG Divider with Outline (Аутлайн) */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none transform -translate-y-full">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-full h-[100px] md:h-[150px]"
          style={{ filter: "drop-shadow(0 -4px 6px rgba(0,0,0,0.1))" }}
        >
          <path
            d="M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z"
            className="fill-[#FFB800]"
            stroke="#0B0C10"
            strokeWidth="4"
          ></path>
        </svg>
      </div>

      <div className="max-w-5xl mx-auto px-6 pt-24 text-center">
        <h2 className="text-7xl md:text-8xl font-extrabold text-[#0B0C10] mb-16 tracking-wide drop-shadow-md">
          Ознайомтеся з колекцією Підпис
        </h2>
        
        {/* Changed to 2 columns for a perfect 2x2 grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-16">
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
                   <div className="bg-white/90 text-[#0B0C10] font-semibold px-4 py-2 rounded-full text-lg backdrop-blur-sm shadow-sm transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                     Натисніть для вибуху
                   </div>
                </div>
              </div>
              
              {/* Text Info */}
              <h3 className="text-4xl font-bold text-[#0B0C10] transition-colors">
                {burger.name}
              </h3>
              <p className="text-3xl font-medium text-[#0B0C10]/80 mt-2">
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
