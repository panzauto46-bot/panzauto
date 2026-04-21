import { SearchBar } from "./SearchBar";
import { useLanguage } from "../../lib/i18n";

export function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative w-full bg-neutral-900 text-white overflow-hidden">
      {/* Background Image Setup */}
      <div className="absolute inset-0">
        <img
          src="/images/hero-banner.jpg"
          alt="Premium motorcycle cockpit view"
          className="h-full w-full object-cover object-center opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/60 to-transparent" />
      </div>

      <div className="relative px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold tracking-tighter uppercase sm:text-5xl lg:text-6xl">
              {t("hero.title")}
            </h1>
            <p className="mt-6 text-lg text-neutral-300 max-w-xl">
              {t("hero.subtitle")}
            </p>
          </div>
        </div>

        {/* Wider Search Bar Container */}
        <div className="mx-auto mt-12 max-w-[90rem] rounded-none md:mt-16">
          <SearchBar />
        </div>
      </div>
    </section>
  );
}
