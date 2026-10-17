import React from "react";
import { siteContent } from "@/data/content";
import AboutSlideshow from "@/components/AboutSlideshow";

export default function About() {
  const about = siteContent.about;

  return (
    <section
      id="about"
      aria-label="About Us"
      className="py-16 sm:py-20 lg:py-24 bg-white border-b border-slate-100 scroll-mt-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 lg:space-y-16">
        {/* Desktop 2-column: Story on left, Slideshow on right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Story Column */}
          <div id="about-story" className="lg:col-span-7 space-y-6 scroll-mt-24">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#10337A] tracking-tight">
              {about.heading}
            </h2>

            <div className="space-y-4 text-base sm:text-lg text-[#555B61] leading-relaxed text-justify">
              {about.story.paragraphs.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>

            {/* Pull-quote with gold accent line beside it */}
            <div className="border-l-4 border-[#C5A253] pl-4 sm:pl-5 py-2 my-6 bg-slate-50/60 rounded-r-lg">
              <p className="text-lg sm:text-xl font-bold text-[#10337A] italic leading-snug">
                &ldquo;{about.story.pullQuote}&rdquo;
              </p>
            </div>
          </div>

          {/* Right: About Us Slideshow */}
          <div className="lg:col-span-5">
            <AboutSlideshow />
          </div>
        </div>

        {/* Full-width row with Mission and Vision as two equal blocks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
          {/* Mission */}
          <div
            id="about-mission"
            className="bg-slate-50 rounded-xl p-8 border border-slate-200/80 scroll-mt-24 hover:shadow-sm transition-shadow"
          >
            <h3 className="text-xl sm:text-2xl font-bold text-[#10337A] mb-3">
              {about.mission.heading}
            </h3>
            <p className="text-[#555B61] text-base leading-relaxed text-justify">
              {about.mission.text}
            </p>
          </div>

          {/* Vision */}
          <div
            id="about-vision"
            className="bg-slate-50 rounded-xl p-8 border border-slate-200/80 scroll-mt-24 hover:shadow-sm transition-shadow"
          >
            <h3 className="text-xl sm:text-2xl font-bold text-[#10337A] mb-3">
              {about.vision.heading}
            </h3>
            <p className="text-[#555B61] text-base leading-relaxed text-justify">
              {about.vision.text}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
