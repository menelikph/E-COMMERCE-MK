/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
// Assuming ProductCard is imported correctly relative to this component
import ProductCard from "../../components/products/ProductCard";
import Link from "next/link";
import { useI18n } from "../context/I18nContext";
// Import our custom i18n hook

/**
 * ProductsPage component displays a list of products with filtering, search, and pagination capabilities.
 */
export default function ProductsPage() {
  // Access the translation function 't'.
  const { t } = useI18n();

  const [products, setProducts] = useState<any[]>([]);
  const [pagination, setPagination] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // State for filtering and pagination controls
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  /**
   * Fetches product data from the API endpoint, applying current filters and pagination.
   */
  async function fetchProducts() {
    setLoading(true);

    try {
      // Build query parameters from current state values (page, search, prices).
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "8", // Fixed limit per page
      });

      if (search) params.append("search", search);
      if (minPrice) params.append("minPrice", minPrice);
      if (maxPrice) params.append("maxPrice", maxPrice);

      const res = await fetch(`/api/products?${params.toString()}`);
      const data = await res.json();

      setProducts(data.products);
      setPagination(data.pagination);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  }

  // Effect to refetch products whenever the page number changes.
  useEffect(() => {
    fetchProducts();
  }, [page]);

  /**
   * Applies filters by resetting the page number to 1 and fetching data.
   */
  const applyFilters = () => {
    setPage(1);
    // Note: fetchProducts will run again due to the useEffect dependency on [page]
    // if setPage(1) actually changes the page state.
    // If page is already 1, we manually call fetchProducts:
    if (page === 1) {
      fetchProducts();
    }
  };

  // Display a loading message while data is being fetched.
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-purple-400 text-xl">
        {t("products.loading")}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      {/* Header section with title and Add Product button */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">{t("products.title")}</h1>

        <Link
          href="/products/new"
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg shadow transition"
        >
          {t("products.add_new")}
        </Link>
      </div>

      {/* Filtering and Search Controls */}
      <div className="flex flex-wrap gap-4 mb-6 bg-gray-900 p-4 rounded-lg border border-gray-700">
        <input
          type="text"
          // Translated placeholder for search input
          placeholder={t("products.search_placeholder")}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white"
        />

        <input
          type="number"
          // Translated placeholder for minimum price
          placeholder={t("products.min_price_placeholder")}
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white w-28"
        />

        <input
          type="number"
          // Translated placeholder for maximum price
          placeholder={t("products.max_price_placeholder")}
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white w-28"
        />

        <button
          onClick={applyFilters}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg"
        >
          {t("products.apply_filters")}
        </button>
      </div>

      {/* Product List Display */}
      {products.length === 0 ? (
        // Translated message when no products are found
        <p className="text-gray-400 text-center">{t("products.not_found")}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            // ProductCard component displays individual product details
            <ProductCard
              key={product._id}
              _id={product._id}
              name={product.name}
              price={product.price}
              imageUrl={product.imageUrl}
            />
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      {pagination && (
        <div className="flex justify-center items-center mt-10 gap-4">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-4 py-2 bg-gray-800 text-white rounded disabled:opacity-40"
          >
            {t("pagination.prev")}
          </button>

          <span className="text-white">
            {t("pagination.page_info")} {pagination.page} /{" "}
            {pagination.totalPages}
          </span>

          <button
            disabled={page === pagination.totalPages}
            onClick={() => setPage(page + 1)}
            className="px-4 py-2 bg-gray-800 text-white rounded disabled:opacity-40"
          >
            {t("pagination.next")}
          </button>
        </div>
      )}
    </div>
  );
}
