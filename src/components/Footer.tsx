"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { siteContent } from "@/data/content";

export default function Footer() {
  const brand = siteContent.brand;
  const nav = siteContent.nav;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      id="site-footer"
      aria-label="Site Footer"
      className="bg-[#10337A] text-white py-12 sm:py-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-10 border-b border-white/10">
          {/* Logo strictly on a white panel, original colors, no filters, ~44px height, width auto */}
          <div className="inline-block bg-white px-4 py-2.5 rounded-lg border border-slate-200">
            <Image
              src={brand.logo}
              alt={brand.logoAlt}
              width={200}
              height={52}
              style={{ width: "auto" }}
              className="h-[48px] sm:h-[52px] w-auto object-contain"
            />
          </div>

          {/* Navigation Links (Note: Gallery returns when gallery images are supplied) */}
          <nav className="flex flex-wrap items-center gap-6 sm:gap-8" aria-label="Footer Navigation">
            {nav.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-slate-200 hover:text-white transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
          {/* Copyright & Back to Top */}
          <div className="flex items-center gap-6 text-xs text-slate-300 w-full sm:w-auto justify-between sm:justify-start">
            <span>© FST Engineering</span>
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-xs text-slate-300 hover:text-white transition-colors p-1"
              aria-label="Scroll back to top"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Credit */}
          <p className="text-[13px] text-white/70 w-full sm:w-auto text-left sm:text-right">
            Designed and built by{" "}
            <a
              href="https://ibraheemqazeem.vercel.app/#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-white transition-colors underline-offset-2 hover:underline"
            >
              Caligraphy
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
