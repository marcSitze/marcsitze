"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { i18n, type Locale } from "@/i18n-config";

export default function LanguageSwitcher({
  tone = "light",
}: {
  tone?: "light" | "dark";
}) {
  const pathname = usePathname();
  const currentLocale = pathname?.split("/")[1] || i18n.defaultLocale;

  const redirectedPathname = (locale: Locale) => {
    if (!pathname) return `/${locale}`;
    const segments = pathname.split("/");
    segments[1] = locale;
    return segments.join("/");
  };

  const activeClass = tone === "dark" ? "text-[#1c1d20]" : "text-white";
  const inactiveClass =
    tone === "dark"
      ? "text-[#6b6e72] hover:text-[#1c1d20]"
      : "text-[#999d9e] hover:text-white";

  return (
    <div className="flex items-center gap-2 text-[12px] leading-none tracking-[0.05em]">
      {i18n.locales.map((locale, idx) => {
        const isActive = currentLocale === locale;
        return (
          <span key={locale} className="inline-flex items-center gap-2">
            <Link
              href={redirectedPathname(locale)}
              className={`uppercase transition-colors duration-200 ${
                isActive ? activeClass : inactiveClass
              }`}
            >
              {locale}
            </Link>
            {idx === 0 && <span className="text-[#999d9e]/60">/</span>}
          </span>
        );
      })}
    </div>
  );
}
