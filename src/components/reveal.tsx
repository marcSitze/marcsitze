"use client";

import React, { useRef } from "react";
import { gsap, useGSAP, MOTION_SAFE_QUERY } from "@/lib/gsap";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  y?: number;
  duration?: number;
  useContents?: boolean;
};

export default function Reveal({
  children,
  className = "",
  stagger = 0.08,
  y = 36,
  duration = 0.85,
  useContents = false,
}: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const mm = gsap.matchMedia();
      mm.add(MOTION_SAFE_QUERY, () => {
        const targets = Array.from(el.children) as Element[];
        const animTarget = targets.length > 1 ? targets : el;

        gsap.from(animTarget, {
          y,
          autoAlpha: 0,
          duration,
          stagger: targets.length > 1 ? stagger : 0,
          ease: "power3.out",
          clearProps: "transform",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        });
      });

      return () => mm.revert();
    },
    { scope: ref, dependencies: [stagger, y, duration] }
  );

  return (
    <div
      ref={ref}
      className={className}
      style={useContents ? { display: "contents" } : undefined}
    >
      {children}
    </div>
  );
}
