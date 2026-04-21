export const throttleBodyOptions = [
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
] as const;

export const throttleBodySizeOptions = [
  "28 mm",
  "30 mm",
  "32 mm",
  "33 mm",
  "34 mm",
  "35 mm",
  "36 mm",
  "38 mm",
  "40 mm+",
] as const;

export const velocityStackHeightOptions = [
  "40 mm",
  "55 mm",
  "75 mm",
  "95 mm",
  "120 mm",
] as const;

export const makeLabelMap: Record<string, string> = {
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

const standardVelocityStackPriceMap: Record<string, number> = {
  "40 mm": 80000,
  "55 mm": 90000,
  "75 mm": 110000,
  "95 mm": 135000,
  "120 mm": 160000,
};

const standardVelocityStackPricingMakes = new Set(["yamaha", "honda", "suzuki"]);

export const getThrottleBodySizeInMm = (size: string) => {
  const match = size.match(/^(\d+)\s*mm/i);
  return match ? Number(match[1]) : null;
};

export const getStandardThrottleBodySizeSurcharge = (size: string) => {
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

export const estimatePrice = (
  make: string,
  throttleBody: string,
  throttleBodySize: string,
  velocityStackHeight: string,
) => {
  const sizeSurcharge = getStandardThrottleBodySizeSurcharge(throttleBodySize);

  if (standardVelocityStackPricingMakes.has(make)) {
    const standardBasePrice =
      (standardVelocityStackPriceMap[velocityStackHeight] ?? standardVelocityStackPriceMap["40 mm"]) + sizeSurcharge;

    if (throttleBody === "Standar / OEM") {
      return standardBasePrice;
    }

    const aftermarketAddon =
      aftermarketTbAddonPriceMap[throttleBody] ?? aftermarketTbAddonPriceMap["Lainnya (Aftermarket)"];
    return standardBasePrice + aftermarketAddon;
  }

  const basePrice = throttleBodyBasePriceMap[throttleBody] ?? 1500000;
  return basePrice + sizeSurcharge;
};
