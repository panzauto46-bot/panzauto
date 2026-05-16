import "../test-setup";
import { describe, it, beforeEach } from "node:test";
import { renderHook, act } from "@testing-library/react";
import assert from "node:assert";
import { CartProvider, useCart } from "./cart";

describe("Cart", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should initialize with empty cart", () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    });

    assert.deepStrictEqual(result.current.items, []);
    assert.strictEqual(result.current.subtotal, 0);
  });

  it("should add item to cart", () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    });

    const item = {
      id: 1,
      title: "Test Product",
      make: "Yamaha",
      model: "NMAX 155",
      year: "2024",
      color: "Hitam",
      throttleBody: "Standar / OEM",
      throttleBodySize: "28 mm",
      velocityStackHeight: "40 mm",
      price: 80000,
    };

    act(() => {
      result.current.addToCart(item);
    });

    assert.strictEqual(result.current.items.length, 1);
    assert.deepStrictEqual(result.current.items[0], item);
    assert.strictEqual(result.current.subtotal, 80000);
  });

  it("should remove item from cart", () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    });

    const item = {
      id: 1,
      title: "Test Product",
      make: "Yamaha",
      model: "NMAX 155",
      year: "2024",
      color: "Hitam",
      throttleBody: "Standar / OEM",
      throttleBodySize: "28 mm",
      velocityStackHeight: "40 mm",
      price: 80000,
    };

    act(() => {
      result.current.addToCart(item);
    });

    assert.strictEqual(result.current.items.length, 1);

    act(() => {
      result.current.removeFromCart(1);
    });

    assert.strictEqual(result.current.items.length, 0);
    assert.strictEqual(result.current.subtotal, 0);
  });

  it("should clear cart", () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    });

    const item = {
      id: 1,
      title: "Test Product",
      make: "Yamaha",
      model: "NMAX 155",
      year: "2024",
      color: "Hitam",
      throttleBody: "Standar / OEM",
      throttleBodySize: "28 mm",
      velocityStackHeight: "40 mm",
      price: 80000,
    };

    act(() => {
      result.current.addToCart(item);
    });

    assert.strictEqual(result.current.items.length, 1);

    act(() => {
      result.current.clearCart();
    });

    assert.strictEqual(result.current.items.length, 0);
    assert.strictEqual(result.current.subtotal, 0);
  });

  it("should calculate subtotal correctly", () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider,
    });

    const item1 = {
      id: 1,
      title: "Test Product 1",
      make: "Yamaha",
      model: "NMAX 155",
      year: "2024",
      color: "Hitam",
      throttleBody: "Standar / OEM",
      throttleBodySize: "28 mm",
      velocityStackHeight: "40 mm",
      price: 80000,
    };

    const item2 = {
      id: 2,
      title: "Test Product 2",
      make: "Honda",
      model: "PCX 150",
      year: "2024",
      color: "Putih",
      throttleBody: "Keihin",
      throttleBodySize: "30 mm",
      velocityStackHeight: "55 mm",
      price: 90000,
    };

    act(() => {
      result.current.addToCart(item1);
      result.current.addToCart(item2);
    });

    assert.strictEqual(result.current.subtotal, 170000);
  });
});
