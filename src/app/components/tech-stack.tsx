"use client";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { technologies } from "@/data/tech";
import {
  motion,
  useInView,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";
import Reveal from "@/components/reveal";
import { getDictionary, LocaleType } from "../dictionaries";

export default function TechStack({
  dictionary,
}: {
  lang?: LocaleType;
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true });
  const isMobile =
    typeof window !== "undefined" ? window.innerWidth <= 768 : false;
  const { scrollY } = useScroll();
  const [increment, setIncrement] = useState(0);
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIncrement(latest);
  });

  return (
    <div ref={ref} className="container mx-auto md:px-4 mb-25">
      <motion.h2
        className="my-25 text-center text-3xl font-bold tracking-tighter sm:text-4xl"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8 }}
        style={{ scale: isMobile ? 1 : increment / 1000 + 1 }}
      >
        {dictionary.techStack.title}
      </motion.h2>
      <div className="grid gap-6 md:grid-cols-2">
        {technologies.map((tech) => (
          <Reveal key={tech.category} useContents>
            <Card className="p-6 w-full">
              <h3 className="text-lg font-semibold mb-4">{tech.category}</h3>
              <Reveal
                className="flex flex-wrap gap-2"
                stagger={0.06}
                y={16}
                duration={0.6}
              >
                {tech.skills.map((skill) => (
                  <Badge
                    key={skill.name}
                    className="badge flex items-center justify-between rounded-md bg-primary/10 px-2 py-1 text-sm font-medium text-primary hover:bg-primary/20 transition-colors duration-200 cursor-pointer"
                  >
                    <Image src={skill.icon} width={20} height={20} alt="icon" />
                    <p>{skill.name}</p>
                  </Badge>
                ))}
              </Reveal>
            </Card>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
