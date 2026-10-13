"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { i18n, type Locale } from "@/i18n-config";

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const currentLocale = pathname?.split("/")[1] || i18n.defaultLocale;

  const redirectedPathname = (locale: Locale) => {
    if (!pathname) return `/${locale}`;
    const segments = pathname.split("/");
    segments[1] = locale;
    return segments.join("/");
  };

  return (
    <div className="flex items-center rounded-full bg-white/5 dark:bg-white/10 p-0.5 border border-white/10">
      {i18n.locales.map((locale) => {
        const isActive = currentLocale === locale;
        return (
          <Link
            key={locale}
            href={redirectedPathname(locale)}
            className={`px-2 py-0.5 text-xs font-semibold rounded-full uppercase transition-all duration-200 ${
              isActive
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {locale}
          </Link>
        );
      })}
    </div>
  );
}
