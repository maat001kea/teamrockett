"use client";

import { motion } from "framer-motion";
import React from "react";

const AnimatedButton = ({ children, onClick, className = "" }) => {
  return (
    <motion.button whileHover={{ scale: 1.05, backgroundColor: "#FFA04E" }} whileTap={{ scale: 0.95 }} transition={{ type: "spring", stiffness: 300 }} onClick={onClick} className={`bg-[#D97C2B] text-white px-6 py-2 font-noto font-regular shadow-md cursor-pointer ${className}`}>
      {children}
    </motion.button>
  );
};

export default AnimatedButton;
