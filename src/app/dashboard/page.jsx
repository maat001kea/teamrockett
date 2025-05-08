"use client";

import { useEffect, useState } from "react";
import EventCard from "../components/EventCard";
import { getAllEvents } from "@/lib/api";

export default function DashboardPage() {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAllEvents()
      .then(setEvents)
      .catch((err) => setError(err.message));
  }, []);

  // Slet kun fra lokal state – ingen API-kald
  const handleDeleteLocally = (id) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Mit Dashboards</h1>
      {error && <p className="text-red-600 text-center mb-4">{error}</p>}
      {events.length === 0 ? (
        <p className="text-center text-gray-500">Ingen events at vise.</p>
      ) : (
        <div className="space-y-4">
          {events.map((ev) => (
            <EventCard key={ev.id} event={ev} showDelete onDelete={handleDeleteLocally} />
          ))}
        </div>
      )}
    </div>
  );
}
