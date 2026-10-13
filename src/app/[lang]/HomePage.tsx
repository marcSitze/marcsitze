"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Contact from "../components/contact";
import Experience from "../components/experience";
import Footer from "../components/footer";
import Hero from "../components/hero";
import ClientMarquee from "../components/clientMarquee";
import ServicesBento from "../components/servicesBento";
import TechStack from "../components/tech-stack";
import Portfolio from "../components/portfolio";
import { getDictionary, LocaleType } from "../dictionaries";
import Reveal from "@/components/reveal";

export default function HomePage({
  dictionary,
  lang,
}: {
  lang: LocaleType;
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
}) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? resolvedTheme === "dark" : true;

  const handleSelectService = (serviceId: string) => {
    const contactEl = document.getElementById("contact");
    if (contactEl) contactEl.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="relative min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/20 selection:text-primary">
      {/* Ambient background glows */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-sky-500/10 via-indigo-500/5 to-transparent blur-3xl opacity-60 dark:opacity-40" />
        <div className="absolute top-[40%] right-[-10%] w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-[20%] left-[-10%] w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-3xl" />
      </div>

      {/* Hero Section */}
      <Hero isDark={isDark} lang={lang} dictionary={dictionary} />

      {/* Social Proof Marquee */}
      <ClientMarquee isDark={isDark} />

      {/* Flagship Case Studies Showcase */}
      <Portfolio dictionary={dictionary} showSeeAll={true} lang={lang} />

      {/* Interactive Services Bento Grid */}
      <Reveal className="mb-16 px-4">
        <ServicesBento onSelectService={handleSelectService} isDark={isDark} />
      </Reveal>

      {/* Career Journey & Experience Section */}
      <Reveal className="mb-16 px-4">
        <Experience isDark={isDark} dictionary={dictionary} />
      </Reveal>

      {/* Technical Stack Section */}
      <Reveal className="mb-16 px-4">
        <TechStack dictionary={dictionary} />
      </Reveal>

      {/* Conversion & Contact Section */}
      <Reveal className="mb-16 px-4">
        <Contact isDark={isDark} dictionary={dictionary} />
      </Reveal>

      {/* Footer */}
      <Footer isDark={isDark} dictionary={dictionary} />
    </main>
  );
}
