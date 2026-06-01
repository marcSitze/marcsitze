"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { i18n, type Locale } from "@/i18n-config";

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const redirectedPathname = (locale: Locale) => {
    if (!pathname) return "/";
    const segments = pathname.split("/");
    segments[1] = locale;
    return segments.join("/");
  };

  return (
    <div className="flex items-center">
      <ul className="flex space-x-2 text-sm font-medium">
        {i18n.locales.map((locale, idx) => {
          return (
            <li key={locale} className="flex items-center">
              <Link className="px-2 hover:text-primary transition-colors uppercase" href={redirectedPathname(locale)}>
                {locale}
              </Link>
              {idx === 0 && <span className="text-muted-foreground">|</span>}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
