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
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-20 mb-20 p-7">
      {images.map((img, index) => (
        <Link key={index} href={`/kunstvaerker/${img.objectNumber}`}>
          <div>
            <FlipCard data={img} />
          </div>
        </Link>
      ))}
    </div>
  );
};

export default EventGalleri;
