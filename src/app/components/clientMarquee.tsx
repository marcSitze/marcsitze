"use client";

import React, { useRef } from "react";
import Image from "next/image";
import {
  BuboLogo,
  MavianceLogo,
  AlaxioneLogo,
  PntecLogo,
  SweezLogo,
  HackerRankLogo,
  Lacompassion,
} from "@/assets";
import { gsap, ScrollTrigger, useGSAP, MOTION_SAFE_QUERY } from "@/lib/gsap";

interface Partner {
  name: string;
  logo: string;
  label: string;
}

const partners: Partner[] = [
  { name: "Bubo AI", logo: BuboLogo, label: "Frontend Lead" },
  { name: "Maviance PLC", logo: MavianceLogo, label: "Fintech Gateway" },
  { name: "Warap Work", logo: Lacompassion, label: "Fullstack Lead" },
  { name: "Alaxione", logo: AlaxioneLogo, label: "Mobile Engineer" },
  { name: "PNTEC", logo: PntecLogo, label: "Frontend Engineer" },
  { name: "Sweez", logo: SweezLogo, label: "Fullstack Contractor" },
  { name: "HackerRank", logo: HackerRankLogo, label: "Verified React" },
];

export default function ClientMarquee() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const marqueeList = [...partners, ...partners];

  useGSAP(
    () => {
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;

      const mm = gsap.matchMedia();
      mm.add(MOTION_SAFE_QUERY, () => {
        const clampSkew = gsap.utils.clamp(-5, 5);
        const skewTo = gsap.quickTo(track, "skewX", {
          duration: 0.45,
          ease: "power3.out",
        });

        let timer: ReturnType<typeof setTimeout> | null = null;

        ScrollTrigger.create({
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          onUpdate: (self) => {
            skewTo(clampSkew(self.getVelocity() / -360));
            if (timer) clearTimeout(timer);
            timer = setTimeout(() => skewTo(0), 120);
          },
        });

        return () => {
          if (timer) clearTimeout(timer);
        };
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      aria-label="Trusted companies and engineering credentials"
      className="relative w-full py-16 bg-white border-y border-[#1c1d20]/12 overflow-hidden"
    >
      <div className="px-6 sm:px-14 lg:px-24 mb-8 text-left">
        <p className="text-[10px] sm:text-[12px] uppercase text-[#6b6e72]">
          Collaborations & Trusted Teams
        </p>
      </div>

      <div
        ref={trackRef}
        className="group relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] will-change-transform"
      >
        <div className="flex w-max gap-6 sm:gap-10 items-center animate-marquee group-hover:[animation-play-state:paused] motion-reduce:animate-none motion-reduce:flex-wrap motion-reduce:px-6">
          {marqueeList.map((partner, index) => (
            <div
              key={`${partner.name}-${index}`}
              className="flex items-center gap-3.5 rounded-[36.72px] bg-white ds-inset-ring hover:bg-[#f3f3f4] px-5 py-3 transition-colors duration-300 cursor-default"
            >
              <div className="relative w-7 h-7 rounded-full overflow-hidden shrink-0 bg-[#f3f3f4]">
                <Image
                  src={partner.logo}
                  alt={`${partner.name} logo`}
                  width={28}
                  height={28}
                  className="w-full h-full object-cover grayscale"
                />
              </div>
              <div className="flex items-baseline gap-3">
                <span className="text-[14px] text-[#1c1d20]">
                  {partner.name}
                </span>
                <span className="text-[10px] text-[#6b6e72] uppercase">
                  {partner.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
