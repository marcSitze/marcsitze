"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
  ScrollTrigger.config({
    ignoreMobileResize: true,
  });
}

export const MOTION_SAFE_QUERY = "(prefers-reduced-motion: no-preference)";

/**
 * Dennis Snellenberg-inspired dual-layer magnetic pull:
 * Outer element shifts toward cursor; optional inner [data-magnetic-text]
 * shifts slightly more for subtle optical depth.
 */
export function attachMagnetic(
  elements: Iterable<HTMLElement> | ArrayLike<HTMLElement>,
  strength = 0.3
): () => void {
  if (typeof window === "undefined") return () => {};
  if (window.matchMedia("(pointer: coarse)").matches) return () => {};

  const cleanups: Array<() => void> = [];

  Array.from(elements).forEach((el) => {
    const inner = el.querySelector<HTMLElement>("[data-magnetic-text]");
    const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });
    const innerXTo = inner
      ? gsap.quickTo(inner, "x", { duration: 0.5, ease: "power3.out" })
      : null;
    const innerYTo = inner
      ? gsap.quickTo(inner, "y", { duration: 0.5, ease: "power3.out" })
      : null;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const relX = e.clientX - (rect.left + rect.width / 2);
      const relY = e.clientY - (rect.top + rect.height / 2);
      xTo(relX * strength);
      yTo(relY * strength);
      innerXTo?.(relX * (strength * 0.45));
      innerYTo?.(relY * (strength * 0.45));
    };

    const onLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.75,
        ease: "elastic.out(1, 0.38)",
        overwrite: "auto",
      });
      if (inner) {
        gsap.to(inner, {
          x: 0,
          y: 0,
          duration: 0.75,
          ease: "elastic.out(1, 0.38)",
          overwrite: "auto",
        });
      }
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);

    cleanups.push(() => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    });
  });

  return () => {
    cleanups.forEach((fn) => fn());
  };
}

export { gsap, ScrollTrigger, useGSAP };
