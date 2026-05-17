import { BadgeCheck, Clock3, RefreshCcw, ShieldCheck, Truck } from "lucide-react";
import { useLanguage } from "../../lib/i18n";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function TrustInfo() {
  const { t } = useLanguage();
  const container = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.from(".trust-header", {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: container.current,
        start: "top 80%",
      }
    });

    gsap.from(".trust-card", {
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".trust-grid",
        start: "top 85%",
      }
    });
  }, { scope: container });

  const items = [
    {
      icon: Truck,
      title: t("trust.shippingTitle"),
      desc: t("trust.shippingDesc"),
      colSpan: "sm:col-span-2 lg:col-span-2"
    },
    {
      icon: ShieldCheck,
      title: t("trust.warrantyTitle"),
      desc: t("trust.warrantyDesc"),
      colSpan: "sm:col-span-1 lg:col-span-1"
    },
    {
      icon: RefreshCcw,
      title: t("trust.returnTitle"),
      desc: t("trust.returnDesc"),
      colSpan: "sm:col-span-1 lg:col-span-1"
    },
    {
      icon: BadgeCheck,
      title: t("trust.paymentTitle"),
      desc: t("trust.paymentDesc"),
      colSpan: "sm:col-span-1 lg:col-span-1"
    },
    {
      icon: Clock3,
      title: t("trust.supportTitle"),
      desc: t("trust.supportDesc"),
      colSpan: "sm:col-span-2 lg:col-span-1"
    },
  ];

  return (
    <section id="policy" className="bg-neutral-950 py-24 sm:py-32" ref={container}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl trust-header">
          <h2 className="text-4xl font-bold tracking-tight text-white font-display uppercase">{t("trust.title")}</h2>
          <p className="mt-4 text-lg text-neutral-400">{t("trust.subtitle")}</p>
        </div>

        <div className="trust-grid mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <article 
              key={item.title} 
              className={`trust-card group relative overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/50 p-8 hover:bg-neutral-900 transition-colors ${item.colSpan}`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-800 border border-neutral-700">
                <item.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="relative z-10 mt-6 text-xl font-bold text-white font-display uppercase tracking-wide">{item.title}</h3>
              <p className="relative z-10 mt-2 text-sm leading-6 text-neutral-400 font-light">{item.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
