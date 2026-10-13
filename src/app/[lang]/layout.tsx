import { Outfit } from "next/font/google";
import { MarcBlue, MarcSitze } from "@/assets";
import { ThemeProvider } from "@/components/theme-provider";
import { i18n } from "@/i18n-config";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { LocaleType, getDictionary } from "../dictionaries";
import "../globals.css";
import { Analytics } from "@vercel/analytics/next";
import Navbar from "@/app/components/navbar";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: "en" | "fr" }>;
}) {
  const lang = (await params).lang;
  const isFr = lang === "fr";
  return {
    metadataBase: new URL("https://marcsitze.dev"),
    title: isFr
      ? "Marc Sitze | Développeur Frontend Lead & Full-Stack (Next.js, IA, Fintech)"
      : "Marc Sitze | Senior Frontend Lead & Full-Stack Engineer (Next.js, AI, Fintech)",
    description: isFr
      ? "Développeur Senior & Lead Frontend spécialisé en React, Next.js 15, applications IA en temps réel et passerelles de paiement fintech performantes."
      : "Senior Frontend Lead & Full-Stack Engineer specializing in React, Next.js 15, real-time AI web apps, and high-concurrency fintech platforms.",
    alternates: {
      canonical: `https://marcsitze.dev/${lang}`,
      languages: {
        en: "https://marcsitze.dev/en",
        fr: "https://marcsitze.dev/fr",
        "x-default": "https://marcsitze.dev/en",
      },
    },
    keywords: [
      "Marc Sitze",
      "Senior Frontend Developer",
      "Next.js Developer Freelance",
      "React Engineer",
      "Fullstack Developer",
      "Fintech Frontend",
      "AI Web Applications",
      "Développeur Next.js Freelance",
      "Lead Frontend React",
    ],
    openGraph: {
      title: isFr
        ? "Marc Sitze | Développeur Frontend Lead & Full-Stack"
        : "Marc Sitze | Senior Frontend Lead & Full-Stack Engineer",
      description: isFr
        ? "Développeur Senior spécialisé en Next.js, applications IA et Fintech."
        : "Senior Engineer specializing in Next.js 15, AI apps, and Fintech payment architectures.",
      url: `https://marcsitze.dev/${lang}`,
      siteName: "Marc Sitze Portfolio",
      images: [
        {
          url: "https://marcsitze.dev/marcsitze.png",
          width: 1200,
          height: 630,
          alt: "Marc Sitze - Senior Frontend Lead",
        },
      ],
      locale: isFr ? "fr_FR" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: isFr
        ? "Marc Sitze | Lead Frontend & Full-Stack"
        : "Marc Sitze | Senior Frontend Lead & Full-Stack Engineer",
      description: isFr
        ? "Développeur Next.js & React spécialisé dans les applications IA et Fintech."
        : "Senior React & Next.js engineer specializing in AI and Fintech platforms.",
      creator: "@Marcjorel1",
      images: ["https://marcsitze.dev/marcsitze.png"],
    },
  };
}

gsap.registerPlugin(ScrollTrigger);

export async function generateStaticParams() {
  return i18n.locales.map((locale: LocaleType) => ({ lang: locale }));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Params = any;

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Params;
}) {
  const lang = (await params).lang;
  const isFr = lang === "fr";
  const dictionary = await getDictionary(lang);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://marcsitze.dev/#person",
        name: "Marc Sitze",
        jobTitle: isFr
          ? "Développeur Senior & Frontend Lead"
          : "Senior Frontend Lead & Full-Stack Engineer",
        url: "https://marcsitze.dev",
        image: "https://marcsitze.dev/marcsitze.png",
        sameAs: [
          "https://linkedin.com/in/marcsitze",
          "https://github.com/marcSitze",
          "https://twitter.com/Marcjorel1",
          "https://www.malt.fr/profile/marcsitze",
        ],
        knowsAbout: [
          "React",
          "Next.js",
          "TypeScript",
          "Artificial Intelligence",
          "Fintech Payment Systems",
          "Tailwind CSS",
          "React Native",
          "Node.js",
        ],
        address: {
          "@type": "PostalAddress",
          addressLocality: "Douala",
          addressCountry: "CM",
        },
      },
      {
        "@type": "ProfessionalService",
        "@id": "https://marcsitze.dev/#service",
        name: "Marc Sitze - Software Engineering Consultancy",
        url: `https://marcsitze.dev/${lang}`,
        priceRange: "$$$",
        currenciesAccepted: "USD, EUR, XAF",
        description: isFr
          ? "Prestations d'ingénierie logicielle pour startups : applications IA, plateformes fintech et architecture frontend."
          : "Software engineering consultancy for startups: high-performance AI web apps, fintech payment portals, and modern frontend architecture.",
        provider: {
          "@id": "https://marcsitze.dev/#person",
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Freelance Engineering Services",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "AI & High-Performance Web Apps",
                description:
                  "Ultra-fast Next.js 15 web apps with streaming RAG and conversational AI integrations.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Fintech & Payment Architectures",
                description:
                  "High-concurrency merchant portals, resilient multi-currency payment routing, and audit systems.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Frontend Leadership & Design Systems",
                description:
                  "Enterprise component systems, fluid 60FPS animations, and bilingual internationalization.",
              },
            },
          ],
        },
      },
    ],
  };

  return (
    <html lang={lang}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />
      </head>
      <body className={`${outfit.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar dictionary={dictionary} lang={lang} />
          <main className="pt-16">
            {children}
          </main>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
