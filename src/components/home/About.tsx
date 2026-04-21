import { MessageCircle } from "lucide-react";
import { useLanguage } from "../../lib/i18n";

export function About() {
  const waNumber = "6285718336173";
  const { t } = useLanguage();
  
  const message = encodeURIComponent(t("about.wamsg"));
  const waLink = `https://wa.me/${waNumber}?text=${message}`;

  return (
    <section id="about" className="bg-neutral-900 py-24 sm:py-32 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div className="max-w-xl">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl uppercase">
              {t("about.title")}
            </h2>
            <div className="mt-6 space-y-6 text-lg text-neutral-300">
              <p>{t("about.p1")}</p>
              <p>{t("about.p2")}</p>
              <div className="rounded-sm border border-white/10 bg-black/20 p-4 text-base text-neutral-200">
                <p className="font-medium text-white">{t("about.p3")}</p>
                <ul className="mt-3 list-disc space-y-2 pl-5">
                  <li>{t("about.l1")}</li>
                  <li>{t("about.l2")}</li>
                  <li>{t("about.l3")}</li>
                </ul>
                <p className="mt-3 text-sm text-neutral-400">{t("about.note")}</p>
              </div>
            </div>
            
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <a 
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white px-6 py-3 text-sm font-medium text-black hover:bg-neutral-200 transition-colors"
              >
                <MessageCircle className="h-5 w-5" />
                <span>{t("about.wa")}</span>
              </a>
            </div>
          </div>

          {/* Image / Graphic Content */}
          <div className="relative aspect-square w-full max-w-md mx-auto lg:mx-0 overflow-hidden bg-neutral-800">
            <img 
              src="/images/about-zx25r2.jpg" 
              alt="Velocity stack reference setup" 
              className="h-full w-full object-cover grayscale opacity-80 mix-blend-overlay hover:mix-blend-normal hover:opacity-100 transition duration-700"
            />
            <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black to-transparent">
              <p className="text-white font-mono text-sm tracking-widest">EST. 2024</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
