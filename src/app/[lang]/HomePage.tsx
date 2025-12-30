"use client";
import { ModeToggle } from "@/components/modeToggle";
import Reveal from "@/components/reveal";
import { useTheme } from "next-themes";
import { useEffect, useRef } from "react";
import Contact from "../components/contact";
import Experience from "../components/experience";
import Footer from "../components/footer";
import Hero from "../components/hero";
import TechStack from "../components/tech-stack";
import { getDictionary, LocaleType } from "../dictionaries";

export default function HomePage({
  dictionary,
}: {
  lang: LocaleType;
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const isDark =
    theme === "dark" ||
    (theme === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Particle[] = [];
    const particleCount = 100;

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = isDark
          ? "rgba(255, 255, 255, 0.5)"
          : "rgba(0, 0, 0, 1)";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function animate() {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const particle of particles) {
        particle.update();
        particle.draw();
      }

      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      if (!canvasRef.current) return;
      canvasRef.current.width = window.innerWidth;
      canvasRef.current.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [theme]);

  if (!theme) return null;

  return (
    <main
      className={`min-h- ${
        isDark ? "bg-black text-white" : "bg-white text-black"
      } overflow-x-hidden`}
    >
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 h-full w-full ${
          isDark ? "bg-black" : "bg-white"
        }`}
      />
      <ModeToggle />
      <Reveal className="mb-12 px-4">
        <Hero isDark={isDark} dictionary={dictionary} />
      </Reveal>
      {/* <Gallery /> */}
      <Reveal className="mb-12 px-4">
        <Experience isDark={isDark} dictionary={dictionary} />
      </Reveal>
      {/* <Portfolio /> */}
      <Reveal className="mb-12 px-4">
        <TechStack dictionary={dictionary} />
      </Reveal>
      <Reveal className="mb-12 px-4">
        <Contact isDark={isDark} dictionary={dictionary} />
      </Reveal>
      {/* <Reveal className="mb-12 px-4"> */}
      <Footer isDark={isDark} dictionary={dictionary} />
      {/* </Reveal> */}
    </main>
  );
}