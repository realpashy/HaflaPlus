"use client";

import { useState } from "react";
import { ChevronRight, ChevronLeft, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroCarouselProps {
  media: string[];
}

export function HeroCarousel({ media }: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === media.length - 1 ? 0 : prevIndex + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? media.length - 1 : prevIndex - 1));
  };

  // In RTL, translating X positively goes left.
  const transformStyle = { transform: `translateX(${currentIndex * 100}%)` };

  return (
    <div className="relative w-full aspect-video md:aspect-[2.5/1] overflow-hidden rounded-[2rem] bg-muted mb-8 group">
      <div 
        className="flex h-full transition-transform duration-500 ease-out" 
        style={transformStyle}
      >
        {media.map((src, index) => (
          <div key={index} className="w-full h-full shrink-0 relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={src} 
              alt={`Slide ${index + 1}`} 
              className="w-full h-full object-cover"
            />
            {index === 0 && (
              <div className="absolute inset-0 flex items-center justify-center">
                 <div className="w-20 h-20 bg-background/90 backdrop-blur-md rounded-full flex items-center justify-center text-foreground cursor-pointer hover:scale-110 transition-transform shadow-float">
                   <Play className="w-8 h-8 ml-1" />
                 </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Badges */}
      <div className="absolute top-4 right-4 flex gap-2">
        <div className="bg-warning text-warning-foreground px-4 py-2 rounded-full text-xs font-bold shadow-sm">
          أماكن محدودة
        </div>
        <div className="bg-primary text-primary-foreground px-4 py-2 rounded-full text-xs font-bold shadow-sm">
          الأكثر طلباً
        </div>
      </div>

      {/* Controls & Indicators */}
      {media.length > 1 && (
        <>
          <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex items-center justify-between pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
            <Button 
              variant="secondary" 
              size="icon" 
              className="rounded-full h-12 w-12 pointer-events-auto opacity-90 hover:opacity-100 shadow-sm"
              onClick={prevSlide}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
            <Button 
              variant="secondary" 
              size="icon" 
              className="rounded-full h-12 w-12 pointer-events-auto opacity-90 hover:opacity-100 shadow-sm"
              onClick={nextSlide}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
          </div>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2">
            {media.map((_, index) => (
              <div 
                key={index} 
                className={`w-2 h-2 rounded-full transition-all ${index === currentIndex ? "bg-white w-6" : "bg-white/50"}`}
              />
            ))}
          </div>

          <div className="absolute bottom-6 left-6 bg-background/80 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-bold shadow-sm">
            {currentIndex + 1}/{media.length}
          </div>
        </>
      )}
    </div>
  );
}
