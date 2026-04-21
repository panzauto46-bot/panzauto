import { BadgeCheck, Clock3, RefreshCcw, ShieldCheck, Truck } from "lucide-react";
import { useLanguage } from "../../lib/i18n";

export function TrustInfo() {
  const { t } = useLanguage();

  const items = [
    {
      icon: Truck,
      title: t("trust.shippingTitle"),
      desc: t("trust.shippingDesc"),
    },
    {
      icon: ShieldCheck,
      title: t("trust.warrantyTitle"),
      desc: t("trust.warrantyDesc"),
    },
    {
      icon: RefreshCcw,
      title: t("trust.returnTitle"),
      desc: t("trust.returnDesc"),
    },
    {
      icon: BadgeCheck,
      title: t("trust.paymentTitle"),
      desc: t("trust.paymentDesc"),
    },
    {
      icon: Clock3,
      title: t("trust.supportTitle"),
      desc: t("trust.supportDesc"),
    },
  ];

  return (
    <section id="policy" className="bg-white py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-black sm:text-4xl">{t("trust.title")}</h2>
          <p className="mt-4 text-base text-neutral-600 sm:text-lg">{t("trust.subtitle")}</p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <article key={item.title} className="border border-neutral-200 bg-neutral-50 p-5">
              <item.icon className="h-5 w-5 text-black" />
              <h3 className="mt-3 text-base font-semibold text-black">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-neutral-600">{item.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
