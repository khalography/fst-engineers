import React from "react";
import { Droplets, Globe, Award } from "lucide-react";
import { siteContent } from "@/data/content";

export default function Intro() {
  const intro = siteContent.companyIntro;

  return (
    <section
      id="intro"
      aria-label="Company Introduction"
      className="py-16 sm:py-20 lg:py-24 bg-white border-b border-slate-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        <h2 className="sr-only">Company Introduction</h2>

        {/* Company Intro Statement */}
        <div className="max-w-4xl">
          <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#10337A] leading-[1.35] tracking-tight text-justify">
            {intro.statement}
          </p>
        </div>

        {/* Three Highlights Row: Equal height, identical internal spacing, matching icon style */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {/* Card 1: 100% Hygienic and Low Maintenance */}
          <div className="bg-slate-50 rounded-xl p-8 border border-slate-200/80 flex flex-col h-full hover:shadow-md transition-all duration-300">
            <div className="w-12 h-12 rounded-lg bg-[#10337A] flex items-center justify-center text-white mb-6 shrink-0">
              <Droplets className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[#10337A] mb-3 leading-snug">
              {intro.highlights[0].title}
            </h3>
            <p className="text-[#555B61] text-base leading-relaxed text-justify">
              {intro.highlights[0].description}
            </p>
          </div>

          {/* Card 2: Global Manufacturing Partnership */}
          <div className="bg-slate-50 rounded-xl p-8 border border-slate-200/80 flex flex-col h-full hover:shadow-md transition-all duration-300">
            <div className="w-12 h-12 rounded-lg bg-[#10337A] flex items-center justify-center text-white mb-6 shrink-0">
              <Globe className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[#10337A] mb-3 leading-snug">
              {intro.highlights[1].title}
            </h3>
            <p className="text-[#555B61] text-base leading-relaxed text-justify">
              {intro.highlights[1].description}
            </p>
          </div>

          {/* Card 3: Internationally Certified */}
          <div className="bg-slate-50 rounded-xl p-8 border border-slate-200/80 flex flex-col h-full hover:shadow-md transition-all duration-300">
            <div className="w-12 h-12 rounded-lg bg-[#10337A] flex items-center justify-center text-white mb-6 shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[#10337A] mb-3 leading-snug">
              {intro.highlights[2].title}
            </h3>
            <p className="text-[#555B61] text-base leading-relaxed text-justify">
              {intro.highlights[2].description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
