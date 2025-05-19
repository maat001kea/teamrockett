// "use client";
// import { useEffect, useState } from "react";
// import dummy from "@/app/assets/dummy.webp";

// const KunstGalleri = () => {
//   const [artworks, setArtworks] = useState([]);

//   useEffect(() => {
//     const fetchArtworks = async () => {
//       const randomOffset = Math.floor(Math.random() * 100); // random offset up to 100
//       const apiUrl = `https://api.smk.dk/api/v1/art/search?keys=%2A&filters=%5Bhas_image%3Atrue%5D&offset=${randomOffset}&rows=10`;

//       try {
//         const response = await fetch(apiUrl);
//         const data = await response.json();
//         setArtworks(data.items || []);
//       } catch (error) {
//         console.error("Error fetching artworks:", error);
//       }
//     };

//     fetchArtworks();
//   }, []);

//   return (
//     <section className="p-6">
//       <h2 className="text-2xl font-bold mb-4">🎨 Kunst Galleri</h2>
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//         {artworks.map((art, index) => (
//           <div key={art.id || index} className="overflow-hidden rounded-lg shadow">
//             <img src={art.image_thumbnail || dummy} alt={art.titles?.[0] || "Artwork"} className="object-cover w-full h-48 transition-transform duration-300 hover:scale-105" />
//             <div className="p-2 text-sm text-gray-700">{art.titles?.[0]}</div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default KunstGalleri;

// "use client";
// import { useEffect, useState } from "react";
// import { gallerivaerk } from "@/lib/galleri"; //

// const KunstGalleri = () => {
//   const [artworks, setArtworks] = useState([]);

//   useEffect(() => {
//     const getArtworks = async () => {
//       const items = await gallerivaerk();
//       setArtworks(items);
//     };

//     getArtworks();
//   }, []);

//   return (
//     <section className="p-6">
//       <h2 className="text-2xl font-bold mb-4">🎨 Kunst Galleri</h2>
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//         {artworks.map((art, index) => (
//           <div key={art.id || index} className="overflow-hidden rounded-lg shadow">
//             <img
//               src={art.image_thumbnail || "/dummy.webp"} // fallback if image is missing
//               alt={art.titles?.[0]?.title || "Artwork"}
//               className="object-cover w-full h-48 transition-transform duration-300 hover:scale-105"
//             />
//             <div className="p-2 text-sm text-gray-700">{art.titles?.[0]?.title || "Uden titel"}</div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default KunstGalleri;

"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { gallerivaerk } from "@/lib/galleri";

const KunstGalleri = () => {
  const [artworks, setArtworks] = useState([]);

  useEffect(() => {
    const getArtworks = async () => {
      const items = await gallerivaerk();
      setArtworks(items);
    };

    getArtworks();
  }, []);

  return (
    <section className="p-6">
      <h2 className="text-2xl font-bold mb-4 font-playfair text-my-blue mt-10"> Kunst Galleri</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {artworks.map((art, index) => (
          <Link
            key={art.id || index}
            href={`/kunstvaerker/${art.object_number}`} //link til kunst vaeker single view
            className="overflow-hidden shadow block"
          >
            <img src={art.image_thumbnail || "/dummy.webp"} alt={art.titles?.[0]?.title || "Artwork"} className="object-cover w-full h-48 transition-transform duration-300 hover:scale-105" />
            <div className="p-2 text-sm text-gray-700 font-playfair">{art.titles?.[0]?.title || "Uden titel"}</div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default KunstGalleri;
