import { ShoppingCart } from "lucide-react";
import { FormEvent, useState } from "react";
import { useCart } from "../../lib/cart";
import { useLanguage } from "../../lib/i18n";

const modelsData: Record<string, string[]> = {
  yamaha: [
    "Aerox 155", "NMAX 155", "XMAX 250", "TMAX", "Lexi", "FreeGo", "Gear 125", "Fazzio", "Grand Filano",
    "Mio (Sporty/J/M3/Z/S)", "X-Ride", "Fino", "Nouvo", 
    "R15", "R25", "MT-15", "MT-25", "Vixion (R/NVL/NVA)", "XSR 155", "Xabre", "RX-King", "Byson", "Scorpio Z",
    "WR 155 R", "Jupiter MX / MX King 150", "Jupiter Z / Z1", "Vega / Force"
  ],
  honda: [
    "PCX (150/160)", "ADV (150/160)", "Forza 250", "Vario (110/125/150/160)", "Beat (Sporty/Street/Pop)", 
    "Scoopy", "Genio", "Spacy", "CBR150R", "CBR250RR", "CB150R Streetfire", "CB150X", "CB150 Verza", 
    "Megapro", "Tiger", "Sonic 150R", "Supra GTR 150", "Supra X 125", "Revo (Fit/X)", "Blade", 
    "CRF150L", "CRF250 Rally", "Monkey", "ST125 Dax"
  ],
  kawasaki: [
    "Ninja 150R/RR (2-Tak)", "Ninja 250SL / Mono", "Ninja 250 FI", "ZX-25R", "ZX-4RR", "ZX-6R", "ZX-10R",
    "Z125", "Z250", "Z800", "Z900", "Z1000",
    "KLX 140", "KLX 150", "KLX 230", "KLX 250", "D-Tracker 150", "D-Tracker 250",
    "W175 (TR/Cafe)", "W250", "W800", "Vulcan S", "Versys-X 250", "Versys 650", "Versys 1000",
    "Binter Merzy"
  ],
  suzuki: [
    "Satria F150", "Satria 120R (2-Tak)", "GSX-R150", "GSX-S150", "Bandit 150", "Thunder 125/250", "Inazuma 250",
    "V-Strom 250SX", "Address", "Nex (I/II/Crossover)", "Avenis", "Burgman Street 125",
    "Smash", "Shogun (110/125/SP)", "Spin", "Skywave", "Skydrive", "Hayate"
  ],
};

const EARLIEST_YEAR = 2000;
const currentYear = new Date().getFullYear();
const yearsList = Array.from({ length: currentYear - EARLIEST_YEAR + 1 }, (_, i) => currentYear - i);
const throttleBodyOptions = [
  "Standar / OEM",
  "Keihin",
  "Mikuni",
  "UMA Racing",
  "BRT",
  "KTC KYTACO",
  "Kawahara Racing",
  "SYS Racing",
  "TDR",
  "XTR Racing",
  "AH1",
  "SUM Racing",
  "Kenada",
  "Barrel",
  "Ataka",
  "MG",
  "RX7",
  "4S1M",
  "Lainnya (Aftermarket)",
];
const throttleBodySizeOptions = [
  "28 mm",
  "30 mm",
  "32 mm",
  "33 mm",
  "34 mm",
  "35 mm",
  "36 mm",
  "38 mm",
  "40 mm+",
];
const velocityStackHeightOptions = ["40 mm", "55 mm", "75 mm", "95 mm", "120 mm"];
const colorOptions = ["Merah", "Hitam", "Biru"];

const makeLabelMap: Record<string, string> = {
  yamaha: "Yamaha",
  honda: "Honda",
  kawasaki: "Kawasaki",
  suzuki: "Suzuki",
};

const throttleBodyBasePriceMap: Record<string, number> = {
  "Standar / OEM": 750000,
  Keihin: 2400000,
  Mikuni: 1900000,
  "UMA Racing": 1450000,
  BRT: 1800000,
  "KTC KYTACO": 1700000,
  "Kawahara Racing": 1650000,
  "SYS Racing": 1600000,
  TDR: 1500000,
  "XTR Racing": 1550000,
  AH1: 1650000,
  "SUM Racing": 1700000,
  Kenada: 1450000,
  Barrel: 1550000,
  Ataka: 1450000,
  MG: 1450000,
  RX7: 1600000,
  "4S1M": 1700000,
  "Lainnya (Aftermarket)": 1500000,
};
const aftermarketTbAddonPriceMap: Record<string, number> = {
  Keihin: 120000,
  Mikuni: 90000,
  "UMA Racing": 70000,
  BRT: 85000,
  "KTC KYTACO": 80000,
  "Kawahara Racing": 80000,
  "SYS Racing": 75000,
  TDR: 70000,
  "XTR Racing": 75000,
  AH1: 80000,
  "SUM Racing": 80000,
  Kenada: 65000,
  Barrel: 70000,
  Ataka: 65000,
  MG: 65000,
  RX7: 70000,
  "4S1M": 80000,
  "Lainnya (Aftermarket)": 60000,
};

const yamahaStandardVelocityStackPriceMap: Record<string, number> = {
  "40 mm": 80000,
  "55 mm": 90000,
  "75 mm": 110000,
  "95 mm": 135000,
  "120 mm": 160000,
};
const standardVelocityStackPricingMakes = new Set(["yamaha", "honda", "suzuki"]);

const getThrottleBodySizeInMm = (size: string) => {
  const match = size.match(/^(\d+)\s*mm/i);
  return match ? Number(match[1]) : null;
};

const getStandardThrottleBodySizeSurcharge = (size: string) => {
  const sizeInMm = getThrottleBodySizeInMm(size);
  if (sizeInMm === null) {
    return 0;
  }

  if (sizeInMm >= 28 && sizeInMm <= 36) {
    return 10000;
  }

  if (sizeInMm >= 38) {
    return 20000;
  }

  return 0;
};

const estimatePrice = (
  make: string,
  throttleBody: string,
  throttleBodySize: string,
  velocityStackHeight: string,
) => {
  const sizeSurcharge = getStandardThrottleBodySizeSurcharge(throttleBodySize);

  if (standardVelocityStackPricingMakes.has(make)) {
    const standardBasePrice =
      (yamahaStandardVelocityStackPriceMap[velocityStackHeight] ?? yamahaStandardVelocityStackPriceMap["40 mm"]) +
      sizeSurcharge;

    if (throttleBody === "Standar / OEM") {
      return standardBasePrice;
    }

    // For Yamaha/Honda/Suzuki, aftermarket TB is an additional price on top of Standard/OEM base price.
    const aftermarketAddon =
      aftermarketTbAddonPriceMap[throttleBody] ?? aftermarketTbAddonPriceMap["Lainnya (Aftermarket)"];
    return standardBasePrice + aftermarketAddon;
  }

  const basePrice = throttleBodyBasePriceMap[throttleBody] ?? 1500000;
  return basePrice + sizeSurcharge;
};

export function SearchBar() {
  const [selectedMake, setSelectedMake] = useState<string>("");
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedThrottleBody, setSelectedThrottleBody] = useState<string>("");
  const [selectedThrottleBodySize, setSelectedThrottleBodySize] = useState<string>("");
  const [selectedVelocityStackHeight, setSelectedVelocityStackHeight] = useState<string>("");
  const { addToCart, openCart } = useCart();
  const { t } = useLanguage();

  const availableModels = selectedMake ? (modelsData[selectedMake] ?? []) : [];

  const handleBuy = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const params = new URLSearchParams(window.location.search);
    const values = {
      make: selectedMake,
      model: selectedModel,
      year: selectedYear,
      color: selectedColor,
      throttleBody: selectedThrottleBody,
      throttleBodySize: selectedThrottleBodySize,
      velocityStackHeight: selectedVelocityStackHeight,
    };

    Object.entries(values).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    const query = params.toString();
    const nextUrl = query ? `${window.location.pathname}?${query}` : window.location.pathname;
    window.history.replaceState({}, "", nextUrl);

    const makeLabel = makeLabelMap[selectedMake] ?? "Motor";
    const modelLabel = selectedModel || "Throttle Body";
    const yearLabel = selectedYear || "-";
    const colorLabel = selectedColor || t("search.anycolor");
    const throttleBodyLabel = selectedThrottleBody || "Standar / OEM";
    const throttleBodySizeLabel = selectedThrottleBodySize || t("search.anysize");
    const velocityStackHeightLabel = selectedVelocityStackHeight || "40 mm";

    addToCart({
      title: `${makeLabel} ${modelLabel}`,
      make: makeLabel,
      model: modelLabel,
      year: yearLabel,
      color: colorLabel,
      throttleBody: throttleBodyLabel,
      throttleBodySize: throttleBodySizeLabel,
      velocityStackHeight: velocityStackHeightLabel,
      price: estimatePrice(selectedMake, throttleBodyLabel, throttleBodySizeLabel, velocityStackHeightLabel),
    });
    openCart();

    const target = document.getElementById("featured");
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="bg-white p-4 shadow-2xl md:p-6 border border-neutral-200">
      <form
        className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)_minmax(0,0.85fr)_minmax(0,0.9fr)_minmax(0,1.25fr)_minmax(0,1fr)_minmax(0,1.2fr)_auto] md:gap-6 items-end"
        onSubmit={handleBuy}
      >
        {/* Make */}
        <div className="flex flex-col gap-2">
          <label htmlFor="make" className="text-xs font-semibold uppercase tracking-wider text-black">
            {t("search.make")}
          </label>
          <select 
            id="make" 
            value={selectedMake}
            onChange={(e) => {
              setSelectedMake(e.target.value);
              setSelectedModel("");
            }}
            className="w-full rounded-none border-0 border-b-2 border-neutral-200 bg-transparent py-2 pl-0 pr-8 text-black focus:border-black focus:ring-0"
          >
            <option value="">{t("search.anymake")}</option>
            <option value="yamaha">Yamaha</option>
            <option value="honda">Honda</option>
            <option value="kawasaki">Kawasaki</option>
            <option value="suzuki">Suzuki</option>
          </select>
        </div>

        {/* Model */}
        <div className="flex flex-col gap-2">
          <label htmlFor="model" className="text-xs font-semibold uppercase tracking-wider text-black">
            {t("search.model")}
          </label>
          <select 
            id="model" 
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            className="w-full rounded-none border-0 border-b-2 border-neutral-200 bg-transparent py-2 pl-0 pr-8 text-black focus:border-black focus:ring-0 disabled:opacity-50"
            disabled={!selectedMake}
          >
            <option value="">{selectedMake ? t("search.anymodel") : t("search.selectfirst")}</option>
            {availableModels.map((model) => (
              <option key={model} value={model}>
                {model}
              </option>
            ))}
          </select>
        </div>

        {/* Year */}
        <div className="flex flex-col gap-2">
          <label htmlFor="year" className="text-xs font-semibold uppercase tracking-wider text-black">
            {t("search.year")}
          </label>
          <select 
            id="year" 
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="w-full rounded-none border-0 border-b-2 border-neutral-200 bg-transparent py-2 pl-0 pr-8 text-black focus:border-black focus:ring-0"
          >
            <option value="">{t("search.anyyear")}</option>
            {yearsList.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
            <option value="older">{t("search.older")}</option>
          </select>
        </div>

        {/* Color */}
        <div className="flex flex-col gap-2">
          <label htmlFor="color" className="text-xs font-semibold uppercase tracking-wider text-black">
            {t("search.color")}
          </label>
          <select
            id="color"
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
            className="w-full rounded-none border-0 border-b-2 border-neutral-200 bg-transparent py-2 pl-0 pr-8 text-black focus:border-black focus:ring-0"
          >
            <option value="">{t("search.anycolor")}</option>
            {colorOptions.map((color) => (
              <option key={color} value={color}>
                {color}
              </option>
            ))}
          </select>
        </div>

        {/* Throttle Body */}
        <div className="flex flex-col gap-2">
          <label htmlFor="throttleBody" className="text-xs font-semibold uppercase tracking-wider text-black">
            {t("search.throttlebody")}
          </label>
          <select
            id="throttleBody"
            value={selectedThrottleBody}
            onChange={(e) => setSelectedThrottleBody(e.target.value)}
            className="w-full rounded-none border-0 border-b-2 border-neutral-200 bg-transparent py-2 pl-0 pr-8 text-black focus:border-black focus:ring-0"
          >
            <option value="">{t("search.anythrottlebody")}</option>
            {throttleBodyOptions.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>

        {/* Throttle Body Size */}
        <div className="flex flex-col gap-2">
          <label htmlFor="throttleBodySize" className="text-xs font-semibold uppercase tracking-wider text-black">
            {t("search.size")}
          </label>
          <select
            id="throttleBodySize"
            value={selectedThrottleBodySize}
            onChange={(e) => setSelectedThrottleBodySize(e.target.value)}
            className="w-full rounded-none border-0 border-b-2 border-neutral-200 bg-transparent py-2 pl-0 pr-8 text-black focus:border-black focus:ring-0"
          >
            <option value="">{t("search.anysize")}</option>
            {throttleBodySizeOptions.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>

        {/* Velocity Stack Height */}
        <div className="flex flex-col gap-2">
          <label htmlFor="velocityStackHeight" className="text-xs font-semibold uppercase tracking-wider text-black">
            {t("search.velocityheight")}
          </label>
          <select
            id="velocityStackHeight"
            value={selectedVelocityStackHeight}
            onChange={(e) => setSelectedVelocityStackHeight(e.target.value)}
            className="w-full rounded-none border-0 border-b-2 border-neutral-200 bg-transparent py-2 pl-0 pr-8 text-black focus:border-black focus:ring-0"
          >
            <option value="">{t("search.anyvelocityheight")}</option>
            {velocityStackHeightOptions.map((height) => (
              <option key={height} value={height}>
                {height}
              </option>
            ))}
          </select>
        </div>

        {/* Buy Button */}
        <div>
          <button 
            type="submit" 
            className="flex w-full items-center justify-center gap-2 bg-black px-6 py-3 font-medium text-white hover:bg-neutral-800 transition-colors h-full"
          >
            <ShoppingCart className="h-5 w-5" />
            <span>{t("search.button")}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
