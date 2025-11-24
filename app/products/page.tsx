/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard";
import Link from "next/link";

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-purple-400 text-xl">
        Loading products...
      </div>
    );
  }

  return (
  <div className="max-w-7xl mx-auto px-6">

    {/* Header con botón */}
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-3xl font-bold">Products</h1>

      <Link
        href="/products/new"
        className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg shadow transition"
      >
        Add Product
      </Link>
    </div>

    {products.length === 0 ? (
      <p className="text-gray-400 text-center">No products found.</p>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            name={product.name}
            price={product.price}
            imageUrl={product.imageUrl}
          />
        ))}
      </div>
    )}
  </div>
  );
}