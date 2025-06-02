"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gallerivaerk } from "@/lib/galleri";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

const KunstGalleri = () => {
  const [artworks, setArtworks] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    const getArtworks = async () => {
      const items = await gallerivaerk();
      setArtworks(items);
    };

    getArtworks();
  }, []);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 300, behavior: "smooth" });
  };

  /* Typing animation effekt */

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
    <section className="py-4 px-2 ">
      <motion.h2 ref={headingRef} variants={container} initial="hidden" animate={isInView ? "visible" : "hidden"} className="text-xl sm:text-3xl md:text-4xl font-bold mb-12 font-playfair text-my-blue mt-40 max-[450px]:mt-20 flex flex-wrap p-2 break-keep leading-relaxed">
        {"Andre Kunstværker:".split(" ").map((word, i) => (
          <motion.span key={i} variants={wordVariants} className="inline-block mr-2 whitespace-nowrap">
            {word}
          </motion.span>
        ))}
      </motion.h2>

      <div className="relative bg-my-blue pt-10 px-6 m-auto">
        {/* scroll icons */}
        <button onClick={scrollLeft} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow z-10" aria-label="Scroll left">
          <HiChevronLeft className="w-6 h-6 text-my-blue cursor-pointer" />
        </button>

        <button onClick={scrollRight} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow z-10" aria-label="Scroll right">
          <HiChevronRight className="w-6 h-6 text-my-blue cursor-pointer" />
        </button>

        {/* horizontal scrollable galleri */}

        <div ref={scrollRef} className=" pt-10 px-6 w-full flex overflow-x-auto gap-4 pb-4 scroll-smooth mb-30 scrollbar-hide ">
          {artworks.map((art, index) => (
            <Link key={art.id || index} href={`/kunstvaerker/${art.object_number}`} className=" bg-my-white min-w-[80%] sm:min-w-[300px] md:min-w-[250px] lg:min-w-[200px] flex-shrink-0 overflow-hidden shadow block mb-18 mx-3 border-[8px] border-[#807B7A]">
              <div className="relative w-full h-80 sm:h-60 sm:max-w-90">
                <Image
                  src={art.image_thumbnail || "/dummy.webp"}
                  alt={art.titles?.[0]?.title || "Artwork"}
                  // width={300}
                  // height={600}
                  fill
                  style={{ objectFit: "cover" }}
                  className="transition-transform duration-300 hover:scale-105"
                />
              </div>

              <div className="p-4 pt-4 text-sm text-my-blue font-sans italic truncate mb-4">{art.titles?.[0]?.title || "Uden titel"}</div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KunstGalleri;
