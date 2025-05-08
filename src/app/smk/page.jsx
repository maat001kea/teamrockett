"use client"; // Hvis du bruger Next.js App Router

import { useEffect, useState } from "react";

export default function SMKPage() {
  const [artworks, setArtworks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Hent de første 10 værker
    fetch("https://api.smk.dk/api/v1/artworks?size=10")
      .then((res) => {
        if (!res.ok) throw new Error("Kunne ikke hente kunstværker");
        return res.json();
      })
      .then((data) => {
        console.log("🔍 Modtaget fra SMK API:", data); // Du ser det i DevTools → Console
        setArtworks(data.items || []);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
      });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">SMK Kunstværker</h1>

      {error && <p className="text-red-600">{error}</p>}

      {artworks.length === 0 ? (
        <p>Ingen værker fundet.</p>
      ) : (
        <ul className="space-y-4">
          {artworks.map((art) => (
            <li key={art.id} className="border rounded p-4 shadow bg-white">
              <p>
                <strong>ID:</strong> {art.id}
              </p>
              <p>
                <strong>Titel:</strong> {art.titles?.[0] || "Uden titel"}
              </p>
              <p>
                <strong>Kunstner:</strong> {art.artist || "Ukendt"}
              </p>
              <p>
                <strong>Beskrivelse:</strong> {art.descriptions?.[0] || "Ingen beskrivelse"}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
