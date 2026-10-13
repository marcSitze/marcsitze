"use client";

import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, CheckCircle2, Globe2, ShieldCheck } from "lucide-react";
import { getDictionary, LocaleType } from "../dictionaries";

export default function Hero({
  dictionary,
  onOpenInquiry,
}: {
  isDark?: boolean;
  lang?: LocaleType;
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
  onOpenInquiry?: () => void;
}) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative min-h-[90vh] w-full flex items-center justify-center overflow-hidden py-24 px-4"
    >
      {/* Ambient Spotlight Following Cursor */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-500 ease-out"
        style={{
          opacity: isHovered ? 1 : 0.4,
          background: `radial-gradient(700px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(14, 165, 233, 0.15), rgba(99, 102, 241, 0.08) 40%, transparent 80%)`,
        }}
      />

      {/* Decorative ambient background mesh blobs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-primary/10 dark:bg-sky-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-1/4 w-[400px] h-[300px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none -z-10" />

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center">
        {/* Availability Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mb-8 backdrop-blur-md shadow-sm shadow-emerald-500/10"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span>{dictionary.hero.badge}</span>
        </motion.div>

        {/* Hero Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6"
        >
          <span className="block text-foreground font-black">
            {dictionary.hero.greeting}
          </span>
          <span className="block mt-2 bg-gradient-to-r from-sky-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">
            {dictionary.hero.title}
          </span>
        </motion.h1>

        {/* Hero Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-2xl text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 font-normal"
        >
          {dictionary.hero.subtitle}
        </motion.p>

        {/* Dual Primary Call to Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-14"
        >
          {onOpenInquiry ? (
            <button
              onClick={onOpenInquiry}
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/95 shadow-lg shadow-primary/25 transition-all duration-200 hover:scale-105 active:scale-95"
            >
              <span>{dictionary.hero.primaryCta}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          ) : (
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/95 shadow-lg shadow-primary/25 transition-all duration-200 hover:scale-105 active:scale-95"
            >
              <span>{dictionary.hero.primaryCta}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
          )}

          <a
            href="#portfolio"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-black/15 dark:border-white/15 bg-card/60 dark:bg-white/5 hover:bg-card/90 dark:hover:bg-white/10 text-foreground font-semibold backdrop-blur-md shadow-sm transition-all duration-200 hover:scale-105 active:scale-95"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span>{dictionary.hero.secondaryCta}</span>
          </a>
        </motion.div>

        {/* Trust Badges Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm text-muted-foreground pt-4 border-t border-border/40"
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>{dictionary.hero.experienceBadge}</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-sky-500" />
            <span>Fintech & AI Platforms</span>
          </div>
          <div className="flex items-center gap-2">
            <Globe2 className="w-4 h-4 text-indigo-400" />
            <span>{dictionary.hero.timezone}</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
