import "../../test-setup";
import { describe, it } from "node:test";
import { render, screen } from "@testing-library/react";
import assert from "node:assert";
import { ProductDetail } from "./ProductDetail";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "../../lib/cart";
import { LanguageProvider } from "../../lib/i18n";

describe("ProductDetail", () => {
  it("should render product details", () => {
    render(
      <BrowserRouter>
        <CartProvider>
          <LanguageProvider>
            <Routes>
              <Route path="/product/:id" element={<ProductDetail />} />
            </Routes>
          </LanguageProvider>
        </CartProvider>
      </BrowserRouter>,
      {
        container: document.body.appendChild(document.createElement("div")),
      }
    );

    window.history.pushState({}, "", "/product/1");

    assert.ok(screen.getByText(/Custom Velo/i));
  });

  it("should show not found for invalid product id", () => {
    render(
      <BrowserRouter>
        <CartProvider>
          <LanguageProvider>
            <Routes>
              <Route path="/product/:id" element={<ProductDetail />} />
            </Routes>
          </LanguageProvider>
        </CartProvider>
      </BrowserRouter>,
      {
        container: document.body.appendChild(document.createElement("div")),
      }
    );

    window.history.pushState({}, "", "/product/999");

    assert.ok(screen.getByText(/Product Not Found/i));
  });
});
