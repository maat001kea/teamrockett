// // Base-URL til Statens Museum for Kunsts API
// const BASE_URL = "https://api.smk.dk/api/v1/artworks";

// // Henter en liste af kunstværker fra SMK med valgfri søgeparametre:
// // - query: fritekstsøgning
// // - artist: filtrering på kunstnernavn
// // - technique: filtrering på teknik (f.eks. olie, akvarel, etc.)
// export async function searchArtworks({ query = "", artist = "", technique = "" } = {}) {
//   const params = new URLSearchParams(); // Opretter URL-parametre dynamisk
//   if (query) params.append("q", query); // Tilføjer søgeord
//   if (artist) params.append("artist", artist); // Tilføjer kunstnerfilter
//   if (technique) params.append("technique", technique); // Tilføjer teknikfilter

//   const res = await fetch(`${BASE_URL}?${params.toString()}`);
//   if (!res.ok) throw new Error("Kunne ikke hente kunstværker"); // Fejlhåndtering ved mislykket fetch
//   return await res.json(); // Returnerer data som JSON
// }

// // Henter detaljer om et enkelt kunstværk baseret på dets ID
// export async function getArtworkById(id) {
//   const res = await fetch(`${BASE_URL}/${id}`);
//   if (!res.ok) throw new Error("Kunne ikke hente værk"); // Simpel fejlhåndtering
//   return await res.json();
// }
