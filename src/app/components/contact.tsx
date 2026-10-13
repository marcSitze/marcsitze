"use client";

import React, { useState } from "react";
import { MarcSitze } from "@/assets";
import { Button } from "@/components/ui/button";
import {
  Mail,
  MapPin,
  PhoneCall,
  Clock,
  Sparkles,
  MessageSquare,
  Copy,
  Check,
  ExternalLink,
  Globe2,
} from "lucide-react";
import Link from "next/link";
import { getDictionary, LocaleType } from "../dictionaries";
import InquiryModal from "./inquiryModal";

export default function Contact({
  isDark = true,
  dictionary,
  lang,
}: {
  isDark?: boolean;
  lang?: LocaleType;
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
}) {
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText("marcsitze01@gmail.com");
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const whatsappDirectUrl =
    "https://wa.me/237699576276?text=" +
    encodeURIComponent(
      "Hi Marc! I visited your portfolio and would like to discuss a freelance project."
    );

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Initiate Collaboration</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight mb-4">
            {dictionary.getinTouch.title}
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            {dictionary.getinTouch.tagLine}
          </p>
        </div>

        {/* Main Conversion Terminal Card */}
        <div className="rounded-3xl border border-black/10 dark:border-white/10 bg-card/80 dark:bg-zinc-950/80 backdrop-blur-xl shadow-2xl p-6 sm:p-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Left Column: Portrait & Availability */}
          <div className="md:col-span-5 flex flex-col items-center text-center">
            <div className="relative group w-48 h-48 sm:w-56 sm:h-56 rounded-3xl overflow-hidden border-2 border-primary/20 shadow-xl mb-6">
              <img
                src={MarcSitze}
                alt="Marc Sitze - Senior Frontend Lead"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-4 justify-center">
                <span className="text-xs font-bold text-white tracking-wide">
                  Marc Sitze
                </span>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-3">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Open for Select Q2/Q3 Missions</span>
            </div>

            <p className="text-xs text-muted-foreground max-w-xs">
              Direct remote contracts, technical advisory, and fractional frontend leadership.
            </p>
          </div>

          {/* Right Column: Interactive Triggers & Channels */}
          <div className="md:col-span-7 space-y-6">
            {/* Primary Action Button: Launch Estimator */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/15 via-primary/5 to-transparent border border-primary/30 space-y-3">
              <span className="text-xs font-extrabold uppercase tracking-wider text-primary">
                Fast-Track Inquiries
              </span>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                Estimate Your Project Scope
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Specify your technical requirements, target budget, and timeline in 60 seconds.
              </p>
              <Button
                onClick={() => setIsInquiryOpen(true)}
                className="w-full sm:w-auto rounded-full px-6 py-5 gap-2 font-bold shadow-md shadow-primary/20 hover:scale-105 transition-transform"
              >
                <Sparkles size={16} />
                <span>Launch Project Scope Estimator</span>
              </Button>
            </div>

            {/* Direct Channels Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {/* WhatsApp Direct */}
              <a
                href={whatsappDirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl border border-white/10 hover:border-emerald-500/40 bg-white/5 hover:bg-emerald-500/5 transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400">
                    <MessageSquare size={18} />
                  </div>
                  <div>
                    <span className="block text-xs text-muted-foreground font-semibold">
                      WhatsApp Direct
                    </span>
                    <span className="text-sm font-bold text-foreground group-hover:text-emerald-400 transition-colors">
                      +237 699576276
                    </span>
                  </div>
                </div>
                <ExternalLink size={14} className="text-muted-foreground group-hover:text-emerald-400" />
              </a>

              {/* Email Direct with Copy */}
              <button
                type="button"
                onClick={handleCopyEmail}
                className="p-4 rounded-2xl border border-white/10 hover:border-primary/40 bg-white/5 hover:bg-primary/5 transition-all flex items-center justify-between group text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                    <Mail size={18} />
                  </div>
                  <div>
                    <span className="block text-xs text-muted-foreground font-semibold">
                      Direct Email
                    </span>
                    <span className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                      marcsitze01@gmail.com
                    </span>
                  </div>
                </div>
                {copied ? (
                  <Check size={16} className="text-emerald-400" />
                ) : (
                  <Copy size={16} className="text-muted-foreground group-hover:text-primary" />
                )}
              </button>
            </div>

            {/* Location & Timezone info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white/5 dark:bg-white/5 border border-white/5 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-primary shrink-0" />
                <span>Douala, Cameroon</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe2 size={16} className="text-indigo-400 shrink-0" />
                <span>UTC+1 • Full CET & EST Overlap</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-emerald-400 shrink-0" />
                <span>Mon — Sun: 8:00 AM — 6:00 PM</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Scope Estimator Modal */}
      <InquiryModal
        isOpen={isInquiryOpen}
        onClose={() => setIsInquiryOpen(false)}
      />
    </section>
  );
}
