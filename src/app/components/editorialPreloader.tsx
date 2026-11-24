"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap, MOTION_SAFE_QUERY } from "@/lib/gsap";

const GREETINGS = ["Hello", "Bonjour", "Marc Sitze"];

export default function EditorialPreloader({
  onComplete,
}: {
  onComplete?: () => void;
}) {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const wordRef = useRef<HTMLSpanElement | null>(null);
  const [wordIndex, setWordIndex] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersMotion = window.matchMedia(MOTION_SAFE_QUERY).matches;
    const alreadyPlayed = sessionStorage.getItem("ms-editorial-intro") === "1";

    if (!prefersMotion || alreadyPlayed) {
      setDone(true);
      onComplete?.();
      return;
    }

    document.body.style.overflow = "hidden";

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          sessionStorage.setItem("ms-editorial-intro", "1");
          document.body.style.overflow = "";
          setDone(true);
          onComplete?.();
        },
      });

      // Reveal first greeting
      tl.fromTo(
        wordRef.current,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.35, ease: "power3.out" }
      )
        .to({}, { duration: 0.16, onComplete: () => setWordIndex(1) })
        .to({}, { duration: 0.22, onComplete: () => setWordIndex(2) })
        .to({}, { duration: 0.24 })
        .to(wordRef.current, {
          opacity: 0,
          y: -16,
          duration: 0.25,
          ease: "power2.in",
        })
        .to(
          overlayRef.current,
          {
            yPercent: -100,
            duration: 0.85,
            ease: "power4.inOut",
          },
          "-=0.12"
        );
    }, overlayRef);

    return () => {
      document.body.style.overflow = "";
      ctx.revert();
    };
  }, [onComplete]);

  if (done) return null;

  return (
    <div
      ref={overlayRef}
      aria-hidden="true"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#1c1d20] text-white will-change-transform"
    >
      <div className="flex items-center gap-3">
        <span className="w-2.5 h-2.5 rounded-full bg-white inline-block" />
        <span
          ref={wordRef}
          className="text-[33px] sm:text-[48px] leading-[1.07] tracking-[0.05em] text-white"
        >
          {GREETINGS[wordIndex]}
        </span>
      </div>
    </div>
  );
}
