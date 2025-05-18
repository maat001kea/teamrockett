"use client";
import { motion } from "framer-motion";
import { useState } from "react";

const FlipCard = ({ data }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div className="relative w-full aspect-square perspective cursor-pointer hover:ring-2 hover:ring-my-blue transition duration-300 " onHoverStart={() => setFlipped(true)} onHoverEnd={() => setFlipped(false)}>
      <motion.div animate={{ rotateY: flipped ? 180 : 0 }} transition={{ duration: 3.5, delay: 0.2, ease: "easeInOut" }} className="relative w-full h-full" style={{ transformStyle: "preserve-3d" }}>
        {/* Front */}
        <div className="absolute w-full h-full backface-hidden">
          <img src={data.image} alt={data.title} className="w-full h-full object-cover shadow-xl" />
        </div>

        {/* Back */}
        <div className="absolute w-full h-full backface-hidden rotate-y-180  bg-my-blue shadow-xl p-4 flex flex-col justify-center items-center text-center">
          {/* <h2 className="text-xl font-semibold mb-2 font-playfair text-my-white">{data.title}</h2>
          <p className="text-sm text-gray-400 font-noto font-semibold">{data.artist}</p> */}
          <h2 className="hidden min-[420px]:block text-base sm:text-lg md:text-xl lg:text-2xl font-semibold mb-2 font-playfair text-my-white">{data.title}</h2>
          <p className="text-sm sm:text-base text-gray-400 font-noto italic">{data.artist}</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default FlipCard;
