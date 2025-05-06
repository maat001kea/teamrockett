"use client";

import { useState } from "react";
import { useCartStore } from "@/app/store/cartStore"; // Zustand state management
import Link from "next/link"; // Til navigation
import { IoTrashOutline } from "react-icons/io5"; // Skraldespand-ikon

// Hovedkomponent til visning og håndtering af kurv
const CardBox = () => {
  // Local state til at styre loading spinner for "+" knap og betaling
  const [loadingId, setLoadingId] = useState(null);
  const [paying, setPaying] = useState(false);

  // Zustand state: kurv og tilhørende funktioner
  const cart = useCartStore((state) => state.cart);
  const addToCart = useCartStore((state) => state.addToCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const updateQty = useCartStore((state) => state.updateQty);

  // Udregner totalprisen baseret på rabatteret pris * antal
  const totalPrice = cart
    .reduce((sum, item) => {
      const itemTotal = (item.price || 0) * (item.quantity || 0);
      return sum + itemTotal;
    }, 0)
    .toFixed(2); // Viser to decimaler

  // Funktion til at tilføje 1 stk af varen med rabat
  const handleAdd = (item) => {
    setLoadingId(item.id); // Starter spinner

    // Beregn rabatbeløb og den reelle pris
    const discountAmount = (item.price * item.discountPercentage) / 100;
    const discountedPrice = item.price - discountAmount;

    // Simulerer forsinkelse for at vise spinner-effekt
    setTimeout(() => {
      addToCart({
        id: item.id,
        title: item.title,
        price: parseFloat(discountedPrice.toFixed(2)), // Rabatpris gemmes som tal
        quantity: 1,
        discountPercentage: item.discountPercentage, // Opbevares til senere brug
      });
      setLoadingId(null); // Stop spinner
    }, 400);
  };

  // Funktion til at simulere betaling (går videre til betalingsside)
  const handlePay = () => {
    setPaying(true);
    setTimeout(() => {
      window.location.href = "/payment"; // Navigerer videre
    }, 700);
  };

  return (
    <div className="sticky top-38 mt-30 flex justify-center px-4">
      <div className="border-2 border-gray-300 rounded-2xl p-10 bg-white shadow-2xl max-w-6xl w-full">
        {/* Overskrift */}
        <h1 className="text-4xl font-semibold text-gray-600 mb-8 text-center">Betaling</h1>

        {/* Hvis kurven er tom vis besked */}
        {cart.length === 0 ? (
          <p className="text-gray-500 text-center">Kurven er tom.</p>
        ) : (
          <>
            {/* Liste over produkter i kurven */}
            <ul className="text-gray-800 divide-y divide-gray-300">
              {cart.map((item) => (
                <li key={item.id} className="py-4 flex justify-between items-center">
                  <div className="flex flex-col">
                    {/* Produktnavn */}
                    <span className="font-medium">{item.title}</span>

                    {/* Knapper: + / - / skraldespand */}
                    <div className="flex items-center mt-2 border-2 border-yellow-400 rounded-full px-4 py-1 gap-4 w-36 justify-center">
                      {/* - knap eller skraldespand hvis quantity = 1 */}
                      {item.quantity > 1 ? (
                        <button onClick={() => updateQty(item.id, item.quantity - 1)} className="text-xl text-gray-700 font-bold">
                          -
                        </button>
                      ) : (
                        <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700">
                          <IoTrashOutline size={20} />
                        </button>
                      )}

                      {/* Antal vises */}
                      <span className="text-lg font-semibold">{item.quantity}</span>

                      {/* + knap med spinner ved loading */}
                      <button onClick={() => handleAdd(item)} className="text-xl text-gray-700 font-bold" disabled={loadingId === item.id}>
                        {loadingId === item.id ? <div className="w-4 h-4 border-2 border-gray-700 border-t-transparent rounded-full animate-spin" /> : "+"}
                      </button>
                    </div>
                  </div>

                  {/* Pris for dette produkt (pris * antal) */}
                  <div className="font-semibold whitespace-nowrap">{(item.price * item.quantity).toFixed(2)} kr</div>
                </li>
              ))}
            </ul>

            {/* Samlet totalpris */}
            <div className="mt-8 font-bold text-right text-2xl">Total: {totalPrice} kr</div>

            {/* "Betal nu" knap med spinner under betaling */}
            <div className="mt-10 flex flex-col sm:flex-row justify-center sm:justify-end items-center gap-6">
              <button onClick={handlePay} disabled={paying} className="bg-[#F27F3D] text-white font-bold py-3 px-8 rounded-lg hover:bg-orange-600 transition duration-300 ease-in-out flex items-center gap-2">
                {paying ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : "Betal nu"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CardBox;
