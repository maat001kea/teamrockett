//Kan jeg tag og lave et liste fra databasen smk
// af f.eks 50 thing uden den crasher
"use client";

import { useEffect, useState } from "react";
import SortSelector from "@/app/components/SortSelector"; // 🟢 Husk stien til din komponent

export default function EventListe() {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState("artist"); // 🟢 valgt sortering

  useEffect(() => {
    fetch("https://api.smk.dk/api/v1/art/search/?keys=*&offset=0&rows=51")
      .then((res) => res.json())
      .then((data) => {
        setEvents(data.items || []);
      })
      .catch((err) => {
        console.error("Fejl ved hentning:", err);
        setError("Kunne ikke hente værker fra SMK.");
      });
  }, []);

  // 🟢 Sorter events dynamisk
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
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">SMK Kunstværker ({sortedEvents.length})</h2>

      {/* 🟢 Sorterings-dropdown */}
      <SortSelector sortBy={sortBy} onChange={setSortBy} />

      {error && <p className="text-red-600 mb-4">{error}</p>}

      {Array.isArray(sortedEvents) && sortedEvents.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedEvents.map((item) => (
            <div key={item.id} className="border p-4 rounded bg-white shadow hover:shadow-md transition">
              <p className="font-semibold text-lg">{item.titles?.[0]?.title || "Ingen titel"}</p>
              <p className="text-sm text-gray-600">{item.artist_names?.[0] || "Ukendt kunstner"}</p>
              {item.image_thumbnail && <img src={item.image_thumbnail} alt={item.titles?.[0]?.title || "Værk"} className="mt-2 w-full h-auto rounded" />}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">Ingen værker fundet.</p>
      )}
    </div>
  );
}

// vhsi jeg har en list kan jeg sorte den på et eller anden måde

//VIGTIGSTE LAVE DE 2 ØVERSTE PÅ BEGGE SIDER
