"use client";

import { useEffect, useState } from "react";
import SortSelector from "@/app/components/SortSelector";
import dummy from "../assets/dummy.webp";
import Image from "next/image";
import { motion } from "framer-motion";

export default function KunstListe({ onAddArtwork, onRemoveArtwork, selectedArtworks }) {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState("artist");
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("*");

  // Fetch data when searchQuery changes
  useEffect(() => {
    // console.log(" Udfører fetch med søgeord:", searchQuery);

    fetch(`https://api.smk.dk/api/v1/art/search/?keys=${searchQuery}&offset=0&rows=51`)
      .then((res) => {
        // console.log("Forespørgsel sendt, venter på svar...");
        return res.json();
      })
      .then((data) => {
        console.log(" Data modtaget:", data);
        setEvents(data.items || []);
        setError(null);
      })
      .catch((err) => {
        console.error(" Fejl under hentning:", err);
        setError("Kunne ikke hente værker fra SMK.");
      });
  }, [searchQuery]);

  // Search input change
  const handleSearchChange = (e) => {
    console.log(" Skriver i søgefeltet:", e.target.value);
    setSearchInput(e.target.value);
  };

  // Search form submit
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log(" Søgeformular sendt med:", searchInput);
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
    <div className="mb-15">
      <h2 className="text-2xl font-bold mb-8 mt-20 font-playfair text-my-blue">SMK Kunstværker ({sortedEvents.length})</h2>
      {/* sort drop down */}
      <SortSelector
        sortBy={sortBy}
        onChange={(val) => {
          console.log(" Sortering ændret til:", val);
          setSortBy(val);
        }}
      />
      {/* <form className="flex mb-4" onSubmit={handleSearchSubmit}>
        <input type="text" value={searchInput} onChange={handleSearchChange} className="border border-gray-500 bg-white p-2 w-full focus:outline-none focus:ring-2 focus:ring-my-blue transition-all duration-200" placeholder="Søg..." />
        <button type="submit" className="bg-my-blue text-white p-4 ">
          Søg
        </button>
      </form> */}
      {/* søg feltet */}
      <div className="w-full max-w-2xl ">
        <form className="flex mb-4" onSubmit={handleSearchSubmit}>
          <input type="text" value={searchInput} onChange={handleSearchChange} className="flex-grow border border-gray-500 bg-white p-2 focus:outline-none focus:ring-2 focus:ring-my-blue transition-all duration-200 rounded-l" placeholder="Søg..." />
          <button type="submit" className="bg-my-blue text-white px-4 py-2 rounded-r hover:bg-my-orangedark transition">
            Søg
          </button>
        </form>
      </div>
      {/* sort */}
      <p className="mb-15 text-sm text-gray-700">
        Søger efter: <strong>{searchQuery}</strong>
      </p>
      {/* sort */}
      {error && <p className="text-red-600 mb-4">{error}</p>}
      {sortedEvents.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {sortedEvents.map((item) => {
            const isSelected = selectedArtworks.includes(item.object_number);
            const title = item.titles?.[0]?.title || "Ukendt titel";

            return (
              <div key={item.id} className=" p-4  bg-white shadow hover:shadow-md transition">
                {/* <h2 className="font-semibold text-lg text-my-blue font-playfair">{title}</h2>

              
                <Image src={item.has_image ? item.image_thumbnail : dummy} alt={title} width={500} height={300} className="mt-2 w-full h-auto rounded object-cover" />

                <div className="mt-2 flex gap-2">
                  {!isSelected ? (
                    <button
                      onClick={() =>
                        onAddArtwork({
                          id: item.object_number,
                          image: item.image_thumbnail,
                          title: title,
                        })
                      }
                      className="px-3 py-1 bg-my-orangedark text-white text-sm hover:bg-[#FFA04E] transition"
                    >
                      Tilføj
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        console.log("Fjerner værk:", item.object_number);
                        onRemoveArtwork(item.object_number);
                      }}
                      className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition"
                    >
                      Fjern
                    </button>
                  )}
                </div> */}

                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-white/70 backdrop-blur-sm shadow-lg  overflow-hidden 
                   transition-transform duration-300 p-4"
                >
                  <h2 className="font-playfair text-lg font-semibold text-my-blue mb-2">{title}</h2>

                  <Image src={item.has_image ? item.image_thumbnail : dummy} alt={title} width={500} height={300} className=" w-full h-48 object-cover" />

                  <div className="mt-4">
                    {!isSelected ? (
                      <button
                        onClick={() =>
                          onAddArtwork({
                            id: item.object_number,
                            image: item.image_thumbnail,
                            title: title,
                          })
                        }
                        className="w-full py-2 px-4 bg-white text-my-blue text-sm font-medium border border-my-blue
                         hover:bg-[#FFA04E] transition-colors"
                      >
                        Tilføj
                      </button>
                    ) : (
                      <button
                        onClick={() => onRemoveArtwork(item.object_number)}
                        className="w-full py-2 px-4 bg-red-600 text-white text-sm font-medium 
                          hover:bg-red-700 transition-colors"
                      >
                        Fjern
                      </button>
                    )}
                  </div>
                </motion.div>
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
