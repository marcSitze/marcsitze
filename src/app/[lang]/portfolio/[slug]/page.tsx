import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { PORTFOLIO } from "@/data/resume";
import { i18n } from "@/i18n-config";
import { LocaleType, getDictionary } from "../../../dictionaries";
import {
  ExternalLink,
  Github,
  ArrowLeft,
  Sparkles,
  TrendingUp,
  Cpu,
  Layers,
  CheckCircle2,
  Calendar,
  Building,
  User,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export async function generateStaticParams() {
  const params: { lang: LocaleType; slug: string }[] = [];
  for (const locale of i18n.locales) {
    for (const project of PORTFOLIO) {
      if (project.slug) {
        params.push({ lang: locale, slug: project.slug });
      }
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: LocaleType; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const project = PORTFOLIO.find((p) => p.slug === slug);
  if (!project) return {};

  const isFr = lang === "fr";
  const baseUrl = "https://marcsitze.dev";
  const title = isFr
    ? `${project.title} - Étude de Cas & Architecture`
    : `${project.title} - Technical Architecture Case Study`;
  const description = `${project.summary} Engineered by Marc Sitze, Senior Frontend Lead & Full-Stack Engineer.`;

  return {
    title,
    description,
    alternates: {
      canonical: `${baseUrl}/${lang}/portfolio/${slug}`,
      languages: {
        en: `${baseUrl}/en/portfolio/${slug}`,
        fr: `${baseUrl}/fr/portfolio/${slug}`,
        "x-default": `${baseUrl}/en/portfolio/${slug}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${baseUrl}/${lang}/portfolio/${slug}`,
      siteName: "Marc Sitze Portfolio",
      images: [
        {
          url: project.thumbnail.startsWith("http")
            ? project.thumbnail
            : `${baseUrl}${project.thumbnail.startsWith("/") ? "" : "/"}${project.thumbnail}`,
          width: 1200,
          height: 630,
          alt: `${project.title} Architecture Preview`,
        },
      ],
      locale: isFr ? "fr_FR" : "en_US",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [
        project.thumbnail.startsWith("http")
          ? project.thumbnail
          : `${baseUrl}${project.thumbnail.startsWith("/") ? "" : "/"}${project.thumbnail}`,
      ],
    },
    keywords: [
      project.title,
      project.client,
      project.category,
      ...project.technologies,
      "Marc Sitze Case Study",
      "Frontend Architecture",
      "Full-Stack Engineering",
    ],
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ lang: LocaleType; slug: string }>;
}) {
  const { lang, slug } = await params;
  const project = PORTFOLIO.find((p) => p.slug === slug);
  if (!project) notFound();

  const isFr = lang === "fr";
  const dictionary = await getDictionary(lang);
  const baseUrl = "https://marcsitze.dev";

  // Schema.org structured data for TechArticle / SoftwareApplication
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: `${project.title} - Technical Architecture Case Study`,
    description: project.summary,
    url: `${baseUrl}/${lang}/portfolio/${slug}`,
    image: project.thumbnail.startsWith("http")
      ? project.thumbnail
      : `${baseUrl}${project.thumbnail.startsWith("/") ? "" : "/"}${project.thumbnail}`,
    author: {
      "@type": "Person",
      name: "Marc Sitze",
      url: baseUrl,
    },
    publisher: {
      "@type": "Person",
      name: "Marc Sitze",
    },
    keywords: project.technologies.join(", "),
    about: {
      "@type": "SoftwareApplication",
      name: project.title,
      applicationCategory: project.category,
      operatingSystem: "Web",
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: isFr ? "Accueil" : "Home",
        item: `${baseUrl}/${lang}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: isFr ? "Portfolio" : "Portfolio",
        item: `${baseUrl}/${lang}/portfolio`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: project.title,
        item: `${baseUrl}/${lang}/portfolio/${slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <article className="relative min-h-screen py-16 px-4">
        {/* Ambient background glow */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-primary/10 rounded-full blur-[140px] pointer-events-none -z-10" />

        <div className="container mx-auto max-w-4xl">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
            <Link
              href={`/${lang}/portfolio`}
              className="inline-flex items-center gap-1.5 hover:text-primary transition-colors font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              {isFr ? "Retour au portfolio" : "Back to case studies"}
            </Link>
            <span>/</span>
            <span className="text-foreground font-semibold truncate">{project.title}</span>
          </nav>

          {/* Hero Header */}
          <header className="mb-12">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <Badge className="bg-primary/10 text-primary border-primary/20 text-xs uppercase tracking-wider font-bold">
                {project.category}
              </Badge>
              <Badge variant="outline" className="text-xs font-semibold">
                {project.mainType}
              </Badge>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight mb-6 text-foreground">
              {project.title}
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed font-light mb-8">
              {project.summary}
            </p>

            {/* Metadata Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-5 rounded-2xl bg-card/60 border border-border/60 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-primary/10 text-primary">
                  <Building className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-[11px] text-muted-foreground uppercase font-bold tracking-wider">
                    {dictionary.portfolio.client || "Client"}
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-foreground">
                    {project.client}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-primary/10 text-primary">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-[11px] text-muted-foreground uppercase font-bold tracking-wider">
                    {dictionary.portfolio.role || "Role"}
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-foreground">
                    {project.role}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 col-span-2 sm:col-span-1">
                <div className="p-2 rounded-xl bg-primary/10 text-primary">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-[11px] text-muted-foreground uppercase font-bold tracking-wider">
                    {isFr ? "Période" : "Timeline"}
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-foreground">
                    {project.period}
                  </span>
                </div>
              </div>
            </div>
          </header>

          {/* Case Study Feature Image */}
          {project.thumbnail && (
            <div className="relative w-full h-64 sm:h-96 rounded-3xl overflow-hidden border border-border/60 mb-14 shadow-2xl bg-zinc-950/60">
              <Image
                src={project.imageLink[0] || project.thumbnail}
                alt={`${project.title} Preview Architecture`}
                fill
                priority
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 896px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
            </div>
          )}

          {/* Business Impact Metrics Grid */}
          {project.impactMetrics && project.impactMetrics.length > 0 && (
            <section className="mb-14" aria-labelledby="metrics-title">
              <h2 id="metrics-title" className="text-xl sm:text-2xl font-bold tracking-tight mb-4 flex items-center gap-2 text-foreground">
                <TrendingUp className="w-5 h-5 text-emerald-500" />
                {dictionary.portfolio.impact || "Business Impact & Key Metrics"}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {project.impactMetrics.map((metric, i) => (
                  <div
                    key={i}
                    className="p-6 rounded-2xl bg-card/70 border border-emerald-500/20 shadow-sm flex flex-col items-center text-center backdrop-blur-sm"
                  >
                    <span className="text-2xl sm:text-4xl font-black text-foreground mb-1 tracking-tight bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                      {metric.value}
                    </span>
                    <span className="text-xs sm:text-sm text-muted-foreground font-medium">
                      {metric.label}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Deep-Dive Problem & Solution Architecture */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-14">
            {/* The Challenge */}
            <section className="p-7 rounded-2xl bg-card/60 border border-border/60 backdrop-blur-md">
              <h2 className="text-lg sm:text-xl font-bold tracking-tight mb-3 flex items-center gap-2 text-destructive">
                <Cpu className="w-5 h-5" />
                {dictionary.portfolio.problem || "The Challenge"}
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                {project.problem}
              </p>
            </section>

            {/* The Architecture */}
            <section className="p-7 rounded-2xl bg-card/60 border border-border/60 backdrop-blur-md">
              <h2 className="text-lg sm:text-xl font-bold tracking-tight mb-3 flex items-center gap-2 text-primary">
                <Layers className="w-5 h-5" />
                {dictionary.portfolio.solution || "The Architecture & Solution"}
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                {project.solution}
              </p>
            </section>
          </div>

          {/* Technology Stack Badges */}
          <section className="mb-14 p-8 rounded-2xl bg-card/60 border border-border/60 backdrop-blur-md" aria-labelledby="technologies-title">
            <h2 id="technologies-title" className="text-xl font-bold tracking-tight mb-4 flex items-center gap-2 text-foreground">
              {/* <Sparkles className="w-5 h-5 text-primary" /> */}
              {dictionary.portfolio.techStack || "Core Technologies & Architecture"}
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, i) => (
                <span
                  key={i}
                  className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>

          {/* Action Links & Project Discussion CTA */}
          <section className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-primary/10 via-card/80 to-card border border-primary/20 text-center backdrop-blur-xl">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-3 text-foreground">
              {isFr ? "Vous avez un projet similaire à concrétiser ?" : "Need a similar high-performance architecture?"}
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed">
              {isFr
                ? "Discutons de votre vision et bâtissons ensemble une application web ou mobile de classe mondiale."
                : "Let's discuss your product goals, technical constraints, and build a world-class web or mobile platform."}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/95 transition-all shadow-md shadow-primary/20 hover:scale-105"
                >
                  <ExternalLink className="w-4 h-4" />
                  {isFr ? "Visiter le site en ligne" : "Visit Live Application"}
                </a>
              )}

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border/80 bg-card font-semibold hover:bg-muted/40 transition-all hover:scale-105"
                >
                  <Github className="w-4 h-4" />
                  {isFr ? "Voir sur GitHub" : "View on GitHub"}
                </a>
              )}

              <Link
                href={`/${lang}#contact`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-primary/40 bg-primary/5 text-primary font-semibold hover:bg-primary/10 transition-all hover:scale-105"
              >
                <CheckCircle2 className="w-4 h-4" />
                {isFr ? "Réserver un appel projet" : "Discuss This Architecture"}
              </Link>
            </div>
          </section>
        </div>
      </article>
    </>
  );
}
