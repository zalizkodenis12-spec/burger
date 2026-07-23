"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Navbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      setIsScrolled(latest > 50);
    });
  }, [scrollY]);

  const navBackground = useTransform(
    scrollY,
    [0, 100],
    ["rgba(11, 12, 16, 0)", "rgba(11, 12, 16, 0.75)"]
  );

  const backdropBlur = useTransform(scrollY, [0, 100], ["blur(0px)", "blur(12px)"]);

  return (
    <motion.nav
      style={{
        backgroundColor: navBackground,
        backdropFilter: backdropBlur,
      }}
      className="fixed top-0 left-0 right-0 z-50 transition-colors duration-300 border-b border-transparent data-[scrolled=true]:border-white/5"
      data-scrolled={isScrolled}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold tracking-tight text-white">
          THE SIGNATURE
        </Link>

        {/* Links */}
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-white/70">
          <Link href="#craft" className="hover:text-white transition-colors">
            The Craft
          </Link>
          <Link href="#ingredients" className="hover:text-white transition-colors">
            Ingredients
          </Link>
          <Link href="#origins" className="hover:text-white transition-colors">
            Origins
          </Link>
          <Link href="#taste" className="hover:text-white transition-colors">
            Taste Profile
          </Link>
        </div>

        {/* CTA */}
        <button className="px-5 py-2 rounded-full text-sm font-medium text-white bg-gradient-to-r from-[#FF5E00] to-[#FFB800] hover:shadow-[0_0_15px_rgba(255,94,0,0.5)] transition-shadow">
          Taste It
        </button>
      </div>
    </motion.nav>
  );
}
