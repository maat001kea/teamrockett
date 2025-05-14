"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

import kunstone from "../assets/kunstone.png";
import kunsttwo from "../assets/kunsttwo.png";
import kunstthree from "../assets/kunstthree.png";

import kunstfour from "../assets/kunstfour.png";
import kunstfive from "../assets/kunstfive.png";
import kunstsix from "../assets/kunstsix.png";
import kunstseven from "../assets/kunstseven.png";
import kunsteight from "../assets/kunsteight.png";
import kunstnine from "../assets/kunstnine.png";
import kunstten from "../assets/kunstten.png";

import { useState, useEffect } from "react";

const fallbackImages = [kunstone.src, kunsttwo.src, kunstthree.src, kunstfour.src, kunstfive.src, kunstsix.src, kunstseven.src, kunsteight.src, kunstnine.src, kunstten.src];

const EventGalleri = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch("https://api.smk.dk/api/v1/art/search/?keys=*&offset=0&rows=20");
        const data = await response.json();

        // Extract image_thumbnail URLs and use a random fallback image for missing thumbnails
        const thumbnails = data.items.map((item) => ({
          image: item.image_thumbnail || kunsttwo.src,
          // image: item.image_thumbnail || fallbackImages[Math.floor(Math.random() * fallbackImages.length)], // Random fallback image
          objectNumber: item.object_number, // Extract object_number for navigation
        }));
        setImages(thumbnails);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);
  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-30 mb-20 p-7">
        {images.map((img, index) => (
          <Link
            key={index}
            href={`/kunstvaerker/${img.objectNumber}`} // Dynamic route using object_number
          >
            <div className="relative w-full aspect-square hover:bg-orange-500 hover:opacity-80 transition duration-300 cursor-pointer">
              <img src={img.image} alt={`Event ${index + 1}`} className="object-cover w-full h-full" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default EventGalleri;
