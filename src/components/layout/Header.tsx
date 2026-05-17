import { Car, Globe, Menu, ShoppingCart, User, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "../../lib/i18n";
import { useCart } from "../../lib/cart";
import { useAuth } from "../../lib/auth";

export function Header() {
  const { selectedLocale, setLocale, localeOptions, t, language } = useLanguage();
  const { itemCount, toggleCart } = useCart();
  const { session, isAuthenticated, isOwner, isBuyer, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const location = useLocation();
  const isId = language === "id";

  const closeMobileMenu = () => setIsMobileMenuOpen(false);
  const goFeatured = location.pathname === "/" ? "#featured" : "/#featured";
  const goPolicy = location.pathname === "/" ? "#policy" : "/#policy";
  const goAbout = location.pathname === "/" ? "#about" : "/#about";

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isMobileMenuOpen) {
        closeMobileMenu();
        menuButtonRef.current?.focus();
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node) &&
        !menuButtonRef.current?.contains(event.target as Node) &&
        isMobileMenuOpen
      ) {
        closeMobileMenu();
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("keydown", handleEscape);
      document.addEventListener("mousedown", handleClickOutside);
      const firstLink = mobileMenuRef.current?.querySelector("a");
      firstLink?.focus();
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <Car className="h-6 w-6 text-black" aria-hidden="true" />
          <span className="text-xl font-bold tracking-tight text-black uppercase">PANZ AUTO</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8" aria-label="Main navigation">
          <a href={goFeatured} className="text-sm font-medium text-neutral-600 hover:text-black transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 rounded px-2 py-1">{t("nav.buy")}</a>
          <a href={goPolicy} className="text-sm font-medium text-neutral-600 hover:text-black transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 rounded px-2 py-1">{t("nav.review")}</a>
          <a href={goPolicy} className="text-sm font-medium text-neutral-600 hover:text-black transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 rounded px-2 py-1">{t("nav.policy")}</a>
          <a href={goAbout} className="text-sm font-medium text-neutral-600 hover:text-black transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 rounded px-2 py-1">{t("nav.about")}</a>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          {/* Locale + Currency */}
          <div className="flex items-center gap-1 border border-neutral-300 px-2 py-1 hover:bg-neutral-100 transition-colors">
            <Globe className="h-4 w-4" aria-hidden="true" />
            <label htmlFor="locale-select" className="sr-only">
              Choose language and currency
            </label>
            <select
              id="locale-select"
              value={selectedLocale}
              onChange={(event) => setLocale(event.target.value)}
              className="w-[134px] border-0 bg-transparent p-0 text-xs font-bold text-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 rounded"
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
            className="relative inline-flex h-9 w-9 items-center justify-center border border-neutral-300 text-black hover:bg-neutral-100 transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 rounded"
          >
            <ShoppingCart className="h-4 w-4" aria-hidden="true" />
            {itemCount > 0 && (
              <span className="absolute -right-1 -top-1 min-w-5 rounded-full bg-black px-1 text-center text-[10px] font-bold leading-5 text-white" aria-live="polite" aria-atomic="true">
                {itemCount}
              </span>
            )}
          </button>

          {isAuthenticated && session ? (
            <>
              <Link
                to={isOwner ? "/dashboard" : "/"}
                className="hidden md:flex items-center gap-2 text-sm font-medium text-black hover:text-neutral-600 transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 rounded px-2 py-1"
              >
                <User className="h-4 w-4" aria-hidden="true" />
                <span className="max-w-28 truncate">{session.name}</span>
              </Link>
              {isBuyer && (
                <Link
                  to="/orders"
                  className="hidden md:flex items-center gap-2 text-sm font-medium text-black hover:text-neutral-600 transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 rounded px-2 py-1"
                >
                  {isId ? "Pesanan Saya" : "My Orders"}
                </Link>
              )}
              <button
                type="button"
                onClick={logout}
                className="hidden md:block border border-neutral-300 px-4 py-2 text-sm font-medium text-black hover:bg-neutral-100 transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 rounded"
              >
                {t("nav.logout")}
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="hidden md:flex items-center gap-2 text-sm font-medium text-black hover:text-neutral-600 transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 rounded px-2 py-1"
            >
              <User className="h-4 w-4" aria-hidden="true" />
              <span>{t("nav.signin")}</span>
            </Link>
          )}
          <button
            ref={menuButtonRef}
            type="button"
            className="md:hidden p-2 text-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 rounded"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-nav"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          id="mobile-nav"
          className="border-t border-neutral-200 bg-white md:hidden"
          role="navigation"
          aria-label="Mobile navigation"
        >
          <nav className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 sm:px-6">
            <a href={goFeatured} onClick={closeMobileMenu} className="text-sm font-medium text-neutral-700 hover:text-black transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 rounded px-2 py-1">
              {t("nav.buy")}
            </a>
            <a href={goPolicy} onClick={closeMobileMenu} className="text-sm font-medium text-neutral-700 hover:text-black transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 rounded px-2 py-1">
              {t("nav.review")}
            </a>
            <a href={goPolicy} onClick={closeMobileMenu} className="text-sm font-medium text-neutral-700 hover:text-black transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 rounded px-2 py-1">
              {t("nav.policy")}
            </a>
            <a href={goAbout} onClick={closeMobileMenu} className="text-sm font-medium text-neutral-700 hover:text-black transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 rounded px-2 py-1">
              {t("nav.about")}
            </a>
            {isAuthenticated && session ? (
              <>
                <Link
                  to={isOwner ? "/dashboard" : "/"}
                  onClick={closeMobileMenu}
                  className="mt-2 inline-flex items-center gap-2 text-sm font-medium text-black hover:text-neutral-600 transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 rounded px-2 py-1"
                >
                  <User className="h-4 w-4" aria-hidden="true" />
                  <span>{session.name}</span>
                </Link>
                {isBuyer && (
                  <Link
                    to="/orders"
                    onClick={closeMobileMenu}
                    className="mt-1 inline-flex items-center gap-2 text-sm font-medium text-black hover:text-neutral-600 transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 rounded px-2 py-1"
                  >
                    {isId ? "Pesanan Saya" : "My Orders"}
                  </Link>
                )}
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    closeMobileMenu();
                  }}
                  className="mt-1 border border-neutral-300 px-4 py-2 text-sm font-medium text-black hover:bg-neutral-100 transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 rounded"
                >
                  {t("nav.logout")}
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={closeMobileMenu}
                className="mt-2 inline-flex items-center gap-2 text-sm font-medium text-black hover:text-neutral-600 transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 rounded px-2 py-1"
              >
                <User className="h-4 w-4" aria-hidden="true" />
                <span>{t("nav.signin")}</span>
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
