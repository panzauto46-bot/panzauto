import { ShoppingCart } from "lucide-react";
import { FormEvent, useState } from "react";
import { useCart } from "../../lib/cart";
import { useLanguage } from "../../lib/i18n";
import {
  estimatePrice,
  makeLabelMap,
  throttleBodyOptions,
  throttleBodySizeOptions,
  velocityStackHeightOptions,
} from "../../lib/pricing";

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
const colorOptions = ["Merah", "Hitam", "Biru"];

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
    <div className="bg-transparent p-4 md:p-6 w-full" role="search">
      <form
        className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)_minmax(0,0.85fr)_minmax(0,0.9fr)_minmax(0,1.25fr)_minmax(0,1fr)_minmax(0,1.2fr)_auto] md:gap-6 items-end"
        onSubmit={handleBuy}
        aria-label="Search and buy velocity stack"
      >
        {/* Make */}
        <div className="flex flex-col gap-2">
          <label htmlFor="make" className="text-xs font-semibold uppercase tracking-wider text-neutral-300">
            {t("search.make")}
          </label>
          <select
            id="make"
            value={selectedMake}
            onChange={(e) => {
              setSelectedMake(e.target.value);
              setSelectedModel("");
            }}
            className="w-full rounded-none border-0 border-b-2 border-neutral-700 bg-neutral-900 py-2 pl-0 pr-8 text-white focus:border-white focus:ring-0 focus:ring-offset-2"
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
          <label htmlFor="model" className="text-xs font-semibold uppercase tracking-wider text-neutral-300">
            {t("search.model")}
          </label>
          <select
            id="model"
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            className="w-full rounded-none border-0 border-b-2 border-neutral-700 bg-neutral-900 py-2 pl-0 pr-8 text-white focus:border-white focus:ring-0 focus:ring-offset-2 disabled:opacity-50"
            disabled={!selectedMake}
            aria-describedby={!selectedMake ? "model-help" : undefined}
          >
            <option value="">{selectedMake ? t("search.anymodel") : t("search.selectfirst")}</option>
            {availableModels.map((model) => (
              <option key={model} value={model}>
                {model}
              </option>
            ))}
          </select>
          {!selectedMake && (
            <p id="model-help" className="text-xs text-neutral-500">
              {t("search.selectfirst")}
            </p>
          )}
        </div>

        {/* Year */}
        <div className="flex flex-col gap-2">
          <label htmlFor="year" className="text-xs font-semibold uppercase tracking-wider text-neutral-300">
            {t("search.year")}
          </label>
          <select
            id="year"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="w-full rounded-none border-0 border-b-2 border-neutral-700 bg-neutral-900 py-2 pl-0 pr-8 text-white focus:border-white focus:ring-0 focus:ring-offset-2"
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
          <label htmlFor="color" className="text-xs font-semibold uppercase tracking-wider text-neutral-300">
            {t("search.color")}
          </label>
          <select
            id="color"
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
            className="w-full rounded-none border-0 border-b-2 border-neutral-700 bg-neutral-900 py-2 pl-0 pr-8 text-white focus:border-white focus:ring-0 focus:ring-offset-2"
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
          <label htmlFor="throttleBody" className="text-xs font-semibold uppercase tracking-wider text-neutral-300">
            {t("search.throttlebody")}
          </label>
          <select
            id="throttleBody"
            value={selectedThrottleBody}
            onChange={(e) => setSelectedThrottleBody(e.target.value)}
            className="w-full rounded-none border-0 border-b-2 border-neutral-700 bg-neutral-900 py-2 pl-0 pr-8 text-white focus:border-white focus:ring-0 focus:ring-offset-2"
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
          <label htmlFor="throttleBodySize" className="text-xs font-semibold uppercase tracking-wider text-neutral-300">
            {t("search.size")}
          </label>
          <select
            id="throttleBodySize"
            value={selectedThrottleBodySize}
            onChange={(e) => setSelectedThrottleBodySize(e.target.value)}
            className="w-full rounded-none border-0 border-b-2 border-neutral-700 bg-neutral-900 py-2 pl-0 pr-8 text-white focus:border-white focus:ring-0 focus:ring-offset-2"
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
          <label htmlFor="velocityStackHeight" className="text-xs font-semibold uppercase tracking-wider text-neutral-300">
            {t("search.velocityheight")}
          </label>
          <select
            id="velocityStackHeight"
            value={selectedVelocityStackHeight}
            onChange={(e) => setSelectedVelocityStackHeight(e.target.value)}
            className="w-full rounded-none border-0 border-b-2 border-neutral-700 bg-neutral-900 py-2 pl-0 pr-8 text-white focus:border-white focus:ring-0 focus:ring-offset-2"
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
            className="flex w-full items-center justify-center gap-2 bg-white px-6 py-3 font-medium text-black hover:bg-neutral-200 transition-colors h-full focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-neutral-950 rounded-lg"
          >
            <ShoppingCart className="h-5 w-5" aria-hidden="true" />
            <span>{t("search.button")}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
