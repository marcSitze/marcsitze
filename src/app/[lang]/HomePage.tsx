"use client";

import { useRef, useState } from "react";
import Contact from "../components/contact";
import Experience from "../components/experience";
import Footer from "../components/footer";
import Hero from "../components/hero";
import EditorialManifesto from "../components/editorialManifesto";
import ClientMarquee from "../components/clientMarquee";
import ServicesBento from "../components/servicesBento";
import TechStack from "../components/tech-stack";
import Portfolio from "../components/portfolio";
import InquiryModal from "../components/inquiryModal";
import EditorialPreloader from "../components/editorialPreloader";
import { getDictionary, LocaleType } from "../dictionaries";
import { gsap, useGSAP, MOTION_SAFE_QUERY } from "@/lib/gsap";

export default function HomePage({
  dictionary,
  lang,
}: {
  lang: LocaleType;
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
}) {
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [inquiryService, setInquiryService] = useState<string | undefined>(undefined);
  const pageRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const container = pageRef.current;
      if (!container) return;

      const mm = gsap.matchMedia();
      mm.add(MOTION_SAFE_QUERY, () => {
        // Ultra-minimal 1px top scroll indicator in Bone White / Electric Iris
        gsap.fromTo(
          "[data-scroll-rail]",
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: container,
              start: "top top",
              end: "bottom bottom",
              scrub: 0.2,
            },
          }
        );
      });

      return () => mm.revert();
    },
    { scope: pageRef }
  );

  const handleSelectService = (serviceId: string) => {
    setInquiryService(serviceId);
    setIsInquiryOpen(true);
  };

  const handleOpenGeneralInquiry = () => {
    setInquiryService(undefined);
    setIsInquiryOpen(true);
  };

  return (
    <div
      ref={pageRef}
      className="relative min-h-screen w-full bg-white text-[#1c1d20] overflow-x-clip selection:bg-primary selection:text-primary-foreground"
    >
      {/* Editorial Opening Curtain */}
      <EditorialPreloader />

      {/* Minimal 1px Scroll Progress Indicator */}
      <div
        aria-hidden="true"
        className="fixed top-0 left-0 right-0 h-[2px] z-50 pointer-events-none"
      >
        <div
          data-scroll-rail
          className="h-full w-full origin-left scale-x-0 bg-primary"
        />
      </div>

      {/* 01. Full-Bleed Dennis Snellenberg Hero */}
      <Hero
        isDark={false}
        lang={lang}
        dictionary={dictionary}
        onOpenInquiry={handleOpenGeneralInquiry}
      />

      {/* 02. Editorial Manifesto & Parallax Primary Orb */}
      <EditorialManifesto
        dictionary={dictionary}
        lang={lang}
        onOpenInquiry={handleOpenGeneralInquiry}
      />

      {/* 03. Selected Work — Interactive Editorial List + Cursor Preview */}
      <Portfolio dictionary={dictionary} showSeeAll={true} lang={lang} />

      {/* 04. Services — Light Editorial Grid + Single Primary Accent */}
      <ServicesBento onSelectService={handleSelectService} isDark={false} />

      {/* 05. Horizontal Partner & Proof Strip */}
      <ClientMarquee />

      {/* 06. Career Timeline & Certifications */}
      <Experience isDark={false} dictionary={dictionary} />

      {/* 07. Technical Stack */}
      <TechStack dictionary={dictionary} />

      {/* 08. Dark Editorial Contact & Footer Finale */}
      <Contact isDark={true} dictionary={dictionary} />

      {/* 09. Editorial Dark Footer */}
      <Footer isDark={true} dictionary={dictionary} />

      {/* Global Project Inquiry Modal */}
      <InquiryModal
        isOpen={isInquiryOpen}
        onClose={() => setIsInquiryOpen(false)}
        initialService={inquiryService}
      />
    </div>
  );
}
