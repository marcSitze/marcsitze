"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { PORTFOLIO } from "@/data/resume";
import { IPortfolio } from "@/types";
import { getDictionary } from "../dictionaries";
import { AnalyticsEvents } from "@/lib/analytics";
import { gsap, ScrollTrigger, useGSAP, attachMagnetic, MOTION_SAFE_QUERY } from "@/lib/gsap";
import { X, ExternalLink, Github, ChevronLeft, ChevronRight } from "lucide-react";

export default function Portfolio({
  dictionary,
  showSeeAll = false,
  lang,
}: {
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
  showSeeAll?: boolean;
  lang?: string;
}) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const previewContainerRef = useRef<HTMLDivElement | null>(null);
  const cursorLabelRef = useRef<HTMLDivElement | null>(null);

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [hoveredIndex, setHoveredIndex] = useState<number>(0);
  const [isPreviewActive, setIsPreviewActive] = useState(false);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<IPortfolio | null>(null);
  const [activeModalTab, setActiveModalTab] = useState<"overview" | "architecture" | "impact" | "gallery">("overview");
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0);

  const xPreviewTo = useRef<gsap.QuickToFunc | null>(null);
  const yPreviewTo = useRef<gsap.QuickToFunc | null>(null);
  const xCursorTo = useRef<gsap.QuickToFunc | null>(null);
  const yCursorTo = useRef<gsap.QuickToFunc | null>(null);

  const categories = ["all", "ai", "fintech", "web", "mobile"];

  const filteredWorks = PORTFOLIO.filter((work) => {
    if (selectedCategory === "all") return true;
    if (selectedCategory === "web") return work.mainType.toLowerCase() === "web";
    if (selectedCategory === "mobile") return work.mainType.toLowerCase() === "mobile";
    return work.category?.toLowerCase() === selectedCategory;
  });

  // Setup GSAP quickTo for signature Dennis Snellenberg floating cursor preview
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    if (previewContainerRef.current) {
      xPreviewTo.current = gsap.quickTo(previewContainerRef.current, "left", {
        duration: 0.7,
        ease: "power3.out",
      });
      yPreviewTo.current = gsap.quickTo(previewContainerRef.current, "top", {
        duration: 0.7,
        ease: "power3.out",
      });
    }

    if (cursorLabelRef.current) {
      xCursorTo.current = gsap.quickTo(cursorLabelRef.current, "left", {
        duration: 0.42,
        ease: "power3.out",
      });
      yCursorTo.current = gsap.quickTo(cursorLabelRef.current, "top", {
        duration: 0.42,
        ease: "power3.out",
      });
    }
  }, []);

  // Scale in/out the floating preview when entering/leaving the list
  useEffect(() => {
    const preview = previewContainerRef.current;
    const cursor = cursorLabelRef.current;
    if (!preview || !cursor) return;

    gsap.to([preview, cursor], {
      scale: isPreviewActive ? 1 : 0,
      opacity: isPreviewActive ? 1 : 0,
      duration: isPreviewActive ? 0.38 : 0.28,
      ease: isPreviewActive ? "power3.out" : "power2.in",
      overwrite: "auto",
    });
  }, [isPreviewActive]);

  const handleListMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    xPreviewTo.current?.(e.clientX);
    yPreviewTo.current?.(e.clientY);
    xCursorTo.current?.(e.clientX);
    yCursorTo.current?.(e.clientY);
  };

  // Close case study modal on ESC
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedCaseStudy(null);
    };
    if (selectedCaseStudy) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", onKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [selectedCaseStudy]);

  // ScrollTrigger animations for heading, rows & mobile image parallax
  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const mm = gsap.matchMedia();
      mm.add(MOTION_SAFE_QUERY, () => {
        gsap.from("[data-work-heading]", {
          yPercent: 105,
          opacity: 0,
          duration: 0.95,
          ease: "power4.out",
          scrollTrigger: {
            trigger: "[data-work-header]",
            start: "top 86%",
            toggleActions: "play none none reverse",
          },
        });

        gsap.from("[data-work-row]", {
          y: 42,
          autoAlpha: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: "power3.out",
          clearProps: "transform",
          scrollTrigger: {
            trigger: "[data-work-list]",
            start: "top 86%",
            toggleActions: "play none none reverse",
          },
        });

        // Mobile cards curtain reveal & parallax
        gsap.utils.toArray<HTMLElement>("[data-work-mobile-card]").forEach((card) => {
          const imgWrap = card.querySelector<HTMLElement>("[data-work-img-wrap]");
          const img = card.querySelector<HTMLElement>("[data-work-img]");

          if (imgWrap) {
            gsap.fromTo(
              imgWrap,
              { clipPath: "inset(14% 0% 0% 0%)" },
              {
                clipPath: "inset(0% 0% 0% 0%)",
                duration: 0.95,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: card,
                  start: "top 88%",
                  toggleActions: "play none none reverse",
                },
              }
            );
          }

          if (img) {
            gsap.fromTo(
              img,
              { yPercent: -6, scale: 1.12 },
              {
                yPercent: 6,
                scale: 1.05,
                ease: "none",
                scrollTrigger: {
                  trigger: card,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 0.7,
                },
              }
            );
          }
        });

        const magnetics = section.querySelectorAll<HTMLElement>("[data-magnetic]");
        const cleanup = attachMagnetic(magnetics, 0.25);

        ScrollTrigger.refresh();
        return () => cleanup();
      });

      return () => mm.revert();
    },
    { scope: sectionRef, dependencies: [selectedCategory] }
  );

  const openModal = (work: IPortfolio) => {
    setSelectedCaseStudy(work);
    setActiveModalTab("overview");
    setCurrentGalleryIndex(0);
    setIsPreviewActive(false);
    if (work.slug) {
      AnalyticsEvents.caseStudyViewed(work.slug);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      className="relative w-full bg-white px-6 sm:px-14 lg:px-24 py-[110px] sm:py-[140px]"
    >
      {/* Left-Aligned Section Headline Block */}
      <div
        data-work-header
        className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14 sm:mb-20"
      >
        <div className="max-w-3xl text-left">
          <div className="overflow-hidden">
            <h2
              data-work-heading
              className="text-[clamp(36px,5.2vw,60px)] leading-[1.07] tracking-[0.02em] text-[#1c1d20]"
            >
              {dictionary.portfolio.title}
            </h2>
          </div>
          <p className="mt-5 text-[15px] leading-[1.66] text-[#6b6e72] max-w-2xl">
            {dictionary.portfolio.subtitle}
          </p>
        </div>

        {/* Category Filter Pills (36.72px radius, 1px inset border) */}
        <div className="flex flex-wrap items-center gap-2.5">
          {categories.map((category) => {
            const isActive = selectedCategory === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => {
                  setSelectedCategory(category);
                  setHoveredIndex(0);
                }}
                className={`ds-pill cursor-pointer text-[12px] sm:text-[14px] ${
                  isActive ? "ds-pill-iris" : "ds-pill-light"
                }`}
              >
                {dictionary.portfolio[category as keyof typeof dictionary.portfolio] || category}
              </button>
            );
          })}
        </div>
      </div>

      {/* Desktop Signature Editorial List with Floating Cursor Preview */}
      <div
        data-work-list
        onMouseMove={handleListMouseMove}
        onMouseLeave={() => setIsPreviewActive(false)}
        className="hidden lg:block w-full border-b border-[#1c1d20]/15"
      >
        {filteredWorks.map((work, idx) => (
          <div
            key={work.id}
            data-work-row
            onMouseEnter={() => {
              setHoveredIndex(idx);
              setIsPreviewActive(true);
            }}
            onClick={() => openModal(work)}
            className="group relative border-t border-[#1c1d20]/15 py-10 px-4 flex items-center justify-between gap-8 cursor-pointer transition-colors duration-300 hover:bg-[#1c1d20]/[0.02]"
          >
            <div className="flex items-baseline gap-8 transition-transform duration-500 ease-out group-hover:-translate-x-3">
              <span className="text-[12px] text-[#6b6e72] tabular-nums">
                {String(idx + 1).padStart(2, "0")}
              </span>
              <h3 className="text-[clamp(32px,4.2vw,60px)] leading-[1.07] tracking-[0.02em] text-[#1c1d20] transition-opacity duration-300 group-hover:opacity-55">
                {work.title}
              </h3>
            </div>

            <div className="flex items-center gap-12 text-right transition-transform duration-500 ease-out group-hover:translate-x-3">
              <div className="text-left">
                <p className="text-[14px] text-[#1c1d20]">{work.role}</p>
                <p className="text-[12px] text-[#6b6e72] mt-1">
                  {work.client} • {work.category || work.mainType}
                </p>
              </div>

              <div className="hidden xl:flex items-center gap-6">
                {work.impactMetrics?.slice(0, 1).map((m, i) => (
                  <div key={i} className="text-right">
                    <p className="text-[14px] text-[#1c1d20]">{m.value}</p>
                    <p className="text-[10px] text-[#6b6e72] uppercase">{m.label}</p>
                  </div>
                ))}
              </div>

              <span className="text-[12px] text-[#6b6e72] tabular-nums min-w-[84px] text-right">
                {work.period}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Floating GSAP Cursor-Following Image Preview (Desktop Only) */}
      <div
        ref={previewContainerRef}
        aria-hidden="true"
        className="hidden lg:block fixed top-0 left-0 z-30 w-[380px] h-[270px] -translate-x-1/2 -translate-y-1/2 rounded-[10px] overflow-hidden pointer-events-none bg-[#1c1d20] scale-0 opacity-0 will-change-transform"
      >
        <div
          className="w-full h-full transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]"
          style={{
            transform: `translateY(-${Math.min(hoveredIndex, Math.max(filteredWorks.length - 1, 0)) * 100}%)`,
          }}
        >
          {filteredWorks.map((work) => (
            <div
              key={work.id}
              className="relative w-full h-[270px] bg-[#1c1d20] flex items-center justify-center p-5"
            >
              <div className="relative w-full h-full rounded-[6px] overflow-hidden bg-[#1c1d20]">
                <Image
                  src={work.imageLink[0] || work.thumbnail}
                  alt={work.title}
                  fill
                  sizes="380px"
                  className="object-cover object-top"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Primary Cursor Pill ("View") */}
      <div
        ref={cursorLabelRef}
        aria-hidden="true"
        className="hidden lg:flex fixed top-0 left-0 z-30 w-[76px] h-[76px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary text-white text-[12px] items-center justify-center pointer-events-none scale-0 opacity-0 will-change-transform"
      >
        View
      </div>

      {/* Mobile & Tablet Responsive Editorial Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:hidden">
        {filteredWorks.map((work) => (
          <article
            key={work.id}
            data-work-mobile-card
            onClick={() => openModal(work)}
            className="group cursor-pointer text-left"
          >
            <div
              data-work-img-wrap
              className="relative aspect-[16/11] w-full rounded-[10px] overflow-hidden bg-[#f3f3f4] mb-5"
            >
              <div data-work-img className="relative w-full h-full will-change-transform">
                <Image
                  src={work.imageLink[0] || work.thumbnail}
                  alt={`${work.title} — ${work.category}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-top"
                />
              </div>
            </div>

            <div className="flex items-baseline justify-between gap-4 pb-3 border-b border-[#1c1d20]/15">
              <h3 className="text-[28px] leading-[1.15] text-[#1c1d20]">{work.title}</h3>
              <span className="text-[12px] text-[#6b6e72] shrink-0">{work.period}</span>
            </div>

            <div className="flex items-center justify-between gap-4 pt-3 text-[12px] text-[#6b6e72]">
              <span>{work.role}</span>
              <span className="uppercase">{work.category || work.mainType}</span>
            </div>
          </article>
        ))}
      </div>

      {/* Bottom Inset-Border Pill Link */}
      {showSeeAll && lang && (
        <div className="mt-16 flex justify-start">
          <Link
            href={`/${lang}/portfolio`}
            data-magnetic
            className="ds-pill ds-pill-light inline-flex items-center gap-3"
          >
            <span data-magnetic-text>{dictionary.portfolio.seeAll}</span>
            <span className="text-[10px] opacity-65">{PORTFOLIO.length}</span>
          </Link>
        </div>
      )}

      {/* Case Study Detail Modal (Light Editorial Surface) */}
      {selectedCaseStudy && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 sm:p-6"
          onClick={() => setSelectedCaseStudy(null)}
          role="dialog"
          aria-modal="true"
          aria-label={selectedCaseStudy.title}
        >
          <div
            className="relative w-full max-w-4xl max-h-[90vh] bg-white ds-inset-ring rounded-[10px] overflow-hidden flex flex-col text-left text-[#1c1d20]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-6 sm:p-8 border-b border-[#1c1d20]/15 flex items-start justify-between gap-4">
              <div>
                <p className="text-[12px] text-[#6b6e72] mb-2">
                  {selectedCaseStudy.client} • {selectedCaseStudy.period} •{" "}
                  <span className="uppercase">{selectedCaseStudy.category || selectedCaseStudy.mainType}</span>
                </p>
                <h3 className="text-[28px] sm:text-[36px] leading-[1.1] text-[#1c1d20]">
                  {selectedCaseStudy.title}
                </h3>
                <p className="text-[14px] text-[#6b6e72] mt-2">{selectedCaseStudy.role}</p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedCaseStudy(null)}
                className="w-10 h-10 rounded-[36.72px] bg-white ds-inset-ring hover:bg-primary hover:text-white text-[#1c1d20] flex items-center justify-center transition-colors cursor-pointer shrink-0"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Navigation Tabs */}
            <div className="flex border-b border-[#1c1d20]/15 px-6 sm:px-8 gap-6 overflow-x-auto">
              {(
                [
                  { id: "overview", label: "Overview" },
                  { id: "architecture", label: "Architecture" },
                  { id: "impact", label: "Impact" },
                  {
                    id: "gallery",
                    label: `Gallery (${selectedCaseStudy.imageLink?.length || 0})`,
                  },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveModalTab(tab.id)}
                  className={`py-4 text-[13px] border-b transition-colors whitespace-nowrap cursor-pointer ${
                    activeModalTab === tab.id
                      ? "border-primary text-[#1c1d20]"
                      : "border-transparent text-[#6b6e72] hover:text-[#1c1d20]"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1">
              {activeModalTab === "overview" && (
                <div className="space-y-6">
                  <div>
                    <p className="text-[10px] uppercase text-[#6b6e72] mb-2">Summary</p>
                    <p className="text-[15px] leading-[1.66] text-[#1c1d20]">
                      {selectedCaseStudy.summary || selectedCaseStudy.description}
                    </p>
                  </div>

                  {selectedCaseStudy.problem && (
                    <div className="p-[22px] rounded-[10px] bg-[#f3f3f4]">
                      <p className="text-[10px] uppercase text-[#6b6e72] mb-2">The Challenge</p>
                      <p className="text-[15px] leading-[1.66] text-[#1c1d20]">
                        {selectedCaseStudy.problem}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {activeModalTab === "architecture" && (
                <div className="space-y-6">
                  {selectedCaseStudy.solution && (
                    <div className="p-[22px] rounded-[10px] bg-[#f3f3f4]">
                      <p className="text-[10px] uppercase text-[#6b6e72] mb-2">Architecture</p>
                      <p className="text-[15px] leading-[1.66] text-[#1c1d20]">
                        {selectedCaseStudy.solution}
                      </p>
                    </div>
                  )}

                  <div>
                    <p className="text-[10px] uppercase text-[#6b6e72] mb-3">Technologies</p>
                    <div className="flex flex-wrap gap-2">
                      {(selectedCaseStudy.technologies || selectedCaseStudy.technos?.split(",")).map(
                        (tech, idx) => (
                          <span
                            key={idx}
                            className="rounded-[36.72px] px-4 py-1.5 text-[12px] text-[#1c1d20] ds-inset-ring"
                          >
                            {typeof tech === "string" ? tech.trim() : ""}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                </div>
              )}

              {activeModalTab === "impact" && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {selectedCaseStudy.impactMetrics?.map((metric, idx) => (
                    <div key={idx} className="p-[22px] rounded-[10px] bg-[#f3f3f4]">
                      <span className="block text-[33px] leading-[1.1] text-[#1c1d20] mb-2">
                        {metric.value}
                      </span>
                      <span className="text-[12px] text-[#6b6e72]">{metric.label}</span>
                    </div>
                  ))}
                </div>
              )}

              {activeModalTab === "gallery" && (
                <div className="space-y-4">
                  <div className="relative w-full h-[44vh] bg-[#f3f3f4] rounded-[10px] overflow-hidden flex items-center justify-center">
                    <Image
                      src={selectedCaseStudy.imageLink[currentGalleryIndex] || selectedCaseStudy.thumbnail}
                      alt={`${selectedCaseStudy.title} screenshot ${currentGalleryIndex + 1}`}
                      width={900}
                      height={500}
                      className="max-h-full max-w-full object-contain"
                    />

                    {selectedCaseStudy.imageLink.length > 1 && (
                      <>
                        <button
                          type="button"
                          onClick={() =>
                            setCurrentGalleryIndex(
                              (prev) =>
                                (prev - 1 + selectedCaseStudy.imageLink.length) %
                                selectedCaseStudy.imageLink.length
                            )
                          }
                          className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-[36.72px] bg-white ds-inset-ring hover:bg-primary hover:text-white text-[#1c1d20] flex items-center justify-center cursor-pointer"
                          aria-label="Previous image"
                        >
                          <ChevronLeft size={18} />
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setCurrentGalleryIndex(
                              (prev) => (prev + 1) % selectedCaseStudy.imageLink.length
                            )
                          }
                          className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-[36.72px] bg-white ds-inset-ring hover:bg-primary hover:text-white text-[#1c1d20] flex items-center justify-center cursor-pointer"
                          aria-label="Next image"
                        >
                          <ChevronRight size={18} />
                        </button>
                      </>
                    )}
                  </div>

                  <div className="flex gap-2 overflow-x-auto pb-1">
                    {selectedCaseStudy.imageLink.map((img, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setCurrentGalleryIndex(idx)}
                        className={`relative h-14 w-20 shrink-0 rounded-[10px] overflow-hidden transition-opacity cursor-pointer ${
                          idx === currentGalleryIndex
                            ? "opacity-100 ring-1 ring-primary"
                            : "opacity-45 hover:opacity-80"
                        }`}
                      >
                        <Image
                          src={img}
                          alt={`${selectedCaseStudy.title} preview ${idx + 1}`}
                          width={80}
                          height={56}
                          className="h-full w-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-5 sm:p-6 border-t border-[#1c1d20]/15 flex flex-wrap items-center justify-between gap-4">
              <span className="text-[12px] text-[#6b6e72]">
                {selectedCaseStudy.client} — {selectedCaseStudy.period}
              </span>
              <div className="flex flex-wrap gap-3">
                <Link
                  href={`/${lang || "en"}/portfolio/${selectedCaseStudy.slug}`}
                  className="ds-pill ds-pill-light inline-flex items-center gap-2"
                >
                  <span>Full Case Study</span>
                  <ExternalLink size={14} />
                </Link>
                {selectedCaseStudy.liveUrl && (
                  <a
                    href={selectedCaseStudy.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ds-pill ds-pill-iris inline-flex items-center gap-2"
                  >
                    <span>Visit Live</span>
                    <ExternalLink size={14} />
                  </a>
                )}
                {selectedCaseStudy.githubUrl && (
                  <a
                    href={selectedCaseStudy.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ds-pill ds-pill-light inline-flex items-center gap-2"
                  >
                    <Github size={14} />
                    <span>Code</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
