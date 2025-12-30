import { getDictionary, LocaleType } from "../dictionaries";

export default function Footer({
  isDark,
  dictionary
}: {
  isDark: boolean;
  lang?: LocaleType;
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
}) {
  return (
    <footer
      className={`border-t ${
        isDark ? "border-zinc-800 bg-black" : "border-zinc-200 bg-white"
      } py-8`}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Marc Sitze {dictionary.footer.tagLine}
          </p>
          <div className="flex gap-6">
            {/* <a href="#" className="text-gray-400 hover:text-white">
              Instagram
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              Twitter
            </a> */}
            <a
              href="https://www.linkedin.com/in/marcsitze/"
              className={`${
                isDark
                  ? "text-gray-400 hover:text-white"
                  : "text-gray-600 hover:text-black"
              }`}
            >
              LinkedIn
            </a>
            <a
              href="https://www.malt.fr/profile/marcsitze"
              className={`${
                isDark
                  ? "text-gray-400 hover:text-white"
                  : "text-gray-600 hover:text-black"
              }`}
            >
              Malt
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
