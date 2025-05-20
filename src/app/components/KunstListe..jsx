"use client";

import { useEffect, useState } from "react";
import SortSelector from "@/app/components/SortSelector";
import logo from "@/app/assets/logo.png";

export default function KunstListe({ onAddArtwork, onRemoveArtwork, selectedArtworks }) {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState("artist");
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("*");

  // Fetch data when searchQuery changes
  useEffect(() => {
    console.log("🔍 Udfører fetch med søgeord:", searchQuery);

    fetch(`https://api.smk.dk/api/v1/art/search/?keys=${searchQuery}&offset=0&rows=51`)
      .then((res) => {
        console.log("✅ Forespørgsel sendt, venter på svar...");
        return res.json();
      })
      .then((data) => {
        console.log("📦 Data modtaget:", data);
        setEvents(data.items || []);
        setError(null);
      })
      .catch((err) => {
        console.error("❌ Fejl under hentning:", err);
        setError("Kunne ikke hente værker fra SMK.");
      });
  }, [searchQuery]);

  // Search input change
  const handleSearchChange = (e) => {
    console.log("✏️ Skriver i søgefeltet:", e.target.value);
    setSearchInput(e.target.value);
  };

  // Search form submit
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("🚀 Søgeformular sendt med:", searchInput);
    setSearchQuery(searchInput.trim() || "*");
  };

  // Sorting
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
      <h2 className="text-2xl font-bold mb-4">SMK Kunstværker ({sortedEvents.length})</h2>

      <SortSelector
        sortBy={sortBy}
        onChange={(val) => {
          console.log("🔃 Sortering ændret til:", val);
          setSortBy(val);
        }}
      />

      <form className="flex mb-4" onSubmit={handleSearchSubmit}>
        <input type="text" value={searchInput} onChange={handleSearchChange} className="border-2 border-black-700 bg-with-100 p-2 rounded-l w-full" placeholder="Søg..." />
        <button type="submit" className="bg-blue-700 text-white p-2 rounded-r">
          Søg
        </button>
      </form>

      <p className="mb-2 text-sm text-gray-700">
        Søger efter: <strong>{searchQuery}</strong>
      </p>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      {sortedEvents.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedEvents.map((item) => {
            const isSelected = selectedArtworks.includes(item.object_number);
            const title = item.titles?.[0]?.title || "Ukendt titel";

            return (
              <div key={item.id} className="border p-4 rounded bg-white shadow hover:shadow-md transition">
                <p className="font-semibold text-lg">{title}</p>
                <p className="text-sm text-gray-600">{item.artist_names?.[0] || "Ukendt kunstner"}</p>
                {item.has_image ? <img src={item.image_thumbnail} alt={title} className="mt-2 w-full h-auto rounded" /> : <img src={logo} alt={title} className="mt-2 w-full h-auto rounded" />}

                <div className="mt-2 flex gap-2">
                  {!isSelected ? (
                    <button
                      onClick={() => {
                        console.log("➕ Tilføjer værk:", item.object_number);
                        onAddArtwork({
                          id: item.object_number,
                          image: item.image_thumbnail,
                          title: title,
                        });
                      }}
                      className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition"
                    >
                      Tilføj
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        console.log("🗑️ Fjerner værk:", item.object_number);
                        onRemoveArtwork(item.object_number);
                      }}
                      className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition"
                    >
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
