import { createContext, useContext, useState, ReactNode } from "react";
import type { SanPham } from "@/services/products";

export interface CartItem {
  product: SanPham;
  quantity: number;
  size: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: SanPham, size?: string) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem("sneaksurf_cart");
    return saved ? JSON.parse(saved) : [];
  });

  const save = (newItems: CartItem[]) => {
    setItems(newItems);
    localStorage.setItem("sneaksurf_cart", JSON.stringify(newItems));
  };

  const addItem = (product: SanPham, size: string = "US 9") => {
    const existing = items.find((i) => i.product.maSanPham === product.maSanPham && i.size === size);
    if (existing) {
      save(items.map((i) => i.product.maSanPham === product.maSanPham && i.size === size ? { ...i, quantity: i.quantity + 1 } : i));
    } else {
      save([...items, { product, quantity: 1, size }]);
    }
  };

  const removeItem = (productId: string) => save(items.filter((i) => i.product.maSanPham !== productId));

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) return removeItem(productId);
    save(items.map((i) => (i.product.maSanPham === productId ? { ...i, quantity } : i)));
  };

  const clearCart = () => save([]);

  const totalItems = items.reduce((s, i) => s + i.quantity, 0);
  const totalPrice = items.reduce((s, i) => s + i.product.gia * i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
