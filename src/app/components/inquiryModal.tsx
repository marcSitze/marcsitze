"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Globe,
  LayoutDashboard,
  CreditCard,
  Smartphone,
  Layers,
  Search,
  Check,
  Copy,
  ArrowRight,
} from "lucide-react";
import { AnalyticsEvents } from "@/lib/analytics";

interface InquiryState {
  projectType:
    | "ai-webapp"
    | "dashboard"
    | "fintech-portal"
    | "mobile-app"
    | "frontend-lead"
    | "code-audit";
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
    projectType: (initialService as InquiryState["projectType"]) || "mobile-app",
    budgetRange: "$3k-$10k",
    timeline: "immediate",
    clientName: "",
    clientEmail: "",
    notes: "",
  });

  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (initialService) {
      if (initialService === "mobile-apps")
        setInquiry((prev) => ({ ...prev, projectType: "mobile-app" }));
      else if (initialService === "dashboards")
        setInquiry((prev) => ({ ...prev, projectType: "dashboard" }));
      else if (initialService === "fintech-systems")
        setInquiry((prev) => ({ ...prev, projectType: "fintech-portal" }));
      else if (initialService === "frontend-arch")
        setInquiry((prev) => ({ ...prev, projectType: "frontend-lead" }));
    }
  }, [initialService]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleCopyEmail = () => {
    AnalyticsEvents.emailCopied();
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText("marcsitze01@gmail.com");
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const projectTypes = [
    { id: "mobile-app", label: "Mobile App (Expo)", icon: <Smartphone className="w-4 h-4" /> },
    { id: "dashboard", label: "Dashboards", icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: "fintech-portal", label: "Fintech & Payments", icon: <CreditCard className="w-4 h-4" /> },
    { id: "ai-webapp", label: "Web App", icon: <Globe className="w-4 h-4" /> },
    { id: "frontend-lead", label: "Contract", icon: <Layers className="w-4 h-4" /> },
    { id: "code-audit", label: "Speed & Code Audit", icon: <Search className="w-4 h-4" /> },
  ];

  const budgetOptions: InquiryState["budgetRange"][] = [
    "<$3k",
    "$3k-$10k",
    "$10k-$25k",
    "$25k+",
  ];

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
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 sm:p-6 overflow-y-auto"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Project Scope and Inquiry Estimator"
    >
      <div
        className="relative w-full max-w-2xl bg-white ds-inset-ring rounded-[10px] overflow-hidden p-6 sm:p-9 max-h-[90vh] overflow-y-auto text-left text-[#1c1d20]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between pb-6 border-b border-[#1c1d20]/15 gap-4">
          <div>
            <p className="text-[10px] uppercase text-[#6b6e72] mb-2">
              Project Estimator
            </p>
            <h3 className="text-[26px] sm:text-[33px] leading-[1.15] text-[#1c1d20]">
              Start a project together
            </h3>
            <p className="text-[14px] text-[#6b6e72] mt-2">
              Select your requirements for a fast, direct proposal.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-10 h-10 rounded-[36.72px] bg-white ds-inset-ring hover:bg-primary hover:text-white text-[#1c1d20] flex items-center justify-center transition-colors cursor-pointer shrink-0"
            aria-label="Close dialog"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form Content */}
        <div className="py-6 space-y-6">
          {/* 1. Category */}
          <div>
            <label className="block text-[10px] uppercase text-[#6b6e72] mb-3">
              01 — Project Category
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
                    className={`flex items-center gap-2.5 px-4 py-3 rounded-[36.72px] text-[12px] transition-colors text-left cursor-pointer ${
                      isSelected
                        ? "bg-primary text-white"
                        : "bg-white ds-inset-ring text-[#6b6e72] hover:text-[#1c1d20] hover:bg-[#f3f3f4]"
                    }`}
                  >
                    <span>{type.icon}</span>
                    <span className="truncate">{type.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Budget */}
          <div>
            <label className="block text-[10px] uppercase text-[#6b6e72] mb-3">
              02 — Target Budget
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {budgetOptions.map((budget) => {
                const isSelected = inquiry.budgetRange === budget;
                return (
                  <button
                    key={budget}
                    type="button"
                    onClick={() => setInquiry((prev) => ({ ...prev, budgetRange: budget }))}
                    className={`py-2.5 px-4 rounded-[36.72px] text-[13px] transition-colors text-center cursor-pointer ${
                      isSelected
                        ? "bg-primary text-white"
                        : "bg-white ds-inset-ring text-[#6b6e72] hover:text-[#1c1d20] hover:bg-[#f3f3f4]"
                    }`}
                  >
                    {budget}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Timeline */}
          <div>
            <label className="block text-[10px] uppercase text-[#6b6e72] mb-3">
              03 — Timeline
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {timelineOptions.map((opt) => {
                const isSelected = inquiry.timeline === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setInquiry((prev) => ({ ...prev, timeline: opt.id }))}
                    className={`py-2.5 px-4 rounded-[36.72px] text-[12px] transition-colors text-center truncate cursor-pointer ${
                      isSelected
                        ? "bg-primary text-white"
                        : "bg-white ds-inset-ring text-[#6b6e72] hover:text-[#1c1d20] hover:bg-[#f3f3f4]"
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. Name & Notes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] uppercase text-[#6b6e72] mb-2">
                Your Name / Company
              </label>
              <input
                type="text"
                placeholder="Alex — FinNext"
                value={inquiry.clientName}
                onChange={(e) =>
                  setInquiry((prev) => ({ ...prev, clientName: e.target.value }))
                }
                className="w-full px-4 py-3 rounded-[10px] bg-white ds-inset-ring text-[14px] text-[#1c1d20] placeholder:text-[#6b6e72]/60 focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase text-[#6b6e72] mb-2">
                Project Notes (Optional)
              </label>
              <input
                type="text"
                placeholder="Mobile app / Dashboard scope"
                value={inquiry.notes}
                onChange={(e) =>
                  setInquiry((prev) => ({ ...prev, notes: e.target.value }))
                }
                className="w-full px-4 py-3 rounded-[10px] bg-white ds-inset-ring text-[14px] text-[#1c1d20] placeholder:text-[#6b6e72]/60 focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>
        </div>

        {/* Timezone Note */}
        <p className="text-[12px] text-[#6b6e72] mb-6">
          Timezone: Cameroon (UTC+1) — full overlap with European (CET) and US East Coast (EST) working hours.
        </p>

        {/* Actions */}
        <div className="pt-5 border-t border-[#1c1d20]/15 flex flex-col sm:flex-row gap-3">
          <a
            href={buildWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              AnalyticsEvents.whatsappClicked("inquiry_modal");
              AnalyticsEvents.inquirySubmitted(inquiry.projectType, inquiry.budgetRange);
            }}
            className="ds-pill ds-pill-iris flex-1 inline-flex items-center justify-center gap-2.5"
          >
            <span>Send on WhatsApp</span>
            <ArrowRight size={14} />
          </a>

          <a
            href={buildMailtoUrl()}
            onClick={() => {
              AnalyticsEvents.inquirySubmitted(inquiry.projectType, inquiry.budgetRange);
            }}
            className="ds-pill ds-pill-light inline-flex items-center justify-center"
          >
            Send via Email
          </a>

          <button
            type="button"
            onClick={handleCopyEmail}
            className="ds-pill ds-pill-light inline-flex items-center justify-center gap-2 cursor-pointer"
            aria-label="Copy email address"
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            <span>{copied ? "Copied" : "Copy Email"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
