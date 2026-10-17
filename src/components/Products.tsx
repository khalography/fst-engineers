import React from "react";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { siteContent } from "@/data/content";
import GrpSlideshow from "@/components/GrpSlideshow";
import SteelSlideshow from "@/components/SteelSlideshow";

export default function Products() {
  const products = siteContent.products;
  const p1 = products.product1;
  const p2 = products.product2;

  return (
    <section
      id="products"
      aria-label="Products"
      className="py-16 sm:py-20 lg:py-24 bg-slate-50/60 border-b border-slate-100 scroll-mt-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 lg:space-y-24">
        {/* Section Heading */}
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#10337A] tracking-tight">
            {products.heading}
          </h2>
        </div>

        {/* PRODUCT 1: GRP/FRP Fibre Tank (Image Left / Text Right) */}
        <div id="product-grp" className="space-y-12 scroll-mt-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Image Slot Left: GRP Tank Slideshow */}
            <div className="lg:col-span-5 order-2 lg:order-1">
              <GrpSlideshow />
            </div>

            {/* Text Content Right */}
            <div className="lg:col-span-7 order-1 lg:order-2 space-y-5">
              <h3 className="text-2xl sm:text-3xl font-bold text-[#10337A] tracking-tight">
                {p1.title}
              </h3>

              <div className="space-y-4 text-base sm:text-lg text-[#555B61] leading-relaxed text-justify">
                {p1.paragraphs.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>

              {/* Closing line (quiet highlight style) */}
              <div className="p-4 rounded-lg bg-white border border-slate-200/90 text-[#10337A] font-semibold text-sm sm:text-base leading-relaxed">
                {p1.closingLine}
              </div>
            </div>
          </div>

          {/* Sub-section A: Physical Properties */}
          <div id="product-properties" className="space-y-4 scroll-mt-24 pt-4">
            <h4 className="text-xl sm:text-2xl font-bold text-[#10337A]">
              {p1.properties.title}
            </h4>

            {/* Responsive Table: scrolls horizontally inside container with no page overflow */}
            <div className="w-full overflow-x-auto rounded-lg border border-slate-200 bg-white shadow-sm">
              <table className="w-full min-w-[560px] table-fixed border-collapse">
                <thead>
                  <tr className="bg-[#10337A] text-white">
                    <th
                      scope="col"
                      className="w-[46%] py-3.5 px-6 font-semibold text-xs sm:text-sm tracking-wider uppercase text-left"
                    >
                      {p1.properties.columns[0]}
                    </th>
                    <th
                      scope="col"
                      className="w-[27%] py-3.5 px-4 font-semibold text-xs sm:text-sm tracking-wider uppercase text-center"
                    >
                      {p1.properties.columns[1]}
                    </th>
                    <th
                      scope="col"
                      className="w-[27%] py-3.5 px-4 font-semibold text-xs sm:text-sm tracking-wider uppercase text-center"
                    >
                      {p1.properties.columns[2]}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-[#555B61]">
                  {p1.properties.rows.map((row, idx) => (
                    <tr
                      key={idx}
                      className={idx % 2 === 0 ? "bg-white" : "bg-slate-50/50"}
                    >
                      <td className="py-3.5 px-6 font-medium text-[#10337A] text-left">
                        {row.property}
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-[#10337A] text-center">
                        {row.grp}
                      </td>
                      <td className="py-3.5 px-4 font-medium text-center">
                        {row.tolerance}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Sub-section B: GRP/FRP Tank Specification */}
          <div id="product-specification" className="space-y-4 scroll-mt-24 pt-4">
            <h4 className="text-xl sm:text-2xl font-bold text-[#10337A]">
              {p1.specifications.title}
            </h4>

            {/* Two-column label/value list with thin dividers */}
            <div className="divide-y divide-slate-200 rounded-lg border border-slate-200 bg-white shadow-sm overflow-hidden">
              {p1.specifications.items.map((item, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-1 sm:grid-cols-12 gap-1.5 sm:gap-4 p-4 hover:bg-slate-50/50 transition-colors"
                >
                  <div className="sm:col-span-5 font-bold text-[#10337A] text-sm">
                    {item.label}
                  </div>
                  <div className="sm:col-span-7 text-[#555B61] text-sm leading-relaxed">
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sub-section C: Advantages of GRP Fibre Tank */}
          <div id="product-advantages" className="space-y-4 scroll-mt-24 pt-4">
            <h4 className="text-xl sm:text-2xl font-bold text-[#10337A]">
              {p1.advantages.title}
            </h4>

            {/* Grid of 9 short items (3 cols desktop, 2 tablet, 1 mobile) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {p1.advantages.items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-3.5 rounded-lg bg-white border border-slate-200/80 hover:border-[#1E9BD0]/40 transition-colors"
                >
                  <Check className="w-4 h-4 text-[#1E9BD0] shrink-0" />
                  <span className="text-sm font-medium text-[#10337A]">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* PRODUCT 2: Pressed Steel Tank (Reversed: Text Left / Image Right) */}
        <div
          id="product-pressed-steel"
          className="pt-10 border-t border-slate-200 scroll-mt-24"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Text Content Left */}
            <div className="lg:col-span-7 space-y-5">
              <h3 className="text-2xl sm:text-3xl font-bold text-[#10337A] tracking-tight">
                {p2.title}
              </h3>

              <p className="text-base sm:text-lg text-[#555B61] leading-relaxed text-justify">
                {p2.description}
              </p>

              {/* Closing line (quiet highlight style) */}
              <div className="p-4 rounded-lg bg-white border border-slate-200/90 text-[#10337A] font-semibold text-sm sm:text-base leading-relaxed">
                {p2.closingLine}
              </div>

              {/* Request a Quote Button */}
              <div className="pt-2">
                <Link
                  href="#contact"
                  className="inline-flex items-center gap-2 bg-[#10337A] hover:bg-[#16439B] active:bg-[#0A2254] text-white font-semibold text-sm sm:text-base px-6 py-3 rounded transition-colors duration-200 border-b-2 border-[#C5A253] focus:outline-none focus:ring-2 focus:ring-[#1E9BD0]"
                >
                  <span>{p2.ctaButton}</span>
                  <ArrowRight className="w-4 h-4 text-[#C5A253]" />
                </Link>
              </div>
            </div>

            {/* Image Slot Right: Pressed Steel Tank Slideshow */}
            <div className="lg:col-span-5">
              <SteelSlideshow />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
