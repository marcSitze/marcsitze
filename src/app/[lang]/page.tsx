import { getDictionary, LocaleType } from "../dictionaries";
import HomePage from "./HomePage";

export default async function Page({
  params,
}: {
  params: Promise<{ lang: LocaleType }>;
}) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);
  return <HomePage lang={lang} dictionary={dictionary} />;
}
