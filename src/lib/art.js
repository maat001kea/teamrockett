// '// // src/lib/fetchArtworks.js

import dummy from "../app/assets/dummy.webp";

export const fetchArtworks = async (objectNumbers) => {
  const imagePromises = objectNumbers.map(async (id) => {
    try {
      const response = await fetch(`https://api.smk.dk/api/v1/art/?object_number=${id}`);
      const data = await response.json();

      console.log(`Artworks IDS ${id}:`, data);

      const item = data.items?.[0];
      if (!item) {
        console.warn(`no item for id: ${id}`);
        return null;
      }

      const image = item.has_image ? item.image_thumbnail : dummy.src;
      const objectNumber = item.object_number;

      const fullTitle = item.titles?.[0]?.title ?? "Unkendt";
      const title = fullTitle.split(":")[0];

      const artist = item.artist?.[0] ?? "Unkendt artist";

      console.log(`artwork [${objectNumber}]:`, { title, artist, image });

      return {
        image,
        objectNumber,
        title,
        artist,
      };
    } catch (error) {
      console.error(`Error detching single artwork for ID ${id}:`, error);
      return null;
    }
  });

  const results = await Promise.all(imagePromises);
  return results.filter(Boolean);
};
