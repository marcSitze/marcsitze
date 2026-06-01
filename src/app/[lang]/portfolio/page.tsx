import { getDictionary, LocaleType } from "../../dictionaries";
import Portfolio from "../../components/portfolio";

export default async function PortfolioPage({
  params,
}: {
  params: Promise<{ lang: LocaleType }>;
}) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  return (
    <div className="min-h-screen py-10">
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-4xl font-bold text-center">Coming soon...</h1>
      </div>
      {/* <Portfolio dictionary={dictionary} /> */}
    </div>
  );
}
