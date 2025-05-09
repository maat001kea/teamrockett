"use client";

import React, { useState } from "react";
import { bookEvent, deleteEvent } from "@/lib/api"; // Importerer slettefunktion fra API
import Link from "next/link";

export default function EventCard({ event, showDelete = false, onDelete }) {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  if (!event) {
    return (
      <div className="p-4 bg-red-100 border border-red-300 rounded">
        <p className="text-red-700">Fejl: Event mangler.</p>
      </div>
    );
  }

  const handleBook = async () => {
    setLoading(true);
    try {
      await bookEvent(event.id, { quantity: 1 });
      setStatus("success");
    } catch (error) {
      console.error("Fejl ved booking:", error);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  // 🔴 Funktion til at håndtere sletning af event
  const handleDelete = async () => {
    // Viser browserens bekræftelsesdialog
    const confirmed = window.confirm("Er du sikker på, at du vil slette dette event?");
    if (!confirmed) return; // Hvis brugeren trykker "Annuller", stop funktionen

    try {
      // Kald API'et for at slette eventet baseret på dets ID
      await deleteEvent(event.id);

      // Hvis forælderen har givet en onDelete-funktion, kald den med ID'et
      if (onDelete) onDelete(event.id);
    } catch (error) {
      // Håndterer fejl, hvis sletningen fejler
      console.error("Fejl ved sletning:", error);
      alert("Kunne ikke slette eventet.");
    }
  };

  return (
    <div className="border p-4 rounded shadow-sm space-y-2 bg-white">
      <h2 className="text-xl font-bold">{event.title}</h2>
      <p>{event.description}</p>
      <p className="text-sm">Dato: {event.date}</p>
      <p className="text-sm">Lokation: {event.location && typeof event.location === "object" ? event.location.name : "Ukendt"}</p>

      <div className="flex space-x-2">
        {!showDelete && (
          <button onClick={handleBook} disabled={loading || status === "success"} className={`px-4 py-2 rounded ${status === "success" ? "bg-gray-400 text-white cursor-not-allowed" : "bg-green-600 text-white hover:bg-green-700"}`}>
            {loading ? "Booker…" : status === "success" ? "Booket ✔️" : "Book"}
          </button>
        )}

        {showDelete && (
          // 🔴 Slet-knap vises kun hvis showDelete = true
          <button onClick={handleDelete} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
            Slet
          </button>
        )}
      </div>
      <Link href={`/changeevent/${event.id}`}>changeevent</Link>
      {status === "error" && <p className="text-red-600 text-sm">Kunne ikke booke eventet.</p>}
    </div>
  );
}
