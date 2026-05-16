import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";

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

const STORAGE_KEY = "panz-auto-products";

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
];

interface ProductContextType {
  products: Product[];
  addProduct: (product: Omit<Product, "id">) => void;
  updateProduct: (id: number, updates: Partial<Product>) => void;
  deleteProduct: (id: number) => void;
  getProduct: (id: number) => Product | undefined;
  resetProducts: () => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

const getStoredProducts = (): Product[] | null => {
  if (typeof window === "undefined") return null;

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed as Product[];
    }
  } catch {
    // Ignore corrupted data.
  }

  return null;
};

export function ProductProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(() => {
    return getStoredProducts() ?? defaultProducts;
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    }
  }, [products]);

  const addProduct = (product: Omit<Product, "id">) => {
    const maxId = products.reduce((max, p) => Math.max(max, p.id), 0);
    setProducts((prev) => [...prev, { ...product, id: maxId + 1 }]);
  };

  const updateProduct = (id: number, updates: Partial<Product>) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)));
  };

  const deleteProduct = (id: number) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const getProduct = (id: number) => products.find((p) => p.id === id);

  const resetProducts = () => {
    setProducts(defaultProducts);
  };

  const value = useMemo(
    () => ({
      products,
      addProduct,
      updateProduct,
      deleteProduct,
      getProduct,
      resetProducts,
    }),
    [products],
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
