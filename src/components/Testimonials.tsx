"use client";

import React from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Quote } from "lucide-react";
import { siteContent } from "@/data/content";

export default function Testimonials() {
  const testimonials = siteContent.testimonials;
  const shouldReduceMotion = useReducedMotion();

  const cardVariants: Variants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 20,
    },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.01 : 0.45,
        delay: shouldReduceMotion ? 0 : index * 0.15,
        ease: "easeOut" as const,
      },
    }),
  };

  return (
    <section
      id="testimonials"
      aria-label="Testimonials"
      className="py-16 sm:py-20 lg:py-24 bg-white border-b border-slate-100 scroll-mt-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Heading */}
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#10337A] tracking-tight">
            {testimonials.heading}
          </h2>
        </div>

        {/* Three cards in a row on desktop, two columns on tablet, one column on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {testimonials.items.map((item, idx) => (
            <motion.div
              key={item.name}
              custom={idx}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={cardVariants}
              className="bg-[#F8FAFC] rounded-xl p-8 border border-slate-200/80 flex flex-col justify-between h-full hover:-translate-y-1 hover:shadow-md transition-all duration-300"
            >
              <div>
                {/* Lucide Quote icon in muted gold (#C5A253) */}
                <Quote
                  className="w-8 h-8 text-[#C5A253] shrink-0 mb-4"
                  aria-hidden="true"
                />
                {/* Quote text in charcoal (#555B61), base size, relaxed line height, left-aligned */}
                <p className="text-[#555B61] text-base leading-relaxed text-left">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              {/* Thin divider and person details */}
              <div className="border-t border-slate-200/80 pt-6 mt-6 flex items-center gap-3.5">
                {/* Circular avatar with person's initials: navy #10337A fill, white text */}
                <div
                  className="w-10 h-10 rounded-full bg-[#10337A] text-white flex items-center justify-center font-bold text-sm shrink-0 select-none"
                  aria-hidden="true"
                >
                  {item.initials}
                </div>
                <div>
                  <div className="font-bold text-[#10337A] text-sm sm:text-base leading-tight">
                    {item.name}
                  </div>
                  <div className="text-xs sm:text-sm text-[#555B61] mt-0.5">
                    {item.role}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
