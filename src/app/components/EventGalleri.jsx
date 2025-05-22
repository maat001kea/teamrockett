"use client";
import { useEffect, useState } from "react";
import { fetchArtworks } from "@/lib/art";
import FlipCard from "./FlipCard";
import Link from "next/link";

const EventGalleri = ({ objectNumbers = [] }) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (!Array.isArray(objectNumbers) || objectNumbers.length === 0) return;

    fetchArtworks(objectNumbers).then(setImages).catch(console.error);
  }, [objectNumbers.join(",")]);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-30 mb-20 p-4">
        {images.map((img, index) => (
          <Link key={index} href={`/kunstvaerker/${img.objectNumber}`}>
            <FlipCard data={img} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default EventGalleri;
