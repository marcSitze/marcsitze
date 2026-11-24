"use client";

import Image from "next/image";
import { useRef } from "react";
import { technologies } from "@/data/tech";
import { getDictionary, LocaleType } from "../dictionaries";
import { gsap, useGSAP, MOTION_SAFE_QUERY } from "@/lib/gsap";

export default function TechStack({
  dictionary,
}: {
  lang?: LocaleType;
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
}) {
  const sectionRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const mm = gsap.matchMedia();
      mm.add(MOTION_SAFE_QUERY, () => {
        // Masked headline reveal + subtle horizontal parallax drift
        gsap.from("[data-tech-heading]", {
          yPercent: 105,
          opacity: 0,
          duration: 0.95,
          ease: "power4.out",
          scrollTrigger: {
            trigger: "[data-tech-header]",
            start: "top 86%",
            toggleActions: "play none none reverse",
          },
        });

        gsap.fromTo(
          "[data-tech-heading]",
          { x: -12 },
          {
            x: 16,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          }
        );

        // Flat Graphite panels + cascading pill reveals
        gsap.utils.toArray<HTMLElement>("[data-tech-panel]").forEach((panel, idx) => {
          const pills = panel.querySelectorAll<HTMLElement>("[data-tech-pill]");

          gsap.from(panel, {
            y: 48,
            autoAlpha: 0,
            duration: 0.8,
            delay: (idx % 2) * 0.08,
            ease: "power3.out",
            clearProps: "transform",
            scrollTrigger: {
              trigger: panel,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          });

          if (pills.length > 0) {
            gsap.from(pills, {
              y: 14,
              autoAlpha: 0,
              duration: 0.5,
              stagger: 0.035,
              ease: "power2.out",
              clearProps: "transform",
              scrollTrigger: {
                trigger: panel,
                start: "top 84%",
                toggleActions: "play none none reverse",
              },
            });
          }
        });
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-white px-6 sm:px-14 lg:px-24 py-[110px] sm:py-[145px] border-t border-[#1c1d20]/12"
    >
      <div data-tech-header className="text-left mb-14 sm:mb-18">
        <div className="overflow-hidden">
          <h2
            data-tech-heading
            className="text-[clamp(36px,5.2vw,60px)] leading-[1.07] tracking-[0.02em] text-[#1c1d20] will-change-transform"
          >
            {dictionary.techStack.title}
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {technologies.map((tech, idx) => (
          <div
            key={tech.category}
            data-tech-panel
            className="rounded-[10px] bg-[#f3f3f4] p-6 sm:p-8 text-left"
          >
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#1c1d20]/12">
              <h3 className="text-[20px] sm:text-[24px] leading-[1.2] text-[#1c1d20]">
                {tech.category}
              </h3>
              <span className="text-[10px] text-[#6b6e72]">
                {String(idx + 1).padStart(2, "0")}
              </span>
            </div>

            <div className="flex flex-wrap gap-2.5">
              {tech.skills.map((skill) => (
                <span
                  key={skill.name}
                  data-tech-pill
                  className="inline-flex items-center gap-2 rounded-[36.72px] bg-white ds-inset-ring hover:bg-primary hover:text-white px-4 py-2 text-[13px] text-[#1c1d20] transition-colors duration-300 cursor-default"
                >
                  <Image
                    src={skill.icon}
                    width={16}
                    height={16}
                    alt={`${skill.name} icon`}
                    className="w-4 h-4 object-contain"
                  />
                  <span>{skill.name}</span>
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
