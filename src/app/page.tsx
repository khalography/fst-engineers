import React from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import About from "@/components/About";
import Products from "@/components/Products";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import SwooshAccent from "@/components/SwooshAccent";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-[#555B61]">
      {/* 1. Header with logo and navigation */}
      <Header />

      <main className="flex-1">
        <h1 className="sr-only">
          FST Engineering: GRP Fiber and Pressed Steel Water Tanks in Nigeria
        </h1>

        {/* 2. Hero Section with Carousel and Framer Motion overlay */}
        <Hero />

        {/* 3. Company Introduction with 3 highlights & standard strip */}
        <Intro />

        {/* Seam 1: Intro to About */}
        <SwooshAccent />

        {/* 4. About Us Section (editorial layout, stats, facility image) */}
        <About />

        {/* Seam 2: About to Products */}
        <SwooshAccent />

        {/* 5. Products Section (modular FRP, pressed steel, stainless, elevated staging) */}
        <Products />

        {/* Seam 3: Products to Testimonials */}
        <SwooshAccent />

        {/* 6. Testimonials Section (What Our Clients Say) */}
        <Testimonials />

        {/* Seam 4: Testimonials to Contact */}
        <SwooshAccent />

        {/* 7. Contact Us Section (Contact card with Phone, Email, WhatsApp) */}
        <Contact />
      </main>

      {/* 8. Footer (Navy background, logo, links, certifications) */}
      <Footer />
    </div>
  );
}
