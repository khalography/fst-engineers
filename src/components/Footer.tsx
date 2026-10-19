"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUp, Phone, Mail, MapPin } from "lucide-react";
import { siteContent } from "@/data/content";

export default function Footer() {
  const brand = siteContent.brand;
  const nav = siteContent.nav;
  const contact = siteContent.contact;
  const currentYear = new Date().getFullYear();

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
        {/* Top Section: Desktop 3 groups (row), Tablet Logo+Nav row / Contact below, Mobile stacked */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 items-start pb-10 border-b border-white/10">
          {/* 1. Logo Panel */}
          <div className="col-span-1 md:col-start-1 md:row-start-1 lg:col-span-3 lg:row-start-1">
            <div className="inline-block bg-white px-4 py-2.5 rounded-lg border border-slate-200">
              <Image
                src={brand.logo}
                alt={brand.logoAlt}
                width={160}
                height={107}
                sizes="160px"
                style={{ width: "auto" }}
                className="h-[48px] sm:h-[52px] w-auto object-contain"
              />
            </div>
          </div>

          {/* 2. Contact Details Column */}
          <div className="col-span-1 md:col-span-2 md:row-start-2 lg:col-span-5 lg:col-start-4 lg:row-start-1 flex flex-col space-y-1">
            {/* Phone lines */}
            {contact.phone.numbers.map((num) => (
              <a
                key={num.href}
                href={num.href}
                className="min-h-[44px] inline-flex items-center gap-2.5 text-[15px] text-white/85 hover:text-white hover:underline underline-offset-2 transition-colors select-text group"
                aria-label={`Call FST Engineering at ${num.display}`}
              >
                <Phone className="w-4 h-4 shrink-0 text-white/85 group-hover:text-white transition-colors" aria-hidden="true" />
                <span>{num.display}</span>
              </a>
            ))}

            {/* Email line */}
            <a
              href={contact.email.href}
              className="min-h-[44px] inline-flex items-center gap-2.5 text-[15px] text-white/85 hover:text-white hover:underline underline-offset-2 transition-colors break-all sm:break-normal group"
              aria-label={`Email FST Engineering at ${contact.email.display}`}
            >
              <Mail className="w-4 h-4 shrink-0 text-white/85 group-hover:text-white transition-colors" aria-hidden="true" />
              <span>{contact.email.display}</span>
            </a>

            {/* Address line */}
            <a
              href={contact.address.href}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[44px] flex items-start sm:items-center gap-2.5 py-2 text-[15px] text-white/85 hover:text-white hover:underline underline-offset-2 transition-colors break-words leading-relaxed group"
              aria-label={contact.address.ariaLabel}
            >
              <MapPin className="w-4 h-4 shrink-0 text-white/85 mt-1 sm:mt-0 group-hover:text-white transition-colors" aria-hidden="true" />
              <span>{contact.address.display}</span>
            </a>
          </div>

          {/* 3. Navigation Links */}
          <nav
            className="col-span-1 md:col-start-2 md:row-start-1 md:justify-self-end lg:col-span-4 lg:col-start-9 lg:row-start-1 lg:justify-self-end flex flex-wrap items-center gap-6 sm:gap-8 pt-1 sm:pt-2 lg:pt-2.5"
            aria-label="Footer Navigation"
          >
            {nav.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="min-h-[44px] flex items-center text-sm font-medium text-slate-200 hover:text-white transition-colors"
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
            <span>© {currentYear} FST Engineering. All rights reserved.</span>
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
