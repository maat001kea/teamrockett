export function validateEventData(data) {
  const errors = [];

  if (!data.title || data.title.trim() === "") {
    errors.push("Titel er påkrævet.");
  }

  if (!data.date) {
    errors.push("Dato er påkrævet.");
  }

  if (!data.location || data.location.trim() === "") {
    errors.push("Lokation er påkrævet.");
  }

  if (!Array.isArray(data.artworks) || data.artworks.length === 0) {
    errors.push("Mindst ét kunstværk skal vælges.");
  }

  return errors;
}
