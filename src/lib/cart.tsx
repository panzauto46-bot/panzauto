import { createContext, ReactNode, useContext, useMemo, useState } from "react";

export interface CartItemInput {
  title: string;
  make: string;
  model: string;
  year: string;
  color: string;
  throttleBody: string;
  throttleBodySize: string;
  velocityStackHeight: string;
  price: number;
}

export interface CartItem extends CartItemInput {
  id: string;
}

interface CartContextType {
  itemCount: number;
  items: CartItem[];
  subtotal: number;
  isCartOpen: boolean;
  addToCart: (item: CartItemInput) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (item: CartItemInput) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    setItems((prev) => [...prev, { id, ...item }]);
  };

  const removeFromCart = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setItems([]);
  };

  const openCart = () => {
    setIsCartOpen(true);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  const toggleCart = () => {
    setIsCartOpen((prev) => !prev);
  };

  const itemCount = items.length;
  const subtotal = items.reduce((sum, item) => sum + item.price, 0);

  const value = useMemo(
    () => ({
      itemCount,
      items,
      subtotal,
      isCartOpen,
      addToCart,
      removeFromCart,
      clearCart,
      openCart,
      closeCart,
      toggleCart,
    }),
    [itemCount, items, subtotal, isCartOpen],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
