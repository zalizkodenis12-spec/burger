"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, useMotionValueEvent } from "framer-motion";

const FRAME_COUNT = 240;

export default function CanvasSequence() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { scrollYProgress } = useScroll();
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Preload images
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      // File names: ezgif-frame-001.jpg to ezgif-frame-240.jpg
      const frameNum = i.toString().padStart(3, "0");
      img.src = `/images/ezgif-frame-${frameNum}.jpg`;
      
      img.onload = () => {
        loadedCount++;
        if (loadedCount === FRAME_COUNT) {
          setImagesLoaded(true);
        }
      };
      loadedImages.push(img);
    }
    setImages(loadedImages);
  }, []);

  // Map scroll progress (0 to 1) to frame index (0 to 239)
  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);

  useMotionValueEvent(frameIndex, "change", (latest) => {
    if (!imagesLoaded || !canvasRef.current || !images.length) return;
    
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    const index = Math.round(latest);
    const img = images[index];

    if (img && img.complete) {
      // Draw image covering the canvas (like object-fit: cover)
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      
      // Clear canvas before drawing
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
      
      // Calculate ratios to emulate object-fit: cover
      const hRatio = canvas.width / img.width;
      const vRatio = canvas.height / img.height;
      const ratio = Math.max(hRatio, vRatio);
      
      const centerShift_x = (canvas.width - img.width * ratio) / 2;
      const centerShift_y = (canvas.height - img.height * ratio) / 2;
      
      ctx?.drawImage(
        img,
        0, 0, img.width, img.height,
        centerShift_x, centerShift_y, img.width * ratio, img.height * ratio
      );
    }
  });

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        
        // Redraw current frame
        if (imagesLoaded && images.length > 0) {
          const index = Math.round(frameIndex.get());
          const img = images[index];
          if (img) {
            const ctx = canvasRef.current.getContext("2d");
            const hRatio = canvasRef.current.width / img.width;
            const vRatio = canvasRef.current.height / img.height;
            const ratio = Math.max(hRatio, vRatio);
            const centerShift_x = (canvasRef.current.width - img.width * ratio) / 2;
            const centerShift_y = (canvasRef.current.height - img.height * ratio) / 2;
            
            ctx?.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            ctx?.drawImage(
              img,
              0, 0, img.width, img.height,
              centerShift_x, centerShift_y, img.width * ratio, img.height * ratio
            );
          }
        }
      }
    };
    
    window.addEventListener("resize", handleResize);
    handleResize(); // Init size
    
    return () => window.removeEventListener("resize", handleResize);
  }, [imagesLoaded, images, frameIndex]);

  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 bg-[#0B0C10]">
      {!imagesLoaded && (
        <div className="absolute inset-0 flex items-center justify-center text-white/50">
          Loading Culinary Masterpiece...
        </div>
      )}
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover"
      />
      {/* 
        A subtle radial gradient to help text readability over the image. 
        It mimics the dark intimate lighting of a premium restaurant.
      */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(11,12,16,0.8)_100%)] pointer-events-none" />
    </div>
  );
}
