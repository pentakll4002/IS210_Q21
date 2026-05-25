import { createContext, useContext, useState, ReactNode } from "react";
import type { SanPham } from "@/services/products";

export interface CartItem {
  product: SanPham;
  quantity: number;
  size: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: SanPham, size?: string, quantity?: number) => void;
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
    if (!saved) return [];
    try {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) {
        return parsed
          .filter(
            (item: any) =>
              item &&
              item.product &&
              typeof item.product === "object" &&
              (item.product.maSanPham || item.product.id) &&
              (item.product.gia !== undefined || item.product.price !== undefined)
          )
          .map((item: any) => {
            const prod = item.product;
            return {
              product: {
                maSanPham: prod.maSanPham || prod.id || "",
                tenSP: prod.tenSP || prod.name || "SNEAKER",
                gia: Number(prod.gia !== undefined ? prod.gia : prod.price) || 0,
                giaGoc: prod.giaGoc !== undefined ? prod.giaGoc : (prod.originalPrice || null),
                hinhAnh: prod.hinhAnh || prod.image || "",
                maDanhMuc: prod.maDanhMuc || null,
                maThuongHieu: prod.maThuongHieu || null,
                soLuong: prod.soLuong || 1,
                trangThai: prod.trangThai || "CONHANG",
                moTa: prod.moTa || "",
                ngayTao: prod.ngayTao || "",
                ngayCapNhat: prod.ngayCapNhat || "",
                thuongHieu: prod.thuongHieu || (prod.brand ? { maThuongHieu: "", tenTH: prod.brand, quocGia: "" } : null),
              } as SanPham,
              quantity: Number(item.quantity) || 1,
              size: item.size || "US 9",
            };
          });
      }
    } catch (e) {
      console.error("Failed to parse cart items", e);
    }
    return [];
  });

  const addItem = (product: SanPham, size: string = "US 9", quantity: number = 1) => {
    setItems((prev) => {
      const existing = prev.find(
        (i) => i.product.maSanPham === product.maSanPham && i.size === size,
      );
      let updated: CartItem[];
      if (existing) {
        updated = prev.map((i) =>
          i.product.maSanPham === product.maSanPham && i.size === size
            ? { ...i, quantity: i.quantity + quantity }
            : i,
        );
      } else {
        updated = [...prev, { product, quantity, size }];
      }
      localStorage.setItem("sneaksurf_cart", JSON.stringify(updated));
      return updated;
    });
  };

  const removeItem = (productId: string) => {
    setItems((prev) => {
      const updated = prev.filter((i) => i.product.maSanPham !== productId);
      localStorage.setItem("sneaksurf_cart", JSON.stringify(updated));
      return updated;
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }
    setItems((prev) => {
      const updated = prev.map((i) =>
        i.product.maSanPham === productId ? { ...i, quantity } : i,
      );
      localStorage.setItem("sneaksurf_cart", JSON.stringify(updated));
      return updated;
    });
  };

  const clearCart = () => {
    setItems([]);
    localStorage.removeItem("sneaksurf_cart");
  };

  const totalItems = items.reduce((s, i) => s + (Number(i.quantity) || 0), 0);
  const totalPrice = items.reduce((s, i) => {
    const price = Number(i.product?.gia) || 0;
    const qty = Number(i.quantity) || 0;
    return s + price * qty;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
