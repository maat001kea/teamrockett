"use client";

import React from "react";
import Link from "next/link";
import { IoCartOutline } from "react-icons/io5";
import { useCartStore } from "@/app/store/cartStore";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-white" style={{ gridColumn: "full-bleed" }}>
      <div className="grid grid-cols-subgrid" style={{ gridColumn: "content" }}>
        <div className="flex justify-between items-center py-4 px-2">
          {/* Logo og navigation */}
          <div className="flex flex-1 sm:flex-row items-start sm:items-center gap-2 sm:gap-8">
            <Link href="/" className="flex items-center text-orange-500 text-5xl sm:text-6xl font-bold whitespace-nowrap">
              <span>B</span>
              <span className="text-2xl sm:text-3xl font-semibold ml-0">uzz</span>
              <span>B</span>
              <span className="text-2xl sm:text-3xl font-semibold ml-0">asket</span>
            </Link>

            <Link href="/events" className="relative text-lg font-semibold text-gray-700 hover:text-orange-500 transition-colors px-10 pt-2 hidden [@media(min-width:450px)]:block">
              Event List
              <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-orange-500 scale-x-0 hover:scale-x-100 origin-left transition-transform duration-300"></span>
            </Link>
          </div>

          {/* Højre side: Auth + Kurv */}
          <div className="flex items-center gap-6 ml-auto">
            <SignedOut>
              <Link href="/sign-in" className="text-lg font-semibold text-gray-700 hover:text-orange-500 transition-colors">
                Konto
              </Link>
            </SignedOut>

            <SignedIn>
              <Link href="/dashboard" className="text-lg font-semibold text-gray-700 hover:text-orange-500 transition-colors">
                Min side
              </Link>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>

            <Link href="/kvitering" className="text-orange-500 text-4xl sm:text-5xl relative">
              <IoCartOutline className="hover:scale-110 transition-transform duration-200 cursor-pointer" />
              <CartBadge />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

// Badge på kurv hvis der er varer
const CartBadge = () => {
  const cart = useCartStore((state) => state.cart);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (totalItems === 0) return null;

  return <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">{totalItems}</span>;
};

export default Header;
