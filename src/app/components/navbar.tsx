"use client";

import Link from "next/link";
import LanguageSwitcher from "@/app/components/languageSwitcher";
import { getDictionary, LocaleType } from "../dictionaries";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { gsap, ScrollTrigger, useGSAP, attachMagnetic, MOTION_SAFE_QUERY } from "@/lib/gsap";

export default function Navbar({
  dictionary,
  lang,
}: {
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
  lang: LocaleType;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [showFloatingTrigger, setShowFloatingTrigger] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const pathname = usePathname();
  const navRef = useRef<HTMLElement | null>(null);
  const drawerRef = useRef<HTMLDivElement | null>(null);

  const isHome = pathname === `/${lang}` || pathname === `/${lang}/`;

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setShowFloatingTrigger(y > 220);

      if (!isHome) return;
      const sections = ["portfolio", "services", "experience", "contact"];
      const scrollPos = y + 260;
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            return;
          }
        }
      }
      if (y < 300) setActiveSection("");
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  useGSAP(
    () => {
      const nav = navRef.current;
      if (!nav) return;

      const mm = gsap.matchMedia();
      mm.add(MOTION_SAFE_QUERY, () => {
        const magnetics = nav.querySelectorAll<HTMLElement>("[data-magnetic]");
        const cleanup = attachMagnetic(magnetics, 0.25);
        return () => cleanup();
      });

      return () => mm.revert();
    },
    { scope: navRef }
  );

  // Animate full-height editorial drawer open/close
  useEffect(() => {
    const drawer = drawerRef.current;
    if (!drawer) return;

    if (isOpen) {
      document.body.style.overflow = "hidden";
      gsap.fromTo(
        drawer,
        { xPercent: 100 },
        { xPercent: 0, duration: 0.65, ease: "power4.out" }
      );
      gsap.fromTo(
        drawer.querySelectorAll("[data-drawer-link]"),
        { x: 48, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.55, stagger: 0.06, delay: 0.12, ease: "power3.out" }
      );
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Refresh ScrollTrigger when navigating routes
  useEffect(() => {
    setIsOpen(false);
    const id = setTimeout(() => ScrollTrigger.refresh(), 150);
    return () => clearTimeout(id);
  }, [pathname]);

  const navLinks = [
    {
      name: dictionary.nav.work || "Work",
      href: isHome ? "#portfolio" : `/${lang}#portfolio`,
      id: "portfolio",
    },
    {
      name: dictionary.nav.about || "About",
      href: `/${lang}/about`,
      id: "about",
      isRoute: true,
    },
    {
      name: dictionary.nav.contact || "Contact",
      href: isHome ? "#contact" : `/${lang}#contact`,
      id: "contact",
    },
  ];

  const navTextColor = isHome ? "text-white" : "text-[#1c1d20]";
  const navDotColor = isHome ? "bg-white" : "bg-[#1c1d20]";

  return (
    <>
      {/* Minimal Absolute Top Navigation Bar (Dennis Snellenberg Spec) */}
      <header
        ref={navRef}
        className="absolute top-0 left-0 right-0 z-40 px-5 sm:px-9 py-6"
      >
        <nav
          className="flex items-center justify-between w-full"
          aria-label="Main Navigation"
        >
          {/* Top-Left Brand Signature */}
          <Link
            href={`/${lang}`}
            data-magnetic
            className={`group inline-flex items-center gap-1.5 text-[12px] ${navTextColor} tracking-[0.05em] leading-none py-1`}
            aria-label="Marc Sitze Home"
          >
            <span className="inline-block transition-transform duration-500 ease-out group-hover:rotate-[360deg]">
              ©
            </span>
            <span data-magnetic-text className="relative overflow-hidden inline-flex">
              <span className="inline-block transition-transform duration-500 ease-out group-hover:-translate-y-full">
                Code by theblackdev
              </span>
              <span className="absolute left-0 top-full inline-block transition-transform duration-500 ease-out group-hover:-translate-y-full">
                Marc Sitze
              </span>
            </span>
          </Link>

          {/* Top-Right Desktop Links (32px gap, pure text on canvas/photo) */}
          <div className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-8">
              {navLinks.map((link) => {
                const isActive = link.isRoute
                  ? pathname.startsWith(link.href)
                  : activeSection === link.id;

                return (
                  <li key={link.id}>
                    <Link
                      href={link.href}
                      data-magnetic
                      className={`group relative inline-flex flex-col items-center text-[12px] ${navTextColor} tracking-[0.05em] leading-none py-1`}
                    >
                      <span data-magnetic-text>{link.name}</span>
                      <span
                        className={`mt-1.5 w-1 h-1 rounded-full ${navDotColor} transition-transform duration-300 ${isActive
                          ? "scale-100"
                          : "scale-0 group-hover:scale-100"
                          }`}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>

            <LanguageSwitcher tone={isHome ? "light" : "dark"} />
          </div>

          {/* Mobile Menu Trigger (Top-Right) */}
          <div className="flex md:hidden items-center gap-4">
            <LanguageSwitcher tone={isHome ? "light" : "dark"} />
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className={`inline-flex items-center gap-2 text-[12px] ${navTextColor} tracking-[0.05em]`}
              aria-label="Open navigation menu"
            >
              <span className={`w-1.5 h-1.5 rounded-full ${navDotColor}`} />
              <span>Menu</span>
            </button>
          </div>
        </nav>
      </header>

      {/* Floating Circular Menu Pill after scrolling past Hero */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        className={`fixed top-5 right-5 sm:top-7 sm:right-7 z-50 w-14 h-14 sm:w-16 sm:h-16 rounded-[36.72px] flex flex-col items-center justify-center gap-1.5 transition-all duration-300 cursor-pointer ${isOpen
          ? "bg-primary scale-100 opacity-100"
          : showFloatingTrigger
            ? "bg-[#1c1d20] ds-inset-ring-dark hover:bg-primary scale-100 opacity-100"
            : "scale-0 opacity-0 pointer-events-none"
          }`}
      >
        <span
          className={`block w-5 h-[1px] bg-white transition-transform duration-300 ${isOpen ? "rotate-45 translate-y-[3.5px]" : ""
            }`}
        />
        <span
          className={`block w-5 h-[1px] bg-white transition-transform duration-300 ${isOpen ? "-rotate-45 -translate-y-[3.5px]" : ""
            }`}
        />
      </button>

      {/* Full-Height Dark Editorial Drawer */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 transition-opacity"
          onClick={() => setIsOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Site Navigation Drawer"
        >
          <div
            ref={drawerRef}
            onClick={(e) => e.stopPropagation()}
            className="ml-auto h-full w-full max-w-[460px] bg-[#1c1d20] border-l border-white/15 px-8 sm:px-14 py-20 flex flex-col justify-between"
          >
            <div>
              <p className="text-[10px] uppercase text-[#999d9e] tracking-[0.05em] pb-5 border-b border-white/15 mb-8">
                Navigation
              </p>

              <ul className="flex flex-col gap-4">
                {navLinks.map((link) => {
                  const isActive = link.isRoute
                    ? pathname.startsWith(link.href)
                    : activeSection === link.id;
                  return (
                    <li key={link.id} data-drawer-link>
                      <Link
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className="group inline-flex items-center gap-4 text-[36px] sm:text-[48px] leading-[1.1] text-white hover:text-primary transition-colors duration-200"
                      >
                        <span
                          className={`w-2 h-2 rounded-full bg-white transition-transform duration-200 ${isActive ? "scale-100 bg-primary" : "scale-0 group-hover:scale-100"
                            }`}
                        />
                        <span>{link.name}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="pt-8 border-t border-white/15 space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase text-[#999d9e]">Language</span>
                <LanguageSwitcher />
              </div>

              <div>
                <p className="text-[10px] uppercase text-[#999d9e] mb-3">Socials</p>
                <div className="flex flex-wrap gap-5 text-[14px] text-white">
                  <a
                    href="https://github.com/marcSitze"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors"
                  >
                    GitHub
                  </a>
                  <a
                    href="https://www.linkedin.com/in/marcsitze/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors"
                  >
                    LinkedIn
                  </a>
                  <a
                    href="https://www.malt.fr/profile/marcsitze"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors"
                  >
                    Malt
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
