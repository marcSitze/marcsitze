"use client";

import React from "react";
import {
  BuboLogo,
  MavianceLogo,
  AlaxioneLogo,
  PntecLogo,
  SweezLogo,
  HackerRankLogo,
  Lacompassion,
} from "@/assets";

interface Partner {
  name: string;
  logo: string;
  label: string;
}

const partners: Partner[] = [
  { name: "Bubo AI", logo: BuboLogo, label: "Frontend Lead • AI Platform" },
  { name: "Maviance PLC", logo: MavianceLogo, label: "Software Engineer • Fintech Gateway" },
  { name: "Warap Work", logo: Lacompassion, label: "Fullstack Lead • Gig Platform" },
  { name: "Alaxione", logo: AlaxioneLogo, label: "Mobile Engineer • HealthTech" },
  { name: "PNTEC", logo: PntecLogo, label: "Frontend Engineer • Digital Products" },
  { name: "Sweez", logo: SweezLogo, label: "Fullstack Contractor" },
  { name: "HackerRank", logo: HackerRankLogo, label: "Verified React Professional" },
];

export default function ClientMarquee(_props?: { isDark?: boolean }) {
  // Duplicate array for seamless infinite looping
  const marqueeList = [...partners, ...partners];

  return (
    <section
      aria-label="Trusted companies and engineering credentials"
      className="relative w-full py-12 overflow-hidden border-y border-border/40 bg-card/20 dark:bg-zinc-950/40 backdrop-blur-sm"
    >
      <div className="max-w-6xl mx-auto px-4 mb-6 text-center">
        <p className="text-[11px] sm:text-xs uppercase tracking-[0.2em] text-muted-foreground font-semibold">
          Proven Track Record with High-Growth Teams & Enterprise Platforms
        </p>
      </div>

      {/* Marquee viewport with smooth edge gradient fade masks */}
      <div className="group relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex w-max gap-10 sm:gap-16 items-center animate-marquee group-hover:[animation-play-state:paused] motion-reduce:animate-none motion-reduce:flex-wrap motion-reduce:justify-center">
          {marqueeList.map((partner, index) => (
            <div
              key={`${partner.name}-${index}`}
              className="flex items-center gap-3 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 dark:bg-white/5 dark:hover:bg-white/10 border border-white/5 hover:border-primary/20 transition-all duration-300 group/item cursor-default"
            >
              <div className="relative w-8 h-8 rounded-lg overflow-hidden shrink-0 border border-white/10 bg-black/20 flex items-center justify-center">
                <img
                  src={partner.logo}
                  alt={`${partner.name} logo`}
                  className="w-full h-full object-cover grayscale group-hover/item:grayscale-0 transition-all duration-300"
                />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-sm font-bold text-foreground tracking-tight group-hover/item:text-primary transition-colors">
                  {partner.name}
                </span>
                <span className="text-[10px] text-muted-foreground font-medium">
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
