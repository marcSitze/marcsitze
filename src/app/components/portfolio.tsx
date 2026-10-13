"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PORTFOLIO } from "@/data/resume";
import { IPortfolio } from "@/types";
import { getDictionary } from "../dictionaries";
import {
  X,
  ExternalLink,
  Github,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Cpu,
  Layers,
  Sparkles,
} from "lucide-react";

// 3D Parallax Tilt Card Component
function ThreeDTiltCard({
  children,
  className = "",
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [spotlightPos, setSpotlightPos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (typeof window !== "undefined" && window.innerWidth <= 768) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setRotateX(((y - centerY) / centerY) * -6);
    setRotateY(((x - centerX) / centerX) * 6);
    setSpotlightPos({ x, y });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovered(false);
  };

  return (
    <div
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: isHovered ? "transform 0.1s ease-out" : "transform 0.5s ease-out",
      }}
      className={`relative group rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 bg-card/80 dark:bg-zinc-950/70 backdrop-blur-xl shadow-lg hover:shadow-2xl hover:shadow-primary/10 transition-shadow duration-300 cursor-pointer ${className}`}
    >
      {/* Dynamic Cursor Spotlight Overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-0"
        style={{
          background: `radial-gradient(450px circle at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(56, 189, 248, 0.15), transparent 70%)`,
        }}
      />
      {children}
    </div>
  );
}

export default function Portfolio({
  dictionary,
  showSeeAll = false,
  lang,
}: {
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
  showSeeAll?: boolean;
  lang?: string;
}) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<IPortfolio | null>(null);
  const [activeModalTab, setActiveModalTab] = useState<"overview" | "architecture" | "impact" | "gallery">("overview");
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0);

  const categories = ["all", "ai", "fintech", "web", "mobile"];

  const filteredWorks = PORTFOLIO.filter((work) => {
    if (selectedCategory === "all") return true;
    if (selectedCategory === "web") return work.mainType.toLowerCase() === "web";
    if (selectedCategory === "mobile") return work.mainType.toLowerCase() === "mobile";
    return work.category?.toLowerCase() === selectedCategory;
  });

  const openModal = (work: IPortfolio) => {
    setSelectedCaseStudy(work);
    setActiveModalTab("overview");
    setCurrentGalleryIndex(0);
  };

  const closeModal = () => {
    setSelectedCaseStudy(null);
  };

  return (
    <section id="portfolio" className="py-24 relative">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Case Studies</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight mb-4">
            {dictionary.portfolio.title}
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            {dictionary.portfolio.subtitle}
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-14">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full px-5 py-2 text-xs sm:text-sm font-semibold transition-all duration-200 ${
                selectedCategory === category
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                  : "border-border/60 hover:bg-muted/50"
              }`}
            >
              {dictionary.portfolio[category as keyof typeof dictionary.portfolio] || category}
            </Button>
          ))}
        </div>

        {/* 3D Case Study Grid */}
        <motion.div layout className="grid gap-8 md:grid-cols-2">
          <AnimatePresence>
            {filteredWorks.map((work) => (
              <motion.div
                key={work.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
              >
                <ThreeDTiltCard onClick={() => openModal(work)}>
                  <div className="relative z-10 flex flex-col h-full">
                    {/* Thumbnail banner with gradient mask */}
                    <div className="relative h-56 w-full overflow-hidden bg-zinc-900">
                      <img
                        src={work.imageLink[0] || work.thumbnail}
                        alt={work.title}
                        className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />

                      {/* Floating Category Badge */}
                      <div className="absolute top-4 left-4 flex gap-2">
                        <Badge className="bg-primary/90 text-primary-foreground text-[11px] font-bold uppercase tracking-wider backdrop-blur-md">
                          {work.category || work.mainType}
                        </Badge>
                        {work.role && (
                          <Badge variant="secondary" className="bg-black/60 text-white text-[11px] backdrop-blur-md border-white/10">
                            {work.role}
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Card Content Body */}
                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                          <span className="font-semibold text-primary">{work.client}</span>
                          <span>{work.period}</span>
                        </div>

                        <h3 className="text-2xl font-bold tracking-tight mb-2 group-hover:text-primary transition-colors">
                          {work.title}
                        </h3>

                        <p className="text-sm text-muted-foreground leading-relaxed mb-6 line-clamp-2">
                          {work.summary || work.description}
                        </p>
                      </div>

                      {/* Impact Metrics Chips */}
                      <div>
                        {work.impactMetrics && work.impactMetrics.length > 0 && (
                          <div className="grid grid-cols-3 gap-2 py-3 px-3 rounded-xl bg-white/5 dark:bg-white/5 border border-white/5 mb-6">
                            {work.impactMetrics.slice(0, 3).map((metric, idx) => (
                              <div key={idx} className="flex flex-col text-center">
                                <span className="text-xs sm:text-sm font-black text-foreground tracking-tight">
                                  {metric.value}
                                </span>
                                <span className="text-[10px] text-muted-foreground truncate">
                                  {metric.label}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Technology Badges */}
                        <div className="flex flex-wrap gap-1.5 mb-6">
                          {(work.technologies || work.technos?.split(",")).slice(0, 4).map((tech, idx) => (
                            <span
                              key={idx}
                              className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-primary/10 text-primary"
                            >
                              {typeof tech === "string" ? tech.trim() : ""}
                            </span>
                          ))}
                        </div>

                        {/* Footer action trigger */}
                        <div className="flex items-center justify-between pt-4 border-t border-border/50">
                          <span className="text-xs font-semibold text-primary inline-flex items-center gap-1 group-hover:underline">
                            {dictionary.portfolio.viewCaseStudy || "Inspect Architecture"}
                            <span className="transition-transform group-hover:translate-x-1">→</span>
                          </span>

                          <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                            {work.liveUrl && (
                              <a
                                href={work.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-full hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors"
                                aria-label="Visit Live Demo"
                              >
                                <ExternalLink size={16} />
                              </a>
                            )}
                            {work.githubUrl && (
                              <a
                                href={work.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-full hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors"
                                aria-label="Visit GitHub Repository"
                              >
                                <Github size={16} />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </ThreeDTiltCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {showSeeAll && lang && (
          <div className="mt-14 text-center">
            <Button asChild variant="outline" size="lg" className="rounded-full px-8">
              <a href={`/${lang}/portfolio`}>{dictionary.portfolio.seeAll}</a>
            </Button>
          </div>
        )}
      </div>

      {/* Comprehensive Case Study Detail Modal */}
      <AnimatePresence>
        {selectedCaseStudy && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 sm:p-6"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-4xl max-h-[90vh] bg-background border border-border/70 rounded-3xl overflow-hidden shadow-2xl flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="relative p-6 sm:p-8 border-b border-border/50 flex items-start justify-between bg-card/40">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-primary/10 text-primary uppercase text-[10px] font-bold">
                      {selectedCaseStudy.category || selectedCaseStudy.mainType}
                    </Badge>
                    <span className="text-xs text-muted-foreground font-medium">
                      {selectedCaseStudy.client} • {selectedCaseStudy.period}
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                    {selectedCaseStudy.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Role: <strong className="text-foreground">{selectedCaseStudy.role}</strong>
                  </p>
                </div>

                <button
                  onClick={closeModal}
                  className="p-2 rounded-full hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Close modal"
                >
                  <X size={22} />
                </button>
              </div>

              {/* Modal Navigation Tabs */}
              <div className="flex border-b border-border/50 px-6 sm:px-8 gap-4 bg-muted/20 overflow-x-auto">
                <button
                  onClick={() => setActiveModalTab("overview")}
                  className={`py-3 text-xs sm:text-sm font-semibold border-b-2 transition-colors ${
                    activeModalTab === "overview"
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Overview & Challenge
                </button>
                <button
                  onClick={() => setActiveModalTab("architecture")}
                  className={`py-3 text-xs sm:text-sm font-semibold border-b-2 transition-colors ${
                    activeModalTab === "architecture"
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Solution Architecture
                </button>
                <button
                  onClick={() => setActiveModalTab("impact")}
                  className={`py-3 text-xs sm:text-sm font-semibold border-b-2 transition-colors ${
                    activeModalTab === "impact"
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Metrics & Impact
                </button>
                <button
                  onClick={() => setActiveModalTab("gallery")}
                  className={`py-3 text-xs sm:text-sm font-semibold border-b-2 transition-colors ${
                    activeModalTab === "gallery"
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Screenshots ({selectedCaseStudy.imageLink?.length || 0})
                </button>
              </div>

              {/* Modal Body Content */}
              <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1">
                {activeModalTab === "overview" && (
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-xs uppercase tracking-wider text-muted-foreground font-bold mb-2">
                        Summary
                      </h4>
                      <p className="text-base text-foreground/90 leading-relaxed">
                        {selectedCaseStudy.summary || selectedCaseStudy.description}
                      </p>
                    </div>

                    {selectedCaseStudy.problem && (
                      <div className="p-5 rounded-2xl bg-destructive/5 border border-destructive/20">
                        <h4 className="text-xs uppercase tracking-wider text-destructive font-bold mb-2 flex items-center gap-2">
                          <span>The Challenge & Bottleneck</span>
                        </h4>
                        <p className="text-sm text-foreground/90 leading-relaxed">
                          {selectedCaseStudy.problem}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {activeModalTab === "architecture" && (
                  <div className="space-y-6">
                    {selectedCaseStudy.solution && (
                      <div className="p-5 rounded-2xl bg-primary/5 border border-primary/20">
                        <h4 className="text-xs uppercase tracking-wider text-primary font-bold mb-2 flex items-center gap-2">
                          <Cpu className="w-4 h-4" />
                          <span>Architectural Implementation</span>
                        </h4>
                        <p className="text-sm text-foreground/90 leading-relaxed">
                          {selectedCaseStudy.solution}
                        </p>
                      </div>
                    )}

                    <div>
                      <h4 className="text-xs uppercase tracking-wider text-muted-foreground font-bold mb-3 flex items-center gap-2">
                        <Layers className="w-4 h-4" />
                        <span>Core Technologies Deployed</span>
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {(selectedCaseStudy.technologies || selectedCaseStudy.technos?.split(",")).map((tech, idx) => (
                          <Badge key={idx} variant="secondary" className="px-3 py-1 text-xs">
                            {typeof tech === "string" ? tech.trim() : ""}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeModalTab === "impact" && (
                  <div className="space-y-6">
                    <h4 className="text-xs uppercase tracking-wider text-muted-foreground font-bold flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-emerald-400" />
                      <span>Measurable Business & Engineering ROI</span>
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {selectedCaseStudy.impactMetrics?.map((metric, idx) => (
                        <div
                          key={idx}
                          className="p-4 rounded-2xl bg-card border border-border/60 text-center"
                        >
                          <span className="block text-2xl font-black text-primary tracking-tight mb-1">
                            {metric.value}
                          </span>
                          <span className="text-xs text-muted-foreground font-medium">
                            {metric.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeModalTab === "gallery" && (
                  <div className="flex flex-col items-center gap-4">
                    <div className="relative w-full h-[45vh] bg-black/40 rounded-2xl overflow-hidden flex items-center justify-center">
                      <img
                        src={selectedCaseStudy.imageLink[currentGalleryIndex] || selectedCaseStudy.thumbnail}
                        alt="Case study screenshot"
                        className="max-h-full max-w-full object-contain"
                      />

                      {selectedCaseStudy.imageLink.length > 1 && (
                        <>
                          <button
                            onClick={() =>
                              setCurrentGalleryIndex((prev) =>
                                (prev - 1 + selectedCaseStudy.imageLink.length) % selectedCaseStudy.imageLink.length
                              )
                            }
                            className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 text-white hover:bg-black/80"
                            aria-label="Previous image"
                          >
                            <ChevronLeft size={20} />
                          </button>
                          <button
                            onClick={() =>
                              setCurrentGalleryIndex((prev) =>
                                (prev + 1) % selectedCaseStudy.imageLink.length
                              )
                            }
                            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 text-white hover:bg-black/80"
                            aria-label="Next image"
                          >
                            <ChevronRight size={20} />
                          </button>
                        </>
                      )}
                    </div>

                    {/* Thumbnail strip */}
                    <div className="flex gap-2 overflow-x-auto max-w-full pb-2">
                      {selectedCaseStudy.imageLink.map((img, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentGalleryIndex(idx)}
                          className={`relative h-14 w-20 shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                            idx === currentGalleryIndex
                              ? "border-primary opacity-100 scale-105"
                              : "border-transparent opacity-50 hover:opacity-80"
                          }`}
                        >
                          <img src={img} alt="" className="h-full w-full object-cover" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="p-4 sm:p-6 border-t border-border/50 bg-card/40 flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  Available for contracts & full-stack development
                </span>
                <div className="flex gap-3">
                  {selectedCaseStudy.liveUrl && (
                    <Button asChild size="sm" className="rounded-full gap-2">
                      <a href={selectedCaseStudy.liveUrl} target="_blank" rel="noopener noreferrer">
                        <span>Visit Live Platform</span>
                        <ExternalLink size={14} />
                      </a>
                    </Button>
                  )}
                  {selectedCaseStudy.githubUrl && (
                    <Button asChild variant="outline" size="sm" className="rounded-full gap-2">
                      <a href={selectedCaseStudy.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github size={14} />
                        <span>Repository</span>
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
