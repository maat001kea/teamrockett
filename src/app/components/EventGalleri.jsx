"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import dummy from "../assets/dummy.webp"; // Fallback image
import Image from "next/image";

const EventGalleri = ({ objectNumbers = [] }) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (!Array.isArray(objectNumbers) || objectNumbers.length === 0) return;

    const fetchArtworks = async () => {
      try {
        const imagePromises = objectNumbers.map(async (id) => {
          const response = await fetch(`https://api.smk.dk/api/v1/art/?object_number=${id}`);
          const data = await response.json();

          const item = data.items?.[0]; // Get the first artwork from the response
          if (!item) return null;

          return {
            image: item.has_image ? item.image_thumbnail : dummy.src,
            objectNumber: item.object_number,
          };
        });

        const results = await Promise.all(imagePromises);
        const filteredResults = results.filter(Boolean); // Remove any nulls
        setImages(filteredResults);
      } catch (error) {
        console.error("Failed to fetch artworks:", error);
      }
    };

    fetchArtworks();
  }, [objectNumbers.join(",")]);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-30 mb-20 p-7">
      {images.map((img, index) => (
        <Link key={index} href={`/kunstvaerker/${img.objectNumber}`}>
          <div className="relative w-full aspect-square hover:bg-orange-500 hover:opacity-80 transition duration-300 cursor-pointer">
            <Image src={img.image} alt={`Artwork ${index + 1}`} width={400} height={400} className="object-cover w-full h-full" />
          </div>
        </Link>
      ))}
    </div>
  );
};

export default EventGalleri;

// "use client";
// import React, { useEffect, useState } from "react";
// import Link from "next/link";
// import Kunstone from "../assets/kunstone.png"; // Use any local fallback image
// import Image from "next/image";

// const EventGalleri = ({ objectNumbers = [] }) => {
//   console.log("artworknr", objectNumbers);
//   const [images, setImages] = useState([]);

//   useEffect(() => {
//     if (!Array.isArray(objectNumbers) || objectNumbers.length === 0) return;

//     const fetchArtworks = async () => {
//       try {
//         const imagePromises = objectNumbers.map(async (id) => {
//           const response = await fetch(`https://api.smk.dk/api/v1/art/?object_number=${id}`);
//           console.log("artworkids", response);
//           const data = await response.json();
//           console.log("data", data);

//           return {
//             image: data.has_image ? data.image_thumbnail : Kunstone.src,
//             objectNumber: data.object_number,
//           };
//         });

//         const results = await Promise.all(imagePromises);
//         setImages(results);
//         console.log("showresult", results);
//       } catch (error) {
//         // console.error("Failed to fetch artworks:", error);
//       }
//     };

//     fetchArtworks();
//   }, [objectNumbers.join(",")]); // Stable dependency (safer than JSON.stringify)

//   return (
//     <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-30 mb-20 p-7">
//       {images.map((img, index) => (
//         <Link key={index} href={`/kunstvaerker/${img.objectNumber}`}>
//           <div className="relative w-full aspect-square hover:bg-orange-500 hover:opacity-80 transition duration-300 cursor-pointer">
//             <img src={img.image} alt={`Artwork ${index + 1}`} className="object-cover w-full h-full" />
//           </div>
//         </Link>
//       ))}
//     </div>
//   );
// };

// export default EventGalleri;
