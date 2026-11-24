"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { CERTIFICATES, RESUME } from "@/data/resume";
import dayjs from "dayjs";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { getDictionary, LocaleType } from "../dictionaries";
import { gsap, useGSAP, MOTION_SAFE_QUERY } from "@/lib/gsap";

export default function Experience({
  dictionary,
}: {
  isDark?: boolean;
  lang?: LocaleType;
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
}) {
  const sectionRef = useRef<HTMLElement | null>(null);

  const experiences = RESUME.filter((item) => item.mainType === "EXPERIENCE").sort(
    (a, b) => +new Date(b.yearStart as string) - +new Date(a.yearStart as string)
  );

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const mm = gsap.matchMedia();
      mm.add(MOTION_SAFE_QUERY, () => {
        gsap.from("[data-exp-heading]", {
          yPercent: 105,
          opacity: 0,
          duration: 0.95,
          ease: "power4.out",
          scrollTrigger: {
            trigger: "[data-exp-header]",
            start: "top 86%",
            toggleActions: "play none none reverse",
          },
        });

        // Scrubbed monochrome vertical timeline progress beam
        gsap.fromTo(
          "[data-exp-rail]",
          { scaleY: 0 },
          {
            scaleY: 1,
            transformOrigin: "top center",
            ease: "none",
            scrollTrigger: {
              trigger: "[data-exp-timeline]",
              start: "top 75%",
              end: "bottom 55%",
              scrub: 0.5,
            },
          }
        );

        // Staggered editorial timeline items
        gsap.utils.toArray<HTMLElement>("[data-exp-row]").forEach((row) => {
          gsap.from(row, {
            y: 40,
            autoAlpha: 0,
            duration: 0.8,
            ease: "power3.out",
            clearProps: "transform",
            scrollTrigger: {
              trigger: row,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          });
        });

        // Certifications flat Graphite cards reveal
        gsap.from("[data-cert-card]", {
          y: 44,
          autoAlpha: 0,
          duration: 0.75,
          stagger: 0.08,
          ease: "power3.out",
          clearProps: "transform",
          scrollTrigger: {
            trigger: "[data-cert-grid]",
            start: "top 86%",
            toggleActions: "play none none reverse",
          },
        });
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative w-full bg-white px-6 sm:px-14 lg:px-24 py-[110px] sm:py-[145px]"
    >
      {/* Left-Aligned Section Headline */}
      <div data-exp-header className="max-w-3xl text-left mb-16 sm:mb-20">
        <div className="overflow-hidden">
          <h2
            data-exp-heading
            className="text-[clamp(36px,5.2vw,60px)] leading-[1.07] tracking-[0.02em] text-[#1c1d20]"
          >
            {dictionary.work.title}
          </h2>
        </div>
        <p className="mt-5 text-[15px] leading-[1.66] text-[#6b6e72] max-w-2xl">
          Engineering leadership and scalable delivery across distributed teams, fintech platforms, and high-growth ventures.
        </p>
      </div>

      {/* Scrubbed Hairline Timeline */}
      <div
        data-exp-timeline
        className="relative pl-6 sm:pl-12 border-l border-[#1c1d20]/15"
      >
        {/* Scrubbed Obsidian Rail */}
        <div
          data-exp-rail
          className="absolute left-[-1px] top-0 bottom-0 w-[1px] bg-[#1c1d20] origin-top will-change-transform"
        />

        <div className="divide-y divide-[#1c1d20]/12">
          {experiences.map((exp, idx) => (
            <div
              key={`${exp.place}-${idx}`}
              data-exp-row
              className="group relative py-8 sm:py-10 text-left"
            >
              {/* Anchor dot on rail */}
              <span className="absolute -left-[29px] sm:-left-[53px] top-11 w-2 h-2 rounded-full bg-white border border-[#1c1d20] transition-colors duration-300 group-hover:bg-primary group-hover:border-primary" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-start">
                {/* Date Caption */}
                <div className="lg:col-span-3 text-[12px] text-[#6b6e72] pt-1">
                  {dayjs(exp.yearStart).format("MMM YYYY")} —{" "}
                  {exp.yearEnd ? dayjs(exp.yearEnd).format("MMM YYYY") : "Present"}
                </div>

                {/* Role & Company */}
                <div className="lg:col-span-4 flex items-start gap-3.5">
                  {exp.logo && (
                    <div className="w-9 h-9 rounded-full overflow-hidden bg-[#f3f3f4] shrink-0 mt-0.5">
                      <Image
                        src={exp.logo}
                        alt={`${exp.place} logo`}
                        width={36}
                        height={36}
                        className="w-full h-full object-cover grayscale"
                      />
                    </div>
                  )}
                  <div>
                    <h3 className="text-[20px] sm:text-[24px] leading-[1.2] text-[#1c1d20]">
                      {exp.title}
                    </h3>
                    <div className="mt-1.5 flex items-center gap-2 text-[13px] text-[#6b6e72]">
                      <span>{exp.place}</span>
                      {exp.link && (
                        <Link
                          href={exp.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#6b6e72] hover:text-[#1c1d20] transition-colors"
                          aria-label={`Visit ${exp.place}`}
                        >
                          <ExternalLink size={12} />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="lg:col-span-5 text-[15px] leading-[1.66] text-[#6b6e72]">
                  {exp.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Certifications Sub-Section */}
      <div className="mt-24 pt-16 border-t border-[#1c1d20]/12 text-left">
        <h3 className="text-[28px] sm:text-[33px] leading-[1.2] text-[#1c1d20] mb-10">
          {dictionary.certifications.title}
        </h3>

        <div
          data-cert-grid
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {CERTIFICATES.map((cert) => (
            <div
              key={cert.id}
              data-cert-card
              className="rounded-[10px] bg-[#f3f3f4] p-[22px] flex flex-col justify-between gap-6"
            >
              <div>
                <div className="flex items-center justify-between text-[10px] uppercase text-[#6b6e72] mb-4">
                  <span>{cert.abrev}</span>
                  <span>{dayjs(cert.yearEnd).format("YYYY")}</span>
                </div>
                <h4 className="text-[16px] leading-[1.4] text-[#1c1d20]">
                  {cert.title}
                </h4>
              </div>

              {cert.link && (
                <div>
                  <Link
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ds-pill ds-pill-light inline-flex items-center gap-2 text-[12px] py-2 px-4"
                  >
                    <span>Verify</span>
                    <ExternalLink size={11} />
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
