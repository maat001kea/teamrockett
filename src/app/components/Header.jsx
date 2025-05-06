"use client"; // Sikrer at komponenten kun kører i browseren (nødvendigt for Clerk hooks)

import React from "react";
import Link from "next/link";
import { IoCartOutline } from "react-icons/io5";
import { useCartStore } from "@/app/store/cartStore";

// Clerk-imports
import {
  SignedIn, // Viser indhold KUN hvis brugeren er logget ind
  SignedOut, // Viser indhold KUN hvis brugeren IKKE er logget ind
  UserButton, // Viser brugerens avatar med dropdown (profil, log ud)
  useUser, // Giver adgang til brugerdata i komponenter
} from "@clerk/nextjs";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-white" style={{ gridColumn: "full-bleed" }}>
      <div className="grid grid-cols-subgrid" style={{ gridColumn: "content" }}>
        <div className="flex justify-between items-center py-4 px-2">
          {/* Venstre side: logo og produkt-link */}
          <div className="flex flex-1 sm:flex-row items-start sm:items-center gap-2 sm:gap-8">
            <Link href="/" className="flex items-center text-orange-500 text-5xl sm:text-6xl font-bold whitespace-nowrap">
              <span>B</span>
              <span className="text-2xl sm:text-3xl font-semibold ml-0">uzz</span>
              <span>B</span>
              <span className="text-2xl sm:text-3xl font-semibold ml-0">asket</span>
            </Link>

            <Link href="/products" className="relative text-lg font-semibold text-gray-700 hover:text-orange-500 transition-colors px-10 pt-2 hidden [@media(min-width:450px)]:block">
              All Products
              <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-orange-500 scale-x-0 hover:scale-x-100 origin-left transition-transform duration-300"></span>
            </Link>
          </div>

          {/* Højre side: Clerk-auth og kurv */}
          <div className="flex items-center gap-6 ml-auto">
            {/* 🔐 Vises KUN hvis man IKKE er logget ind */}
            <SignedOut>
              <Link href="/login" className="text-lg font-semibold text-gray-700 hover:text-orange-500 transition-colors">
                Log ind
              </Link>
              <Link href="/signup" className="text-lg font-semibold text-gray-700 hover:text-orange-500 transition-colors">
                Signup
              </Link>
            </SignedOut>

            {/* ✅ Vises KUN hvis man ER logget ind */}
            <SignedIn>
              {/* Viser brugerens navn med link til dashboard */}
              <UserInfoLink />

              {/* Clerk’s indbyggede bruger-menu (billede, log ud, indstillinger) */}
              <UserButton afterSignOutUrl="/" />
            </SignedIn>

            {/* Indkøbskurv-ikon */}
            <Link href="/payment" className="text-orange-500 text-4xl sm:text-5xl relative">
              <IoCartOutline className="hover:scale-110 transition-transform duration-200 cursor-pointer" />
              <CartBadge />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

const CartBadge = () => {
  const cart = useCartStore((state) => state.cart);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (totalItems === 0) return null;

  return <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">{totalItems}</span>;
};

// 🔍 Viser brugerens navn som link til dashboard (hvis logget ind)
const UserInfoLink = () => {
  const { user, isLoaded } = useUser(); // Clerk hook: giver adgang til bruger

  // Vis intet hvis brugeren ikke er klar
  if (!isLoaded || !user) return null;

  return (
    <Link href="/dashboard" className="text-lg font-semibold text-gray-700 hover:text-orange-500 transition-colors">
      {user.firstName || "Min profil"}
    </Link>
  );
};

export default Header;
