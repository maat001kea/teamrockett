"use client";

import { create } from "zustand"; // Zustand bruges til global state management
import { persist } from "zustand/middleware"; // persist gemmer state i localStorage, så det ikke nulstilles ved refresh eller navigation

// Opretter en global store ved hjælp af Zustand og persist middleware
export const useCartStore = create(
  persist(
    (set) => ({
      // 🛒 Initial state: en tom kurv
      cart: [],

      // ➕ Funktion til at tilføje produkter til kurven
      addToCart: (product) =>
        set((state) => {
          // Tjek om produktet allerede findes i kurven (match på id)
          const existingItem = state.cart.find((item) => item.id === product.id);

          if (existingItem) {
            // Hvis det findes: opdater quantity ved at lægge 1 (eller det angivne antal) til
            return {
              cart: state.cart.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + (product.quantity || 1) } : item)),
            };
          }

          // Hvis det ikke findes: tilføj produktet med quantity = 1 (eller medleveret værdi)
          return {
            cart: [...state.cart, { ...product, quantity: product.quantity || 1 }],
          };
        }),

      // 🔁 Funktion til at opdatere antallet (quantity) af en specifik vare
      updateQty: (id, newQty) =>
        set((state) => ({
          cart: state.cart.map((item) => (item.id === id ? { ...item, quantity: newQty } : item)),
        })),

      // 🗑️ Funktion til at fjerne et produkt helt fra kurven
      removeFromCart: (id) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== id),
        })),

      // ❌ Funktion til at rydde hele kurven
      clearCart: () => set({ cart: [] }),
    }),

    // persist-konfiguration
    {
      name: "cart-storage",
    }
  )
);
