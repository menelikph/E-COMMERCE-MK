"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";
import { HeroUIProvider } from "@heroui/react";
import ToastProvider from "@/components/feedback/ToasProvider";
import { CartProvider } from "@/app/context/CartContext";
import { I18nProvider } from "../context/I18nContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <HeroUIProvider>
      <I18nProvider>
        <SessionProvider>
          <CartProvider>
            <ToastProvider/>
            {children}
          </CartProvider>
        </SessionProvider>
      </I18nProvider>
    </HeroUIProvider>
  );
}
