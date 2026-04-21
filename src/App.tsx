/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Header } from "./components/layout/Header";
import { Hero } from "./components/home/Hero";
import { About } from "./components/home/About";
import { TrustInfo } from "./components/home/TrustInfo";
import { CartDrawer } from "./components/cart/CartDrawer";
import { useLanguage } from "./lib/i18n";

export default function App() {
  const { t, formatCurrency } = useLanguage();
  const featuredVeloProducts = [
    {
      id: 1,
      name: "Custom Velo Standard",
      diameter: "28 mm",
      height: "40 mm",
      finish: "Black Anodize",
      priceIdr: 80000,
      img: "/images/about-zx25r2.jpg",
    },
    {
      id: 2,
      name: "Custom Velo Street",
      diameter: "30 mm",
      height: "55 mm",
      finish: "Blue Anodize",
      priceIdr: 90000,
      img: "/images/hero-banner.jpg",
    },
    {
      id: 3,
      name: "Custom Velo Touring",
      diameter: "32 mm",
      height: "75 mm",
      finish: "Black Gloss",
      priceIdr: 110000,
      img: "/images/about-zx25r2.jpg",
    },
    {
      id: 4,
      name: "Custom Velo Pro",
      diameter: "34 mm",
      height: "95 mm",
      finish: "Blue Satin",
      priceIdr: 135000,
      img: "/images/hero-banner.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <CartDrawer />
      <main>
        <Hero />
        {/* Placeholder for future sections */}
        <section id="featured" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold tracking-tight text-black">{t("feat.title")}</h2>
            <a href="#featured" className="font-semibold text-black underline underline-offset-4 hover:text-neutral-600">{t("feat.viewall")}</a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredVeloProducts.map((product) => (
              <div key={product.id} className="group flex flex-col gap-3">
                <div className="aspect-[4/3] w-full overflow-hidden bg-neutral-100 relative">
                  {product.id === 2 && (
                    <div className="absolute top-2 left-2 z-10 bg-black text-white px-2 py-1 text-xs font-bold tracking-wider">{t("feat.new")}</div>
                  )}
                  <img 
                    src={product.img}
                    alt={product.name}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover grayscale transition duration-500 group-hover:scale-105 group-hover:grayscale-0"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-black font-sans truncate">{product.name}</h3>
                  <p className="mt-1 text-sm text-neutral-500 font-mono">
                    {t("feat.diameter")}: {product.diameter} | {t("feat.height")}: {product.height}
                  </p>
                  <div className="mt-2 flex items-center justify-between text-sm">
                    <span className="text-neutral-500 font-mono">{t("feat.finish")}: {product.finish}</span>
                    <span className="font-bold font-mono">{formatCurrency(product.priceIdr)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
        <TrustInfo />
        <About />
      </main>
    </div>
  );
}

