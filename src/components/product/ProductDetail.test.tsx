import "../../test-setup";
import { describe, it } from "node:test";
import { render, screen } from "@testing-library/react";
import assert from "node:assert";
import { ProductDetail } from "./ProductDetail";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "../../lib/cart";
import { LanguageProvider } from "../../lib/i18n";
import { ProductProvider } from "../../lib/products";

describe("ProductDetail", () => {
  const renderProductDetail = (path: string) =>
    render(
      <MemoryRouter initialEntries={[path]}>
        <CartProvider>
          <LanguageProvider>
            <ProductProvider>
              <Routes>
                <Route path="/product/:id" element={<ProductDetail />} />
              </Routes>
            </ProductProvider>
          </LanguageProvider>
        </CartProvider>
      </MemoryRouter>,
      {
        container: document.body.appendChild(document.createElement("div")),
      },
    );

  it("should render product details", async () => {
    renderProductDetail("/product/1");
    assert.ok(await screen.findByText(/Custom Velo/i));
  });

  it("should show not found for invalid product id", async () => {
    renderProductDetail("/product/999");
    assert.ok(await screen.findByText(/Product Not Found/i));
  });
});
