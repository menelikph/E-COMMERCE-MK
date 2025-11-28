"use client";

import ToastProvider from "@/components/feedback/ToasProvider";
import { HeroUIProvider } from "@heroui/react";
import { SessionProvider } from "next-auth/react";
import "./globals.css";
import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/Navbar";

// ⬅ IMPORTA EL PROVIDER
import { CartProvider } from "@/app/context/CartContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-950 text-gray-100">
        <SessionProvider>
          <HeroUIProvider>

            <CartProvider>
              <ToastProvider />

              {/* NAV */}
              <Navbar />

              {/* CONTENT */}
              <main className="max-w-7xl mx-auto p-6 mt-20">
                {children}
              </main>

              {/* FOOTER */}
              <Footer />
            </CartProvider>

          </HeroUIProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
