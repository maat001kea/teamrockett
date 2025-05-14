// "use client";
// import React, { useState, useEffect } from "react";
// import Image from "next/image";

// const KunstThumbnail = ({ images = [], main }) => {
//   const [selectedImage, setSelectedImage] = useState(main);

//   useEffect(() => {
//     if (!main && images.length > 0) {
//       setSelectedImage(images[0]);
//     }
//   }, [main, images]);

//   // Altid vis 3 billeder
//   // Hvis der ikke er billeder, vis hovedbilledet 3 gange
//   // Hvis der kun er ét billede, vis det 3 gange
//   // Ellers vis de første tre billeder
//   const displayImages = images.length === 0 ? [main, main, main] : images.length === 1 ? [images[0], images[0], images[0]] : images.slice(0, 3);

//   return (
//     <div className="bg-myorangedark">
//       {/* hoved img */}
//       <div className="relative aspect-square mb-4 bg-my-orangedark">
//         <Image src={selectedImage} alt="Main image" fill className="object-cover" priority />
//       </div>

//       {/* Thumbnails */}
//       <div className="flex gap-4 pb-4  bg-my-orangedark">
//         {displayImages.map((img, index) => (
//           <div key={index} className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-36 lg:h-36 cursor-pointer bg-my-orangedark" onClick={() => setSelectedImage(img)}>
//             <Image src={img} alt={`Thumbnail ${index}`} fill className=" object-cover hover:opacity-80 " />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default KunstThumbnail;
"use client";
import React, { useState, useEffect } from "react";
import kunsttwo from "../assets/kunsttwo.png"; // fallback image (imported statically)

const KunstThumbnail = ({ images }) => {
  const fallbackImage = kunsttwo.src; // Ensure .src for static imports
  const [mainLoading, setMainLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(images || fallbackImage);
  const [validatedThumbnails, setValidatedThumbnails] = useState([]);

  useEffect(() => {
    const updateImageState = async () => {
      if (images.length > 0) {
        // Check if the first image URL is valid
        const isValidImage = await checkImageValidity(images);
        if (isValidImage) {
          setSelectedImage(images);
        } else {
          setSelectedImage(fallbackImage);
        }
      } else {
        setSelectedImage(fallbackImage);
      }
      setMainLoading(false); // Stop loading after validation
    };

    updateImageState();
  }, [images]);

  // Function to check if an image URL is valid
  const checkImageValidity = (url) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = url;
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
    });
  };

  // Always show the same image three times in thumbnails
  const displayImages = images.length > 0 ? [images, images, images] : [fallbackImage, fallbackImage, fallbackImage];

  return (
    <div className="bg-myorangedark">
      {/* Main Image */}
      <div className="relative aspect-square mb-4 bg-my-orangedark flex items-center justify-center">
        {mainLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200 animate-pulse z-10">
            <span className="text-gray-600 text-sm">Loading...</span>
          </div>
        )}
        <img src={selectedImage} alt="Main image" className="w-full h-full object-cover" />
      </div>

      {/* Thumbnails */}
      <div className="flex gap-4 pb-4 bg-myorangedark">
        {displayImages.map((img, index) => (
          <div
            key={index}
            className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-36 lg:h-36 cursor-pointer bg-my-orangedark"
            onClick={() => setSelectedImage(img || fallbackImage)} // Ensure valid image
          >
            <img
              src={img}
              alt={`Thumbnail ${index}`}
              className="w-full h-full object-cover hover:opacity-80"
              onError={(e) => (e.target.src = fallbackImage)} // Use fallback for thumbnails on error
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default KunstThumbnail;
