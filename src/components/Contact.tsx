"use client";

import React from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Phone, Mail, ArrowUpRight, MapPin } from "lucide-react";
import { siteContent } from "@/data/content";

export default function Contact() {
  const contact = siteContent.contact;
  const shouldReduceMotion = useReducedMotion();

  const cardVariants: Variants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 24,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.01 : 0.45,
        ease: "easeOut" as const,
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 14,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.01 : 0.4,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <section
      id="contact"
      aria-label="Contact Us"
      className="py-16 sm:py-20 lg:py-24 bg-slate-50/60 border-b border-slate-100 scroll-mt-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        {/* Section Heading */}
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#10337A] tracking-tight">
            {contact.heading}
          </h2>
        </div>

        {/* Full-width Contact Card with 3 equal items */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={cardVariants}
          className="bg-white rounded-xl border border-slate-200/90 shadow-sm overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-slate-200/80">
            {/* 1. Phone */}
            <motion.div
              variants={itemVariants}
              className="group flex flex-col justify-between p-8 sm:p-10 hover:bg-slate-50/70 transition-colors duration-200 min-h-[160px]"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#10337A] flex items-center justify-center text-white shrink-0 group-hover:scale-105 transition-transform duration-200 shadow-sm">
                  <Phone className="w-6 h-6 text-white" aria-hidden="true" />
                </div>
                <div>
                  <span className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                    {contact.phone.label}
                  </span>
                  <div className="space-y-1">
                    {contact.phone.numbers.map((item) => (
                      <a
                        key={item.href}
                        href={item.href}
                        className="block text-base sm:text-lg font-semibold text-[#10337A] hover:text-[#1E9BD0] transition-colors select-text tracking-tight"
                        aria-label={`Call FST Engineering at ${item.display}`}
                      >
                        {item.display}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <a
                href={contact.phone.href}
                className="pt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[#1E9BD0] hover:text-[#10337A] transition-colors group-hover:translate-x-0.5 duration-200 w-fit"
              >
                <span>{contact.phone.action}</span>
                <ArrowUpRight className="w-4 h-4 text-[#1E9BD0]" />
              </a>
            </motion.div>

            {/* 2. Email */}
            <motion.div
              variants={itemVariants}
              className="group flex flex-col justify-between p-8 sm:p-10 hover:bg-slate-50/70 transition-colors duration-200 min-h-[160px]"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#10337A] flex items-center justify-center text-white shrink-0 group-hover:scale-105 transition-transform duration-200 shadow-sm">
                  <Mail className="w-6 h-6 text-white" aria-hidden="true" />
                </div>
                <div>
                  <span className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                    {contact.email.label}
                  </span>
                  <div className="space-y-1">
                    {contact.email.emails && contact.email.emails.length > 0 ? (
                      contact.email.emails.map((item) => (
                        <a
                          key={item.href}
                          href={item.href}
                          className="block text-base sm:text-lg font-semibold text-[#10337A] hover:text-[#1E9BD0] transition-colors select-text break-all sm:break-normal leading-snug"
                          aria-label={`Email FST Engineering at ${item.display}`}
                        >
                          {item.display}
                        </a>
                      ))
                    ) : (
                      <a
                        href={contact.email.href}
                        className="block text-base sm:text-lg font-semibold text-[#10337A] hover:text-[#1E9BD0] transition-colors select-text break-all sm:break-normal leading-snug"
                        aria-label={`Email FST Engineering at ${contact.email.display}`}
                      >
                        {contact.email.display}
                      </a>
                    )}
                  </div>
                </div>
              </div>
              <a
                href={contact.email.href}
                className="pt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[#1E9BD0] hover:text-[#10337A] transition-colors group-hover:translate-x-0.5 duration-200 w-fit"
              >
                <span>{contact.email.action}</span>
                <ArrowUpRight className="w-4 h-4 text-[#1E9BD0]" />
              </a>
            </motion.div>

            {/* 3. WhatsApp */}
            <motion.a
              href={contact.whatsapp.href}
              target="_blank"
              rel="noopener noreferrer"
              variants={itemVariants}
              aria-label={contact.whatsapp.ariaLabel}
              className="group flex flex-col justify-between p-8 sm:p-10 hover:bg-slate-50/70 transition-colors duration-200 min-h-[160px] focus:outline-none focus:bg-slate-50/70"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#25D366] flex items-center justify-center text-white shrink-0 group-hover:scale-105 transition-transform duration-200 shadow-sm">
                  {/* Official WhatsApp Vector Glyph */}
                  <svg
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    fill="currentColor"
                    className="w-6 h-6 text-white"
                    aria-hidden="true"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.05 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </div>
                <div>
                  <span className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                    {contact.whatsapp.label}
                  </span>
                  <span className="block text-lg sm:text-xl font-semibold text-[#10337A] select-text tracking-tight">
                    {contact.whatsapp.display}
                  </span>
                </div>
              </div>
              <div className="pt-6 flex items-center gap-1.5 text-sm font-semibold text-[#1E9BD0] group-hover:translate-x-0.5 transition-transform">
                <span>{contact.whatsapp.action}</span>
                <ArrowUpRight className="w-4 h-4 text-[#1E9BD0]" />
              </div>
            </motion.a>
          </div>

          {/* 4. Office Address */}
          <motion.a
            href={contact.address.href}
            target="_blank"
            rel="noopener noreferrer"
            variants={itemVariants}
            aria-label="Get directions to the FST Engineering office on Google Maps"
            className="group flex flex-col lg:flex-row lg:items-center justify-between p-8 sm:p-10 hover:bg-slate-50/70 transition-colors duration-200 border-t border-[#DDE5EE] focus:outline-none focus:bg-slate-50/70"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#10337A] flex items-center justify-center text-white shrink-0 group-hover:scale-105 transition-transform duration-200 shadow-sm">
                <MapPin className="w-6 h-6 text-white" aria-hidden="true" />
              </div>
              <div>
                <span className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  {contact.address.label}
                </span>
                <span className="block text-base sm:text-lg font-semibold text-[#10337A] select-text tracking-tight max-w-[260px] sm:max-w-none">
                  {contact.address.display}
                </span>
              </div>
            </div>
            <div className="pt-6 lg:pt-0 flex items-center gap-1.5 text-sm font-semibold text-[#1E9BD0] group-hover:translate-x-0.5 transition-transform shrink-0">
              <span>{contact.address.action}</span>
              <ArrowUpRight className="w-4 h-4 text-[#1E9BD0]" />
            </div>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
