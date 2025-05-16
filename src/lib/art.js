// // src/lib/fetchArtworks.js

// import dummy from "../app/assets/dummy.webp";
// // import Link from "next/link";

// export const fetchArtworks = async (objectNumbers) => {
//   const imagePromises = objectNumbers.map(async (id) => {
//     const response = await fetch(`https://api.smk.dk/api/v1/art/?object_number=${id}`);
//     const data = await response.json();
//     const item = data.items?.[0];
//     if (!item) return null;

//     return {
//       image: item.has_image ? item.image_thumbnail : dummy.src,
//       objectNumber: item.object_number,
//     };
//   });

//   const results = await Promise.all(imagePromises);
//   return results.filter(Boolean);
// };
// // export default fetchArtworks;

import dummy from "../app/assets/dummy.webp"; // Adjust path as needed

export const fetchArtworks = async (objectNumbers) => {
  const imagePromises = objectNumbers.map(async (id) => {
    try {
      const response = await fetch(`https://api.smk.dk/api/v1/art/?object_number=${id}`);
      const data = await response.json();

      // Log the entire response for this object number
      console.log(`API response for ID ${id}:`, data);

      const item = data.items?.[0];
      if (!item) {
        console.warn(`No item found for ID: ${id}`);
        return null;
      }

      const image = item.has_image ? item.image_thumbnail : dummy.src;
      const objectNumber = item.object_number;
      const title = item.titles?.[0]?.title ?? "Untitled";
      // const artist = item.artist?.[0]?.name ?? "Unknown artist";
      const artist = item.artist?.[0] ?? "Unknown artist";

      // Log the individual values you're returning
      console.log(`Processed artwork [${objectNumber}]:`, { title, artist, image });

      return {
        image,
        objectNumber,
        title,
        artist,
      };
    } catch (error) {
      console.error(`Error fetching artwork for ID ${id}:`, error);
      return null;
    }
  });

  const results = await Promise.all(imagePromises);
  return results.filter(Boolean); // Filter out any nulls
};
