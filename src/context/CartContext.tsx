import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { Product } from "../lib/products";

/* ─── Types ─── */
export interface CartItem {
  product: Product;
  quantity: number;
  size: string;
}

interface CartContextValue {
  items: CartItem[];
  addToCart: (product: Product, size?: string) => void;
  removeFromCart: (productId: string, size: string) => void;
  updateQuantity: (productId: string, size: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
}

/* ─── Context ─── */
const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "sc_cart_v1";

function loadFromStorage(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/* ─── Provider ─── */
export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(loadFromStorage);
  const [isOpen, setIsOpen] = useState(false);

  // Persist to localStorage on change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addToCart = useCallback((product: Product, size = "M") => {
    setItems(prev => {
      const existing = prev.find(i => i.product.id === product.id && i.size === size);
      if (existing) {
        return prev.map(i =>
          i.product.id === product.id && i.size === size
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { product, quantity: 1, size }];
    });
    setIsOpen(true);
  }, []);

  const removeFromCart = useCallback((productId: string, size: string) => {
    setItems(prev => prev.filter(i => !(i.product.id === productId && i.size === size)));
  }, []);

  const updateQuantity = useCallback((productId: string, size: string, quantity: number) => {
    if (quantity <= 0) {
      setItems(prev => prev.filter(i => !(i.product.id === productId && i.size === size)));
    } else {
      setItems(prev =>
        prev.map(i =>
          i.product.id === productId && i.size === size
            ? { ...i, quantity }
            : i
        )
      );
    }
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

  return (
    <CartContext.Provider value={{
      items, addToCart, removeFromCart, updateQuantity, clearCart,
      totalItems, subtotal,
      isOpen, openCart: () => setIsOpen(true), closeCart: () => setIsOpen(false),
    }}>
      {children}
    </CartContext.Provider>
  );
}

/* ─── Hook ─── */
export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
