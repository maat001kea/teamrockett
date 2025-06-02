"use client";
import { useEffect, useState, useRef } from "react";
import { fetchArtworks } from "@/lib/art";
import FlipCard from "./FlipCard";
import { motion, useInView } from "framer-motion";

const EventGalleri = ({ objectNumbers = [] }) => {
  const [images, setImages] = useState([]);

  // Fetch data
  useEffect(() => {
    if (!Array.isArray(objectNumbers) || objectNumbers.length === 0) return;
    fetchArtworks(objectNumbers).then(setImages).catch(console.error);
  }, [objectNumbers.join(",")]);

  // Refs and inView
  const headingRef = useRef(null);
  const isInView = useInView(headingRef, {
    once: true,
    margin: "-100px 0px",
  });

  // Animation variants for staggered effekt
  const container = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div>
      <div className="max-w-6xl mx-auto">
        <motion.h2 ref={headingRef} variants={container} initial="hidden" animate={isInView ? "visible" : "hidden"} className="text-xl sm:text-3xl md:text-4xl font-bold mb-12 font-playfair text-my-blue mt-40 max-[450px]:mt-20 flex flex-wrap p-2 break-keep leading-relaxed">
          {"Oplev kunsterne fra eventet:".split(" ").map((word, i) => (
            <motion.span key={i} variants={wordVariants} className="inline-block mr-2 whitespace-nowrap">
              {word}
            </motion.span>
          ))}
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 mt-10 mb-20 p-4 md:p-6 sm:p-10 sm:gap-12">
          {images.map((img, index) => (
            <FlipCard data={img} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventGalleri;
