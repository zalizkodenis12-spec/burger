"use client";

import CanvasSequence from "@/components/CanvasSequence";
import MenuSection from "@/components/MenuSection";

import { motion, useScroll, useTransform } from "framer-motion";

// Helper component for scrollytelling text blocks
const ScrollBlock = ({ align, title, desc }: { align: "left" | "right", title: string, desc: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -100 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: false, margin: "-30% 0px -30% 0px" }}
      className={`w-full max-w-[350px] lg:max-w-[400px] px-4 md:px-0 ${align === "left" ? "mr-auto ml-[5vw] lg:ml-[10vw]" : "ml-auto mr-[5vw] lg:mr-[10vw]"}`}
    >
      <h3 className="text-4xl md:text-5xl font-serif font-bold text-[#0B0C10] mb-6 drop-shadow-sm">{title}</h3>
      <p className="text-xl md:text-2xl font-sans font-medium text-[#0B0C10]/80 leading-relaxed">{desc}</p>
    </motion.div>
  );
};

export default function Home() {
  const { scrollY } = useScroll();
  // Fade out the BURGER text as the user scrolls down the first 600px
  const burgerOpacity = useTransform(scrollY, [0, 600], [0.9, 0]);

  return (
    <main className="relative w-full bg-white">
      {/* Absolute Top Navigation Bar (Disappears on scroll) */}
      <div className="absolute top-0 left-0 w-full pt-4 pb-6 bg-[#FFB800] z-50">
        <div className="relative z-10 flex items-center w-full px-6 md:px-16">
          {/* Left Navigation Links */}
          <div className="hidden md:flex flex-1 items-center justify-between pr-12 lg:pr-32 font-sans font-semibold text-sm tracking-widest uppercase text-[#0B0C10]">
            <a href="#" className="hover:text-white transition-colors cursor-pointer">Головна</a>
            <a href="#" className="hover:text-white transition-colors cursor-pointer">Про нас</a>
            <a href="#" className="hover:text-white transition-colors cursor-pointer">Історія</a>
          </div>

          {/* Center Logo (Handwritten / Caveat) */}
          <div className="flex-shrink-0 text-5xl font-bold text-[#0B0C10] whitespace-nowrap px-8">
            BurgerMax
          </div>

          {/* Right Navigation Links */}
          <div className="hidden md:flex flex-1 items-center justify-between pl-12 lg:pl-32 font-sans font-semibold text-sm tracking-widest uppercase text-[#0B0C10]">
            <a href="#" className="hover:text-white transition-colors cursor-pointer">Меню</a>
            <a href="#" className="hover:text-white transition-colors cursor-pointer">Локації</a>
            <a href="#" className="hover:text-white transition-colors cursor-pointer">Контакти</a>
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

      {/* Huge Background Text (Fades out with scroll) */}
      <motion.div 
        style={{ opacity: burgerOpacity }}
        className="fixed inset-0 w-full h-screen flex items-center justify-between z-0 pointer-events-none px-[4vw]"
      >
        <h1 
          className="relative text-[12vw] md:text-[14vw] font-serif text-[#0B0C10] font-bold flex w-full justify-between"
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
          
          {/* White occlusion overlay to hide the middle letters 'R' and 'G' behind the burger */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[45%] h-[150%] bg-white rounded-[50%] blur-xl"></div>
        </h1>
      </motion.div>

      {/* Background Canvas Sequence with mix-blend-multiply to remove white background */}
      <div className="relative z-10 mix-blend-multiply">
        <CanvasSequence />
      </div>

      {/* Scrollable Content Container for Scrollytelling (800vh height drives the canvas animation) */}
      <div className="relative z-10 w-full h-[800vh] flex flex-col justify-evenly py-[100vh]">
        <ScrollBlock 
          align="left" 
          title="Свіжі інгредієнти" 
          desc="Тільки найкраще відбірне м'ясо та хрусткі овочі від локальних фермерів. Ми обираємо безкомпромісну якість, яку ви можете відчути в кожному шматочку." 
        />
        <ScrollBlock 
          align="right" 
          title="Авторські рецепти" 
          desc="Наші фірмові соуси – це секрет, який робить смак неповторним. Ідеальні пропорції, розроблені справжніми фанатами бургерної культури." 
        />
        <ScrollBlock 
          align="left" 
          title="Ідеальне просмаження" 
          desc="Соковита котлета, приготована саме так, як ви любите. Максимум насиченого смаку, який розкривається з першим укусом." 
        />
        <ScrollBlock 
          align="right" 
          title="Атмосфера смаку" 
          desc="Бургер – це не просто їжа, це емоція. Насолоджуйтесь кожною хвилиною та кожним смаком у затишній атмосфері нашого закладу." 
        />
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
