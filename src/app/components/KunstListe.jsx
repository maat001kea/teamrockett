"use client";

import { useEffect, useState } from "react";
import SortSelector from "@/app/components/SortSelector";
import dummy from "../assets/dummy.webp";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";

export default function KunstListe({ onAddArtwork, onRemoveArtwork, selectedArtworks }) {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState("artist");
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("*");
  const [filter, setFilter] = useState("");
  const [rows, setRows] = useState(52);

  // Fetch data when searchQuery changes
  useEffect(() => {
    fetch(`https://api.smk.dk/api/v1/art/search/?keys=${searchQuery}&filters=[has_image:true]${filter}&offset=0&rows=${rows}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log("Data modtaget:", data);
        setEvents(data.items || []); // Gemmer kunstværker i state
        setError(null); // Nulstiller fejl
      })
      .catch((err) => {
        console.error("Fejl under hentning:", err);
        setError("Kunne ikke hente værker fra SMK.");
      });
  }, [searchQuery, rows, filter]);

  // Opdaterer søgefeltets indhold når brugeren skriver
  const handleSearchChange = (e) => {
    console.log("Skriver i søgefeltet:", e.target.value);
    setSearchInput(e.target.value);
  };
  // Når brugeren sender søgeformularen
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("Søgeformular sendt med:", searchInput);
    setSearchQuery(searchInput.trim() || "*"); // Sætter query - fallback til "*"
  };

  // Sortering af kunstværker alt efter valgt sorteringskriterie
  const sortedEvents = [...events].sort((a, b) => {
    if (sortBy === "artist") {
      // Sammenligner kunstnernavne / titler /produktionsår - hvis ingen navn, title eller år - tom streng
      return (a.artist_names?.[0] || "").localeCompare(b.artist_names?.[0] || "");
    } else if (sortBy === "title") {
      return (a.titles?.[0]?.title || "").localeCompare(b.titles?.[0]?.title || "");
    } else if (sortBy === "year") {
      return (a.production_date?.[0].period || "").localeCompare(b.production_date?.[0].period || "");
    }
    return 0; // fallback hvis ingen af ovenstående
  });

  return (
    <div className="mb-15">
      <h2 className="text-2xl font-bold mb-8 mt-20 font-playfair text-my-blue">SMK Kunstværker ({sortedEvents.length})</h2>
      {/* sort drop down */}

      {/* form opret event */}
      <div className="flex flex-row [&>div]:w-full max-[1000px]:flex-col max-[1000px]-flex-end gap-8">
        {/* Search */}
        <div className="max-w-2xl w-full">
          <form className="flex mb-4" onSubmit={handleSearchSubmit}>
            <input type="text" value={searchInput} onChange={handleSearchChange} className="flex-grow border border-gray-500 bg-white p-2 focus:outline-none focus:ring-2 focus:ring-my-blue transition-all duration-200 rounded-l" placeholder="Søg..." />
            <button type="submit" className="bg-my-blue text-white px-4 py-2 rounded-r hover:bg-my-orangedark transition">
              Søg
            </button>
          </form>
        </div>

        {/* Sort + Søger efter */}
        <div className="flex flex-col max-[1000px]:items-start items-end gap-2 w-full mb-10">
          <SortSelector
            sortBy={sortBy}
            onChange={(val) => {
              console.log(" Sortering ændret til:", val);
              setSortBy(val);
            }}
          />
        </div>
      </div>

      {/* sort */}
      {error && <p className="text-red-600 mb-4">{error}</p>}
      {sortedEvents.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {sortedEvents.map((item) => {
            const isSelected = selectedArtworks.includes(item.object_number);
            const title = item.titles?.[0]?.title || "Ukendt titel";

            return (
              <div key={item.id} className=" p-4  bg-white shadow hover:shadow-md transition">
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
                  <h2 className="font-playfair text-lg font-semibold text-my-blue mb-2 truncate max-w-xs">{title}</h2>
                  <h2 className="font-playfair text-lg font-semibold text-my-blue mb-2 truncate max-w-xs">{item.production_date?.[0].period}</h2>

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
                         hover:bg-my-orangelight hover:text-my-white hover:border-my-white transition-colors"
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

      <button onClick={() => setRows(rows + 8)} className="mt-10 bg-white border-2 border-my-blue text-my-blue px-4 py-2 flex items-center gap-2 hover:text-my-orange hover:border-my-orangelight disabled:opacity-50 cursor-pointer transition font-s">
        se mere <FaArrowRight />
      </button>
    </div>
  );
}
