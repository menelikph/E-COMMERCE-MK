"use client";

import Navbar from "./components/Navbar";
import "./globals.css";
import { HeroUIProvider } from "@heroui/react";


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-950 text-gray-100">
        <HeroUIProvider>
          <Navbar />
          <main className="max-w-7xl mx-auto p-6 mt-20">{children}</main>
        </HeroUIProvider>
      </body>
    </html>
  );
}
