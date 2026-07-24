"use client";

import { useEffect, useRef, useState, RefObject } from "react";
import { useScroll, useTransform, useMotionValueEvent } from "framer-motion";

const FRAME_COUNT = 240;

interface CanvasSequenceProps {
  scrollContainerRef?: RefObject<HTMLElement | null>;
  folderPath?: string;
}

export default function CanvasSequence({ scrollContainerRef, folderPath = "/images" }: CanvasSequenceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Use either the provided container or the default window scroll
  const { scrollYProgress } = useScroll(
    scrollContainerRef ? { container: scrollContainerRef } : undefined
  );
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Preload images
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;
    
    // Reset state when folderPath changes
    setImagesLoaded(false);
    setImages([]);

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      // File names: ezgif-frame-001.jpg to ezgif-frame-240.jpg
      const frameNum = i.toString().padStart(3, "0");
      img.src = `${folderPath}/ezgif-frame-${frameNum}.jpg`;
      
      img.onload = () => {
        loadedCount++;
        if (loadedCount === FRAME_COUNT) {
          setImagesLoaded(true);
        }
      };
      loadedImages.push(img);
    }
    setImages(loadedImages);
  }, [folderPath]);

  // Map scroll progress (0 to 1) to frame index (0 to 239)
  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);

  useMotionValueEvent(frameIndex, "change", (latest) => {
    if (!imagesLoaded || !canvasRef.current || !images.length) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const index = Math.round(latest);
    const img = images[index];

    if (img && img.complete) {
      // Clear canvas before drawing
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Calculate ratios to emulate object-fit: cover, and zoom in by 1.8x to make the burger HUGE
      const hRatio = canvas.width / img.width;
      const vRatio = canvas.height / img.height;
      const ratio = Math.max(hRatio, vRatio) * 1.8;
      
      const centerShift_x = (canvas.width - img.width * ratio) / 2;
      const centerShift_y = (canvas.height - img.height * ratio) / 2;
      
      ctx.drawImage(
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
        const dpr = window.devicePixelRatio || 1;
        const canvas = canvasRef.current;
        
        // Scale canvas internal resolution for high-DPI displays (retina)
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        
        // Keep CSS dimensions to match screen size
        canvas.style.width = `${window.innerWidth}px`;
        canvas.style.height = `${window.innerHeight}px`;
        
        // Redraw current frame
        if (imagesLoaded && images.length > 0) {
          const index = Math.round(frameIndex.get());
          const img = images[index];
          if (img && img.complete) {
            const ctx = canvas.getContext("2d");
            const hRatio = canvas.width / img.width;
            const vRatio = canvas.height / img.height;
            const ratio = Math.max(hRatio, vRatio) * 1.8;
            const centerShift_x = (canvas.width - img.width * ratio) / 2;
            const centerShift_y = (canvas.height - img.height * ratio) / 2;
            
            ctx?.clearRect(0, 0, canvas.width, canvas.height);
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
    <div className="fixed top-0 left-0 w-full h-full -z-10 bg-white">
      {!imagesLoaded && (
        <div className="absolute inset-0 flex items-center justify-center text-white/50">
          Loading Culinary Masterpiece...
        </div>
      )}
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover"
      />
    </div>
  );
}
