import { SearchBar } from "./SearchBar";
import { useLanguage } from "../../lib/i18n";
import { motion } from "framer-motion";

export function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative w-full min-h-[90vh] bg-neutral-950 text-white overflow-hidden flex flex-col justify-center border-b border-neutral-900">
      {/* Background Image Setup */}
      <motion.div 
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <img
          src="/images/hero-banner.jpg"
          alt="Premium motorcycle cockpit view"
          className="h-full w-full object-cover object-center opacity-40 grayscale mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-transparent to-neutral-950/50" />
      </motion.div>

      <div className="relative z-10 px-4 py-24 sm:px-6 lg:px-8 w-full">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="text-5xl font-bold tracking-tight uppercase sm:text-6xl lg:text-7xl xl:text-8xl font-display text-transparent bg-clip-text bg-gradient-to-br from-white to-neutral-500">
                {t("hero.title")}
              </h1>
            </motion.div>
            
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="mt-8 text-xl text-neutral-400 max-w-2xl font-light tracking-wide">
                {t("hero.subtitle")}
              </p>
            </motion.div>
          </div>
        </div>

        {/* Wider Search Bar Container */}
        <motion.div 
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-16 max-w-7xl rounded-xl md:mt-24 backdrop-blur-md bg-neutral-900/40 border border-neutral-800 p-2 shadow-2xl"
        >
          <SearchBar />
        </motion.div>
      </div>
    </section>
  );
}
