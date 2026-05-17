import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from "react";

export const translations = {
  en: {
    // Header
    "nav.buy": "Buy",
    "nav.sell": "Sell",
    "nav.review": "Review",
    "nav.about": "About",
    "nav.policy": "Policy",
    "nav.signin": "Sign In",
    "nav.logout": "Sign Out",
    "nav.postad": "Post an Ad",
    "cart.label": "Cart",
    "cart.title": "Shopping Cart",
    "cart.close": "Close",
    "cart.empty": "Your cart is still empty.",
    "cart.subtotal": "Subtotal",
    "cart.remove": "Remove item",
    "cart.checkout": "Checkout",
    "cart.back": "Back",
    "cart.continue": "Continue Shopping",
    "cart.successTitle": "Order Sent",
    "cart.successDesc": "Your WhatsApp order has been prepared. Please continue the conversation to confirm shipping and payment.",
    "cart.formName": "Full Name",
    "cart.formPhone": "Phone Number",
    "cart.formAddress": "Delivery Address",
    "cart.formMethod": "Payment Method",
    "cart.methodTransfer": "Bank Transfer",
    "cart.methodEwallet": "E-Wallet",
    "cart.methodCod": "COD (Pay at Store)",
    "cart.transferTo": "Transfer To",
    "cart.bankName": "Bank",
    "cart.accountNumber": "Account Number",
    "cart.accountHolder": "Account Name",
    "cart.transferNote": "Please transfer exactly as the total amount and include your name in payment note.",
    "cart.payNow": "Pay Now",
    "cart.processing": "Processing Payment...",
    // Hero
    "hero.title": "Precision Velocity Stack For Maximum Performance.",
    "hero.subtitle": "Professional velocity stack solutions for standard and aftermarket throttle bodies, complete with accurate sizing, transparent pricing, and ready-to-install quality.",
    // SearchBar
    "search.make": "Make",
    "search.anymake": "Any Make",
    "search.model": "Model",
    "search.anymodel": "Any Model",
    "search.selectfirst": "Select Make First",
    "search.year": "Year",
    "search.anyyear": "Any Year",
    "search.color": "Color",
    "search.anycolor": "Any Color",
    "search.throttlebody": "Throttle Body",
    "search.anythrottlebody": "All Throttle Body",
    "search.size": "Size",
    "search.anysize": "Any Size",
    "search.velocityheight": "Velocity Stack Height",
    "search.anyvelocityheight": "Any Height",
    "search.older": "1999 & Older",
    "search.button": "Buy",
    // Featured
    "feat.title": "Custom Velocity Stack",
    "feat.viewall": "View All Sizes",
    "feat.new": "NEW",
    "feat.diameter": "Diameter",
    "feat.height": "Height",
    "feat.finish": "Finish",
    // About
    "about.title": "Velocity Stack Function",
    "about.p1": "Velocity stack helps smooth intake airflow into the throttle body, reducing turbulence and improving air charge consistency at the engine inlet.",
    "about.p2": "In general tuning, shorter stacks tend to support higher RPM power, while longer stacks are often used to strengthen low-to-mid RPM torque response.",
    "about.p3": "General stack length guide:",
    "about.l1": "40-55 mm: responsive upper-mid RPM and faster throttle response.",
    "about.l2": "75 mm: balanced setup for daily use and mixed RPM range.",
    "about.l3": "95-120 mm: stronger low-mid torque and smoother pull.",
    "about.note": "Final setup should be adjusted to engine build, cam profile, throttle body size, and fuel map tuning.",
    "about.wa": "Let's Talk on WhatsApp",
    "about.wamsg": "Hello Panz Auto, I would like to ask about velocity stack recommendations for my setup.",
    // Policy / Trust
    "trust.title": "Buyer Protection & Store Policy",
    "trust.subtitle": "Clear policy, transparent process, and faster response for every velocity stack order.",
    "trust.shippingTitle": "Fast Packing & Shipping",
    "trust.shippingDesc": "Orders before 15:00 WIB are packed the same day. We share tracking number immediately.",
    "trust.warrantyTitle": "Product Warranty",
    "trust.warrantyDesc": "Warranty claim is available for manufacturing defects with photo/video proof and complete unboxing record.",
    "trust.returnTitle": "Return & Exchange",
    "trust.returnDesc": "Size mismatch can be exchanged within 3 days after item received, as long as product remains in original condition.",
    "trust.paymentTitle": "Secure Payment Methods",
    "trust.paymentDesc": "Bank transfer and e-wallet are verified before dispatch to keep transactions safe for both buyer and seller.",
    "trust.supportTitle": "Technical Consultation",
    "trust.supportDesc": "Need help choosing stack length? We assist setup recommendation based on throttle body size and riding use."
  },
  id: {
    // Header
    "nav.buy": "Beli",
    "nav.sell": "Jual",
    "nav.review": "Ulasan",
    "nav.about": "Tentang",
    "nav.policy": "Kebijakan",
    "nav.signin": "Masuk",
    "nav.logout": "Keluar",
    "nav.postad": "Pasang Iklan",
    "cart.label": "Keranjang",
    "cart.title": "Keranjang Belanja",
    "cart.close": "Tutup",
    "cart.empty": "Keranjang kamu masih kosong.",
    "cart.subtotal": "Subtotal",
    "cart.remove": "Hapus item",
    "cart.checkout": "Checkout",
    "cart.back": "Kembali",
    "cart.continue": "Lanjut Belanja",
    "cart.successTitle": "Pesanan Terkirim",
    "cart.successDesc": "Pesanan WhatsApp kamu sudah disiapkan. Lanjutkan chat untuk konfirmasi ongkir dan pembayaran.",
    "cart.formName": "Nama Lengkap",
    "cart.formPhone": "Nomor HP",
    "cart.formAddress": "Alamat Pengiriman",
    "cart.formMethod": "Metode Pembayaran",
    "cart.methodTransfer": "Transfer Bank",
    "cart.methodEwallet": "E-Wallet",
    "cart.methodCod": "COD (Bayar di Tempat)",
    "cart.transferTo": "Transfer Ke",
    "cart.bankName": "Bank",
    "cart.accountNumber": "Nomor Rekening",
    "cart.accountHolder": "Atas Nama",
    "cart.transferNote": "Mohon transfer sesuai total belanja dan cantumkan nama pemesan pada keterangan transfer.",
    "cart.payNow": "Bayar Sekarang",
    "cart.processing": "Memproses Pembayaran...",
    // Hero
    "hero.title": "Velocity Stack Presisi Untuk Performa Maksimal.",
    "hero.subtitle": "Solusi velocity stack profesional untuk throttle body standar maupun aftermarket, dengan ukuran akurat, harga transparan, dan kualitas siap pasang.",
    // SearchBar
    "search.make": "Merek",
    "search.anymake": "Semua Merek",
    "search.model": "Model",
    "search.anymodel": "Semua Model",
    "search.selectfirst": "Pilih Merek Dulu",
    "search.year": "Tahun",
    "search.anyyear": "Semua Tahun",
    "search.color": "Warna",
    "search.anycolor": "Semua Warna",
    "search.throttlebody": "Throttle Body",
    "search.anythrottlebody": "Semua Throttle Body",
    "search.size": "Ukuran",
    "search.anysize": "Semua Ukuran",
    "search.velocityheight": "Tinggi Velocity Stack",
    "search.anyvelocityheight": "Semua Tinggi",
    "search.older": "1999 & Kebawah",
    "search.button": "Beli",
    // Featured
    "feat.title": "Custom Velo Pilihan",
    "feat.viewall": "Lihat Semua Ukuran",
    "feat.new": "BARU",
    "feat.diameter": "Diameter",
    "feat.height": "Tinggi",
    "feat.finish": "Finishing",
    // About
    "about.title": "Fungsi Velocity Stack",
    "about.p1": "Velocity stack membantu meluruskan aliran udara masuk ke throttle body, mengurangi turbulensi, dan membuat suplai udara ke mesin lebih stabil.",
    "about.p2": "Secara umum dalam tuning, stack yang lebih pendek cenderung mendukung tenaga di RPM atas, sedangkan stack yang lebih panjang biasanya membantu torsi di RPM bawah-menengah.",
    "about.p3": "Panduan umum panjang stack:",
    "about.l1": "40-55 mm: responsif di RPM menengah-atas dan gas lebih cepat.",
    "about.l2": "75 mm: karakter seimbang untuk pemakaian harian dan rentang RPM campuran.",
    "about.l3": "95-120 mm: dorongan torsi bawah-menengah lebih kuat dan tarikan lebih halus.",
    "about.note": "Setelan final tetap perlu disesuaikan dengan spek mesin, profil cam, ukuran throttle body, dan mapping bahan bakar.",
    "about.wa": "Mari Ngobrol di WhatsApp",
    "about.wamsg": "Halo Panz Auto, saya ingin konsultasi rekomendasi velocity stack untuk setup motor saya.",
    // Policy / Trust
    "trust.title": "Perlindungan Pembeli & Kebijakan Toko",
    "trust.subtitle": "Kebijakan jelas, proses transparan, dan respon cepat untuk setiap pesanan velocity stack.",
    "trust.shippingTitle": "Packing Cepat & Pengiriman",
    "trust.shippingDesc": "Pesanan sebelum 15:00 WIB diproses di hari yang sama. Nomor resi langsung kami kirim setelah barang masuk ekspedisi.",
    "trust.warrantyTitle": "Garansi Produk",
    "trust.warrantyDesc": "Klaim garansi tersedia untuk cacat produksi dengan bukti foto/video serta rekaman unboxing lengkap.",
    "trust.returnTitle": "Retur & Tukar Ukuran",
    "trust.returnDesc": "Jika ukuran kurang sesuai, bisa tukar dalam 3 hari setelah barang diterima selama kondisi masih original.",
    "trust.paymentTitle": "Metode Pembayaran Aman",
    "trust.paymentDesc": "Transfer bank dan e-wallet diverifikasi terlebih dahulu sebelum pengiriman untuk menjaga keamanan transaksi.",
    "trust.supportTitle": "Konsultasi Teknis",
    "trust.supportDesc": "Butuh bantuan pilih panjang stack? Kami bantu rekomendasi sesuai ukuran throttle body dan kebutuhan pemakaian."
  }
};

type Language = "en" | "id";
type TranslationKey = keyof typeof translations.en;

interface LocaleOption {
  value: string;
  label: string;
  currency?: string;
  language?: Language;
}

interface LanguageContextType {
  language: Language;
  locale: string;
  selectedLocale: string;
  setLocale: (locale: string) => void;
  localeOptions: LocaleOption[];
  currency: string;
  t: (key: TranslationKey) => string;
  formatCurrency: (valueIdr: number) => string;
  convertFromIdr: (valueIdr: number) => number;
}

const STORAGE_KEY = "panz-auto-locale";
const AUTO_LOCALE = "auto";

const localeOptions: LocaleOption[] = [
  { value: AUTO_LOCALE, label: "Auto (Browser)" },
  { value: "id-ID", label: "Indonesia (IDR)", currency: "IDR", language: "id" },
  { value: "en-US", label: "English US (USD)", currency: "USD", language: "en" },
  { value: "en-GB", label: "English UK (GBP)", currency: "GBP", language: "en" },
  { value: "en-AU", label: "English AU (AUD)", currency: "AUD", language: "en" },
  { value: "en-CA", label: "English CA (CAD)", currency: "CAD", language: "en" },
  { value: "en-NZ", label: "English NZ (NZD)", currency: "NZD", language: "en" },
  { value: "ja-JP", label: "Japanese (JPY)", currency: "JPY", language: "en" },
  { value: "ko-KR", label: "Korean (KRW)", currency: "KRW", language: "en" },
  { value: "zh-CN", label: "Chinese CN (CNY)", currency: "CNY", language: "en" },
  { value: "zh-TW", label: "Chinese TW (TWD)", currency: "TWD", language: "en" },
  { value: "hi-IN", label: "Hindi (INR)", currency: "INR", language: "en" },
  { value: "ar-SA", label: "Arabic SA (SAR)", currency: "SAR", language: "en" },
  { value: "ar-AE", label: "Arabic AE (AED)", currency: "AED", language: "en" },
  { value: "th-TH", label: "Thai (THB)", currency: "THB", language: "en" },
  { value: "vi-VN", label: "Vietnamese (VND)", currency: "VND", language: "en" },
  { value: "ms-MY", label: "Malay (MYR)", currency: "MYR", language: "en" },
  { value: "fil-PH", label: "Filipino (PHP)", currency: "PHP", language: "en" },
  { value: "en-SG", label: "English SG (SGD)", currency: "SGD", language: "en" },
  { value: "fr-FR", label: "French (EUR)", currency: "EUR", language: "en" },
  { value: "de-DE", label: "German (EUR)", currency: "EUR", language: "en" },
  { value: "es-ES", label: "Spanish ES (EUR)", currency: "EUR", language: "en" },
  { value: "pt-PT", label: "Portuguese PT (EUR)", currency: "EUR", language: "en" },
  { value: "it-IT", label: "Italian (EUR)", currency: "EUR", language: "en" },
  { value: "nl-NL", label: "Dutch (EUR)", currency: "EUR", language: "en" },
  { value: "pl-PL", label: "Polish (PLN)", currency: "PLN", language: "en" },
  { value: "cs-CZ", label: "Czech (CZK)", currency: "CZK", language: "en" },
  { value: "hu-HU", label: "Hungarian (HUF)", currency: "HUF", language: "en" },
  { value: "ro-RO", label: "Romanian (RON)", currency: "RON", language: "en" },
  { value: "sv-SE", label: "Swedish (SEK)", currency: "SEK", language: "en" },
  { value: "nb-NO", label: "Norwegian (NOK)", currency: "NOK", language: "en" },
  { value: "da-DK", label: "Danish (DKK)", currency: "DKK", language: "en" },
  { value: "de-CH", label: "Swiss (CHF)", currency: "CHF", language: "en" },
  { value: "he-IL", label: "Hebrew (ILS)", currency: "ILS", language: "en" },
  { value: "tr-TR", label: "Turkish (TRY)", currency: "TRY", language: "en" },
  { value: "ru-RU", label: "Russian (RUB)", currency: "RUB", language: "en" },
  { value: "uk-UA", label: "Ukrainian (UAH)", currency: "UAH", language: "en" },
  { value: "pt-BR", label: "Portuguese BR (BRL)", currency: "BRL", language: "en" },
  { value: "es-MX", label: "Spanish MX (MXN)", currency: "MXN", language: "en" },
  { value: "es-AR", label: "Spanish AR (ARS)", currency: "ARS", language: "en" },
  { value: "es-CL", label: "Spanish CL (CLP)", currency: "CLP", language: "en" },
  { value: "en-ZA", label: "English ZA (ZAR)", currency: "ZAR", language: "en" },
  { value: "ar-EG", label: "Arabic EG (EGP)", currency: "EGP", language: "en" },
  { value: "en-NG", label: "English NG (NGN)", currency: "NGN", language: "en" },
  { value: "ur-PK", label: "Urdu (PKR)", currency: "PKR", language: "en" },
  { value: "bn-BD", label: "Bengali (BDT)", currency: "BDT", language: "en" },
];

const localeOptionMap = new Map(localeOptions.map((option) => [option.value, option]));

const fallbackExchangeRates: Record<string, number> = {
  IDR: 1,
  USD: 0.000058,
  EUR: 0.00005,
  GBP: 0.000043,
  AUD: 0.000082,
  CAD: 0.00008,
  NZD: 0.000099,
  JPY: 0.0093,
  KRW: 0.086,
  CNY: 0.0004,
  TWD: 0.0019,
  INR: 0.0054,
  SAR: 0.00022,
  AED: 0.00021,
  THB: 0.00187,
  VND: 1.56,
  MYR: 0.00023,
  PHP: 0.0035,
  SGD: 0.000074,
  PLN: 0.00021,
  CZK: 0.0012,
  HUF: 0.018,
  RON: 0.00025,
  SEK: 0.00053,
  NOK: 0.00054,
  DKK: 0.00037,
  CHF: 0.000046,
  ILS: 0.00017,
  TRY: 0.0026,
  RUB: 0.0048,
  UAH: 0.0024,
  BRL: 0.00029,
  MXN: 0.00101,
  ARS: 0.063,
  CLP: 0.053,
  ZAR: 0.00095,
  EGP: 0.0029,
  NGN: 0.089,
  PKR: 0.016,
  BDT: 0.007,
};

const regionCurrencyMap: Record<string, string> = {
  ID: "IDR",
  US: "USD",
  GB: "GBP",
  AU: "AUD",
  CA: "CAD",
  NZ: "NZD",
  JP: "JPY",
  KR: "KRW",
  CN: "CNY",
  TW: "TWD",
  IN: "INR",
  SA: "SAR",
  AE: "AED",
  TH: "THB",
  VN: "VND",
  MY: "MYR",
  PH: "PHP",
  SG: "SGD",
  FR: "EUR",
  DE: "EUR",
  ES: "EUR",
  PT: "EUR",
  IT: "EUR",
  NL: "EUR",
  BE: "EUR",
  IE: "EUR",
  PL: "PLN",
  CZ: "CZK",
  HU: "HUF",
  RO: "RON",
  SE: "SEK",
  NO: "NOK",
  DK: "DKK",
  CH: "CHF",
  IL: "ILS",
  TR: "TRY",
  RU: "RUB",
  UA: "UAH",
  BR: "BRL",
  MX: "MXN",
  AR: "ARS",
  CL: "CLP",
  ZA: "ZAR",
  EG: "EGP",
  NG: "NGN",
  PK: "PKR",
  BD: "BDT",
};

const getBrowserLocale = () => {
  if (typeof navigator === "undefined") {
    return "id-ID";
  }
  return navigator.languages?.[0] ?? navigator.language ?? "id-ID";
};

const getStoredLocale = () => {
  if (typeof window === "undefined") {
    return "id-ID";
  }

  const storedLocale = window.localStorage.getItem(STORAGE_KEY);
  if (storedLocale && localeOptionMap.has(storedLocale)) {
    return storedLocale;
  }

  return "id-ID";
};

const getRegionFromLocale = (locale: string): string | undefined => {
  const normalized = locale.replace("_", "-");
  const parts = normalized.split("-").map((part) => part.toUpperCase());
  return parts.find((part) => /^[A-Z]{2}$/.test(part));
};

const inferCurrencyFromLocale = (locale: string): string => {
  const region = getRegionFromLocale(locale);
  if (region && regionCurrencyMap[region]) {
    return regionCurrencyMap[region];
  }

  const languageCode = locale.split("-")[0]?.toLowerCase();
  if (languageCode === "id") {
    return "IDR";
  }

  return "USD";
};

const resolveLanguageFromLocale = (locale: string): Language => {
  const languageCode = locale.split("-")[0]?.toLowerCase();
  return languageCode === "id" ? "id" : "en";
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [selectedLocale, setSelectedLocale] = useState<string>(getStoredLocale);
  const [exchangeRates, setExchangeRates] = useState<Record<string, number>>(fallbackExchangeRates);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, selectedLocale);
    }
  }, [selectedLocale]);

  useEffect(() => {
    let isActive = true;
    const controller = new AbortController();

    const loadExchangeRates = async () => {
      try {
        const response = await fetch("https://open.er-api.com/v6/latest/IDR", {
          signal: controller.signal,
        });

        if (!response.ok) {
          return;
        }

        const data = (await response.json()) as { result?: string; rates?: Record<string, number> };
        if (!isActive || data.result !== "success" || !data.rates) {
          return;
        }

        const normalizedRates = Object.entries(data.rates).reduce<Record<string, number>>((acc, [code, rate]) => {
          if (typeof rate === "number" && Number.isFinite(rate) && rate > 0) {
            acc[code.toUpperCase()] = rate;
          }
          return acc;
        }, { IDR: 1 });

        if (Object.keys(normalizedRates).length > 1) {
          setExchangeRates((prev) => ({ ...prev, ...normalizedRates }));
        }
      } catch {
        // Keep fallback rates when API is unavailable.
      }
    };

    void loadExchangeRates();

    return () => {
      isActive = false;
      controller.abort();
    };
  }, []);

  const selectedOption = localeOptionMap.get(selectedLocale);
  const locale = selectedLocale === AUTO_LOCALE ? getBrowserLocale() : selectedOption?.value ?? "id-ID";
  const currency =
    selectedLocale === AUTO_LOCALE
      ? inferCurrencyFromLocale(locale)
      : selectedOption?.currency ?? inferCurrencyFromLocale(locale);
  const language =
    selectedLocale === AUTO_LOCALE
      ? resolveLanguageFromLocale(locale)
      : selectedOption?.language ?? resolveLanguageFromLocale(locale);

  const setLocale = (nextLocale: string) => {
    setSelectedLocale(localeOptionMap.has(nextLocale) ? nextLocale : "id-ID");
  };

  const t = (key: TranslationKey) => {
    return translations[language][key] || translations.en[key] || key;
  };

  const convertFromIdr = (valueIdr: number) => {
    const rate = exchangeRates[currency] ?? fallbackExchangeRates[currency] ?? 1;
    return valueIdr * rate;
  };

  const formatCurrency = (valueIdr: number) => {
    const convertedValue = convertFromIdr(valueIdr);

    try {
      return new Intl.NumberFormat(locale, {
        style: "currency",
        currency,
        maximumFractionDigits: 0,
      }).format(convertedValue);
    } catch {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      }).format(convertedValue);
    }
  };

  const value = useMemo(
    () => ({
      language,
      locale,
      selectedLocale,
      setLocale,
      localeOptions,
      currency,
      t,
      formatCurrency,
      convertFromIdr,
    }),
    [currency, language, locale, selectedLocale, exchangeRates],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
