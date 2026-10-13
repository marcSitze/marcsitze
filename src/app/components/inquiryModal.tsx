"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Sparkles,
  Bot,
  CreditCard,
  Smartphone,
  Layers,
  Search,
  Check,
  Copy,
  MessageSquare,
  ArrowRight,
  Globe2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface InquiryState {
  projectType: "ai-webapp" | "fintech-portal" | "mobile-app" | "frontend-lead" | "code-audit";
  budgetRange: "<$3k" | "$3k-$10k" | "$10k-$25k" | "$25k+";
  timeline: "immediate" | "within-month" | "exploring";
  clientName: string;
  clientEmail: string;
  notes: string;
}

export default function InquiryModal({
  isOpen,
  onClose,
  initialService,
}: {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
}) {
  const [inquiry, setInquiry] = useState<InquiryState>({
    projectType: (initialService as InquiryState["projectType"]) || "ai-webapp",
    budgetRange: "$3k-$10k",
    timeline: "immediate",
    clientName: "",
    clientEmail: "",
    notes: "",
  });

  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (initialService) {
      if (initialService === "ai-apps") setInquiry((prev) => ({ ...prev, projectType: "ai-webapp" }));
      else if (initialService === "fintech-systems") setInquiry((prev) => ({ ...prev, projectType: "fintech-portal" }));
      else if (initialService === "frontend-arch") setInquiry((prev) => ({ ...prev, projectType: "frontend-lead" }));
    }
  }, [initialService]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleCopyEmail = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText("marcsitze01@gmail.com");
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const projectTypes = [
    { id: "ai-webapp", label: "AI Web App / LLM", icon: <Bot className="w-4 h-4" /> },
    { id: "fintech-portal", label: "Fintech & Payments", icon: <CreditCard className="w-4 h-4" /> },
    { id: "mobile-app", label: "Mobile App (Expo)", icon: <Smartphone className="w-4 h-4" /> },
    { id: "frontend-lead", label: "Frontend Lead / Contract", icon: <Layers className="w-4 h-4" /> },
    { id: "code-audit", label: "Speed & Code Audit", icon: <Search className="w-4 h-4" /> },
  ];

  const budgetOptions: InquiryState["budgetRange"][] = ["<$3k", "$3k-$10k", "$10k-$25k", "$25k+"];

  const timelineOptions: { id: InquiryState["timeline"]; label: string }[] = [
    { id: "immediate", label: "Immediate (1-2 wks)" },
    { id: "within-month", label: "Next month" },
    { id: "exploring", label: "Planning / Q3-Q4" },
  ];

  const buildWhatsAppUrl = () => {
    const typeObj = projectTypes.find((p) => p.id === inquiry.projectType);
    const text = `Hi Marc! I saw your portfolio and would like to discuss a freelance project:
• Scope: ${typeObj ? typeObj.label : inquiry.projectType}
• Budget: ${inquiry.budgetRange}
• Timeline: ${inquiry.timeline}
${inquiry.clientName ? `• From: ${inquiry.clientName}` : ""}
${inquiry.notes ? `• Details: ${inquiry.notes}` : ""}`;

    return `https://wa.me/237699576276?text=${encodeURIComponent(text)}`;
  };

  const buildMailtoUrl = () => {
    const typeObj = projectTypes.find((p) => p.id === inquiry.projectType);
    const subject = `Project Inquiry: ${typeObj?.label || "Freelance Mission"}`;
    const body = `Hi Marc,

I'd like to discuss a project with you:
- Project Type: ${typeObj?.label || inquiry.projectType}
- Estimated Budget: ${inquiry.budgetRange}
- Timeline: ${inquiry.timeline}
- Additional Notes: ${inquiry.notes || "None"}

Looking forward to connecting!
${inquiry.clientName || ""}`;

    return `mailto:marcsitze01@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 sm:p-6 overflow-y-auto"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label="Project Scope and Inquiry Estimator"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-background border border-border/70 rounded-3xl overflow-hidden shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-start justify-between pb-6 border-b border-border/50">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Quick Project Estimator</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Let&apos;s Build Something World-Class
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                Select your project requirements for an instant proposal or direct chat.
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Close dialog"
            >
              <X size={20} />
            </button>
          </div>

          {/* Form Content */}
          <div className="py-6 space-y-6">
            {/* 1. Project Type Selector */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
                1. Project Category
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {projectTypes.map((type) => {
                  const isSelected = inquiry.projectType === type.id;
                  return (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() =>
                        setInquiry((prev) => ({
                          ...prev,
                          projectType: type.id as InquiryState["projectType"],
                        }))
                      }
                      className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-xs font-semibold transition-all text-left ${
                        isSelected
                          ? "border-primary bg-primary/10 text-primary shadow-sm"
                          : "border-border/60 hover:bg-muted/40 text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <span className={isSelected ? "text-primary" : "text-muted-foreground"}>
                        {type.icon}
                      </span>
                      <span className="truncate">{type.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Budget Range Selector */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
                2. Target Budget Range
              </label>
              <div className="grid grid-cols-4 gap-2">
                {budgetOptions.map((budget) => {
                  const isSelected = inquiry.budgetRange === budget;
                  return (
                    <button
                      key={budget}
                      type="button"
                      onClick={() => setInquiry((prev) => ({ ...prev, budgetRange: budget }))}
                      className={`py-2 rounded-xl border text-xs font-bold transition-all text-center ${
                        isSelected
                          ? "border-primary bg-primary text-primary-foreground shadow-sm"
                          : "border-border/60 hover:bg-muted/40 text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {budget}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Timeline Selector */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
                3. Estimated Timeline
              </label>
              <div className="grid grid-cols-3 gap-2">
                {timelineOptions.map((opt) => {
                  const isSelected = inquiry.timeline === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setInquiry((prev) => ({ ...prev, timeline: opt.id }))}
                      className={`py-2 px-2 rounded-xl border text-xs font-semibold transition-all text-center truncate ${
                        isSelected
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border/60 hover:bg-muted/40 text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4. Client Name & Notes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                  Your Name / Company
                </label>
                <input
                  type="text"
                  placeholder="e.g. Alex (CEO, FinNext)"
                  value={inquiry.clientName}
                  onChange={(e) => setInquiry((prev) => ({ ...prev, clientName: e.target.value }))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-border/70 bg-card/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                  Project Notes (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Need Next.js 15 rewrite"
                  value={inquiry.notes}
                  onChange={(e) => setInquiry((prev) => ({ ...prev, notes: e.target.value }))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-border/70 bg-card/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
              </div>
            </div>
          </div>

          {/* Timezone Note */}
          <div className="flex items-center gap-2 p-3 rounded-xl bg-white/5 dark:bg-white/5 border border-white/5 text-xs text-muted-foreground mb-6">
            <Globe2 className="w-4 h-4 text-primary shrink-0" />
            <span>
              <strong>Timezone:</strong> Cameroon (UTC+1) with 100% fluent overlap with European (CET) and US East Coast (EST) working hours.
            </span>
          </div>

          {/* Direct Conversion Actions */}
          <div className="pt-4 border-t border-border/50 flex flex-col sm:flex-row gap-3">
            <Button
              asChild
              className="flex-1 rounded-full gap-2 py-6 bg-emerald-600 hover:bg-emerald-500 text-white font-bold shadow-lg shadow-emerald-600/20"
            >
              <a href={buildWhatsAppUrl()} target="_blank" rel="noopener noreferrer">
                <MessageSquare className="w-4 h-4" />
                <span>Send Scope on WhatsApp</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </Button>

            <Button
              asChild
              variant="outline"
              className="rounded-full gap-2 py-6 font-semibold border-border/80"
            >
              <a href={buildMailtoUrl()}>
                <span>Send via Email</span>
              </a>
            </Button>

            <Button
              type="button"
              variant="secondary"
              onClick={handleCopyEmail}
              className="rounded-full gap-2 py-6 font-semibold"
              aria-label="Copy email address"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? "Copied!" : "Copy Email"}</span>
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
