"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { MarcAbout } from "@/assets";
import { Check, Copy } from "lucide-react";
import { getDictionary, LocaleType } from "../dictionaries";
import InquiryModal from "./inquiryModal";
import { AnalyticsEvents } from "@/lib/analytics";
import { gsap, useGSAP, attachMagnetic, MOTION_SAFE_QUERY } from "@/lib/gsap";

export default function Contact({
  dictionary,
}: {
  isDark?: boolean;
  lang?: LocaleType;
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
}) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    AnalyticsEvents.emailCopied();
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText("marcsitze01@gmail.com");
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const whatsappDirectUrl =
    "https://wa.me/237699576276?text=" +
    encodeURIComponent(
      "Hi Marc! I visited your portfolio and would like to discuss a freelance project."
    );

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const mm = gsap.matchMedia();
      mm.add(MOTION_SAFE_QUERY, () => {
        // Masked 88px editorial headline lines
        gsap.from("[data-contact-line]", {
          yPercent: 110,
          opacity: 0,
          duration: 1,
          stagger: 0.12,
          ease: "power4.out",
          scrollTrigger: {
            trigger: section,
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        });

        // Iconic Dennis Snellenberg horizontal scrubbed parallax on Electric Iris orb across divider
        gsap.fromTo(
          "[data-contact-orb]",
          { x: -70 },
          {
            x: 36,
            ease: "none",
            scrollTrigger: {
              trigger: "[data-contact-divider-wrap]",
              start: "top 95%",
              end: "bottom 35%",
              scrub: 0.7,
            },
          }
        );

        // Arrow rotation scrubbed with scroll
        gsap.fromTo(
          "[data-contact-arrow]",
          { rotation: -20 },
          {
            rotation: 15,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.8,
            },
          }
        );

        // Staggered pill links
        gsap.from("[data-contact-pill]", {
          y: 24,
          autoAlpha: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: "power3.out",
          clearProps: "transform",
          scrollTrigger: {
            trigger: "[data-contact-pills]",
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        });

        const magnetics = section.querySelectorAll<HTMLElement>("[data-magnetic]");
        const cleanup = attachMagnetic(magnetics, 0.3);
        return () => cleanup();
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative w-full bg-[#1c1d20] px-6 sm:px-14 lg:px-24 pt-[120px] sm:pt-[160px] pb-[70px] border-t border-white/15"
    >
      {/* Top Massive Editorial Headline with Inline Portrait (Dennis Snellenberg Footer Pattern) */}
      <div className="flex items-end justify-between gap-8">
        <div className="text-left">
          <div className="flex items-center gap-4 sm:gap-6 overflow-hidden">
            <div
              data-contact-line
              className="relative w-14 h-14 sm:w-20 sm:h-20 rounded-full overflow-hidden shrink-0 bg-[#494a4d]"
            >
              <Image
                src={MarcAbout}
                alt="Marc Sitze"
                fill
                sizes="80px"
                className="object-cover object-top"
              />
            </div>
            <h2
              data-contact-line
              className="text-[clamp(40px,7vw,88px)] leading-[1.06] tracking-[0.05em] text-white"
            >
              {dictionary.getinTouch.title}
            </h2>
          </div>

          <div className="overflow-hidden mt-1">
            <p
              data-contact-line
              className="text-[clamp(40px,7vw,88px)] leading-[1.06] tracking-[0.05em] text-white"
            >
              Let&apos;s work together
            </p>
          </div>
        </div>

        {/* Thin 1px directional arrow */}
        <svg
          data-contact-arrow
          width="22"
          height="22"
          viewBox="0 0 18 18"
          fill="none"
          stroke="#ffffff"
          strokeWidth="1"
          aria-hidden="true"
          className="hidden sm:block mb-4 shrink-0 will-change-transform"
        >
          <path d="M16 2L2 16" />
          <path d="M2 5V16H13" />
        </svg>
      </div>

      {/* Hairline Divider + Scrubbed Horizontal Parallax Electric Iris Button */}
      <div
        data-contact-divider-wrap
        className="relative my-16 sm:my-24 flex items-center"
      >
        <div className="h-px w-full bg-white/15" />

        <div
          data-contact-orb
          className="absolute right-6 sm:right-20 lg:right-32 top-1/2 -translate-y-1/2 z-10 will-change-transform"
        >
          <button
            type="button"
            data-magnetic
            onClick={() => setIsInquiryOpen(true)}
            className="w-[144px] h-[144px] sm:w-[176px] sm:h-[176px] rounded-full bg-primary hover:bg-[var(--primary-deep)] text-white text-[14px] tracking-[0.05em] flex items-center justify-center text-center px-4 transition-colors duration-300 cursor-pointer"
          >
            <span data-magnetic-text>Get in touch</span>
          </button>
        </div>
      </div>

      {/* Inset-Border Pill Links Row */}
      <div
        data-contact-pills
        className="pt-8 sm:pt-4 flex flex-wrap items-center gap-4 text-left"
      >
        <button
          type="button"
          data-contact-pill
          data-magnetic
          onClick={handleCopyEmail}
          className="ds-pill ds-pill-dark inline-flex items-center gap-3 cursor-pointer"
        >
          <span data-magnetic-text>marcsitze01@gmail.com</span>
          {copied ? <Check size={14} /> : <Copy size={14} className="text-[#999d9e]" />}
        </button>

        <a
          data-contact-pill
          data-magnetic
          href={whatsappDirectUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => AnalyticsEvents.whatsappClicked("contact_section")}
          className="ds-pill ds-pill-dark inline-flex items-center gap-3"
        >
          <span data-magnetic-text>+237 699 57 62 76</span>
        </a>

        <button
          type="button"
          data-contact-pill
          data-magnetic
          onClick={() => setIsInquiryOpen(true)}
          className="ds-pill ds-pill-dark inline-flex items-center gap-3 cursor-pointer"
        >
          <span data-magnetic-text>Estimate Your Project Scope</span>
        </button>
      </div>

      {/* Quiet Metadata Caption */}
      <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-2 text-[12px] text-[#999d9e] text-left">
        <span>Douala, Cameroon</span>
        <span>UTC+1 • Full CET & EST Overlap</span>
        <span>{dictionary.getinTouch.tagLine}</span>
      </div>

      {/* Interactive Scope Estimator Modal */}
      <InquiryModal
        isOpen={isInquiryOpen}
        onClose={() => setIsInquiryOpen(false)}
      />
    </section>
  );
}
