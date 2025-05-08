"use client";

import { useEffect, useState } from "react";
import EventCard from "../components/EventCard";
import { getAllEvents } from "@/lib/api";

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAllEvents()
      .then(setEvents)
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Kommende Events</h1>

      {error && <p className="text-red-600 text-center mb-4">{error}</p>}

      {events.length === 0 ? (
        <p className="text-center text-gray-500">Ingen events tilgængelige.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {events.map((ev) => (
            <EventCard key={ev.id} event={ev} />
          ))}
        </div>
      )}
    </div>
  );
}
