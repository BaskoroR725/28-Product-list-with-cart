import { create } from "zustand";
import type { Product } from "../components/ProductCard";

export interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productName: string) => void;
  updateQuantity: (productName: string, delta: number) => void;
}

export const useCartStore = create<CartState>((set) => ({
  items: [],

  addItem: (product) =>
    set((state) => ({
      items: [...state.items, { ...product, quantity: 1 }],
    })),

  removeItem: (productName) =>
    set((state) => ({
      items: state.items.filter((item) => item.name !== productName),
    })),

  updateQuantity: (productName, delta) =>
    set((state) => ({
      items: state.items
        .map((item) =>
          item.name === productName
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item,
        )
        .filter((item) => item.quantity > 0), // Hapus item jika qty jadi 0 (false)
    })),
}));
