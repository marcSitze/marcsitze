"use client";

import Link from "next/link";
import { ModeToggle } from "@/components/modeToggle";
import LanguageSwitcher from "@/app/components/languageSwitcher";
import { getDictionary, LocaleType } from "../dictionaries";
import { Menu, X, Briefcase, Sparkles, User, Mail, Layers } from "lucide-react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Navbar({
  dictionary,
  lang,
}: {
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
  lang: LocaleType;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const pathname = usePathname();

  const isHome = pathname === `/${lang}` || pathname === `/${lang}/`;

  useEffect(() => {
    if (!isHome) return;

    const sections = ["portfolio", "services", "experience", "contact"];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            return;
          }
        }
      }
      if (window.scrollY < 300) {
        setActiveSection("");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  const navLinks = [
    {
      name: dictionary.nav.work || "Work",
      href: isHome ? "#portfolio" : `/${lang}#portfolio`,
      id: "portfolio",
      icon: <Briefcase className="w-3.5 h-3.5" />,
    },
    {
      name: dictionary.nav.services || "Services",
      href: isHome ? "#services" : `/${lang}#services`,
      id: "services",
      icon: <Layers className="w-3.5 h-3.5" />,
    },
    {
      name: dictionary.nav.experience || "Experience",
      href: isHome ? "#experience" : `/${lang}#experience`,
      id: "experience",
      icon: <Sparkles className="w-3.5 h-3.5" />,
    },
    {
      name: dictionary.nav.about || "About",
      href: `/${lang}/about`,
      id: "about",
      icon: <User className="w-3.5 h-3.5" />,
      isRoute: true,
    },
    {
      name: dictionary.nav.contact || "Contact",
      href: isHome ? "#contact" : `/${lang}#contact`,
      id: "contact",
      icon: <Mail className="w-3.5 h-3.5" />,
    },
  ];

  return (
    <>
      {/* Floating Glass Dock Header */}
      <header className="fixed top-4 inset-x-0 mx-auto z-50 w-full max-w-fit px-3 pointer-events-none">
        <nav
          className="pointer-events-auto mx-auto flex items-center gap-1 sm:gap-2 px-2.5 py-1.5 rounded-full border border-black/10 dark:border-white/10 bg-background/85 dark:bg-zinc-950/80 backdrop-blur-xl shadow-xl shadow-black/10 dark:shadow-black/40 transition-all duration-300"
          aria-label="Main Navigation"
        >
          {/* Brand Monogram */}
          <Link
            href={`/${lang}`}
            className="group relative flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 hover:bg-primary/20 text-primary font-bold text-xs tracking-tighter transition-all duration-200"
            aria-label="Home"
          >
            <span>MS</span>
            <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <ul className="hidden md:flex items-center gap-0.5">
            {navLinks.map((link) => {
              const isActive = link.isRoute
                ? pathname.startsWith(link.href)
                : activeSection === link.id;

              return (
                <li key={link.id}>
                  <Link
                    href={link.href}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-primary text-primary-foreground font-semibold shadow-sm"
                        : "text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5"
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Divider */}
          <div className="hidden sm:block h-4 w-px bg-border/80 mx-1" />

          {/* Actions: Language & Theme */}
          <div className="flex items-center gap-1 sm:gap-1.5">
            <LanguageSwitcher />
            <ModeToggle />

            {/* Mobile Toggle Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex md:hidden items-center justify-center w-8 h-8 rounded-full hover:bg-black/5 dark:hover:bg-white/5 text-foreground transition-colors"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-x-4 top-20 z-50 p-4 rounded-2xl border border-black/10 dark:border-white/10 bg-background/95 dark:bg-zinc-950/95 backdrop-blur-2xl shadow-2xl shadow-black/30 animate-in fade-in slide-in-from-top-2 duration-200"
          role="dialog"
          aria-label="Mobile Navigation Drawer"
        >
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.id}>
                <Link
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                >
                  <span className="text-primary">{link.icon}</span>
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
