"use client";

import React from "react";
import Link from "next/link";
import logoImg from "@/app/assets/logo.png";
import Image from "next/image";
// import { IoCartOutline } from "react-icons/io5";
// import { useCartStore } from "@/app/store/cartStore";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-white" style={{ gridColumn: "full-bleed" }}>
      <div className="grid grid-cols-subgrid" style={{ gridColumn: "content" }}>
        <div className="flex justify-between items-center py-4 px-2 w-full">
          {/* Left: Logo */}
          <Link href="/" className="flex items-center whitespace-nowrap">
            <Image src={logoImg} alt="Logo" width={100} height={100} className="mr-2" />
          </Link>

          {/* Right: Event List + Konto/Auth */}
          <div className="flex items-center gap-10 ml-auto font-playfair">
            <Link href="/events" className="relative text-lg font-semibold text-[#2B346B] hover:text-gray-500 transition-colors px-4 pt-2 hidden [@media(min-width:450px)]:block">
              Event Liste
              <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-orange-500 scale-x-0 hover:scale-x-100 origin-left transition-transform duration-300"></span>
            </Link>

            <SignedOut>
              <Link href="/sign-in" className="text-lg font-semibold text-[#2B346B] hover:text-gray-500 transition-colors px-4 pt-2">
                Konto
              </Link>
            </SignedOut>

            <SignedIn>
              <Link href="/dashboard" className="text-lg font-semibold text-[#2B346B] hover:text-gray-500 transition-colors">
                Min side
              </Link>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            {/* 
            <Link href="/kvitering" className="text-orange-500 text-4xl sm:text-5xl relative">
              <IoCartOutline className="hover:scale-110 transition-transform duration-200 cursor-pointer" />
              <CartBadge />
            </Link> */}
          </div>
        </div>
      </div>
    </header>
  );
};

// Badge på kurv hvis der er varer
// const CartBadge = () => {
//   const cart = useCartStore((state) => state.cart);
//   const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

//   if (totalItems === 0) return null;

//   return <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">{totalItems}</span>;
// };

export default Header;
