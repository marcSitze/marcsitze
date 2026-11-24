"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { MarcHero } from "@/assets";
import { getDictionary, LocaleType } from "../dictionaries";
import { gsap, ScrollTrigger, useGSAP, MOTION_SAFE_QUERY } from "@/lib/gsap";

export default function Hero({
  dictionary,
  lang = "en",
}: {
  isDark?: boolean;
  lang?: LocaleType;
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
  onOpenInquiry?: () => void;
}) {
  const heroRef = useRef<HTMLElement | null>(null);
  const firstTextRef = useRef<HTMLSpanElement | null>(null);
  const secondTextRef = useRef<HTMLSpanElement | null>(null);
  const sliderRef = useRef<HTMLDivElement | null>(null);

  const isFr = lang === "fr";

  useGSAP(
    () => {
      const hero = heroRef.current;
      if (!hero) return;

      const mm = gsap.matchMedia();
      mm.add(MOTION_SAFE_QUERY, () => {
        // 1. Premium entrance choreography
        const entranceTl = gsap.timeline({ defaults: { ease: "power4.out" } });

        entranceTl
          .fromTo(
            "[data-hero-portrait]",
            { scale: 1.05, yPercent: 3 },
            { scale: 1, yPercent: 0, duration: 1.35, ease: "power3.out" },
            0
          )
          .from(
            "[data-hero-location]",
            { xPercent: -100, opacity: 0, duration: 1, ease: "power4.out" },
            0.25
          )
          .from(
            "[data-hero-role-line]",
            { yPercent: 110, opacity: 0, duration: 0.95, stagger: 0.1 },
            0.3
          )
          .from(
            "[data-hero-arrow]",
            { x: -12, y: -12, opacity: 0, duration: 0.8 },
            0.25
          )
          .from(
            "[data-hero-marquee-wrap]",
            { yPercent: 35, opacity: 0, duration: 1.15, ease: "power4.out" },
            0.2
          );

        // 2. Continuous rotating globe icon inside location pill
        gsap.to("[data-hero-globe]", {
          rotation: 360,
          duration: 16,
          repeat: -1,
          ease: "none",
          transformOrigin: "50% 50%",
        });

        // 3. Full-bleed portrait scroll parallax + subtle depth drift
        gsap.to("[data-hero-portrait-wrap]", {
          yPercent: 10,
          ease: "none",
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });

        // 4. Role block & arrow subtle scroll-linked drift
        gsap.to("[data-hero-role-block]", {
          y: -60,
          ease: "none",
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "bottom top",
            scrub: 0.7,
          },
        });

        gsap.to("[data-hero-arrow]", {
          rotation: 45,
          ease: "none",
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "bottom top",
            scrub: 0.5,
          },
        });

        // 5. Signature Dennis Snellenberg 216px scroll-reactive kinetic name ribbon
        let xPercent = 0;
        let direction = -1;

        ScrollTrigger.create({
          trigger: document.documentElement,
          start: 0,
          end: "max",
          onUpdate: (self) => {
            if (self.direction !== 0) {
              direction = self.direction * -1;
            }
          },
        });

        if (sliderRef.current) {
          gsap.to(sliderRef.current, {
            x: -260,
            ease: "none",
            scrollTrigger: {
              trigger: hero,
              start: "top top",
              end: "bottom top",
              scrub: 0.35,
            },
          });
        }

        const tickerFn = () => {
          if (!firstTextRef.current || !secondTextRef.current) return;
          if (xPercent <= -100) {
            xPercent = 0;
          } else if (xPercent > 0) {
            xPercent = -100;
          }
          gsap.set(firstTextRef.current, { xPercent });
          gsap.set(secondTextRef.current, { xPercent });
          xPercent += 0.055 * direction;
        };

        gsap.ticker.add(tickerFn);

        return () => {
          gsap.ticker.remove(tickerFn);
        };
      });

      return () => mm.revert();
    },
    { scope: heroRef }
  );

  return (
    <section
      ref={heroRef}
      aria-label="Hero"
      className="relative h-[100svh] min-h-[680px] w-full bg-[#999d9e] overflow-hidden select-none"
    >
      {/* Full-Height Centered Transparent Portrait — Fully Visible on All Screens */}
      <div
        data-hero-portrait-wrap
        className="absolute inset-x-0 bottom-0 top-12 sm:top-8 flex items-end justify-center pointer-events-none will-change-transform"
      >
        <div className="relative w-full h-full max-w-[92vw] sm:max-w-[760px] lg:max-w-[900px]">
          <Image
            data-hero-portrait
            src={MarcHero}
            alt="Marc Sitze — Senior Frontend & Full-Stack Engineer"
            fill
            priority
            sizes="(max-width: 640px) 92vw, (max-width: 1024px) 760px, 900px"
            className="object-contain object-bottom will-change-transform"
          />
        </div>
      </div>

      {/* Subtle top & bottom editorial legibility scrims preserving clean #999d9e studio feel */}
      {/* <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-[#1c1d20]/25 via-transparent to-[#1c1d20]/35" /> */}

      {/* Mid-Left Location Pill Badge (Dennis Snellenberg Spec) */}
      <div
        data-hero-location
        className="hidden sm:flex items-center gap-6 absolute left-0 top-[44%] -translate-y-1/2 z-20 bg-[#1c1d20] rounded-r-[36.72px] py-[18px] pl-6 pr-[22px]"
      >
        <div className="text-[12px] leading-[1.2] text-white tracking-[0.05em]">
          {isFr ? (
            <>
              <span className="block">Basé</span>
              <span className="block">au</span>
              <span className="block">Cameroun</span>
            </>
          ) : (
            <>
              <span className="block">Located</span>
              <span className="block">in</span>
              <span className="block">Cameroon</span>
            </>
          )}
        </div>

        <div className="w-11 h-11 rounded-full bg-[#494a4d] flex items-center justify-center shrink-0">
          <svg
            data-hero-globe
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#ffffff"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="10" />
            <ellipse cx="12" cy="12" rx="4.5" ry="10" />
            <path d="M2 12h20" />
            <path d="M4.5 7.5h15" />
            <path d="M4.5 16.5h15" />
          </svg>
        </div>
      </div>

      {/* Mid-Right Thin 1px Arrow Indicator + Role Descriptor */}
      <div
        data-hero-role-block
        className="absolute left-5 top-20 sm:left-auto sm:right-12 lg:right-20 sm:top-[42%] sm:-translate-y-1/2 z-20 flex flex-col items-start gap-4 sm:gap-6 will-change-transform"
      >
        <svg
          data-hero-arrow
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          stroke="#ffffff"
          strokeWidth="1"
          aria-hidden="true"
          className="will-change-transform"
        >
          <path d="M2 2L16 16" />
          <path d="M16 5V16H5" />
        </svg>

        <div className="text-[20px] sm:text-[26px] lg:text-[33px] leading-[1.2] tracking-[0.05em] text-white">
          <span className="block overflow-hidden">
            <span data-hero-role-line className="block">
              {isFr ? "Ingénieur" : "Freelance"}
            </span>
          </span>
          <span className="block overflow-hidden">
            <span data-hero-role-line className="block">
              {dictionary.hero.title}
            </span>
          </span>
        </div>
      </div>

      {/* Bottom-Left Giant 216px Display Name Bleeding Off Canvas */}
      <div
        data-hero-marquee-wrap
        className="absolute bottom-5 sm:bottom-8 left-0 right-0 z-20 overflow-hidden pointer-events-none"
      >
        <div
          ref={sliderRef}
          className="relative flex whitespace-nowrap will-change-transform"
        >
          <h1 className="sr-only">
            {dictionary.hero.greeting} — {dictionary.hero.title}
          </h1>
          <span
            ref={firstTextRef}
            aria-hidden="true"
            className="inline-block pr-10 sm:pr-16 text-[clamp(68px,14.5vw,216px)] leading-[1] tracking-[0.05em] text-white will-change-transform"
          >
            {dictionary.hero.greeting} —
          </span>
          <span
            ref={secondTextRef}
            aria-hidden="true"
            className="inline-block pr-10 sm:pr-16 text-[clamp(68px,14.5vw,216px)] leading-[1] tracking-[0.05em] text-white will-change-transform"
          >
            {dictionary.hero.greeting} —
          </span>
        </div>
      </div>
    </section>
  );
}
