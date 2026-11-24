"use client";

import { useEffect, useState } from "react";
import { getDictionary, LocaleType } from "../dictionaries";

export default function Footer({
  dictionary,
}: {
  isDark?: boolean;
  lang?: LocaleType;
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
}) {
  const [localTime, setLocalTime] = useState<string>("—");

  useEffect(() => {
    const updateClock = () => {
      try {
        const formatted = new Intl.DateTimeFormat("en-GB", {
          timeZone: "Africa/Douala",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }).format(new Date());
        setLocalTime(`${formatted} GMT+1`);
      } catch {
        setLocalTime("UTC+1");
      }
    };

    updateClock();
    const interval = setInterval(updateClock, 30_000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="w-full bg-[#1c1d20] px-6 sm:px-14 lg:px-24 pb-10 pt-8 border-t border-white/15 text-left">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-8">
        {/* Left Metadata: Version & Live Local Time */}
        <div className="flex flex-wrap gap-10 sm:gap-14">
          <div>
            <p className="text-[10px] uppercase text-[#999d9e] mb-2">Version</p>
            <p className="text-[14px] text-white">
              {new Date().getFullYear()} © Edition
            </p>
          </div>

          <div>
            <p className="text-[10px] uppercase text-[#999d9e] mb-2">Local Time</p>
            <p className="text-[14px] text-white tabular-nums">{localTime}</p>
          </div>
        </div>

        {/* Right Metadata: Socials */}
        <div>
          <p className="text-[10px] uppercase text-[#999d9e] mb-2">Socials</p>
          <div className="flex flex-wrap gap-6 text-[14px] text-white">
            <a
              href="https://github.com/marcSitze"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors duration-200"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/marcsitze/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors duration-200"
            >
              LinkedIn
            </a>
            <a
              href="https://www.malt.fr/profile/marcsitze"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors duration-200"
            >
              Malt
            </a>
            <a
              href="https://twitter.com/Marcjorel1"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors duration-200"
            >
              Twitter
            </a>
          </div>
        </div>
      </div>

      <p className="mt-8 text-[10px] text-[#999d9e]">
        Marc Sitze — {dictionary.footer.tagLine}
      </p>
    </footer>
  );
}
