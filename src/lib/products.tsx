import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { supabase } from "./supabase";

export interface Product {
  id: number;
  name: string;
  nameId: string;
  diameter: string;
  height: string;
  finish: string;
  finishId: string;
  priceIdr: number;
  img: string;
  description: string;
  descriptionId: string;
  features: string[];
  featuresId: string[];
  compatible: string[];
  rating: number;
  reviews: number;
  isNew: boolean;
  gallery?: string[];
}

/** Supabase row shape (snake_case) */
interface ProductRow {
  id: number;
  name: string;
  name_id: string;
  diameter: string;
  height: string;
  finish: string;
  finish_id: string;
  price_idr: number;
  img: string;
  description: string;
  description_id: string;
  features: string[];
  features_id: string[];
  compatible: string[];
  rating: number;
  reviews: number;
  is_new: boolean;
  gallery?: string[];
}

// --- Converters ---
const rowToProduct = (r: ProductRow): Product => ({
  id: r.id,
  name: r.name,
  nameId: r.name_id,
  diameter: r.diameter,
  height: r.height,
  finish: r.finish,
  finishId: r.finish_id,
  priceIdr: r.price_idr,
  img: r.img,
  description: r.description,
  descriptionId: r.description_id,
  features: r.features ?? [],
  featuresId: r.features_id ?? [],
  compatible: r.compatible ?? [],
  rating: r.rating,
  reviews: r.reviews,
  isNew: r.is_new,
  gallery: r.gallery ?? [],
});

const productToRow = (p: Omit<Product, "id">): Omit<ProductRow, "id"> => ({
  name: p.name,
  name_id: p.nameId,
  diameter: p.diameter,
  height: p.height,
  finish: p.finish,
  finish_id: p.finishId,
  price_idr: p.priceIdr,
  img: p.img,
  description: p.description,
  description_id: p.descriptionId,
  features: p.features,
  features_id: p.featuresId,
  compatible: p.compatible,
  rating: p.rating,
  reviews: p.reviews,
  is_new: p.isNew,
  gallery: p.gallery,
});

// --- Default products (fallback if no Supabase or empty table) ---
export const defaultProducts: Product[] = [
  {
    id: 5,
    name: "Velocity Stack ZX25R / POWER STACK ZX25R",
    nameId: "Velocity Stack ZX25R / POWER STACK ZX25R",
    diameter: "Custom ZX25R",
    height: "Custom Set",
    finish: "Blue Anodize",
    finishId: "Anodize Biru",
    priceIdr: 2000000,
    img: "/images/zx25r-power.jpg",
    description: "High performance velocity stack set specially designed for Kawasaki ZX-25R. 4-cylinder configuration for maximum top-end power.",
    descriptionId: "Set velocity stack performa tinggi khusus dirancang untuk Kawasaki ZX-25R. Konfigurasi 4-silinder untuk memaksimalkan tenaga di putaran atas.",
    features: [
      "Designed specifically for Kawasaki ZX-25R 4-cylinder throttle body",
      "Full 4-piece set included",
      "Premium blue finish",
      "Optimized for high RPM horsepower",
      "Plug and play installation",
    ],
    featuresId: [
      "Dirancang khusus untuk throttle body 4-silinder Kawasaki ZX-25R",
      "Sudah termasuk 1 set lengkap (4 buah)",
      "Finishing biru premium yang elegan",
      "Dioptimalkan untuk meningkatkan tenaga (horsepower) di RPM tinggi",
      "Pemasangan mudah (Plug and play)",
    ],
    compatible: ["Kawasaki ZX-25R", "Kawasaki ZX-4RR"],
    rating: 5.0,
    reviews: 8,
    isNew: true,
    gallery: ["/images/zx25r-power.jpg", "/images/zx25r-power-2.jpg", "/images/zx25r-power-3.jpg"],
  },
  {
    id: 6,
    name: "Velo Model Panz",
    nameId: "Velo Model Panz",
    diameter: "Custom",
    height: "40mm, 55mm, 75mm, 95mm",
    finish: "Anodize",
    finishId: "Anodize",
    priceIdr: 500000,
    img: "/images/panz-3.webp",
    description: "Premium velocity stack 'Velo Model Panz' series. Engineered for ultimate flow and aesthetics.",
    descriptionId: "Velocity stack premium seri 'Velo Model Panz'. Dirancang khusus untuk aliran udara dan estetika yang maksimal.",
    features: [
      "Exclusive Panz Auto design",
      "Optimized flow dynamics",
      "Premium construction",
      "Perfect fitment",
    ],
    featuresId: [
      "Desain eksklusif Panz Auto",
      "Dinamika aliran udara yang dioptimalkan",
      "Konstruksi premium yang kuat",
      "Pemasangan presisi",
    ],
    compatible: ["Universal Custom"],
    rating: 5.0,
    reviews: 0,
    isNew: true,
    gallery: [
      "/images/panz-3.webp",
      "/images/panz-1.webp",
      "/images/panz-2.webp",
      "/images/panz-4.webp",
      "/images/panz-5.webp"
    ],
  },
  {
    id: 7,
    name: "Velo Model REV",
    nameId: "Velo Model REV",
    diameter: "Custom",
    height: "Custom",
    finish: "Anodize",
    finishId: "Anodize",
    priceIdr: 500000,
    img: "/images/rev-1.webp",
    description: "Premium velocity stack 'Velo Model REV' series. Designed for peak racing performance.",
    descriptionId: "Velocity stack premium seri 'Velo Model REV'. Dirancang khusus untuk performa balap maksimal.",
    features: [
      "Exclusive REV design",
      "Optimized flow dynamics",
      "Premium construction",
      "Perfect fitment",
    ],
    featuresId: [
      "Desain eksklusif REV",
      "Dinamika aliran udara yang dioptimalkan",
      "Konstruksi premium yang kuat",
      "Pemasangan presisi",
    ],
    compatible: ["Universal Custom"],
    rating: 5.0,
    reviews: 0,
    isNew: true,
    gallery: [
      "/images/rev-1.webp",
      "/images/rev-2.webp",
      "/images/rev-3.webp"
    ],
  },
];

interface ProductContextType {
  products: Product[];
  loading: boolean;
  addProduct: (product: Omit<Product, "id">) => Promise<void>;
  updateProduct: (id: number, updates: Partial<Product>) => Promise<void>;
  deleteProduct: (id: number) => Promise<void>;
  getProduct: (id: number) => Product | undefined;
  refreshProducts: () => Promise<void>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(defaultProducts);
  const [loading, setLoading] = useState(true);

  // --- Fetch products from Supabase ---
  const fetchProducts = useCallback(async () => {
    if (!supabase) {
      setLoading(false);
      return;
    }
    try {
      const { data, error } = await supabase.from("products").select("*").order("id", { ascending: true });
      if (error) {
        console.error("Supabase fetch error:", error);
        return;
      }
      if (data && data.length > 0) {
        setProducts((data as ProductRow[]).map(rowToProduct));
      }
    } catch (err) {
      console.error("Failed to fetch products:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // --- CRUD operations ---
  const addProduct = useCallback(async (product: Omit<Product, "id">) => {
    if (!supabase) {
      // Fallback: local only
      const maxId = products.reduce((max, p) => Math.max(max, p.id), 0);
      setProducts((prev) => [...prev, { ...product, id: maxId + 1 }]);
      return;
    }
    const row = productToRow(product);
    const { data, error } = await supabase.from("products").insert(row).select().single();
    if (error) {
      console.error("Supabase insert error:", error);
      return;
    }
    if (data) {
      setProducts((prev) => [...prev, rowToProduct(data as ProductRow)]);
    }
  }, [products]);

  const updateProduct = useCallback(async (id: number, updates: Partial<Product>) => {
    if (!supabase) {
      setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)));
      return;
    }
    // Convert camelCase updates to snake_case
    const rowUpdates: Record<string, unknown> = {};
    if (updates.name !== undefined) rowUpdates.name = updates.name;
    if (updates.nameId !== undefined) rowUpdates.name_id = updates.nameId;
    if (updates.diameter !== undefined) rowUpdates.diameter = updates.diameter;
    if (updates.height !== undefined) rowUpdates.height = updates.height;
    if (updates.finish !== undefined) rowUpdates.finish = updates.finish;
    if (updates.finishId !== undefined) rowUpdates.finish_id = updates.finishId;
    if (updates.priceIdr !== undefined) rowUpdates.price_idr = updates.priceIdr;
    if (updates.img !== undefined) rowUpdates.img = updates.img;
    if (updates.description !== undefined) rowUpdates.description = updates.description;
    if (updates.descriptionId !== undefined) rowUpdates.description_id = updates.descriptionId;
    if (updates.features !== undefined) rowUpdates.features = updates.features;
    if (updates.featuresId !== undefined) rowUpdates.features_id = updates.featuresId;
    if (updates.compatible !== undefined) rowUpdates.compatible = updates.compatible;
    if (updates.rating !== undefined) rowUpdates.rating = updates.rating;
    if (updates.reviews !== undefined) rowUpdates.reviews = updates.reviews;
    if (updates.isNew !== undefined) rowUpdates.is_new = updates.isNew;

    const { error } = await supabase.from("products").update(rowUpdates).eq("id", id);
    if (error) {
      console.error("Supabase update error:", error);
      return;
    }
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)));
  }, []);

  const deleteProduct = useCallback(async (id: number) => {
    if (!supabase) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
      return;
    }
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) {
      console.error("Supabase delete error:", error);
      return;
    }
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const getProduct = useCallback((id: number) => products.find((p) => p.id === id), [products]);

  const value = useMemo(
    () => ({
      products,
      loading,
      addProduct,
      updateProduct,
      deleteProduct,
      getProduct,
      refreshProducts: fetchProducts,
    }),
    [products, loading, addProduct, updateProduct, deleteProduct, getProduct, fetchProducts],
  );

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
}
