"use client";

import { useEffect, useRef } from "react";
import CanvasSequence from "./CanvasSequence";
import { motion } from "framer-motion";

interface BurgerModalProps {
  isOpen: boolean;
  onClose: () => void;
  burgerName: string;
  folderPath: string;
}

const BURGER_INGREDIENTS: Record<string, { title: string, desc: string }[]> = {
  "Гострий з халапеньйо": [
    { title: "Булочка бріош", desc: "М'яка, злегка підсмажена булочка з кунжутом." },
    { title: "Яловича котлета", desc: "100% соковита яловичина, просмажена до ідеалу." },
    { title: "Сир Чеддер", desc: "Розплавлений сир, що додає ніжності." },
    { title: "Перець халапеньйо", desc: "Додає приємної гостроти та пікантності." },
    { title: "Гострий соус", desc: "Наш фірмовий соус, який запалює смакові рецептори." }
  ],
  "Середземноморський веджі": [
    { title: "Цільнозернова булочка", desc: "Корисна та хрустка булочка." },
    { title: "Веджі-котлета", desc: "Ніжна котлета з нуту та свіжого шпинату." },
    { title: "Сир Фета", desc: "Справжній грецький сир для солонуватого присмаку." },
    { title: "В'ялені томати", desc: "Насичений смак Середземномор'я." },
    { title: "Соус Цацикі", desc: "Легкий соус на основі йогурту та огірків." }
  ],
  "Хрусткий курячий": [
    { title: "Булочка бріош", desc: "Ідеально м'яка основа для хрусткої курки." },
    { title: "Куряче філе", desc: "Великий шматок соковитого філе у хрусткій паніровці." },
    { title: "Лист салату", desc: "Свіжий та хрусткий айсберг." },
    { title: "Солоні огірки", desc: "Класична кислинка для балансу смаку." },
    { title: "Часниковий майонез", desc: "Ніжний соус, що ідеально доповнює курку." }
  ],
  "BBQ Чізбургер з беконом": [
    { title: "Булочка з кунжутом", desc: "Класична булочка, обсмажена на грилі." },
    { title: "Подвійна котлета", desc: "Дві соковиті яловичі котлети для справжніх голодних." },
    { title: "Подвійний сир", desc: "Вдвічі більше розплавленого Чеддеру." },
    { title: "Хрусткий бекон", desc: "Підсмажений бекон для ідеального хрускоту." },
    { title: "Соус BBQ", desc: "Густий димний соус, який об'єднує всі смаки." }
  ]
};

// Helper component for modal scrollytelling text blocks
const ModalScrollBlock = ({ align, title, desc, top }: { align: "left" | "right", title: string, desc: string, top: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -100 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: false, margin: "-30% 0px -30% 0px" }}
      className={`absolute w-full max-w-[280px] sm:max-w-[320px] lg:max-w-[380px] px-4 md:px-0 z-10`}
      style={{ top, ...(align === "left" ? { left: "5%" } : { right: "5%" }) }}
    >
      <h3 className="text-4xl md:text-5xl font-serif font-bold text-[#0B0C10] mb-6 drop-shadow-sm">{title}</h3>
      <p className="text-xl md:text-2xl font-sans font-medium text-[#0B0C10]/80 leading-relaxed">{desc}</p>
    </motion.div>
  );
};

export default function BurgerModal({ isOpen, onClose, burgerName, folderPath }: BurgerModalProps) {
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

  const ingredients = BURGER_INGREDIENTS[burgerName] || BURGER_INGREDIENTS["Гострий з халапеньйо"];

  return (
    <div className="fixed inset-0 z-50 bg-[#0B0C10]">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 h-16 flex items-center justify-between px-6 z-50 bg-gradient-to-b from-[#0B0C10]/80 to-transparent pointer-events-none">
        <h2 className="text-2xl font-bold text-white drop-shadow-md pointer-events-auto">
          {burgerName}
        </h2>
        <button
          onClick={onClose}
          className="w-10 h-10 rounded-full bg-black/20 hover:bg-black/40 backdrop-blur-md flex items-center justify-center text-white pointer-events-auto transition-colors"
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
        {/* Render a separate instance of CanvasSequence bound to this scroll container and specific folder */}
        <CanvasSequence scrollContainerRef={scrollContainerRef} folderPath={folderPath} />
        
        {/* The tall spacer to allow scrolling through the 240 frames */}
        {/* Since there are 5 ingredients, we use 1200vh */}
        <div className="relative z-10 w-full h-[1200vh]">
          {ingredients.map((ingredient, idx) => (
            <ModalScrollBlock
              key={idx}
              align={idx % 2 === 0 ? "left" : "right"}
              top={`${(idx + 1) * 200}vh`}
              title={ingredient.title}
              desc={ingredient.desc}
            />
          ))}

          <div className="h-screen flex items-center justify-center sticky top-0 pointer-events-none z-0">
             <div className="absolute bottom-10 animate-bounce text-[#0B0C10]/50 text-sm tracking-widest uppercase font-bold bg-white/50 px-4 py-2 rounded-full backdrop-blur-sm">
               Гортайте вниз для вибуху
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
