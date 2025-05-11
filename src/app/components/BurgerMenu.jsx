"use client";

import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import Link from "next/link";

const BurgerMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Function to toggle the menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      {/* Burger Icon (visible on mobile) */}
      <div className="lg:hidden cursor-pointer" onClick={toggleMenu}>
        {isMenuOpen ? <FaTimes size={30} /> : <FaBars size={30} />}
      </div>

      {/* Mobile Menu */}
      <div className={`${isMenuOpen ? "block" : "hidden"} absolute top-0 right-0 bg-my-blue w-full h-screen z-20 p-4`}>
        {/* Close Button on the Right Side */}
        <div className="flex justify-end">
          <FaTimes size={30} className="text-my-white cursor-pointer mt-4" onClick={toggleMenu} />
          {/* <FaBars size={30} className="text-my-blue" /> */}
        </div>

        {/* Menu Links */}
        <ul className="space-y-4 text-my-white text-lg mt-8 px-2.5 py-2.5">
          <li>
            <Link href="/events" className="hover:text-my-graylight font-playfair text-2xl" onClick={toggleMenu}>
              Event Liste
            </Link>
          </li>
          <li>
            <Link href="/sign-in" className="hover:text-my-graylight font-playfair text-2xl" onClick={toggleMenu}>
              Konto
            </Link>
          </li>
        </ul>
      </div>

      {/* Overlay for better UX */}
      {isMenuOpen && <div className="absolute inset-0 bg-my-blue opacity-50 z-10" onClick={toggleMenu}></div>}
    </>
  );
};

export default BurgerMenu;
