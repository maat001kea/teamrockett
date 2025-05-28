"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import lightgray from "../assets/lightgray.svg";
import Image from "next/image";
import { FaHandPointer } from "react-icons/fa";
import { useRouter } from "next/navigation";

const FlipCard = ({ data }) => {
  const [flipped, setFlipped] = useState(false);
  const router = useRouter();

  return (
    <motion.div
      className="relative w-full aspect-[3/4] perspective cursor-pointer transition duration-300"
      onHoverStart={() => setFlipped(true)}
      onHoverEnd={() => setFlipped(false)}
      onClick={() => setFlipped((prev) => !prev)} //flip on tap/ click on  mobil skærm
    >
      <motion.div animate={{ rotateY: flipped ? 180 : 0 }} transition={{ duration: 1.5, delay: 0.2, ease: "easeInOut" }} className="relative w-full h-full" style={{ transformStyle: "preserve-3d" }}>
        {/* Front side */}
        <div className="absolute w-full h-full backface-hidden">
          <Image src={data.image} alt={data.title} fill className="object-cover" />
          <Image src={lightgray} alt="Museum Frame" className="absolute inset-0 w-full h-full pointer-events-none z-10 scale-[1.05]" />

          <span className="absolute inset-0 flex justify-center items-center sm:hidden animate-pulse gap-2 bg-black/20 px-4 py-2 z-20 pointer-events-none">
            <FaHandPointer className="text-2xl text-white" />
            <span className="text-lg text-white">Tap</span>
          </span>
        </div>

        {/* Back side */}
        <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-my-blue shadow-xl p-4 flex flex-col justify-center items-center text-center">
          <div className="relative z-10">
            <h2 className="hidden min-[420px]:block text-base sm:text-lg md:text-xl lg:text-2xl font-semibold mb-2 font-playfair text-my-white max-[640px]:text-2xl [@media(min-width:750px)_and_(max-width:980px)]:text-[18px]">{data.title}</h2>

            <p className="text-sm sm:text-base text-my-flipcardgray font-sans italic font-medium max-[419px]:text-xl max-[419px]:text-my-white max-[640px]:text-lg">{data.artist}</p>

            <button
              className="text-sm sm:text-base font-sans italic font-medium text-my-flipcardgray border-b border-my-flipcardgray hover:border-b-2 transition duration-200 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation(); // Prevent flip toggle
                router.push(`/kunstvaerker/${data.objectNumber}`);
              }}
            >
              læse mere om kunst
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default FlipCard;
