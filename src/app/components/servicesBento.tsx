"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { SERVICE_PACKAGES } from "@/data/resume";
import {
  Sparkles,
  Bot,
  CreditCard,
  Layers,
  CheckCircle2,
  ArrowRight,
  Gauge,
  ShieldCheck,
  Terminal,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function ServicesBento({
  onSelectService,
  isDark = true,
}: {
  onSelectService?: (serviceId: string) => void;
  isDark?: boolean;
}) {
  const [activeCodeTab, setActiveCodeTab] = useState<"stream" | "rag">("stream");

  const handleInquire = (serviceId: string) => {
    if (onSelectService) {
      onSelectService(serviceId);
    } else {
      const contactEl = document.getElementById("contact");
      if (contactEl) contactEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="services" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Turnkey Solutions</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight mb-4">
            Packaged Engineering Services
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            High-leverage engineering leadership tailored for ambitious startups and enterprises looking to launch fast, scale securely, and dominate their category.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Card 1: AI & High-Performance Web Apps (7 Cols) */}
          <div className="lg:col-span-7 rounded-3xl border border-black/10 dark:border-white/10 bg-card/70 dark:bg-zinc-950/70 backdrop-blur-xl p-8 flex flex-col justify-between shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none -z-0" />

            <div className="relative z-10">
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="p-3 rounded-2xl bg-sky-500/10 text-sky-400">
                  <Bot className="w-6 h-6" />
                </div>
                <Badge className="bg-sky-500/10 text-sky-400 border-sky-500/20 text-xs font-bold">
                  {SERVICE_PACKAGES[0]?.badge || "Popular for AI"}
                </Badge>
              </div>

              <h3 className="text-2xl font-bold tracking-tight mb-2">
                {SERVICE_PACKAGES[0]?.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                {SERVICE_PACKAGES[0]?.tagline}
              </p>

              {/* Interactive Micro-Widget: Streaming AI Terminal Simulator */}
              <div className="rounded-2xl border border-white/10 bg-zinc-950/90 p-4 mb-6 text-xs font-mono shadow-inner">
                <div className="flex items-center justify-between pb-2 mb-3 border-b border-white/10 text-[11px] text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-3.5 h-3.5 text-sky-400" />
                    <span>next-ai-stream.ts</span>
                  </div>
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
                    <span>Latency: 280ms</span>
                  </div>
                </div>

                <div className="space-y-1.5 text-zinc-300">
                  <p className="text-zinc-500">// Real-time streaming token pipeline</p>
                  <p>
                    <span className="text-sky-400">const</span> response = <span className="text-indigo-400">await</span> aiClient.<span className="text-yellow-300">streamQuery</span>(&#123;
                  </p>
                  <p className="pl-4">
                    vectorIndex: <span className="text-emerald-400">&quot;legal-docs-v2&quot;</span>,
                  </p>
                  <p className="pl-4">
                    maxTokens: <span className="text-orange-400">4096</span>,
                  </p>
                  <p className="pl-4 text-emerald-400">
                    optimisticUI: <span className="text-sky-300">true</span>
                  </p>
                  <p>&#125;);</p>
                </div>
              </div>

              {/* Deliverables */}
              <ul className="space-y-2.5 mb-6">
                {SERVICE_PACKAGES[0]?.deliverables.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-foreground/90">
                    <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative z-10 pt-4 border-t border-border/50 flex flex-wrap items-center justify-between gap-4">
              <span className="text-xs text-muted-foreground">
                <strong>Best for:</strong> {SERVICE_PACKAGES[0]?.bestFor}
              </span>
              <Button
                onClick={() => handleInquire("ai-apps")}
                className="rounded-full gap-2 text-xs font-semibold px-5"
              >
                <span>Inquire About AI Build</span>
                <ArrowRight size={14} />
              </Button>
            </div>
          </div>

          {/* Card 2: Fintech & High-Concurrency Systems (5 Cols) */}
          <div className="lg:col-span-5 rounded-3xl border border-black/10 dark:border-white/10 bg-card/70 dark:bg-zinc-950/70 backdrop-blur-xl p-8 flex flex-col justify-between shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -z-0" />

            <div className="relative z-10">
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-400">
                  <CreditCard className="w-6 h-6" />
                </div>
                <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-xs font-bold">
                  {SERVICE_PACKAGES[1]?.badge || "Enterprise Grade"}
                </Badge>
              </div>

              <h3 className="text-2xl font-bold tracking-tight mb-2">
                {SERVICE_PACKAGES[1]?.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                {SERVICE_PACKAGES[1]?.tagline}
              </p>

              {/* Interactive Micro-Widget: Fintech SLA Status */}
              <div className="rounded-2xl border border-white/10 bg-zinc-950/90 p-4 mb-6 shadow-inner space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Gateway Success Rate</span>
                  <span className="font-bold text-emerald-400">99.4%</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-emerald-400 h-full rounded-full w-[99.4%]" />
                </div>
                <div className="flex justify-between items-center text-[11px] text-zinc-400 pt-1">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Multi-Currency Routing</span>
                  </span>
                  <span className="text-zinc-500">Zero-Loss Idempotency</span>
                </div>
              </div>

              {/* Deliverables */}
              <ul className="space-y-2.5 mb-6">
                {SERVICE_PACKAGES[1]?.deliverables.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-foreground/90">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative z-10 pt-4 border-t border-border/50 flex flex-wrap items-center justify-between gap-4">
              <span className="text-xs text-muted-foreground">
                <strong>Best for:</strong> {SERVICE_PACKAGES[1]?.bestFor}
              </span>
              <Button
                variant="outline"
                onClick={() => handleInquire("fintech-systems")}
                className="rounded-full gap-2 text-xs font-semibold px-5"
              >
                <span>Inquire About Fintech</span>
                <ArrowRight size={14} />
              </Button>
            </div>
          </div>

          {/* Card 3: Frontend Leadership & Design Systems (Full 12 Cols) */}
          <div className="lg:col-span-12 rounded-3xl border border-black/10 dark:border-white/10 bg-card/70 dark:bg-zinc-950/70 backdrop-blur-xl p-8 shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -z-0" />

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-7">
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-400">
                    <Layers className="w-6 h-6" />
                  </div>
                  <Badge className="bg-indigo-500/10 text-indigo-400 border-indigo-500/20 text-xs font-bold">
                    {SERVICE_PACKAGES[2]?.badge || "Strategic ROI"}
                  </Badge>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
                  {SERVICE_PACKAGES[2]?.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  {SERVICE_PACKAGES[2]?.tagline}
                </p>

                {/* Deliverables */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                  {SERVICE_PACKAGES[2]?.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-foreground/90">
                      <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-4">
                  <Button
                    onClick={() => handleInquire("frontend-arch")}
                    className="rounded-full gap-2 text-xs font-semibold px-6"
                  >
                    <span>Inquire About Architecture</span>
                    <ArrowRight size={14} />
                  </Button>
                  <span className="text-xs text-muted-foreground">
                    <strong>Best for:</strong> {SERVICE_PACKAGES[2]?.bestFor}
                  </span>
                </div>
              </div>

              {/* Lighthouse 100/100 Micro-Widget */}
              <div className="md:col-span-5 rounded-2xl border border-white/10 bg-zinc-950/90 p-6 shadow-inner flex flex-col items-center text-center">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4 flex items-center gap-1.5">
                  <Gauge className="w-4 h-4 text-emerald-400" />
                  <span>Google Lighthouse Optimization Standard</span>
                </span>

                <div className="grid grid-cols-4 gap-3 w-full">
                  {[
                    { label: "Performance", score: "99" },
                    { label: "Accessibility", score: "100" },
                    { label: "Best Practices", score: "100" },
                    { label: "SEO", score: "100" },
                  ].map((gauge, idx) => (
                    <div key={idx} className="flex flex-col items-center">
                      <div className="w-12 h-12 rounded-full border-2 border-emerald-400 flex items-center justify-center bg-emerald-500/10 text-emerald-400 font-black text-sm mb-1.5 shadow-sm shadow-emerald-500/20">
                        {gauge.score}
                      </div>
                      <span className="text-[10px] text-muted-foreground truncate w-full">
                        {gauge.label}
                      </span>
                    </div>
                  ))}
                </div>

                <span className="text-[11px] text-zinc-400 mt-4">
                  Sub-second LCP • Zero Cumulative Layout Shift • GPU-Accelerated 60FPS
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
