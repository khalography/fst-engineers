"use client";

import React, { useId } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface SwooshAccentProps {
  className?: string;
  variant?: "curve" | "horizontal" | "badge";
}

export default function SwooshAccent({
  className = "",
  variant = "curve",
}: SwooshAccentProps) {
  const rawId = useId();
  const gradientId = `swoosh-grad-${rawId.replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const shouldReduceMotion = useReducedMotion();

  // Legacy fallback if badge is ever requested
  if (variant === "badge") {
    return (
      <svg
        className={`inline-block ${className}`}
        width="36"
        height="18"
        viewBox="0 0 36 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M2 14C8 3 24 1 34 8"
          stroke="#1E9BD0"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <path
          d="M6 16C16 11 28 9 32 4"
          stroke="#C5A253"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  // Primary arc: 2px stroke, horizontal gradient (transparent -> cyan -> gold -> transparent)
  const primaryPath = "M 50 36 C 300 8, 700 8, 950 36";
  // Secondary arc: 1px stroke in navy at 25% opacity, offset slightly below primary
  const secondaryPath = "M 90 28 C 340 18, 660 22, 910 46";

  return (
    <div
      className={`relative w-full h-0 pointer-events-none select-none z-10 ${className}`}
      aria-hidden="true"
    >
      <div className="absolute left-0 right-0 top-0 -translate-y-1/2 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-5xl mx-auto flex items-center justify-center">
          <svg
            viewBox="0 0 1000 56"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto max-h-[56px] overflow-visible"
            aria-hidden="true"
          >
            <defs>
              <linearGradient
                id={gradientId}
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#1E9BD0" stopOpacity="0" />
                <stop offset="18%" stopColor="#1E9BD0" stopOpacity="1" />
                <stop offset="52%" stopColor="#1E9BD0" stopOpacity="1" />
                <stop offset="68%" stopColor="#C5A253" stopOpacity="1" />
                <stop offset="85%" stopColor="#C5A253" stopOpacity="1" />
                <stop offset="100%" stopColor="#C5A253" stopOpacity="0" />
              </linearGradient>
            </defs>

            {shouldReduceMotion ? (
              <>
                <path
                  d={primaryPath}
                  stroke={`url(#${gradientId})`}
                  strokeWidth={2}
                  strokeLinecap="round"
                />
                <path
                  d={secondaryPath}
                  stroke="#10337A"
                  strokeOpacity={0.25}
                  strokeWidth={1}
                  strokeLinecap="round"
                />
              </>
            ) : (
              <>
                <motion.path
                  d={primaryPath}
                  stroke={`url(#${gradientId})`}
                  strokeWidth={2}
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true, amount: "some" }}
                  transition={{
                    pathLength: { duration: 0.6, ease: "easeOut" },
                    opacity: { duration: 0.05, ease: "linear" },
                  }}
                />
                <motion.path
                  d={secondaryPath}
                  stroke="#10337A"
                  strokeOpacity={0.25}
                  strokeWidth={1}
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true, amount: "some" }}
                  transition={{
                    pathLength: { duration: 0.6, delay: 0.12, ease: "easeOut" },
                    opacity: { duration: 0.05, delay: 0.12, ease: "linear" },
                  }}
                />
              </>
            )}
          </svg>
        </div>
      </div>
    </div>
  );
}
