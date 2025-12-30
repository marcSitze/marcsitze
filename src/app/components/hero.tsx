"use client";

import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import { getDictionary, LocaleType } from "../dictionaries";

export default function Hero({
  isDark,
  dictionary,
}: {
  isDark: boolean;
  lang?: LocaleType;
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
}) {
  const { scrollY } = useScroll();
  const [increment, setIncrement] = useState(0);
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIncrement(latest);
  });

  const Name = ["M", "A", "R", "C", " ", "S", "I", "T", "Z", "E"];

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
        <motion.h1
          className="mb-6 inline-flex cursor-pointer text-6xl font-bold tracking-tighter sm:text-7xl lg:text-8xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ scale: increment / 1000 + 1 }} // Scale up slightly on scroll
        >
          {Name.map((letter) => (
            <motion.span
              key={letter + Math.random()}
              className="inline-block pr-1 text-center"
              whileHover={{
                scale: 1.6,
                color: "#000",
                border: "2px solid #000",
                backgroundColor: "#fff",
                borderRadius: "8px",
              }}
              whileTap={{ scale: 0.8 }}
            >
              {letter}
            </motion.span>
          ))}
        </motion.h1>
        <motion.p
          className="max-w-[600px] text-lg text-gray-400 sm:text-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {dictionary.hero.title}
        </motion.p>
      </div>
    </div>
  );
}
