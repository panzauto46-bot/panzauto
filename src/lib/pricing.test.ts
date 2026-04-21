import assert from "node:assert/strict";
import test from "node:test";
import { estimatePrice, getStandardThrottleBodySizeSurcharge } from "./pricing";

test("standard OEM Yamaha follows base velocity stack price", () => {
  const price = estimatePrice("yamaha", "Standar / OEM", "Semua Ukuran", "40 mm");
  assert.equal(price, 80000);
});

test("size surcharge 28-36 mm adds 10.000", () => {
  const surcharge = getStandardThrottleBodySizeSurcharge("30 mm");
  assert.equal(surcharge, 10000);
});

test("size surcharge 38 mm and above adds 20.000", () => {
  const surcharge = getStandardThrottleBodySizeSurcharge("40 mm+");
  assert.equal(surcharge, 20000);
});

test("aftermarket price for Yamaha/Honda/Suzuki is addon on top of standard base", () => {
  const price = estimatePrice("suzuki", "Keihin", "30 mm", "55 mm");
  // 55mm base (90k) + 30mm surcharge (10k) + Keihin addon (120k)
  assert.equal(price, 220000);
});

test("non-standard-pricing makes use standalone throttle body base price", () => {
  const price = estimatePrice("kawasaki", "Keihin", "30 mm", "55 mm");
  // Keihin base (2.4M) + 30mm surcharge (10k)
  assert.equal(price, 2410000);
});
