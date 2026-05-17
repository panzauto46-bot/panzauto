/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Header } from "./components/layout/Header";
import { Hero } from "./components/home/Hero";
import { About } from "./components/home/About";
import { TrustInfo } from "./components/home/TrustInfo";
import { Reviews } from "./components/home/Reviews";
import { CartDrawer } from "./components/cart/CartDrawer";
import { ProductDetail } from "./components/product/ProductDetail";
import { NotFound } from "./components/NotFound";
import { useLanguage } from "./lib/i18n";
import { Login } from "./components/auth/Login";
import { SellerDashboard } from "./components/dashboard/SellerDashboard";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { OrderHistory } from "./components/user/OrderHistory";
import { trackPageView } from "./lib/analytics";
import { useProducts } from "./lib/products";

export default function App() {
  const { t, formatCurrency, language } = useLanguage();
  const { products } = useProducts();
  const location = useLocation();
  const isId = language === "id";

  useEffect(() => {
    trackPageView(`${location.pathname}${location.search}${location.hash}`);
  }, [location.pathname, location.search, location.hash]);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans selection:bg-neutral-100 selection:text-neutral-950">
      <Header />
      <CartDrawer />
      <main id="main-content" tabIndex={-1}>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                {/* Featured Products — reads from product context (managed by seller) */}
                <section id="featured" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
                  <div className="flex items-center justify-between mb-12">
                    <h2 className="text-3xl font-bold tracking-tight text-white font-display uppercase">{t("feat.title")}</h2>
                    <a href="#featured" className="text-sm font-semibold text-neutral-400 hover:text-white transition-colors uppercase tracking-widest">{t("feat.viewall")}</a>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {products.map((product) => (
                      <Link key={product.id} to={`/product/${product.id}`} className="group flex flex-col gap-4">
                        <div className="aspect-[4/5] w-full overflow-hidden bg-neutral-900 relative rounded-xl border border-neutral-800">
                          {product.isNew && (
                            <div className="absolute top-3 left-3 z-10 bg-white text-black px-2 py-1 text-xs font-bold tracking-wider rounded-sm uppercase">{t("feat.new")}</div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-60 z-0"></div>
                          <img
                            src={product.img}
                            alt={isId ? product.nameId : product.name}
                            loading="lazy"
                            decoding="async"
                            className="h-full w-full object-cover grayscale transition duration-700 ease-out group-hover:scale-110 group-hover:grayscale-0 relative z-0"
                          />
                        </div>
                        <div>
                          <h3 className="font-bold text-white font-display text-xl tracking-wide uppercase truncate">{isId ? product.nameId : product.name}</h3>
                          <p className="mt-1 text-xs text-neutral-400 font-mono tracking-widest uppercase">
                            {t("feat.diameter")}: {product.diameter} | {t("feat.height")}: {product.height}
                          </p>
                          <div className="mt-3 flex items-center justify-between text-sm border-t border-neutral-800 pt-3">
                            <span className="text-neutral-400 font-mono uppercase">{t("feat.finish")}: {isId ? product.finishId : product.finish}</span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
                <Reviews />
                <TrustInfo />
                <About />
              </>
            }
          />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/orders" element={<OrderHistory />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<SellerDashboard />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}
