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
});

// --- Default products (fallback if no Supabase or empty table) ---
export const defaultProducts: Product[] = [
  {
    id: 1,
    name: "Custom Velo Standard",
    nameId: "Custom Velo Standar",
    diameter: "28 mm",
    height: "40 mm",
    finish: "Black Anodize",
    finishId: "Anodize Hitam",
    priceIdr: 80000,
    img: "/images/about-zx25r2.jpg",
    description: "Standard velocity stack for daily use with durable black anodize finish.",
    descriptionId: "Velocity stack standar untuk penggunaan harian dengan finishing anodize hitam yang tahan lama.",
    features: [
      "28mm diameter for standard throttle body",
      "40mm height for mid-to-high RPM response",
      "Premium black anodize finish",
      "High quality aluminum material",
      "Easy installation",
    ],
    featuresId: [
      "Diameter 28mm untuk throttle body standar",
      "Tinggi 40mm untuk respons RPM menengah-atas",
      "Finishing anodize hitam premium",
      "Material aluminium berkualitas tinggi",
      "Mudah instalasi",
    ],
    compatible: ["Yamaha NMAX 155", "Honda PCX 150", "Kawasaki Ninja 150", "Suzuki Satria F150"],
    rating: 4.8,
    reviews: 24,
    isNew: false,
  },
  {
    id: 2,
    name: "Custom Velo Street",
    nameId: "Custom Velo Street",
    diameter: "30 mm",
    height: "55 mm",
    finish: "Blue Anodize",
    finishId: "Anodize Biru",
    priceIdr: 90000,
    img: "/images/hero-banner.jpg",
    description: "Street velocity stack with 55mm height for balanced character and attractive blue anodize finish.",
    descriptionId: "Velocity stack street dengan tinggi 55mm untuk karakter seimbang dan finishing anodize biru yang menarik.",
    features: [
      "30mm diameter for aftermarket throttle body",
      "55mm height for balanced character",
      "Premium blue anodize finish",
      "High quality aluminum material",
      "Easy installation",
    ],
    featuresId: [
      "Diameter 30mm untuk throttle body aftermarket",
      "Tinggi 55mm untuk karakter seimbang",
      "Finishing anodize biru premium",
      "Material aluminium berkualitas tinggi",
      "Mudah instalasi",
    ],
    compatible: ["Yamaha Aerox 155", "Honda Vario 150", "Kawasaki Ninja 250", "Suzuki GSX-R150"],
    rating: 4.9,
    reviews: 18,
    isNew: true,
  },
  {
    id: 3,
    name: "Custom Velo Touring",
    nameId: "Custom Velo Touring",
    diameter: "32 mm",
    height: "75 mm",
    finish: "Black Gloss",
    finishId: "Gloss Hitam",
    priceIdr: 110000,
    img: "/images/about-zx25r2.jpg",
    description: "Touring velocity stack with 75mm height for strong low-mid torque and black gloss finish.",
    descriptionId: "Velocity stack touring dengan tinggi 75mm untuk torsi bawah-menengah yang kuat dan finishing gloss hitam.",
    features: [
      "32mm diameter for aftermarket throttle body",
      "75mm height for low-mid torque",
      "Premium black gloss finish",
      "High quality aluminum material",
      "Easy installation",
    ],
    featuresId: [
      "Diameter 32mm untuk throttle body aftermarket",
      "Tinggi 75mm untuk torsi bawah-menengah",
      "Finishing gloss hitam premium",
      "Material aluminium berkualitas tinggi",
      "Mudah instalasi",
    ],
    compatible: ["Yamaha XMAX 250", "Honda Forza 250", "Kawasaki ZX-25R", "Suzuki V-Strom 250"],
    rating: 4.7,
    reviews: 15,
    isNew: false,
  },
  {
    id: 4,
    name: "Custom Velo Pro",
    nameId: "Custom Velo Pro",
    diameter: "34 mm",
    height: "95 mm",
    finish: "Blue Satin",
    finishId: "Satin Biru",
    priceIdr: 135000,
    img: "/images/hero-banner.jpg",
    description: "Pro velocity stack with 95mm height for maximum torque and elegant blue satin finish.",
    descriptionId: "Velocity stack pro dengan tinggi 95mm untuk torsi maksimal dan finishing satin biru yang elegan.",
    features: [
      "34mm diameter for aftermarket throttle body",
      "95mm height for maximum torque",
      "Premium blue satin finish",
      "High quality aluminum material",
      "Easy installation",
    ],
    featuresId: [
      "Diameter 34mm untuk throttle body aftermarket",
      "Tinggi 95mm untuk torsi maksimal",
      "Finishing satin biru premium",
      "Material aluminium berkualitas tinggi",
      "Mudah instalasi",
    ],
    compatible: ["Yamaha TMAX", "Honda CBR250RR", "Kawasaki ZX-6R", "Suzuki GSX-R1000"],
    rating: 4.9,
    reviews: 12,
    isNew: false,
  },
  {
    id: 5,
    name: "Velocity Stack ZX25R / POWER STACK ZX25R",
    nameId: "Velocity Stack ZX25R / POWER STACK ZX25R",
    diameter: "Custom ZX25R",
    height: "Custom Set",
    finish: "Blue Anodize",
    finishId: "Anodize Biru",
    priceIdr: 450000,
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
