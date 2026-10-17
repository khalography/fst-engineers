"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, ArrowUpRight, ChevronDown } from "lucide-react";
import { siteContent, NavItem } from "@/data/content";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<{ [key: string]: boolean }>({
    "About Us": true,
    Products: true,
  });

  const headerRef = useRef<HTMLElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Active section scroll spy
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      const sections = ["about", "products", "testimonials", "contact"];
      const scrollPosition = window.scrollY + 160;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sectionId = sections[i];
        const el = document.getElementById(sectionId);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sectionId);
          break;
        }
      }

      if (window.scrollY < 200) {
        setActiveSection("");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle outside click & Escape key for desktop dropdowns
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenDropdown(null);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleMouseEnter = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpenDropdown(label);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 150);
  };

  const toggleMobileAccordion = (label: string) => {
    setMobileExpanded((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  const handleMobileNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header
      id="site-header"
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm py-2 sm:py-2.5 border-b border-slate-100"
          : "bg-white py-2.5 sm:py-3 border-b border-slate-100/60"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo strictly ~44px height, width auto, object-contain, original colors, no filters */}
          <Link
            href="/"
            className="flex items-center focus:outline-none focus:ring-2 focus:ring-[#1E9BD0] rounded"
            aria-label="FST Engineering Home"
          >
            <Image
              src={siteContent.brand.logo}
              alt={siteContent.brand.logoAlt}
              width={200}
              height={54}
              priority
              style={{ width: "auto" }}
              className="h-[50px] sm:h-[54px] w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation with Hover/Focus Dropdowns */}
          {/* Main Navigation (Note: Gallery returns when gallery images are supplied) */}
          <nav
            className="hidden md:flex items-center gap-7 lg:gap-8"
            aria-label="Main Navigation"
          >
            {siteContent.nav.map((item: NavItem) => {
              const targetId = item.href.replace("#", "");
              const isActive = activeSection === targetId;
              const hasDropdown = Boolean(item.children && item.children.length > 0);
              const isDropdownOpen = openDropdown === item.label;

              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => hasDropdown && handleMouseEnter(item.label)}
                  onMouseLeave={() => hasDropdown && handleMouseLeave()}
                >
                  <div className="flex items-center gap-1">
                    <Link
                      href={item.href}
                      onClick={() => setOpenDropdown(null)}
                      onFocus={() => hasDropdown && setOpenDropdown(item.label)}
                      className={`text-[15px] font-medium transition-colors duration-200 relative py-1 focus:outline-none focus:ring-0 outline-none select-none ${
                        isActive
                          ? "text-[#10337A] font-semibold"
                          : "text-[#555B61] hover:text-[#10337A]"
                      }`}
                    >
                      {item.label}
                      {isActive && (
                        <span
                          className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#1E9BD0] rounded-full"
                          aria-hidden="true"
                        />
                      )}
                    </Link>

                    {hasDropdown && (
                      <button
                        type="button"
                        aria-expanded={isDropdownOpen}
                        aria-label={`Toggle ${item.label} menu`}
                        onClick={() =>
                          setOpenDropdown(isDropdownOpen ? null : item.label)
                        }
                        className="p-1 text-slate-400 hover:text-[#10337A] focus:outline-none focus:ring-0 outline-none"
                      >
                        <ChevronDown
                          className={`w-3.5 h-3.5 transition-transform duration-200 ${
                            isDropdownOpen ? "rotate-180 text-[#1E9BD0]" : ""
                          }`}
                        />
                      </button>
                    )}
                  </div>

                  {/* Desktop Dropdown Panel with 200ms fade transition */}
                  {hasDropdown && (
                    <div
                      className={`absolute top-full left-0 mt-2 py-2 bg-white rounded-lg border border-slate-200 shadow-md min-w-[230px] z-50 transition-all duration-200 ease-out ${
                        isDropdownOpen
                          ? "opacity-100 visible translate-y-0 pointer-events-auto"
                          : "opacity-0 invisible -translate-y-1 pointer-events-none"
                      }`}
                      role="menu"
                      aria-label={`${item.label} submenu`}
                    >
                      {item.children?.map((subItem) => (
                        <Link
                          key={subItem.label}
                          href={subItem.href}
                          role="menuitem"
                          onClick={() => setOpenDropdown(null)}
                          onFocus={() => setOpenDropdown(item.label)}
                          className="block px-4 py-2 text-sm text-[#10337A] hover:text-[#1E9BD0] hover:bg-slate-50 transition-colors font-medium focus:outline-none focus:bg-slate-50 focus:text-[#1E9BD0] focus:ring-0 outline-none"
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Right CTA Button & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <Link
              href={siteContent.ctaButton.href}
              className="hidden sm:inline-flex items-center gap-1.5 bg-[#10337A] hover:bg-[#16439B] active:bg-[#0A2254] text-white text-[13px] font-semibold tracking-wide uppercase px-4 py-2.5 rounded transition-all duration-200 border-b-2 border-[#C5A253] focus:outline-none focus:ring-0 outline-none"
            >
              <span>{siteContent.ctaButton.label}</span>
              <ArrowUpRight className="w-4 h-4 text-[#C5A253]" />
            </Link>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded text-[#10337A] hover:bg-slate-100 transition-colors focus:outline-none focus:ring-0 outline-none"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Navigation with Accordions */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 pt-3 pb-4 border-t border-slate-100 bg-white max-h-[calc(100vh-80px)] overflow-y-auto">
            <nav className="flex flex-col gap-1" aria-label="Mobile Navigation">
              {siteContent.nav.map((item: NavItem) => {
                const targetId = item.href.replace("#", "");
                const isActive = activeSection === targetId;
                const hasChildren = Boolean(item.children && item.children.length > 0);
                const isExpanded = mobileExpanded[item.label] ?? false;

                return (
                  <div key={item.label} className="border-b border-slate-50 last:border-b-0 pb-1">
                    <div className="flex items-center justify-between">
                      <Link
                        href={item.href}
                        onClick={handleMobileNavClick}
                        className={`flex-1 px-3 py-2 rounded text-base font-medium transition-colors ${
                          isActive
                            ? "bg-[#1E9BD0]/10 text-[#10337A] font-semibold border-l-4 border-[#10337A]"
                            : "text-[#555B61] hover:bg-slate-50 hover:text-[#10337A]"
                        }`}
                      >
                        {item.label}
                      </Link>

                      {hasChildren && (
                        <button
                          type="button"
                          onClick={() => toggleMobileAccordion(item.label)}
                          className="p-2 text-slate-500 hover:text-[#10337A]"
                          aria-label={`Toggle ${item.label} accordion`}
                        >
                          <ChevronDown
                            className={`w-4 h-4 transition-transform duration-200 ${
                              isExpanded ? "rotate-180 text-[#1E9BD0]" : ""
                            }`}
                          />
                        </button>
                      )}
                    </div>

                    {/* Accordion Sub-items */}
                    {hasChildren && isExpanded && (
                      <div className="pl-5 pr-2 py-1 space-y-1 bg-slate-50/50 rounded-lg my-1">
                        {item.children?.map((sub) => (
                          <Link
                            key={sub.label}
                            href={sub.href}
                            onClick={handleMobileNavClick}
                            className="block px-3 py-2 rounded text-sm text-[#555B61] hover:text-[#10337A] hover:bg-white font-medium transition-colors"
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}

              <div className="pt-3 mt-2 border-t border-slate-100">
                <Link
                  href={siteContent.ctaButton.href}
                  onClick={handleMobileNavClick}
                  className="w-full flex items-center justify-center gap-1.5 bg-[#10337A] text-white text-sm font-semibold tracking-wide uppercase py-3 rounded border-b-2 border-[#C5A253]"
                >
                  <span>{siteContent.ctaButton.label}</span>
                  <ArrowUpRight className="w-4 h-4 text-[#C5A253]" />
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
