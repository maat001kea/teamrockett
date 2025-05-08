"use client";

import React, { useState } from "react";
import { bookEvent } from "@/lib/api";

export default function EventCard({ event, showDelete = false, onDelete }) {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleBook = async () => {
    setLoading(true);
    try {
      await bookEvent(event.id, { quantity: 1 });
      setStatus("success");
    } catch {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border p-4 rounded shadow-sm space-y-2">
      <h2 className="text-xl font-bold">{event.title}</h2>
      <p>{event.description}</p>
      <p className="text-sm">Dato: {event.date}</p>
      <p className="text-sm">Lokation: {event.location?.name || event.location}</p>

      <div className="flex space-x-2">
        {!showDelete && (
          <button onClick={handleBook} disabled={loading || status === "success"} className={`px-4 py-2 rounded ${status === "success" ? "bg-gray-400 text-white cursor-not-allowed" : "bg-green-600 text-white hover:bg-green-700"}`}>
            {loading ? "Booker…" : status === "success" ? "Booket ✔️" : "Book"}
          </button>
        )}

        {showDelete && (
          <button onClick={() => onDelete(event.id)} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
            Slet
          </button>
        )}
      </div>
    </div>
  );
}
