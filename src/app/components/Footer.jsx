import React from "react";

const Footer = () => {
  return (
    <div className="w-full">
      <footer className="fixed bottom-0 left-0 w-full text-center text-m text-gray-700 py-4 z-50 bg-white">&copy; {new Date().getFullYear()} BuzzBasket. All rights reserved.</footer>
    </div>
  );
};

export default Footer;
