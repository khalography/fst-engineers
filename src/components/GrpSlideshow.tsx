"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { blurDataURLs } from "@/data/blurDataURLs";

const slides = [
  {
    id: 1,
    src: "/images/grpfrp/1000662082.jpg",
    alt: "GRP/FRP Water Storage Tank Installation 1",
  },
  {
    id: 2,
    src: "/images/grpfrp/1000662083.jpg",
    alt: "GRP/FRP Water Storage Tank Installation 2",
  },
  {
    id: 3,
    src: "/images/grpfrp/1000662091.jpg",
    alt: "GRP/FRP Water Storage Tank Installation 3",
  },
  {
    id: 4,
    src: "/images/grpfrp/1000662092.jpg",
    alt: "GRP/FRP Water Storage Tank Installation 4",
  },
  {
    id: 5,
    src: "/images/grpfrp/1000662093.jpg",
    alt: "GRP/FRP Water Storage Tank Installation 5",
  },
  {
    id: 6,
    src: "/images/grpfrp/1000662094.jpg",
    alt: "GRP/FRP Water Storage Tank Installation 6",
  },
  {
    id: 7,
    src: "/images/grpfrp/1000662095.jpg",
    alt: "GRP/FRP Water Storage Tank Installation 7",
  },
  {
    id: 8,
    src: "/images/grpfrp/1000662096.jpg",
    alt: "GRP/FRP Water Storage Tank Installation 8",
  },
  {
    id: 9,
    src: "/images/grpfrp/1000662097.jpg",
    alt: "GRP/FRP Water Storage Tank Installation 9",
  },
  {
    id: 10,
    src: "/images/grpfrp/1000662708.jpg",
    alt: "GRP/FRP Water Storage Tank Installation 10",
  },
  {
    id: 11,
    src: "/images/grpfrp/1000662709.jpg",
    alt: "GRP/FRP Water Storage Tank Installation 11",
  },
];

export default function GrpSlideshow() {
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
              <div className="relative w-full h-full flex items-center justify-center p-1.5 sm:p-2">
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  quality={85}
                  className="object-contain"
                  sizes="(min-width: 1024px) 600px, 90vw"
                  placeholder="blur"
                  blurDataURL={blurDataURLs[slide.src]}
                />
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
                className="p-1 inline-flex items-center justify-center focus:outline-none focus:ring-1 focus:ring-white rounded-full"
              >
                <span
                  className={`block h-1.5 rounded-full transition-all duration-300 ${
                    isActive ? "w-5 bg-[#1E9BD0]" : "w-1.5 bg-white/50 hover:bg-white/80"
                  }`}
                />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
