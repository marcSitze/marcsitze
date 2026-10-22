import { getDictionary, LocaleType } from "../../dictionaries";
import Portfolio from "../../components/portfolio";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: LocaleType }>;
}) {
  const { lang } = await params;
  const isFr = lang === "fr";
  const baseUrl = "https://marcsitze.dev";

  return {
    title: isFr
      ? "Études de Cas & Projets"
      : "Featured Case Studies & Work",
    description: isFr
      ? "Explorez les réalisations techniques et études de cas de Marc Sitze : architectures IA, passerelles de paiement fintech et applications web performantes."
      : "Explore engineering case studies and technical architectures by Marc Sitze: AI document platforms, fintech payment gateways, and scalable web apps.",
    alternates: {
      canonical: `${baseUrl}/${lang}/portfolio`,
      languages: {
        en: `${baseUrl}/en/portfolio`,
        fr: `${baseUrl}/fr/portfolio`,
        "x-default": `${baseUrl}/en/portfolio`,
      },
    },
    openGraph: {
      title: isFr
        ? "Études de Cas & Portfolio | Marc Sitze"
        : "Featured Case Studies & Portfolio | Marc Sitze",
      description: isFr
        ? "Solutions d'ingénierie logicielle concrètes en IA, Fintech et applications web Next.js."
        : "Real-world engineering solutions delivering measurable impact in AI, Fintech, and scalable web apps.",
      url: `${baseUrl}/${lang}/portfolio`,
      siteName: "Marc Sitze Portfolio",
      images: [
        {
          url: `${baseUrl}/marcsitze.png`,
          width: 1200,
          height: 630,
          alt: "Marc Sitze - Portfolio & Case Studies",
        },
      ],
      locale: isFr ? "fr_FR" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: isFr
        ? "Études de Cas & Portfolio | Marc Sitze"
        : "Featured Case Studies & Portfolio | Marc Sitze",
      description: isFr
        ? "Réalisations d'ingénierie logicielle en IA et Fintech."
        : "Engineering case studies and technical architectures by Marc Sitze.",
      images: [`${baseUrl}/marcsitze.png`],
    },
  };
}

export default async function PortfolioPage({
  params,
}: {
  params: Promise<{ lang: LocaleType }>;
}) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  return (
    <div className="min-h-screen py-10">
      <Portfolio dictionary={dictionary} lang={lang} />
    </div>
  );
}
