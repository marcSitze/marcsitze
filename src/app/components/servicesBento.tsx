"use client";

import React from "react";
import { SERVICE_PACKAGES } from "@/data/resume";
import {
  Smartphone,
  LayoutDashboard,
  CreditCard,
  Layers,
  CheckCircle2,
  ArrowRight,
  Gauge,
  ShieldCheck,
  WifiOff,
  Bell,
  TrendingUp,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function ServicesBento({
  onSelectService,
}: {
  onSelectService?: (serviceId: string) => void;
  isDark?: boolean;
}) {

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
          {/* <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Turnkey Solutions</span>
          </div> */}
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight mb-4">
            Packaged Engineering Services
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            High-leverage engineering leadership tailored for ambitious startups and enterprises looking to launch fast, scale securely, and dominate their category.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Card 1: Mobile App Development (6 Cols) */}
          <div className="lg:col-span-6 rounded-3xl border border-black/10 dark:border-white/10 bg-card/70 dark:bg-zinc-950/70 backdrop-blur-xl p-8 flex flex-col justify-between shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none -z-0" />

            <div className="relative z-10">
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="p-3 rounded-2xl bg-sky-500/10 text-sky-400">
                  <Smartphone className="w-6 h-6" />
                </div>
                <Badge className="bg-sky-500/10 text-sky-400 border-sky-500/20 text-xs font-bold">
                  {SERVICE_PACKAGES[0]?.badge || "iOS & Android"}
                </Badge>
              </div>

              <h3 className="text-2xl font-bold tracking-tight mb-2">
                {SERVICE_PACKAGES[0]?.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                {SERVICE_PACKAGES[0]?.tagline}
              </p>

              {/* Interactive Micro-Widget: Cross-Platform Mobile Build Status */}
              <div className="rounded-2xl border border-white/10 bg-zinc-950/90 p-4 mb-6 shadow-inner space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-white/10 text-[11px] text-muted-foreground">
                  <div className="flex items-center gap-2 font-mono">
                    <Smartphone className="w-3.5 h-3.5 text-sky-400" />
                    <span>React Native • Expo</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
                    <span className="text-emerald-400 font-semibold">60 FPS Native</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="rounded-xl bg-white/5 border border-white/5 p-2.5">
                    <p className="text-xs font-bold text-sky-400">iOS + Android</p>
                    <p className="text-[10px] text-zinc-400 mt-0.5">Single Codebase</p>
                  </div>
                  <div className="rounded-xl bg-white/5 border border-white/5 p-2.5">
                    <p className="text-xs font-bold text-emerald-400">Offline Sync</p>
                    <p className="text-[10px] text-zinc-400 mt-0.5">Instant Cache</p>
                  </div>
                  <div className="rounded-xl bg-white/5 border border-white/5 p-2.5">
                    <p className="text-xs font-bold text-indigo-400">OTA Updates</p>
                    <p className="text-[10px] text-zinc-400 mt-0.5">Zero Downtime</p>
                  </div>
                </div>

                <div className="flex justify-between items-center text-[11px] text-zinc-400 pt-1">
                  <span className="flex items-center gap-1">
                    <WifiOff className="w-3.5 h-3.5 text-sky-400" />
                    <span>Offline-First Ready</span>
                  </span>
                  <span className="flex items-center gap-1 text-zinc-400">
                    <Bell className="w-3.5 h-3.5 text-sky-400" />
                    <span>Real-Time Push Alerts</span>
                  </span>
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
                onClick={() => handleInquire("mobile-apps")}
                className="rounded-full gap-2 text-xs font-semibold px-5"
              >
                <span>Inquire About Mobile App</span>
                <ArrowRight size={14} />
              </Button>
            </div>
          </div>

          {/* Card 2: Dashboards & Admin Portals (6 Cols) */}
          <div className="lg:col-span-6 rounded-3xl border border-black/10 dark:border-white/10 bg-card/70 dark:bg-zinc-950/70 backdrop-blur-xl p-8 flex flex-col justify-between shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-0" />

            <div className="relative z-10">
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-400">
                  <LayoutDashboard className="w-6 h-6" />
                </div>
                <Badge className="bg-cyan-500/10 text-cyan-400 border-cyan-500/20 text-xs font-bold">
                  {SERVICE_PACKAGES[1]?.badge || "Data & Analytics"}
                </Badge>
              </div>

              <h3 className="text-2xl font-bold tracking-tight mb-2">
                {SERVICE_PACKAGES[1]?.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                {SERVICE_PACKAGES[1]?.tagline}
              </p>

              {/* Interactive Micro-Widget: Live Analytics Dashboard Preview */}
              <div className="rounded-2xl border border-white/10 bg-zinc-950/90 p-4 mb-6 shadow-inner space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-white/10 text-[11px] text-muted-foreground">
                  <div className="flex items-center gap-2 font-mono">
                    <LayoutDashboard className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Live Operations Console</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>+24.8% Growth</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div className="rounded-xl bg-white/5 border border-white/5 p-2">
                    <p className="text-[10px] text-zinc-400">Active Users</p>
                    <p className="text-sm font-black text-white">12,480</p>
                  </div>
                  <div className="rounded-xl bg-white/5 border border-white/5 p-2">
                    <p className="text-[10px] text-zinc-400">Conversion</p>
                    <p className="text-sm font-black text-cyan-400">94.2%</p>
                  </div>
                  <div className="rounded-xl bg-white/5 border border-white/5 p-2">
                    <p className="text-[10px] text-zinc-400">Query Speed</p>
                    <p className="text-sm font-black text-emerald-400">42ms</p>
                  </div>
                </div>

                <div className="flex items-end gap-1.5 h-10 pt-1 px-1">
                  {[38, 52, 46, 68, 62, 80, 74, 92, 86, 100].map((height, idx) => (
                    <div
                      key={idx}
                      style={{ height: `${height}%` }}
                      className={`flex-1 rounded-t-sm ${
                        idx >= 8 ? "bg-cyan-400" : "bg-cyan-500/35"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Deliverables */}
              <ul className="space-y-2.5 mb-6">
                {SERVICE_PACKAGES[1]?.deliverables.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-foreground/90">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
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
                onClick={() => handleInquire("dashboards")}
                className="rounded-full gap-2 text-xs font-semibold px-5"
              >
                <span>Inquire About Dashboard</span>
                <ArrowRight size={14} />
              </Button>
            </div>
          </div>

          {/* Card 3: Fintech & High-Concurrency Systems (5 Cols) */}
          <div className="lg:col-span-5 rounded-3xl border border-black/10 dark:border-white/10 bg-card/70 dark:bg-zinc-950/70 backdrop-blur-xl p-8 flex flex-col justify-between shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -z-0" />

            <div className="relative z-10">
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-400">
                  <CreditCard className="w-6 h-6" />
                </div>
                <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-xs font-bold">
                  {SERVICE_PACKAGES[2]?.badge || "Enterprise Grade"}
                </Badge>
              </div>

              <h3 className="text-2xl font-bold tracking-tight mb-2">
                {SERVICE_PACKAGES[2]?.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                {SERVICE_PACKAGES[2]?.tagline}
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
                {SERVICE_PACKAGES[2]?.deliverables.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-foreground/90">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative z-10 pt-4 border-t border-border/50 flex flex-wrap items-center justify-between gap-4">
              <span className="text-xs text-muted-foreground">
                <strong>Best for:</strong> {SERVICE_PACKAGES[2]?.bestFor}
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

          {/* Card 4: Frontend Leadership & Design Systems (7 Cols) */}
          <div className="lg:col-span-7 rounded-3xl border border-black/10 dark:border-white/10 bg-card/70 dark:bg-zinc-950/70 backdrop-blur-xl p-8 flex flex-col justify-between shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -z-0" />

            <div className="relative z-10">
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-400">
                  <Layers className="w-6 h-6" />
                </div>
                <Badge className="bg-indigo-500/10 text-indigo-400 border-indigo-500/20 text-xs font-bold">
                  {SERVICE_PACKAGES[3]?.badge || "Strategic ROI"}
                </Badge>
              </div>

              <h3 className="text-2xl font-bold tracking-tight mb-2">
                {SERVICE_PACKAGES[3]?.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                {SERVICE_PACKAGES[3]?.tagline}
              </p>

              {/* Lighthouse 100/100 Micro-Widget */}
              <div className="rounded-2xl border border-white/10 bg-zinc-950/90 p-5 mb-6 shadow-inner flex flex-col items-center text-center">
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

              {/* Deliverables */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                {SERVICE_PACKAGES[3]?.deliverables.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-foreground/90">
                    <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative z-10 pt-4 border-t border-border/50 flex flex-wrap items-center justify-between gap-4">
              <span className="text-xs text-muted-foreground">
                <strong>Best for:</strong> {SERVICE_PACKAGES[3]?.bestFor}
              </span>
              <Button
                onClick={() => handleInquire("frontend-arch")}
                className="rounded-full gap-2 text-xs font-semibold px-6"
              >
                <span>Inquire About Architecture</span>
                <ArrowRight size={14} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
