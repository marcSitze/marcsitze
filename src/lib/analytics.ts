import { sendGAEvent } from "@next/third-parties/google";

export const GA_TRACKING_ID =
  process.env.GA_ID ||
  process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS ||
  "";

/**
 * Generic helper to send custom Google Analytics events
 */
export function trackEvent(
  action: string,
  params?: Record<string, string | number | boolean | undefined>
) {
  if (typeof window === "undefined" || !GA_TRACKING_ID) return;

  try {
    sendGAEvent({ event: action, value: params });
  } catch (error) {
    // Fail silently in non-production environments
    console.debug("[Analytics] Failed to track event:", error);
  }
}

/**
 * High-value conversion tracking helpers
 */
export const AnalyticsEvents = {
  // Triggered when client submits or initiates project inquiry modal
  inquirySubmitted: (projectType: string, budget: string) => {
    trackEvent("project_inquiry_submitted", {
      project_type: projectType,
      budget_range: budget,
    });
  },

  // Triggered when client clicks direct WhatsApp chat button
  whatsappClicked: (source: string) => {
    trackEvent("whatsapp_contact_clicked", { source });
  },

  // Triggered when client copies direct email to clipboard
  emailCopied: () => {
    trackEvent("email_address_copied");
  },

  // Triggered when client clicks to view/download PDF resume
  resumeDownloaded: () => {
    trackEvent("resume_downloaded");
  },

  // Triggered when client explores or clicks an architecture case study
  caseStudyViewed: (slug: string) => {
    trackEvent("case_study_inspected", { case_study_slug: slug });
  },
};
