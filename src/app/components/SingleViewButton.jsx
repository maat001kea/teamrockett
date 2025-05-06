"use client";

import { useState, useEffect } from "react";
import { useCartStore } from "@/app/store/cartStore";

// Komponent der håndterer knapper og logik for ét enkelt produkt
const SingleButton = ({ product }) => {
  const [loading, setLoading] = useState(false); // Styrer spinner-animation under "Læg i kurv"
  const [quantity, setQuantity] = useState(0); // Lokalt antal af varen i kurven

  // Funktioner fra Zustand (global state management)
  const addToCart = useCartStore((state) => state.addToCart);
  const updateQty = useCartStore((state) => state.updateQty);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const cart = useCartStore((state) => state.cart);

  // Hvis der ikke er noget produkt, vis ikke knapper
  if (!product) return null;

  // ✅ Udregner rabatten og beregner ny pris
  const discountAmount = (product.price * product.discount) / 100;
  const discountedPrice = product.price - discountAmount;

  // Bruger useEffect til at opdatere det viste antal, når kurven ændres
  useEffect(() => {
    const cartItem = cart.find((item) => item.id === product.id);
    setQuantity(cartItem ? cartItem.quantity : 0);
  }, [cart, product]);

  // ➕ Hvis produkt allerede er i kurv, øg mængde – ellers tilføj nyt produkt
  const handleAdd = () => {
    if (quantity > 0) {
      updateQty(product.id, quantity + 1);
    } else {
      addToCart({
        id: product.id,
        title: product.title,
        price: discountedPrice, // 👈 Rabatpris bruges her
        quantity: 1,
      });
    }
  };

  // ➖ Mindsk antal, eller fjern helt hvis quantity bliver 0
  const handleRemove = () => {
    if (quantity > 1) {
      updateQty(product.id, quantity - 1);
    } else if (quantity === 1) {
      removeFromCart(product.id);
    }
  };

  // ▶️ Tilføjer 1 stk og viser spinner imens
  const handleAddToCart = () => {
    setLoading(true); // Vis spinner
    setTimeout(() => {
      addToCart({
        id: product.id,
        title: product.title,
        price: discountedPrice, // 👈 Rabatpris bruges her
        quantity: 1,
      });
      setLoading(false); // Skjul spinner igen
    }, 500); // Simulerer ventetid (halvt sekund)
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {/* +/- sektion */}
      <div className="flex items-center gap-4">
        {/* Minus-knap – deaktiveret hvis quantity = 0 */}
        <button onClick={handleRemove} disabled={quantity === 0} className={`text-xl px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 ${quantity === 0 ? "opacity-50 cursor-not-allowed" : ""}`}>
          –
        </button>

        {/* Antal vises her */}
        <span className="text-lg font-semibold">{quantity}</span>

        {/* Plus-knap – deaktiveret hvis over 99 stk */}
        <button onClick={handleAdd} disabled={quantity >= 99} className={`text-xl px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 ${quantity >= 99 ? "opacity-50 cursor-not-allowed" : ""}`}>
          +
        </button>
      </div>

      {/* Læg i kurv-knap med loading spinner */}
      <button onClick={handleAddToCart} disabled={loading} className="flex items-center justify-center gap-2 bg-[#F27F3D] rounded-lg text-white font-bold py-2 px-6 hover:bg-orange-600 transition duration-300 ease-in-out mt-4 min-w-[180px]">
        {/* Spinner vises mens loading = true */}
        {loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent border-solid rounded-full animate-spin" /> : "Læg i kurv"}
      </button>
    </div>
  );
};

export default SingleButton;
