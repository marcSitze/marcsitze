// import { Geist, Geist_Mono } from "next/font/google";
import { MarcBlue, MarcSitze } from "@/assets";
import { ThemeProvider } from "@/components/theme-provider";
import { i18n } from "@/i18n-config";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { LocaleType } from "../dictionaries";
import "../globals.css";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: "en" | "fr" }>;
}) {
  const lang = (await params).lang;
  const isFr = lang === "fr";
  return {
    title: isFr
      ? "Marc Sitze | Développeur React & Next.js"
      : "Marc Sitze | React & Next.js Developer",
    description: isFr
      ? "Développeur React et Next.js spécialisé dans les applications web modernes et performantes."
      : "React and Next.js developer specializing in modern, high-performance web applications.",
    alternates: {
      languages: {
        en: "https://marcsitze.dev/en",
        fr: "https://marcsitze.dev/fr",
      },
    },
    keywords: [
      "Marc Sitze",
      "Frontend Developer",
      "Next.js Developer",
      "React Developer",
      "Fullstack Developer",
      "MERN stack Developer",
      "Developpeur React",
      "Developpeur Frontend",
      "Developpeur Fullstack",
    ],
    openGraph: {
      title: "Marc Sitze",
      description: "Frontend & Fullstack Developer",
      url: "https://marcsitze.dev",
      images: [MarcSitze, MarcBlue],
      locale: isFr ? "fr_FR" : "en_US",
    },
    twitter: {
      card: MarcSitze,
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

  return (
    <html lang={lang}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Marc Sitze",
              jobTitle:
                lang === "fr"
                  ? "Developpeur React & Next.js"
                  : "React & Next.js Developer",
              url: "https://marcsitze.dev",
              sameAs: [
                "https://linkedin.com/in/marcsitze",
                "https://github.com/marcSitze",
                "https://www.malt.fr/profile/marcsitze",
              ],
              address: {
                "@type": "PostalAddress",
                addressCountry: "CM",
              },
              worksFor: {
                "@type": "Organization",
                name: "Freelance / Remote",
              },
            }),
          }}
        />
      </head>
      <body
      // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
