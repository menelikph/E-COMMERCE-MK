"use client";

import { useCart } from "@/app/context/CartContext";

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-gray-400">Your cart is empty.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {cart.map((item) => (
            <div
              key={item._id}
              className="p-4 border border-gray-700 rounded-lg flex justify-between"
            >
              <div>
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-purple-400">${item.price}</p>
              </div>

              <button
                onClick={() => removeFromCart(item._id)}
                className="px-3 py-1 bg-red-600 rounded"
              >
                Remove
              </button>
            </div>
          ))}

          <button
            onClick={clearCart}
            className="px-4 py-2 bg-purple-600 rounded text-white mt-4"
          >
            Clear Cart
          </button>
        </div>
      )}
    </div>
  );
}
