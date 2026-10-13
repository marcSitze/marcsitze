"use client";

import React, { useRef } from "react";
import { CERTIFICATES, RESUME } from "@/data/resume";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import dayjs from "dayjs";
import Link from "next/link";
import {
  ExternalLink,
  Sparkles,
  Award,
  Building2,
  Calendar,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getDictionary, LocaleType } from "../dictionaries";

export default function Experience({
  isDark = true,
  dictionary,
  lang,
}: {
  isDark?: boolean;
  lang?: LocaleType;
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 70%", "end 50%"],
  });

  const pathLength = useSpring(scrollYProgress, {
    stiffness: 400,
    damping: 90,
  });

  const lineHeight = useTransform(pathLength, [0, 1], ["0%", "100%"]);

  // Filter and sort experiences descending
  const experiences = RESUME.filter((item) => item.mainType === "EXPERIENCE").sort(
    (a, b) => +new Date(b.yearStart as string) - +new Date(a.yearStart as string)
  );

  return (
    <section id="experience" className="py-24 relative overflow-hidden" ref={containerRef}>
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Career Milestones</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight mb-4">
            {dictionary.work.title}
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            Engineering leadership and scalable system delivery across global remote teams and high-growth ventures.
          </p>
        </div>

        {/* Tracing Beam Timeline Container */}
        <div className="relative pl-6 sm:pl-10 md:pl-12 border-l border-border/40 ml-2 sm:ml-6 md:ml-10">
          {/* Animated Glowing Tracing Beam Rail */}
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-[-1px] top-0 w-[2px] bg-gradient-to-b from-primary via-cyan-400 to-indigo-500 shadow-[0_0_12px_rgba(56,189,248,0.8)]"
          />

          <div className="space-y-12">
            {experiences.map((exp, idx) => (
              <motion.div
                key={exp.id || idx}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="relative group"
              >
                {/* Glowing Milestone Anchor Dot */}
                <span className="absolute -left-[31px] sm:-left-[47px] md:-left-[55px] top-4 flex h-4 w-4 items-center justify-center">
                  <span className="group-hover:animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/40 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-primary border-2 border-background"></span>
                </span>

                {/* Milestone Experience Card */}
                <div className="p-6 sm:p-8 rounded-3xl border border-black/10 dark:border-white/10 bg-card/70 dark:bg-zinc-950/70 backdrop-blur-xl shadow-lg hover:shadow-2xl hover:border-primary/20 transition-all duration-300">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3.5">
                      {exp.logo ? (
                        <div className="w-12 h-12 rounded-2xl overflow-hidden border border-white/10 bg-black/20 shrink-0 p-1 flex items-center justify-center">
                          <img
                            src={exp.logo}
                            alt={exp.place}
                            className="w-full h-full object-contain"
                          />
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                          <Building2 className="w-6 h-6" />
                        </div>
                      )}

                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg sm:text-xl font-bold tracking-tight text-foreground">
                            {exp.title}
                          </h3>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                          <span className="font-semibold text-primary">{exp.place}</span>
                          {exp.link && (
                            <Link
                              href={exp.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1"
                              aria-label={`Visit ${exp.place}`}
                            >
                              <ExternalLink size={12} />
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-white/5 dark:bg-white/5 px-3 py-1.5 rounded-full border border-white/5 shrink-0 self-start sm:self-auto">
                      <Calendar className="w-3.5 h-3.5 text-primary" />
                      <span>
                        {dayjs(exp.yearStart).format("MMM YYYY")} —{" "}
                        {exp.yearEnd ? dayjs(exp.yearEnd).format("MMM YYYY") : "Present"}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm text-foreground/85 leading-relaxed font-normal">
                    {exp.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Certifications Sub-Section */}
        <div className="mt-24 pt-16 border-t border-border/40">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 mb-2">
              <Award className="w-3.5 h-3.5" />
              <span>Verified Qualifications</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {dictionary.certifications.title}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CERTIFICATES.map((cert) => (
              <div
                key={cert.id}
                className="group p-6 rounded-2xl border border-black/10 dark:border-white/10 bg-card/60 dark:bg-zinc-950/60 backdrop-blur-xl shadow-md hover:shadow-xl hover:border-primary/20 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <Badge variant="secondary" className="bg-primary/10 text-primary font-bold text-xs">
                      {cert.abrev}
                    </Badge>
                    <span className="text-xs text-muted-foreground font-medium">
                      {dayjs(cert.yearEnd).format("YYYY")}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-foreground tracking-tight mb-3 group-hover:text-primary transition-colors">
                    {cert.title}
                  </h4>
                </div>

                <div className="pt-4 border-t border-border/50 flex justify-end">
                  {cert.link && (
                    <Link
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
                    >
                      <span>Verify Certificate</span>
                      <ExternalLink size={12} />
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
