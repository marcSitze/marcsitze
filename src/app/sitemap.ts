import { MetadataRoute } from "next";
import { PORTFOLIO } from "@/data/resume";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://marcsitze.dev";
  const locales = ["en", "fr"] as const;
  
  // Base routes + dynamic case studies
  const routes = [
    "",
    "/about",
    "/portfolio",
    ...PORTFOLIO.map((item) => `/portfolio/${item.slug}`),
  ];

  const sitemapEntries: MetadataRoute.Sitemap = [];
  const stableLastMod = new Date("2025-02-15");

  for (const locale of locales) {
    for (const route of routes) {
      const isHome = route === "";
      const isCaseStudy = route.startsWith("/portfolio/") && route !== "/portfolio";
      
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: stableLastMod,
        changeFrequency: isHome ? "weekly" : isCaseStudy ? "monthly" : "monthly",
        priority: isHome ? 1.0 : isCaseStudy ? 0.9 : 0.8,
        alternates: {
          languages: {
            en: `${baseUrl}/en${route}`,
            fr: `${baseUrl}/fr${route}`,
          },
        },
      });
    }
  }

  return sitemapEntries;
}
