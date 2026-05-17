import { MessageCircle } from "lucide-react";
import { useLanguage } from "../../lib/i18n";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function About() {
  const waNumber = "6285718336173";
  const { t } = useLanguage();
  const container = useRef<HTMLElement>(null);
  
  const message = encodeURIComponent(t("about.wamsg"));
  const waLink = `https://wa.me/${waNumber}?text=${message}`;

  useGSAP(() => {
    // Text animations
    gsap.from(".about-text > *", {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: "power2.out",
      scrollTrigger: {
        trigger: container.current,
        start: "top 75%",
      }
    });

    // Image animations (parallax and reveal)
    gsap.from(".about-image-wrapper", {
      scale: 0.8,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: container.current,
        start: "top 70%",
      }
    });

    gsap.to(".about-image", {
      yPercent: 15,
      ease: "none",
      scrollTrigger: {
        trigger: container.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });

  }, { scope: container });

  return (
    <section id="about" className="bg-neutral-950 py-24 sm:py-32 text-white overflow-hidden border-t border-neutral-900" ref={container}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div className="max-w-xl about-text">
            <h2 className="text-4xl font-bold tracking-tight font-display uppercase sm:text-5xl">
              {t("about.title")}
            </h2>
            <div className="mt-8 space-y-6 text-lg text-neutral-400 font-light">
              <p>{t("about.p1")}</p>
              <p>{t("about.p2")}</p>
              <div className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-6 text-base text-neutral-300 backdrop-blur-sm">
                <p className="font-semibold text-white uppercase tracking-wider text-sm">{t("about.p3")}</p>
                <ul className="mt-4 list-none space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-white font-bold mt-1">/</span>
                    <span>{t("about.l1")}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-white font-bold mt-1">/</span>
                    <span>{t("about.l2")}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-white font-bold mt-1">/</span>
                    <span>{t("about.l3")}</span>
                  </li>
                </ul>
                <p className="mt-6 text-xs text-neutral-500 font-mono uppercase tracking-widest">{t("about.note")}</p>
              </div>
            </div>
            
            <div className="mt-12 flex flex-col sm:flex-row gap-4">
              <a 
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 bg-white px-8 py-4 text-sm font-bold text-black hover:bg-neutral-200 transition-colors uppercase tracking-widest rounded-lg"
              >
                <MessageCircle className="h-5 w-5" />
                <span>{t("about.wa")}</span>
              </a>
            </div>
          </div>

          {/* Image / Graphic Content */}
          <div className="relative aspect-square w-full max-w-md mx-auto lg:mx-0 overflow-hidden bg-neutral-900 rounded-3xl border border-neutral-800 about-image-wrapper">
            <img 
              src="/images/about-zx25r2.jpg" 
              alt="Velocity stack reference setup" 
              className="about-image h-[120%] -top-[10%] w-full object-cover grayscale opacity-70 mix-blend-luminosity hover:mix-blend-normal hover:opacity-100 transition duration-700 absolute"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent z-10" />
            <div className="absolute inset-x-0 bottom-0 p-8 z-20">
              <p className="text-white font-mono text-sm tracking-widest">EST. 2024</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
