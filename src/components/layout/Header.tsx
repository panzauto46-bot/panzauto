import { Car, Globe, Menu, ShoppingCart, User, X } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "../../lib/i18n";
import { useCart } from "../../lib/cart";

export function Header() {
  const { selectedLocale, setLocale, localeOptions, t } = useLanguage();
  const { itemCount, toggleCart } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Car className="h-6 w-6 text-black" />
          <span className="text-xl font-bold tracking-tight text-black uppercase">PANZ AUTO</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8">
          <a href="#featured" className="text-sm font-medium text-neutral-600 hover:text-black transition-colors">{t("nav.buy")}</a>
          <a href="#policy" className="text-sm font-medium text-neutral-600 hover:text-black transition-colors">{t("nav.review")}</a>
          <a href="#policy" className="text-sm font-medium text-neutral-600 hover:text-black transition-colors">{t("nav.policy")}</a>
          <a href="#about" className="text-sm font-medium text-neutral-600 hover:text-black transition-colors">{t("nav.about")}</a>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          {/* Locale + Currency */}
          <div className="flex items-center gap-1 border border-neutral-300 px-2 py-1 hover:bg-neutral-100 transition-colors">
            <Globe className="h-4 w-4" />
            <select
              value={selectedLocale}
              onChange={(event) => setLocale(event.target.value)}
              aria-label="Choose language and currency"
              className="w-[134px] border-0 bg-transparent p-0 text-xs font-bold text-black focus:outline-none"
            >
              {localeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            onClick={toggleCart}
            aria-label={`${t("cart.label")} (${itemCount})`}
            className="relative inline-flex h-9 w-9 items-center justify-center border border-neutral-300 text-black hover:bg-neutral-100 transition-colors"
          >
            <ShoppingCart className="h-4 w-4" />
            {itemCount > 0 && (
              <span className="absolute -right-1 -top-1 min-w-5 rounded-full bg-black px-1 text-center text-[10px] font-bold leading-5 text-white">
                {itemCount}
              </span>
            )}
          </button>

          <button type="button" className="hidden md:flex items-center gap-2 text-sm font-medium text-black hover:text-neutral-600 transition-colors">
            <User className="h-4 w-4" />
            <span>{t("nav.signin")}</span>
          </button>
          <button type="button" className="hidden md:block bg-black px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800 transition-colors">
            {t("nav.postad")}
          </button>
          <button
            type="button"
            className="md:hidden p-2 text-black"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-nav"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div id="mobile-nav" className="border-t border-neutral-200 bg-white md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 sm:px-6">
            <a href="#featured" onClick={closeMobileMenu} className="text-sm font-medium text-neutral-700 hover:text-black transition-colors">
              {t("nav.buy")}
            </a>
            <a href="#policy" onClick={closeMobileMenu} className="text-sm font-medium text-neutral-700 hover:text-black transition-colors">
              {t("nav.review")}
            </a>
            <a href="#policy" onClick={closeMobileMenu} className="text-sm font-medium text-neutral-700 hover:text-black transition-colors">
              {t("nav.policy")}
            </a>
            <a href="#about" onClick={closeMobileMenu} className="text-sm font-medium text-neutral-700 hover:text-black transition-colors">
              {t("nav.about")}
            </a>
            <button type="button" className="mt-2 inline-flex items-center gap-2 text-sm font-medium text-black hover:text-neutral-600 transition-colors">
              <User className="h-4 w-4" />
              <span>{t("nav.signin")}</span>
            </button>
            <button type="button" className="mt-1 bg-black px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800 transition-colors">
              {t("nav.postad")}
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
