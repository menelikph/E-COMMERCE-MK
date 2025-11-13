"use client";
import Image from "next/image";
import React from "react";

interface ProductCardProps {
  title: string;
  price: number;
  image: string;
}

export default function ProductCard({ title, price, image }: ProductCardProps) {
  return (
    <article
      className="group border border-gray-800 hover:border-purple-400 transition-all duration-300 rounded-2xl p-5 flex flex-col items-center text-center bg-gray-950 hover:shadow-[0_0_15px_rgba(168,85,247,0.2)]"
    >
      <div className="w-40 h-40 flex items-center justify-center mb-4">
        <img
          src={image}
          alt={title}
          width={160}
          height={160}
          className="object-contain rounded-lg transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <h2 className="text-sm font-semibold text-gray-200 mb-2 line-clamp-2">
        {title}
      </h2>

      <span className="text-purple-400 font-semibold mb-4 text-base">
        ${price.toFixed(2)}
      </span>

      <button
        className="border border-purple-400 text-purple-400 hover:bg-purple-600 hover:text-white transition-all duration-300 rounded-full px-4 py-1 text-sm"
      >
        Add to cart
      </button>
    </article>
  );
}
