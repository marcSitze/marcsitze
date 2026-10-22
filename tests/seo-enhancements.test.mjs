import test from "node:test";
import assert from "node:assert/strict";
import sitemapFn from "../src/app/sitemap.ts";
import { generateMetadata as generateAboutMetadata } from "../src/app/[lang]/about/page.tsx";
import { generateMetadata as generatePortfolioMetadata } from "../src/app/[lang]/portfolio/page.tsx";
import {
  generateMetadata as generateCaseStudyMetadata,
  generateStaticParams as generateCaseStudyStaticParams,
} from "../src/app/[lang]/portfolio/[slug]/page.tsx";

test("SEO Enhancements - Sitemap contains case studies and alternates", () => {
  const fn = typeof sitemapFn === "function" ? sitemapFn : sitemapFn.default;
  const sitemap = fn();
  assert.ok(Array.isArray(sitemap), "Sitemap must be an array");

  const urls = sitemap.map((entry) => entry.url);
  assert.ok(urls.includes("https://marcsitze.dev/en"), "Must include /en");
  assert.ok(urls.includes("https://marcsitze.dev/fr"), "Must include /fr");
  assert.ok(urls.includes("https://marcsitze.dev/en/about"), "Must include /en/about");
  assert.ok(urls.includes("https://marcsitze.dev/fr/about"), "Must include /fr/about");
  assert.ok(urls.includes("https://marcsitze.dev/en/portfolio"), "Must include /en/portfolio");
  assert.ok(urls.includes("https://marcsitze.dev/fr/portfolio"), "Must include /fr/portfolio");

  // Check case study URLs in sitemap
  assert.ok(urls.includes("https://marcsitze.dev/en/portfolio/bubo-ai"), "Must include bubo-ai in EN");
  assert.ok(urls.includes("https://marcsitze.dev/fr/portfolio/bubo-ai"), "Must include bubo-ai in FR");
  assert.ok(urls.includes("https://marcsitze.dev/en/portfolio/maviance-payment-portal"), "Must include maviance in EN");
  assert.ok(urls.includes("https://marcsitze.dev/en/portfolio/warap-work"), "Must include warap-work in EN");
  assert.ok(urls.includes("https://marcsitze.dev/en/portfolio/africafix-mobile"), "Must include africafix in EN");

  // Verify alternates exist for each entry
  for (const entry of sitemap) {
    assert.ok(entry.alternates, `Entry ${entry.url} must have alternates`);
    assert.ok(entry.alternates.languages.en, `Entry ${entry.url} must have EN alternate`);
    assert.ok(entry.alternates.languages.fr, `Entry ${entry.url} must have FR alternate`);
  }
});

test("SEO Enhancements - About page metadata & canonical", async () => {
  const metaEn = await generateAboutMetadata({ params: Promise.resolve({ lang: "en" }) });
  assert.equal(metaEn.alternates.canonical, "https://marcsitze.dev/en/about");
  assert.equal(metaEn.alternates.languages.en, "https://marcsitze.dev/en/about");
  assert.equal(metaEn.alternates.languages.fr, "https://marcsitze.dev/fr/about");
  assert.ok(metaEn.title.includes("About Me"));

  const metaFr = await generateAboutMetadata({ params: Promise.resolve({ lang: "fr" }) });
  assert.equal(metaFr.alternates.canonical, "https://marcsitze.dev/fr/about");
  assert.ok(metaFr.title.includes("À Propos"));
});

test("SEO Enhancements - Portfolio page metadata & canonical", async () => {
  const metaEn = await generatePortfolioMetadata({ params: Promise.resolve({ lang: "en" }) });
  assert.equal(metaEn.alternates.canonical, "https://marcsitze.dev/en/portfolio");
  assert.equal(metaEn.alternates.languages.en, "https://marcsitze.dev/en/portfolio");
  assert.equal(metaEn.alternates.languages.fr, "https://marcsitze.dev/fr/portfolio");
  assert.ok(metaEn.title.includes("Case Studies"));

  const metaFr = await generatePortfolioMetadata({ params: Promise.resolve({ lang: "fr" }) });
  assert.equal(metaFr.alternates.canonical, "https://marcsitze.dev/fr/portfolio");
});

test("SEO Enhancements - Dynamic Case Study static params & metadata", async () => {
  const staticParams = await generateCaseStudyStaticParams();
  assert.ok(staticParams.length >= 8, "Should have at least 8 static params (4 projects x 2 locales)");

  const metaBubo = await generateCaseStudyMetadata({
    params: Promise.resolve({ lang: "en", slug: "bubo-ai" }),
  });
  assert.equal(metaBubo.alternates.canonical, "https://marcsitze.dev/en/portfolio/bubo-ai");
  assert.ok(metaBubo.title.includes("Bubo AI"));
  assert.ok(metaBubo.description.includes("vector search") || metaBubo.description.includes("AI"));

  const metaMaviance = await generateCaseStudyMetadata({
    params: Promise.resolve({ lang: "fr", slug: "maviance-payment-portal" }),
  });
  assert.equal(metaMaviance.alternates.canonical, "https://marcsitze.dev/fr/portfolio/maviance-payment-portal");
  assert.ok(metaMaviance.title.includes("Maviance"));
});

test("Google Analytics - Configuration & Event Helpers", async () => {
  const { trackEvent, AnalyticsEvents } = await import("../src/lib/analytics.ts");

  assert.equal(typeof trackEvent, "function", "trackEvent must be a function");
  assert.equal(typeof AnalyticsEvents.inquirySubmitted, "function");
  assert.equal(typeof AnalyticsEvents.whatsappClicked, "function");
  assert.equal(typeof AnalyticsEvents.emailCopied, "function");
  assert.equal(typeof AnalyticsEvents.resumeDownloaded, "function");
  assert.equal(typeof AnalyticsEvents.caseStudyViewed, "function");

  // Verify safe execution without throwing errors in SSR / headless environment
  assert.doesNotThrow(() => {
    trackEvent("test_event", { key: "value" });
    AnalyticsEvents.inquirySubmitted("ai-webapp", "$3k-$10k");
    AnalyticsEvents.whatsappClicked("contact_section");
    AnalyticsEvents.emailCopied();
    AnalyticsEvents.resumeDownloaded();
    AnalyticsEvents.caseStudyViewed("bubo-ai");
  }, "Analytics tracking should safely no-op without crashing when window or GA_ID is absent");
});
