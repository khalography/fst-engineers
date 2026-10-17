"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { motion, AnimatePresence, useReducedMotion, type Variants } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Counter from "yet-another-react-lightbox/plugins/counter";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/counter.css";
import { siteContent } from "@/data/content";

const lightboxSlides = [
  {
    src: "/images/hero-tank-red.jpg",
    title: "Epoxy coated steel pressed tank",
    alt: "Red pressed steel water tank on a concrete base",
    width: 1280,
    height: 960,
  },
  {
    src: "/images/hero-tank-galvanized.jpg",
    title: "Galvanized pressed steel tank",
    alt: "Silver pressed steel water tank with an access ladder",
    width: 992,
    height: 744,
  },
  {
    src: "/images/hero-tank-ladder.jpg",
    title: "Epoxy coated steel pressed tank",
    alt: "Caged access ladder on a red pressed steel tank",
    width: 780,
    height: 925,
  },
];

export default function Hero() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start", duration: 25 },
    [
      Autoplay({
        delay: (scrollSnaps) =>
          scrollSnaps.map((_, i) => (i === 3 ? 7000 : siteContent.hero.autoplayDelay)),
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    ]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const lastFocusedElementRef = useRef<HTMLElement | null>(null);

  const shouldReduceMotion = useReducedMotion();
  const isSlide4Active = selectedIndex === 3;

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

  const handleOpenLightbox = useCallback((index: number, element?: HTMLElement | null) => {
    lastFocusedElementRef.current = element || (document.activeElement as HTMLElement) || null;
    setLightboxIndex(index);
    setLightboxOpen(true);
  }, []);

  const handleCloseLightbox = useCallback(() => {
    setLightboxOpen(false);
    setTimeout(() => {
      if (lastFocusedElementRef.current) {
        lastFocusedElementRef.current.focus();
      }
    }, 50);
  }, []);

  // Pause autoplay while popup is open, resume when closed
  useEffect(() => {
    if (!emblaApi) return;
    const plugins = emblaApi.plugins();
    const autoplay = plugins.autoplay as { stop: () => void; play: () => void } | undefined;
    if (!autoplay) return;

    if (lightboxOpen) {
      autoplay.stop();
    } else {
      autoplay.play();
    }
  }, [lightboxOpen, emblaApi]);

  const tileVariants: Variants = {
    hidden: {
      clipPath: shouldReduceMotion ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)",
      y: shouldReduceMotion ? 0 : 70,
      scale: shouldReduceMotion ? 1 : 0.94,
      opacity: shouldReduceMotion ? 1 : 0,
      transition: { duration: 0 },
    },
    visible: (i: number) => ({
      clipPath: "inset(0% 0% 0% 0%)",
      y: 0,
      scale: 1,
      opacity: 1,
      transition: shouldReduceMotion
        ? { duration: 0 }
        : {
            duration: 1.4,
            ease: [0.22, 1, 0.36, 1] as const,
            delay: i * 0.45,
          },
    }),
  };

  const captionVariants: Variants = {
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      transition: { duration: 0 },
    },
    visible: (i: number) => ({
      opacity: 1,
      transition: shouldReduceMotion
        ? { duration: 0 }
        : {
            duration: 0.4,
            ease: "easeOut" as const,
            delay: i * 0.45 + 1.4,
          },
    }),
  };

  const buttonVariants: Variants = {
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      y: shouldReduceMotion ? 0 : 8,
      transition: { duration: 0 },
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: shouldReduceMotion
        ? { duration: 0 }
        : {
            duration: 0.4,
            ease: "easeOut" as const,
            delay: 2.3,
          },
    },
  };

  const eyebrowVariants: Variants = {
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      transition: { duration: 0 },
    },
    visible: {
      opacity: 1,
      transition: shouldReduceMotion
        ? { duration: 0 }
        : {
            duration: 0.4,
            ease: "easeOut" as const,
          },
    },
  };

  const slides = siteContent.hero.slides;
  const currentSlide = slides[selectedIndex] || slides[0];

  return (
    <section
      id="hero"
      aria-label="Hero Showcase"
      className="relative w-full min-h-[600px] md:min-h-[700px] lg:min-h-[760px] pt-20 flex items-center overflow-hidden bg-black"
    >
      {/* Embla Carousel Viewport: strictly overflow hidden, no gaps */}
      <div className="absolute inset-0 w-full h-full overflow-hidden" ref={emblaRef}>
        <div className="flex h-full w-full">
          {slides.map((slide, index) => {
            if (slide.isGallery) {
              return (
                <div
                  key={slide.id}
                  className="relative flex-[0_0_100%] min-w-0 w-full h-full shrink-0 overflow-hidden bg-[#10337A]"
                  style={{ flex: "0 0 100%", minWidth: 0 }}
                >
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                      <div className="w-full">
                        {/* Eyebrow: FST ENGINEERING */}
                        <motion.div
                          variants={eyebrowVariants}
                          initial="hidden"
                          animate={isSlide4Active ? "visible" : "hidden"}
                          className="text-white/85 text-xs sm:text-sm font-semibold uppercase tracking-wider mb-3 sm:mb-5"
                        >
                          {slide.tag}
                        </motion.div>

                        {/* Tiles: three equal columns */}
                        <div className="grid grid-cols-3 gap-3 sm:gap-6 w-full">
                          {slide.galleryItems?.map((item, i) => (
                            <div key={item.image} className="flex flex-col">
                              {/* Animated Tile Container */}
                              <motion.div
                                custom={i}
                                variants={tileVariants}
                                initial="hidden"
                                animate={isSlide4Active ? "visible" : "hidden"}
                                className="relative w-full"
                              >
                                <button
                                  type="button"
                                  onClick={(e) => handleOpenLightbox(i, e.currentTarget)}
                                  aria-label={`View photo: ${item.caption}`}
                                  className="group relative w-full aspect-[3/4] sm:aspect-[4/3] rounded-xl overflow-hidden cursor-pointer focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#10337A] block text-left"
                                >
                                  <Image
                                    src={item.image}
                                    alt={item.alt}
                                    fill
                                    quality={90}
                                    sizes="(min-width: 1024px) 380px, 90vw"
                                    className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03] select-none"
                                    style={{ objectPosition: item.objectPosition || "center" }}
                                  />
                                </button>
                              </motion.div>

                              {/* Caption below tile */}
                              <motion.p
                                custom={i}
                                variants={captionVariants}
                                initial="hidden"
                                animate={isSlide4Active ? "visible" : "hidden"}
                                className="hidden sm:block mt-2.5 text-[15px] font-semibold text-white text-left leading-snug"
                              >
                                {item.caption}
                              </motion.p>
                            </div>
                          ))}
                        </div>

                        {/* Button: View More left-aligned beneath them */}
                        <motion.div
                          variants={buttonVariants}
                          initial="hidden"
                          animate={isSlide4Active ? "visible" : "hidden"}
                          className="pt-5 sm:pt-7 flex items-center"
                        >
                          <button
                            type="button"
                            onClick={(e) => handleOpenLightbox(0, e.currentTarget)}
                            className="inline-flex items-center gap-2 bg-[#1E9BD0] hover:bg-[#157EA9] active:bg-[#10337A] text-white font-semibold text-sm sm:text-base px-6 py-3 rounded transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white cursor-pointer"
                          >
                            <span>{slide.galleryButton?.label || "View More"}</span>
                            <ArrowRight className="w-4 h-4 text-white" />
                          </button>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }

            const isTargetSlide = slide.headline === "Internationally Certified Tanks";

            return (
              <div
                key={slide.id}
                className="relative flex-[0_0_100%] min-w-0 w-full h-full shrink-0 overflow-hidden"
                style={{ flex: "0 0 100%", minWidth: 0 }}
              >
                <div className="relative w-full h-full">
                  {isTargetSlide ? (
                    <>
                      {/* Backdrop image: heavily blurred, scaled slightly, darkened */}
                      <div
                        className="absolute inset-0 overflow-hidden pointer-events-none select-none"
                        aria-hidden="true"
                      >
                        <Image
                          src={slide.image || ""}
                          alt=""
                          fill
                          aria-hidden="true"
                          tabIndex={-1}
                          className="object-cover object-center scale-110 blur-[40px] brightness-[0.60] pointer-events-none select-none"
                          style={{
                            filter: "blur(40px) brightness(0.60)",
                            transform: "scale(1.1)",
                          }}
                          sizes="100vw"
                        />
                      </div>

                      {/* Main image: uncropped, object-contain, capped at 800x600, centered */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="relative w-full h-full max-w-[800px] max-h-[600px]">
                          <Image
                            src={slide.image || ""}
                            alt={slide.headline || ""}
                            fill
                            priority={index === 0}
                            quality={90}
                            className="object-contain object-center"
                            sizes="100vw"
                          />
                        </div>
                      </div>
                    </>
                  ) : (
                    <Image
                      src={slide.image || ""}
                      alt={slide.headline || ""}
                      fill
                      priority={index === 0}
                      quality={90}
                      className="object-cover object-center"
                      sizes="100vw"
                    />
                  )}
                  {/* 1. Flat black overlay at 20-25% opacity over the whole image */}
                  <div
                    className="absolute inset-0 bg-black/25 pointer-events-none"
                    aria-hidden="true"
                  />
                  {/* 2. Soft left-to-right gradient from black at ~45% at far left, fading to transparent by ~60% */}
                  <div
                    className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.45)_0%,rgba(0,0,0,0.20)_35%,rgba(0,0,0,0)_60%)] pointer-events-none"
                    aria-hidden="true"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Hero Content Overlay: only for standard slides 1 to 3 */}
      {!currentSlide.isGallery && currentSlide.headline && (
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 pointer-events-none">
          <div className="max-w-3xl pointer-events-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedIndex}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="space-y-5"
              >
                {/* Badge above headline */}
                <div className="text-white/85 text-xs sm:text-sm font-semibold uppercase tracking-wider">
                  {currentSlide.tag}
                </div>

                {/* Headline: white, bold, subtle text shadow */}
                <p
                  className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.15] tracking-tight"
                  style={{ color: "#ffffff", textShadow: "0 2px 12px rgba(0,0,0,0.35)" }}
                >
                  {currentSlide.headline}
                </p>

                {/* Supporting line: white at ~90% opacity, one short sentence */}
                <p className="text-base sm:text-lg lg:text-xl text-white/90 font-normal leading-relaxed max-w-2xl">
                  {currentSlide.subheadline}
                </p>

                {/* Two buttons: View Products, Contact Us */}
                {currentSlide.primaryCta && currentSlide.secondaryCta && (
                  <div className="pt-3 flex flex-wrap items-center gap-4">
                    <Link
                      href={currentSlide.primaryCta.href}
                      className="inline-flex items-center gap-2 bg-[#1E9BD0] hover:bg-[#157EA9] active:bg-[#10337A] text-white font-semibold text-sm sm:text-base px-6 py-3 rounded transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white"
                    >
                      <span>{currentSlide.primaryCta.label}</span>
                      <ArrowRight className="w-4 h-4 text-white" />
                    </Link>

                    <Link
                      href={currentSlide.secondaryCta.href}
                      className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold text-sm sm:text-base px-6 py-3 rounded border border-white/40 hover:border-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white"
                    >
                      <span>{currentSlide.secondaryCta.label}</span>
                    </Link>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* Slideshow Controls: Bottom Bar with Navigation Dots & Arrows */}
      <div className="absolute bottom-6 left-0 right-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Dots Indicator */}
          <div
            className="flex items-center gap-2.5"
            role="tablist"
            aria-label="Slideshow pagination"
          >
            {scrollSnaps.map((_, index) => {
              const isActive = selectedIndex === index;
              return (
                <button
                  key={index}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-label={`Go to slide ${index + 1}`}
                  onClick={() => scrollTo(index)}
                  className={`h-2.5 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white ${
                    isActive ? "w-8 bg-[#C5A253]" : "w-2.5 bg-white/40 hover:bg-white/70"
                  }`}
                />
              );
            })}
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={scrollPrev}
              aria-label="Previous slide"
              className="w-10 h-10 rounded-full bg-black/30 hover:bg-black/50 border border-white/20 flex items-center justify-center text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={scrollNext}
              aria-label="Next slide"
              className="w-10 h-10 rounded-full bg-black/30 hover:bg-black/50 border border-white/20 flex items-center justify-center text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Gallery Lightbox Popup */}
      <Lightbox
        open={lightboxOpen}
        close={handleCloseLightbox}
        index={lightboxIndex}
        slides={lightboxSlides}
        plugins={[Captions, Counter]}
        carousel={{
          finite: true,
        }}
        controller={{
          closeOnBackdropClick: true,
        }}
        animation={{
          fade: 300,
        }}
        styles={{
          root: {
            "--yarl__color_backdrop": "rgba(8, 20, 48, 0.92)",
            "--yarl__slide_title_container_top": "auto",
            "--yarl__slide_title_container_bottom": "0px",
          },
          container: {
            backgroundColor: "rgba(8, 20, 48, 0.92)",
          },
          captionsTitleContainer: {
            top: "auto",
            bottom: 0,
            background: "rgba(8, 20, 48, 0.85)",
            backdropFilter: "blur(6px)",
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            padding: "16px 20px",
          },
          captionsTitle: {
            textAlign: "center",
            fontSize: "1rem",
            fontWeight: 600,
            color: "#ffffff",
          },
        }}
        render={{
          slide: ({ slide }) => {
            const s = slide as (typeof lightboxSlides)[0];
            return (
              <div className="flex items-center justify-center w-full h-full p-4 sm:p-12 pb-20 sm:pb-24 pointer-events-auto">
                <img
                  src={s.src}
                  alt={s.alt}
                  style={{
                    maxWidth: `min(100%, ${s.width}px)`,
                    maxHeight: `min(100%, ${s.height}px)`,
                  }}
                  className="object-contain rounded-xl border border-white/15 shadow-2xl"
                />
              </div>
            );
          },
        }}
      />
    </section>
  );
}
