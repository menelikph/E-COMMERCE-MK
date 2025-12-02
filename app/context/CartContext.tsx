'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// --- Type Definitions ---

export interface CartItem {
  _id: string;
  name: string;
  price: number;
  imageUrl: string;
  qty: number; // Quantity of this product in the cart.
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, "qty">) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  increaseQty: (id: string) => void;
  decreaseQty: (id: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// --- Provider Component ---

/**
 * CartProvider manages the state and logic for the shopping cart.
 * It ensures cart data is persisted using localStorage.
 */
export function CartProvider({ children }: { children: ReactNode }) {
  // Initialize state by reading from localStorage on the client side for persistence.
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("cart");
      return saved ? JSON.parse(saved) : [];
    }
    // Default to an empty array for Server-Side Rendering (SSR).
    return [];
  });

  // Effect hook to update localStorage whenever the cart state changes.
  useEffect(() => {
    if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  // Adds a new item or increments the quantity of an existing item.
  const addToCart = (item: Omit<CartItem, "qty">) => {
    setCart((prev) => {
      const exists = prev.find((p) => p._id === item._id);
      if (exists) {
        // If item exists, increment its quantity by 1.
        return prev.map((p) =>
          p._id === item._id ? { ...p, qty: p.qty + 1 } : p
        );
      }
      // If new, add it with a starting quantity of 1.
      return [...prev, { ...item, qty: 1 }];
    });
  };

  // Decreases an item's quantity, filtering it out if quantity drops to zero.
  const decreaseQty = (id: string) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item._id === id ? { ...item, qty: item.qty - 1 } : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  // Increases an item's quantity by one.
  const increaseQty = (id: string) => {
    setCart((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  // Removes a product entirely from the cart list.
  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item._id !== id));
  };

  // Resets the cart state to an empty array.
  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        increaseQty,
        decreaseQty,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// --- Custom Hook ---

/**
 * Custom hook to easily access the cart state and modification functions.
 * @throws An error if used outside of the CartProvider.
 */
export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};