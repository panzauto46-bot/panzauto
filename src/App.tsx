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
            {/* Motorcycle Listings Data */}
            {[
              { id: 1, make: "Yamaha", model: "NMAX 155", year: 2023, priceIdr: 31500000, specs: "5,200 km | Auto", img: "https://images.unsplash.com/photo-1627993077708-3ab84b5c7e19?auto=format&fit=crop&q=80&w=600" },
              { id: 2, make: "Honda", model: "PCX 160", year: 2024, priceIdr: 32800000, specs: "1,100 km | Auto", img: "https://images.unsplash.com/photo-1692292395641-fc1734fe0e02?auto=format&fit=crop&q=80&w=600" },
              { id: 3, make: "Honda", model: "Vario 160", year: 2023, priceIdr: 26000000, specs: "8,500 km | Auto", img: "https://images.unsplash.com/photo-1616428784950-621aa9069677?auto=format&fit=crop&q=80&w=600" },
              { id: 4, make: "Kawasaki", model: "Ninja 250", year: 2022, priceIdr: 55000000, specs: "12,000 km | Manual", img: "https://images.unsplash.com/photo-1599819811279-d518ca28560c?auto=format&fit=crop&q=80&w=600" },
            ].map((bike) => (
              <div key={bike.id} className="group flex flex-col gap-3">
                <div className="aspect-[4/3] w-full overflow-hidden bg-neutral-100 relative">
                  {/* Status Badge */}
                  {bike.year === 2024 && (
                    <div className="absolute top-2 left-2 z-10 bg-black text-white px-2 py-1 text-xs font-bold tracking-wider">{t("feat.new")}</div>
                  )}
                  <img 
                    src={bike.img}
                    alt={`${bike.make} ${bike.model}`}
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover grayscale transition duration-500 group-hover:scale-105 group-hover:grayscale-0"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-black font-sans truncate">{bike.year} {bike.make} {bike.model}</h3>
                  <div className="mt-1 flex items-center justify-between text-sm">
                    <span className="text-neutral-500 font-mono">{bike.specs}</span>
                    <span className="font-bold font-mono">{formatCurrency(bike.priceIdr)}</span>
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

