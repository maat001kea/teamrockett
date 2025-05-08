// Validerer event-data og returnerer en liste af fejlmeddelelser (tom hvis ingen fejl)
export function validateEventData(data) {
  const errors = [];

  // Tjekker om titel findes og ikke kun er mellemrum
  if (!data.title || data.title.trim() === "") {
    errors.push("Titel er påkrævet.");
  }

  // Tjekker om der er angivet en dato
  if (!data.date) {
    errors.push("Dato er påkrævet.");
  }

  // Tjekker om lokation findes og ikke kun er mellemrum
  if (!data.location || data.location.trim() === "") {
    errors.push("Lokation er påkrævet.");
  }

  // Sikrer at der er mindst ét valgt kunstværk
  if (!Array.isArray(data.artworks) || data.artworks.length === 0) {
    errors.push("Mindst ét kunstværk skal vælges.");
  }

  return errors; // Returnerer en array med fejl (kan bruges direkte i UI)
}
