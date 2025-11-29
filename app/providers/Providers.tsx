"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";
import { HeroUIProvider } from "@heroui/react";
import ToastProvider from "@/components/feedback/ToasProvider";
import { CartProvider } from "@/app/context/CartContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <HeroUIProvider>
        <CartProvider>
          <ToastProvider />
          {children}
        </CartProvider>
      </HeroUIProvider>
    </SessionProvider>
  );
}
