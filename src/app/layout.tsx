// import { Geist, Geist_Mono } from "next/font/google";
import { MarcBlue, MarcSitze } from "@/assets";
import { ThemeProvider } from "@/components/theme-provider";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import "./globals.css";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export async function generateMetadata() {
  return {
    title: "Marc Sitze | Frontend & Fullstack Developer",
    description:
      "Frontend-focused Fullstack Developer specializing in React, Next.js, and scalable web apps.",
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
    },
    twitter: {
      card: MarcSitze,
    },
  };
}

gsap.registerPlugin(ScrollTrigger);
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Marc Sitze",
              jobTitle: "Frontend & Fullstack Developer",
              url: "https://marcsitze.dev",
              sameAs: [
                "https://linkedin.com/in/marcsitze",
                "https://github.com/marcSitze",
              ],
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
