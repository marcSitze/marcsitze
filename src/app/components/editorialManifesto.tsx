"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { getDictionary, LocaleType } from "../dictionaries";
import { gsap, useGSAP, attachMagnetic, MOTION_SAFE_QUERY } from "@/lib/gsap";

export default function EditorialManifesto({
  dictionary,
  lang = "en",
  onOpenInquiry,
}: {
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
  lang?: LocaleType;
  onOpenInquiry?: () => void;
}) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const isFr = lang === "fr";

  const words = dictionary.hero.subtitle.split(" ");

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const mm = gsap.matchMedia();
      mm.add(MOTION_SAFE_QUERY, () => {
        // Word-by-word editorial text reveal on scroll
        gsap.from("[data-manifesto-word]", {
          yPercent: 110,
          opacity: 0,
          duration: 0.8,
          stagger: 0.022,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "[data-manifesto-statement]",
            start: "top 86%",
            toggleActions: "play none none reverse",
          },
        });

        // Right column editorial copy reveal
        gsap.from("[data-manifesto-copy]", {
          y: 28,
          autoAlpha: 0,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "[data-manifesto-copy]",
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        });

        // Scrubbed vertical parallax on the Electric Iris circular CTA orb
        gsap.fromTo(
          "[data-manifesto-orb]",
          { y: 45 },
          {
            y: -55,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.8,
            },
          }
        );

        // Horizontal hairline sweep
        gsap.fromTo(
          "[data-manifesto-line]",
          { scaleX: 0 },
          {
            scaleX: 1,
            transformOrigin: "left center",
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: "[data-manifesto-line]",
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );

        const magnetics = section.querySelectorAll<HTMLElement>("[data-magnetic]");
        const cleanup = attachMagnetic(magnetics, 0.32);
        return () => cleanup();
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-white px-6 sm:px-14 lg:px-24 pt-[120px] sm:pt-[155px] pb-[90px] sm:pb-[120px]"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left: 33px Editorial Statement */}
        <div className="lg:col-span-7">
          <p
            data-manifesto-statement
            className="text-[24px] sm:text-[33px] leading-[1.28] tracking-[0.02em] text-[#1c1d20] text-left"
          >
            {words.map((word, idx) => (
              <span key={idx} className="inline-block overflow-hidden align-top mr-[0.32em]">
                <span data-manifesto-word className="inline-block will-change-transform">
                  {word}
                </span>
              </span>
            ))}
          </p>
        </div>

        {/* Right: 15px Quiet Context + Single Primary Circular CTA */}
        <div className="lg:col-span-5 flex flex-col items-start gap-10">
          <div data-manifesto-copy className="space-y-5 text-left">
            <p className="text-[15px] leading-[1.66] text-[#6b6e72]">
              {isFr
                ? "Plus de 5 ans d’expérience à concevoir des applications mobiles React Native, des tableaux de bord analytiques et des plateformes de paiement fintech pour des équipes en Europe, en Amérique du Nord et en Afrique."
                : "Over 5 years engineering React Native mobile applications, real-time analytics dashboards, and resilient fintech payment platforms for distributed teams across Europe, North America, and Africa."}
            </p>

            <div className="flex flex-wrap gap-x-8 gap-y-2 text-[12px] text-[#6b6e72]">
              <span>{dictionary.hero.experienceBadge}</span>
              <span>{dictionary.hero.timezone}</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              href={`/${lang}/about`}
              data-magnetic
              className="ds-pill ds-pill-light inline-flex items-center gap-2"
            >
              <span data-magnetic-text>
                {isFr ? "À propos de moi" : "About me"}
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Hairline Divider with Parallax Primary Signature Orb */}
      <div className="relative mt-20 sm:mt-28">
        <div
          data-manifesto-line
          className="h-px w-full bg-[#1c1d20]/15 will-change-transform"
        />

        <div
          data-manifesto-orb
          className="mt-8 sm:mt-0 sm:absolute sm:right-12 lg:right-24 sm:top-1/2 sm:-translate-y-1/2 z-10 will-change-transform"
        >
          <button
            type="button"
            data-magnetic
            onClick={onOpenInquiry}
            className="w-[144px] h-[144px] sm:w-[168px] sm:h-[168px] rounded-full bg-primary hover:bg-[var(--primary-deep)] text-white text-[14px] flex items-center justify-center text-center px-4 transition-colors duration-300 cursor-pointer"
          >
            <span data-magnetic-text>{dictionary.hero.primaryCta}</span>
          </button>
        </div>
      </div>
    </section>
  );
}
