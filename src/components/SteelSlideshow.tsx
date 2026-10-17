"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    id: 1,
    src: "/images/steel/1780143620322.png",
    alt: "Pressed Steel Water Storage Tank Installation 1",
  },
  {
    id: 2,
    src: "/images/steel/1792169379994.png",
    alt: "Pressed Steel Water Storage Tank Installation 2",
  },
  {
    id: 3,
    src: "/images/steel/1792169538682.png",
    alt: "Pressed Steel Water Storage Tank Installation 3",
  },
  {
    id: 4,
    src: "/images/steel/IMG-20250619-WA0012.jpg",
    alt: "Pressed Steel Water Storage Tank Installation 4",
  },
  {
    id: 5,
    src: "/images/steel/IMG-20250722-WA0044(3).jpg",
    alt: "Pressed Steel Water Storage Tank Installation 5",
  },
  {
    id: 6,
    src: "/images/steel/IMG-20250728-WA0031(1).jpg",
    alt: "Pressed Steel Water Storage Tank Installation 6",
  },
  {
    id: 7,
    src: "/images/steel/IMG-20250818-WA0046(1).jpg",
    alt: "Pressed Steel Water Storage Tank Installation 7",
  },
];

export default function SteelSlideshow() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start", duration: 25 },
    [
      Autoplay({
        delay: 4500,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    ]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  if (slides.length === 0) {
    return (
      <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden shadow-sm bg-slate-100 border-2 border-dashed border-slate-300 flex items-center justify-center text-slate-400 select-none">
        <span className="text-sm font-medium">Image 4:3</span>
      </div>
    );
  }

  return (
    <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden shadow-lg bg-slate-950 border border-slate-200/80 group select-none">
      {/* Slides Viewport */}
      <div className="w-full h-full overflow-hidden" ref={emblaRef}>
        <div className="flex h-full w-full">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className="relative flex-[0_0_100%] min-w-0 w-full h-full shrink-0 overflow-hidden"
              style={{ flex: "0 0 100%", minWidth: 0 }}
            >
              <div className="relative w-full h-full flex items-center justify-center">
                {/* Ambient Blurred Background to gracefully fill aspect ratio */}
                <Image
                  src={slide.src}
                  alt=""
                  fill
                  quality={30}
                  className="object-cover blur-md scale-110 opacity-35 pointer-events-none"
                  aria-hidden="true"
                />
                {/* Sharp Primary Image */}
                <div className="relative w-full h-full z-10 p-1.5 sm:p-2">
                  <Image
                    src={slide.src}
                    alt={slide.alt}
                    fill
                    priority={index === 0}
                    quality={85}
                    className="object-contain"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Slide Counter Badge (Top Right) */}
      <div className="absolute top-3 right-3 z-20 pointer-events-none">
        <span className="bg-black/60 backdrop-blur-md text-white text-[11px] sm:text-xs font-semibold px-2.5 py-1 rounded-full border border-white/10 shadow-sm">
          {selectedIndex + 1} / {slides.length}
        </span>
      </div>

      {/* Navigation Arrows */}
      <div className="absolute inset-y-0 left-0 right-0 z-20 flex items-center justify-between px-2 sm:px-3 pointer-events-none">
        <button
          type="button"
          onClick={scrollPrev}
          aria-label="Previous image"
          className="pointer-events-auto w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/45 hover:bg-black/75 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white transition-all duration-200 opacity-80 group-hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-white"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
        <button
          type="button"
          onClick={scrollNext}
          aria-label="Next image"
          className="pointer-events-auto w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/45 hover:bg-black/75 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white transition-all duration-200 opacity-80 group-hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-white"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>

      {/* Dots Indicator (Bottom Center) */}
      <div className="absolute bottom-3 left-0 right-0 z-20 flex items-center justify-center gap-1.5 pointer-events-none">
        <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/10 pointer-events-auto">
          {scrollSnaps.map((_, index) => {
            const isActive = selectedIndex === index;
            return (
              <button
                key={index}
                type="button"
                aria-label={`Go to slide ${index + 1}`}
                onClick={() => scrollTo(index)}
                className={`h-1.5 rounded-full transition-all duration-300 focus:outline-none ${
                  isActive ? "w-5 bg-[#1E9BD0]" : "w-1.5 bg-white/50 hover:bg-white/80"
                }`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
