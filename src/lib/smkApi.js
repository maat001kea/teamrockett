const BASE_URL = "https://api.smk.dk/api/v1/artworks";

// Hent værker med valgfri søgeparametre
export async function searchArtworks({ query = "", artist = "", technique = "" } = {}) {
  const params = new URLSearchParams();
  if (query) params.append("q", query);
  if (artist) params.append("artist", artist);
  if (technique) params.append("technique", technique);

  const res = await fetch(`${BASE_URL}?${params.toString()}`);
  if (!res.ok) throw new Error("Kunne ikke hente kunstværker");
  return await res.json();
}

// Hent enkeltværk via ID
export async function getArtworkById(id) {
  const res = await fetch(`${BASE_URL}/${id}`);
  if (!res.ok) throw new Error("Kunne ikke hente værk");
  return await res.json();
}
