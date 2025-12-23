"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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
  y = 40,
  duration = 0.8,
  useContents = false,
}: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const targets = Array.from(el.children) as Element[];

    // If there's more than one direct child, stagger them. Otherwise animate the container itself.
    if (targets.length > 1) {
      gsap.fromTo(
        targets,
        { y, opacity: 0, autoAlpha: 0 },
        {
          y: 0,
          opacity: 1,
          autoAlpha: 1,
          duration,
          stagger,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    } else {
      gsap.fromTo(
        el,
        { y, opacity: 0, autoAlpha: 0 },
        {
          y: 0,
          opacity: 1,
          autoAlpha: 1,
          duration,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      gsap.killTweensOf(targets.length > 1 ? targets : el);
    };
  }, [stagger, y, duration]);

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
