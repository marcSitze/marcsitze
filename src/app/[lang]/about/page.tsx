"use client";

import { use, useEffect, useState } from "react";
import { getDictionary, LocaleType } from "../../dictionaries";
import { USER } from "@/data/resume";
import { MarcSitze } from "@/assets";
import Reveal from "@/components/reveal";
import {
  Quote,
  Heart,
  Lightbulb,
  Sparkles,
  Code,
  GraduationCap,
  Compass,
  Brain,
  Zap,
  GitPullRequest,
  Rocket,
  ArrowRight,
  FileText,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function AboutPage({
  params,
}: {
  params: Promise<{ lang: LocaleType }>;
}) {
  const { lang } = use(params);
  const [dictionary, setDictionary] = useState<Awaited<
    ReturnType<typeof getDictionary>
  > | null>(null);

  useEffect(() => {
    getDictionary(lang).then(setDictionary);
  }, [lang]);

  if (!dictionary) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const about = dictionary.about;

  // Dynamic icons mapping for Passions
  const passionIcons = [
    <Code key="code" className="w-6 h-6" />,
    <Sparkles key="sparkles" className="w-6 h-6" />,
    <GraduationCap key="grad" className="w-6 h-6" />,
    <Compass key="compass" className="w-6 h-6" />,
  ];

  // Dynamic icons mapping for Try This Year goals
  const tryIcons = [
    <Brain key="brain" className="w-6 h-6" />,
    <Zap key="zap" className="w-6 h-6" />,
    <GitPullRequest key="git" className="w-6 h-6" />,
    <Rocket key="rocket" className="w-6 h-6" />,
  ];

  // Colors for Try This Year status badges
  const getStatusStyle = (status: string) => {
    const s = status.toLowerCase();
    if (s.includes("progress") || s.includes("cours")) {
      return "bg-emerald-500/10 text-emerald-500 border border-emerald-500/25";
    }
    if (s.includes("active") || s.includes("actif")) {
      return "bg-violet-500/10 text-violet-500 border border-violet-500/25";
    }
    if (s.includes("planned") || s.includes("planifié")) {
      return "bg-indigo-500/10 text-indigo-500 border border-indigo-500/25";
    }
    return "bg-slate-500/10 text-slate-500 border border-slate-500/25";
  };

  return (
    <div className="relative min-h-screen py-20 overflow-hidden">
      {/* Decorative ambient background glow blobs */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10 pointer-events-none animate-pulse duration-4000" />
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -z-10 pointer-events-none animate-pulse duration-6000" />

      <div className="container mx-auto px-4 max-w-5xl">
        {/* Profile Hero Section */}
        <Reveal className="mb-20">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            {/* Interactive Profile Image Card */}
            <div className="relative group shrink-0 w-48 h-48 md:w-64 md:h-64">
              {/* Spinning gradient ring background on hover */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary via-blue-500 to-indigo-600 opacity-60 blur-sm group-hover:opacity-100 group-hover:blur-md transition duration-500 group-hover:scale-105" />

              {/* Main image container */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-card">
                <img
                  src={MarcSitze}
                  alt={USER.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>

            {/* Profile Intro Info */}
            <div className="flex-1 text-center md:text-left">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                {about.getToKnowMe}
              </span>

              <h1 className="text-4xl md:text-6xl font-extrabold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-primary via-blue-500 to-indigo-600 tracking-tight">
                {about.title}
              </h1>

              <h2 className="text-2xl text-primary font-semibold mb-6 flex items-center justify-center md:justify-start gap-2">
                {USER.title}
              </h2>

              <p className="text-lg text-muted-foreground leading-relaxed font-light mb-8 max-w-2xl">
                {USER.description}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                <a
                  href={`/${lang}#contact`}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/95 shadow-lg shadow-primary/15 transition-all hover:-translate-y-0.5 active:translate-y-0"
                >
                  {about.contactMeBtn}
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href={USER.cvLink}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-border/80 bg-card/50 backdrop-blur-sm font-semibold hover:bg-muted/40 transition-all hover:-translate-y-0.5 active:translate-y-0"
                >
                  <FileText className="w-4 h-4 text-primary" />
                  {about.viewResumeBtn}
                </a>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Dynamic Sections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Passions Section */}
          <Reveal className="space-y-6">
            <div className="flex items-center gap-3">
              {/* <div className="p-3 bg-red-500/10 rounded-xl">
                <Heart className="w-6 h-6 text-red-500 animate-pulse" />
              </div> */}
              <h2 className="text-3xl font-bold tracking-tight">
                {about.passionsTitle}
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {about.passions.map(
                (
                  passion: { title: string; description: string },
                  index: number,
                ) => (
                  <div
                    key={index}
                    className="group relative overflow-hidden p-6 rounded-2xl border border-border/50 bg-card/45 backdrop-blur-sm shadow-sm transition-all duration-300 hover:shadow-md hover:border-primary/20 hover:-translate-y-0.5"
                  >
                    {/* Glowing background gradient on hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition duration-300 pointer-events-none" />

                    <div className="flex gap-4 items-start relative z-10">
                      <div className="p-3 rounded-xl bg-primary/10 text-primary shrink-0 transition duration-300 group-hover:scale-110">
                        {passionIcons[index % passionIcons.length]}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-foreground mb-1 group-hover:text-primary transition duration-200">
                          {passion.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {passion.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ),
              )}
            </div>
          </Reveal>

          {/* Try This Year Section */}
          <Reveal className="space-y-6">
            <div className="flex items-center gap-3">
              {/* <div className="p-3 bg-yellow-500/10 rounded-xl">
                <Lightbulb className="w-6 h-6 text-yellow-500 animate-bounce duration-3000" />
              </div> */}
              <h2 className="text-3xl font-bold tracking-tight">
                {about.tryThisYearTitle}
              </h2>
            </div>

            <div className="relative pl-6 md:pl-8 border-l border-border/70 space-y-8 py-2">
              {about.tryThisYear.map(
                (
                  item: { title: string; description: string; status: string },
                  index: number,
                ) => (
                  <div key={index} className="relative group">
                    {/* Interactive timeline dot */}
                    <span className="absolute -left-[31px] md:-left-[39px] top-1.5 flex h-4 w-4 items-center justify-center">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/30 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-primary border-2 border-background"></span>
                    </span>

                    {/* Goal Card */}
                    <div className="p-6 rounded-2xl border border-border/50 bg-card/45 backdrop-blur-sm shadow-sm transition-all duration-300 hover:shadow-md hover:border-primary/20 hover:-translate-y-0.5">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                        <div className="flex items-center gap-2">
                          <div className="text-primary shrink-0">
                            {tryIcons[index % tryIcons.length]}
                          </div>
                          <h3 className="text-base md:text-lg font-bold text-foreground">
                            {item.title}
                          </h3>
                        </div>
                        <Badge
                          className={`text-[10px] font-medium px-2 py-0.5 rounded-full uppercase tracking-wider ${getStatusStyle(item.status)}`}
                          variant="outline"
                        >
                          {item.status}
                        </Badge>
                      </div>

                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ),
              )}
            </div>
          </Reveal>
        </div>

        {/* Inspirational Quotes Section */}
        <Reveal className="mt-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-blue-500/10 rounded-xl">
              <Quote className="w-6 h-6 text-blue-500" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight">
              {about.quotesTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {about.quotesContent.map((quote: string, index: number) => {
              // Extract author if exists
              const quoteParts = quote.split(" - ");
              const quoteText = quoteParts[0];
              const authorText = quoteParts[1];

              return (
                <div
                  key={index}
                  className="relative p-8 rounded-2xl border border-border/50 bg-card/35 backdrop-blur-sm overflow-hidden group shadow-sm transition duration-300 hover:border-primary/20"
                >
                  {/* Visual accent left line */}
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-blue-500 rounded-l-2xl" />

                  {/* Decorative background quote mark */}
                  <Quote className="absolute right-4 bottom-4 w-28 h-28 text-primary/5 pointer-events-none select-none transition-transform duration-500 group-hover:scale-110" />

                  <blockquote className="relative z-10 flex flex-col justify-between h-full">
                    <p className="text-lg text-muted-foreground/90 italic leading-relaxed mb-4">
                      {quoteText}
                    </p>
                    {authorText && (
                      <cite className="not-italic text-sm font-semibold text-primary block mt-auto">
                        — {authorText}
                      </cite>
                    )}
                  </blockquote>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </div>
  );
}
