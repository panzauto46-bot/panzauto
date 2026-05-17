import { useEffect } from "react";
import { publicEnv } from "./env";

type Gtag = (...args: unknown[]) => void;

declare global {
  interface Window {
    dataLayer?: unknown[][];
    gtag?: Gtag;
  }
}

const GA_MEASUREMENT_ID = publicEnv.VITE_GA_MEASUREMENT_ID?.trim() ?? "";

export function GoogleAnalytics() {
  useEffect(() => {
    if (!GA_MEASUREMENT_ID) {
      return;
    }

    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer ?? [];
    window.gtag = window.gtag ?? ((...args: unknown[]) => {
      window.dataLayer?.push(args);
    });

    window.gtag("js", new Date());
    window.gtag("config", GA_MEASUREMENT_ID);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return null;
}

export function trackPageView(path: string) {
  if (typeof window !== "undefined" && window.gtag && GA_MEASUREMENT_ID) {
    window.gtag("event", "page_view", {
      page_path: path,
    });
  }
}

export function trackEvent(eventName: string, parameters?: Record<string, unknown>) {
  if (typeof window !== "undefined" && window.gtag && GA_MEASUREMENT_ID) {
    window.gtag("event", eventName, parameters);
  }
}
