"use client";
import { motion } from "framer-motion";
import { useState } from "react";

const FlipCard = ({ data }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div className="relative w-full aspect-square perspective cursor-pointer hover:ring-2 hover:ring-my-blue transition duration-300 " onHoverStart={() => setFlipped(true)} onHoverEnd={() => setFlipped(false)}>
      <motion.div animate={{ rotateY: flipped ? 180 : 0 }} transition={{ duration: 0.8 }} className="relative w-full h-full" style={{ transformStyle: "preserve-3d" }}>
        {/* Front */}
        <div className="absolute w-full h-full backface-hidden">
          <img src={data.image} alt={data.title} className="w-full h-full object-cover shadow-xl" />
        </div>

        {/* Back */}
        <div className="absolute w-full h-full backface-hidden rotate-y-180  bg-my-bluelight shadow-xl p-4 flex flex-col justify-center items-center text-center">
          <h2 className="text-xl font-semibold mb-2">{data.title}</h2>
          <p className="text-sm text-gray-600">{data.artist}</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default FlipCard;
