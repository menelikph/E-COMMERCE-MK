'use client';

// Import the custom hook from the Cart Context to manage cart state.
import { useCart } from "@/app/context/CartContext";
import { useI18n } from "../context/I18nContext";
// Import our custom i18n hook from the Context we defined.
 

/**
 * CartPage component displays the contents of the shopping cart.
 * Users can view items, remove specific items, or clear the entire cart.
 */
export default function CartPage() {
  // Use our custom i18n hook to get the translation function 't'.
  const { t } = useI18n(); 
  
  // Destructure cart state and modifier functions from the Cart Context.
  const { cart, removeFromCart, clearCart } = useCart();

  return (
    <div className="p-6 mt-20">
      {/* Title of the cart page, translated using the 't' function. Key: 'cart.title' */}
      <h1 className="text-3xl font-bold mb-6">{t("cart.title")}</h1>

      {/* Conditional rendering based on whether the cart is empty */}
      {cart.length === 0 ? (
        // Display a message if the cart array is empty. Key: 'cart.empty_message'
        <p className="text-gray-400">{t("cart.empty_message")}</p>
      ) : (
        <div className="flex flex-col gap-4">
          {/* Map over the cart items to display each product */}
          {cart.map((item) => (
            <div
              key={item._id}
              className="p-4 border border-gray-700 rounded-lg flex justify-between items-center"
            >
              <div>
                {/* Display product name and price */}
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-purple-400">${item.price}</p>
              </div>

              {/* Button to remove the specific item from the cart */}
              <button
                onClick={() => removeFromCart(item._id)}
                className="px-3 py-1 bg-red-600 rounded hover:bg-red-700 transition"
              >
                {/* Translation for the removal button. Key: 'cart.remove' */}
                {t("cart.remove")}
              </button>
            </div>
          ))}

          {/* Button to clear all items from the cart */}
          <button
            onClick={clearCart}
            className="px-4 py-2 bg-purple-600 rounded text-white mt-4 hover:bg-purple-700 transition"
          >
            {/* Translation for the clear cart button. Key: 'cart.clear' */}
            {t("cart.clear")}
          </button>
        </div>
      )}
    </div>
  );
}