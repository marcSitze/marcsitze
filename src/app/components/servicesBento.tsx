"use client";

import React, { useRef } from "react";
import { SERVICE_PACKAGES } from "@/data/resume";
import { gsap, useGSAP, attachMagnetic, MOTION_SAFE_QUERY } from "@/lib/gsap";

const SERVICE_META: Record<
  string,
  {
    index: string;
    specTag: string;
    cta: string;
  }
> = {
  "mobile-apps": {
    index: "01",
    specTag: "React Native • Expo — 60 FPS Native",
    cta: "Inquire About Mobile App",
  },
  dashboards: {
    index: "02",
    specTag: "Live Operations Console — Real-Time Data",
    cta: "Inquire About Dashboard",
  },
  "fintech-systems": {
    index: "03",
    specTag: "Gateway Success Rate — 99.4% SLA",
    cta: "Inquire About Fintech",
  },
  "frontend-arch": {
    index: "04",
    specTag: "Google Lighthouse — 99/100 Standard",
    cta: "Inquire About Architecture",
  },
};

export default function ServicesBento({
  onSelectService,
}: {
  onSelectService?: (serviceId: string) => void;
  isDark?: boolean;
}) {
  const sectionRef = useRef<HTMLElement | null>(null);

  const handleInquire = (serviceId: string) => {
    if (onSelectService) {
      onSelectService(serviceId);
    } else {
      const contactEl = document.getElementById("contact");
      if (contactEl) contactEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const mm = gsap.matchMedia();
      mm.add(MOTION_SAFE_QUERY, () => {
        // Masked headline reveal
        gsap.from("[data-services-heading]", {
          yPercent: 105,
          opacity: 0,
          duration: 0.95,
          ease: "power4.out",
          scrollTrigger: {
            trigger: "[data-services-header]",
            start: "top 86%",
            toggleActions: "play none none reverse",
          },
        });

        // Staggered card entrance
        gsap.utils.toArray<HTMLElement>("[data-service-card]").forEach((card, idx) => {
          gsap.from(card, {
            y: 60,
            autoAlpha: 0,
            duration: 0.85,
            delay: (idx % 2) * 0.1,
            ease: "power3.out",
            clearProps: "transform",
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          });

          const divider = card.querySelector<HTMLElement>("[data-service-divider]");
          if (divider) {
            gsap.fromTo(
              divider,
              { scaleX: 0 },
              {
                scaleX: 1,
                transformOrigin: "left center",
                duration: 0.9,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: card,
                  start: "top 84%",
                  toggleActions: "play none none reverse",
                },
              }
            );
          }
        });

        // Subtle opposing column parallax on desktop
        if (window.innerWidth >= 1024) {
          gsap.fromTo(
            "[data-service-col-offset]",
            { y: 36 },
            {
              y: -36,
              ease: "none",
              scrollTrigger: {
                trigger: "[data-services-grid]",
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
              },
            }
          );
        }

        const magnetics = section.querySelectorAll<HTMLElement>("[data-magnetic]");
        const cleanup = attachMagnetic(magnetics, 0.25);
        return () => cleanup();
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative w-full bg-white px-6 sm:px-14 lg:px-24 py-[110px] sm:py-[145px]"
    >
      {/* Left-Aligned Section Headline Block */}
      <div data-services-header className="max-w-3xl text-left mb-16 sm:mb-20">
        <div className="overflow-hidden">
          <h2
            data-services-heading
            className="text-[clamp(36px,5.2vw,60px)] leading-[1.07] tracking-[0.02em] text-[#1c1d20]"
          >
            Services
          </h2>
        </div>
        <p className="mt-5 text-[15px] leading-[1.66] text-[#6b6e72] max-w-2xl">
          High-leverage engineering tailored for ambitious startups and enterprises — from cross-platform mobile apps and data dashboards to resilient fintech systems.
        </p>
      </div>

      {/* Light Editorial Surface Grid: 1 Primary Accent Card + 3 Soft Neutral Cards */}
      <div
        data-services-grid
        className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-stretch"
      >
        {SERVICE_PACKAGES.map((pkg, idx) => {
          const meta = SERVICE_META[pkg.id] || {
            index: String(idx + 1).padStart(2, "0"),
            specTag: pkg.badge,
            cta: "Inquire",
          };

          // Strictly ONE primary accent card in the section
          const isAccentCard = idx === 0;
          const isOffsetColumn = idx % 2 === 1;

          return (
            <div
              key={pkg.id}
              data-service-col-offset={isOffsetColumn ? "" : undefined}
              className="will-change-transform flex"
            >
              <article
                data-service-card
                className={`w-full rounded-[10px] p-6 sm:p-9 flex flex-col justify-between text-left ${
                  isAccentCard
                    ? "bg-primary text-white"
                    : "bg-[#f3f3f4] text-[#1c1d20]"
                }`}
              >
                <div>
                  {/* Metadata Caption Row */}
                  <div className="flex items-center justify-between gap-4 mb-7">
                    <span
                      className={`text-[12px] ${
                        isAccentCard ? "text-white/85" : "text-[#6b6e72]"
                      }`}
                    >
                      {meta.index} — {pkg.badge}
                    </span>
                    <span
                      className={`text-[10px] uppercase ${
                        isAccentCard ? "text-white/80" : "text-[#6b6e72]"
                      }`}
                    >
                      {meta.specTag}
                    </span>
                  </div>

                  {/* Card Title */}
                  <h3
                    className={`text-[26px] sm:text-[33px] leading-[1.18] mb-4 ${
                      isAccentCard ? "text-white" : "text-[#1c1d20]"
                    }`}
                  >
                    {pkg.title}
                  </h3>

                  {/* Body Copy */}
                  <p
                    className={`text-[15px] leading-[1.66] mb-8 ${
                      isAccentCard ? "text-white/90" : "text-[#6b6e72]"
                    }`}
                  >
                    {pkg.tagline}
                  </p>

                  {/* Hairline Divider */}
                  <div
                    data-service-divider
                    className={`h-px w-full mb-6 will-change-transform ${
                      isAccentCard ? "bg-white/25" : "bg-[#1c1d20]/12"
                    }`}
                  />

                  {/* Deliverables */}
                  <ul className="space-y-3 mb-9">
                    {pkg.deliverables.map((item, i) => (
                      <li
                        key={i}
                        className={`flex items-start gap-3 text-[14px] leading-[1.5] ${
                          isAccentCard ? "text-white/95" : "text-[#1c1d20]/90"
                        }`}
                      >
                        <span
                          className={`mt-2 w-1 h-1 rounded-full shrink-0 ${
                            isAccentCard ? "bg-white" : "bg-[#1c1d20]"
                          }`}
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Footer Action Row */}
                <div
                  className={`pt-6 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-5 ${
                    isAccentCard ? "border-white/25" : "border-[#1c1d20]/12"
                  }`}
                >
                  <p
                    className={`text-[12px] leading-[1.45] max-w-xs ${
                      isAccentCard ? "text-white/85" : "text-[#6b6e72]"
                    }`}
                  >
                    {pkg.bestFor}
                  </p>

                  <button
                    type="button"
                    data-magnetic
                    onClick={() => handleInquire(pkg.id)}
                    className={`ds-pill shrink-0 inline-flex items-center gap-3 cursor-pointer ${
                      isAccentCard
                        ? "bg-[#1c1d20] text-white hover:bg-[var(--primary-deep)] ds-inset-ring-dark"
                        : "ds-pill-light"
                    }`}
                  >
                    <span data-magnetic-text>{meta.cta}</span>
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 14 14"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                      aria-hidden="true"
                    >
                      <path d="M2 2L12 12" />
                      <path d="M12 4V12H4" />
                    </svg>
                  </button>
                </div>
              </article>
            </div>
          );
        })}
      </div>
    </section>
  );
}
