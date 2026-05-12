"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";

interface HeroCarouselProps {
  media: string[];
}

export function HeroCarousel({ media }: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % media.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + media.length) % media.length);
  };

  const selectSlide = (index: number) => setCurrentIndex(index);
  const prevPreview = media[(currentIndex - 1 + media.length) % media.length];
  const nextPreview = media[(currentIndex + 1) % media.length];

  return (
    <div className="relative">
      <div className="hidden grid-cols-[124px_minmax(0,1fr)_124px] items-center gap-4 xl:grid">
        <button
          type="button"
          onClick={prevSlide}
          className="group relative h-[278px] overflow-hidden rounded-[28px] bg-[#1e1624] shadow-[0_18px_42px_rgba(16,12,20,0.18)]"
          aria-label="Previous slide"
        >
          <img src={prevPreview} alt="" className="h-full w-full object-cover opacity-95 transition duration-300 group-hover:scale-[1.02]" />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-black/5 to-black/35" />
          <div className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/72 text-[#352d32] shadow-lg backdrop-blur-sm">
            <ChevronRight className="h-5 w-5" />
          </div>
        </button>

        <div className="relative overflow-hidden rounded-[30px] bg-[#1e1512] shadow-[0_24px_70px_rgba(43,26,18,0.25)]">
          <img
            src={media[currentIndex]}
            alt={`Event media ${currentIndex + 1}`}
            className="h-[278px] w-full object-cover md:h-[380px] xl:h-[420px]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

          <div className="absolute right-4 top-4 flex gap-2">
            <span className="rounded-full bg-[#DFFF6A] px-3 py-1 text-xs font-bold text-[#332b1f] shadow-sm">أماكن محدودة</span>
            <span className="rounded-full bg-[#F4E7D0] px-3 py-1 text-xs font-bold text-[#5d4330] shadow-sm">الأكثر طلباً</span>
          </div>

          <button
            type="button"
            aria-label="Play event preview"
            className="absolute left-1/2 top-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/88 text-black shadow-[0_18px_50px_rgba(0,0,0,0.28)] backdrop-blur-md transition hover:scale-105"
          >
            <Play className="mr-[-4px] h-10 w-10 fill-current" />
          </button>

          <button
            type="button"
            onClick={prevSlide}
            className="absolute left-5 top-1/2 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full bg-white/70 text-[#392c25] shadow-md backdrop-blur-sm transition hover:bg-white"
            aria-label="Previous slide"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          <button
            type="button"
            onClick={nextSlide}
            className="absolute right-5 top-1/2 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full bg-white/70 text-[#392c25] shadow-md backdrop-blur-sm transition hover:bg-white"
            aria-label="Next slide"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <div className="absolute bottom-5 left-5 text-[2rem] font-bold tracking-tight text-white">
            {currentIndex + 1}
            <span className="mx-1 text-white/70">/</span>
            <span className="text-white/70">{media.length}</span>
          </div>

          <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
            {media.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => selectSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`h-2.5 rounded-full transition-all ${index === currentIndex ? "w-8 bg-white" : "w-2.5 bg-white/55"}`}
              />
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={nextSlide}
          className="group relative h-[278px] overflow-hidden rounded-[28px] bg-[#1e1624] shadow-[0_18px_42px_rgba(16,12,20,0.18)]"
          aria-label="Next slide"
        >
          <img src={nextPreview} alt="" className="h-full w-full object-cover opacity-95 transition duration-300 group-hover:scale-[1.02]" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/5 to-black/35" />
          <div className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/72 text-[#352d32] shadow-lg backdrop-blur-sm">
            <ChevronLeft className="h-5 w-5" />
          </div>
        </button>
      </div>

      <div className="xl:hidden">
        <div className="relative overflow-hidden rounded-[28px] bg-[#201513] shadow-[0_24px_70px_rgba(43,26,18,0.25)]">
          <img src={media[currentIndex]} alt={`Event media ${currentIndex + 1}`} className="h-[224px] w-full object-cover sm:h-[280px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/32 via-transparent to-transparent" />

          <div className="absolute right-3 top-3 flex gap-2">
            <span className="rounded-full bg-[#DFFF6A] px-3 py-1 text-[11px] font-bold text-[#332b1f] shadow-sm">أماكن محدودة</span>
            <span className="rounded-full bg-[#F6C96D] px-3 py-1 text-[11px] font-bold text-[#4d3525] shadow-sm">الأكثر طلباً</span>
          </div>

          <button
            type="button"
            aria-label="Play event preview"
            className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/88 text-black shadow-[0_18px_50px_rgba(0,0,0,0.28)] backdrop-blur-md"
          >
            <Play className="mr-[-4px] h-8 w-8 fill-current" />
          </button>

          <button
            type="button"
            onClick={prevSlide}
            className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/70 text-[#392c25] shadow-md backdrop-blur-sm"
            aria-label="Previous slide"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={nextSlide}
            className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/70 text-[#392c25] shadow-md backdrop-blur-sm"
            aria-label="Next slide"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-2">
            {media.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => selectSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`h-2 rounded-full transition-all ${index === currentIndex ? "w-7 bg-white" : "w-2 bg-white/55"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
