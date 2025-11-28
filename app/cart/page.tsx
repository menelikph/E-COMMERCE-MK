"use client";

import { useCart } from "../context/CartContext";

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

      {cart.length === 0 ? (
        <p className="text-gray-400">Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between border-b border-gray-700 pb-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-20 h-20 object-contain"
                  />
                  <div>
                    <h2 className="font-semibold">{item.name}</h2>
                    <p>${item.price}</p>
                    <p className="text-sm text-gray-400">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => removeFromCart(item._id)}
                  className="text-red-400 hover:text-red-500"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-between">
            <h2 className="text-xl font-bold">Total: ${total.toFixed(2)}</h2>
            <button
              onClick={clearCart}
              className="bg-red-600 px-4 py-2 rounded text-white"
            >
              Clear cart
            </button>
          </div>
        </>
      )}
    </div>
  );
}
