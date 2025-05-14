"use client";

import { useEffect, useState } from "react";
import SortSelector from "@/app/components/SortSelector";

export default function KunstListe({ onAddArtwork, onRemoveArtwork, selectedArtworks }) {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState("artist");

  useEffect(() => {
    fetch("https://api.smk.dk/api/v1/art/search/?keys=*&offset=0&rows=51")
      .then((res) => res.json())
      .then((data) => setEvents(data.items || []))
      .catch((err) => {
        console.error("Fejl ved hentning:", err);
        setError("Kunne ikke hente værker fra SMK.");
      });
  }, []);

  const sortedEvents = [...events].sort((a, b) => {
    if (sortBy === "artist") {
      return (a.artist_names?.[0] || "").localeCompare(b.artist_names?.[0] || "");
    } else if (sortBy === "title") {
      return (a.titles?.[0]?.title || "").localeCompare(b.titles?.[0]?.title || "");
    } else if (sortBy === "year") {
      return (a.production_years?.[0] || 0) - (b.production_years?.[0] || 0);
    }
    return 0;
  });

  return (
    <div className="max-w-screen-xl mx-auto px-4">
      <h2 className="text-2xl font-bold mb-4">SMK Kunstværkerr ({sortedEvents.length})</h2>

      <SortSelector sortBy={sortBy} onChange={setSortBy} />

      {error && <p className="text-red-600 mb-4">{error}</p>}

      {Array.isArray(sortedEvents) && sortedEvents.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedEvents.map((item) => {
            const isSelected = selectedArtworks.includes(item.object_number);
            return (
              <div key={item.id} className="border p-4 rounded bg-white shadow hover:shadow-md transition">
                <p className="font-semibold text-lg">{item.titles?.[0]?.title || "Ingen titel"}</p>
                <p className="text-sm text-gray-600">{item.artist_names?.[0] || "Ukendt kunstner"}</p>
                {item.image_thumbnail && <img src={item.image_thumbnail} alt={item.titles?.[0]?.title || "Værk"} className="mt-2 w-full h-auto rounded" />}
                <div className="mt-2 flex gap-2">
                  {!isSelected ? (
                    <button onClick={() => onAddArtwork(item.object_number)} className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition">
                      Tilføj
                    </button>
                  ) : (
                    <button onClick={() => onRemoveArtwork(item.object_number)} className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition">
                      Fjern
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-gray-600">Ingen værker fundet.</p>
      )}
    </div>
  );
}
