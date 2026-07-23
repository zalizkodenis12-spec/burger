"use client";

import { useState } from "react";
import BurgerModal from "./BurgerModal";

const BURGERS = [
  { id: 1, name: "The Truffle Wagyu", price: "$24" },
  { id: 2, name: "Spicy Jalapeno Crunch", price: "$18" },
  { id: 3, name: "Double Smash Classic", price: "$16" },
  { id: 4, name: "Vegan Beyond Supreme", price: "$19" },
  { id: 5, name: "Crispy Chicken Honey", price: "$17" },
  { id: 6, name: "The Blue Cheese Volcano", price: "$22" },
];

export default function MenuSection() {
  const [selectedBurger, setSelectedBurger] = useState<string | null>(null);

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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {BURGERS.map((burger) => (
            <div 
              key={burger.id}
              onClick={() => setSelectedBurger(burger.name)}
              className="group cursor-pointer flex flex-col items-center"
            >
              {/* White placeholder for the burger image */}
              <div className="w-full aspect-square bg-white rounded-3xl shadow-lg mb-6 overflow-hidden relative transition-transform duration-500 group-hover:scale-105 group-hover:shadow-2xl flex items-center justify-center">
                <span className="text-gray-300 font-medium">Image Placeholder</span>
                
                {/* Hover overlay hint */}
                <div className="absolute inset-0 bg-black/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                   <div className="bg-white/90 text-[#0B0C10] font-semibold px-4 py-2 rounded-full text-sm backdrop-blur-sm shadow-sm transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                     Click to Explode
                   </div>
                </div>
              </div>
              
              {/* Text Info */}
              <h3 className="text-2xl font-bold text-[#0B0C10] group-hover:text-[#FF5E00] transition-colors">
                {burger.name}
              </h3>
              <p className="text-xl font-medium text-[#0B0C10]/70 mt-2">
                {burger.price}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* The isolated modal for the burger explosion */}
      <BurgerModal 
        isOpen={selectedBurger !== null}
        burgerName={selectedBurger || ""}
        onClose={() => setSelectedBurger(null)}
      />
    </section>
  );
}
