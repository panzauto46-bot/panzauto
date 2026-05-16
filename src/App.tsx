/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Routes, Route, Link } from "react-router-dom";
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
import { useProducts } from "./lib/products";

export default function App() {
  const { t, formatCurrency, language } = useLanguage();
  const { products } = useProducts();
  const isId = language === "id";

  return (
    <div className="min-h-screen bg-white">
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
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold tracking-tight text-black">{t("feat.title")}</h2>
                    <a href="#featured" className="font-semibold text-black underline underline-offset-4 hover:text-neutral-600">{t("feat.viewall")}</a>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products.map((product) => (
                      <Link key={product.id} to={`/product/${product.id}`} className="group flex flex-col gap-3">
                        <div className="aspect-[4/3] w-full overflow-hidden bg-neutral-100 relative">
                          {product.isNew && (
                            <div className="absolute top-2 left-2 z-10 bg-black text-white px-2 py-1 text-xs font-bold tracking-wider">{t("feat.new")}</div>
                          )}
                          <img
                            src={product.img}
                            alt={isId ? product.nameId : product.name}
                            loading="lazy"
                            decoding="async"
                            className="h-full w-full object-cover grayscale transition duration-500 group-hover:scale-105 group-hover:grayscale-0"
                          />
                        </div>
                        <div>
                          <h3 className="font-bold text-black font-sans truncate">{isId ? product.nameId : product.name}</h3>
                          <p className="mt-1 text-sm text-neutral-500 font-mono">
                            {t("feat.diameter")}: {product.diameter} | {t("feat.height")}: {product.height}
                          </p>
                          <div className="mt-2 flex items-center justify-between text-sm">
                            <span className="text-neutral-500 font-mono">{t("feat.finish")}: {isId ? product.finishId : product.finish}</span>
                            <span className="font-bold font-mono">{formatCurrency(product.priceIdr)}</span>
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
