"use client";

import { useEffect, useState } from "react";
import EventCard from "../components/EventCard";
import EventList from "../components/EventList"; // Din opret-event komponent
import { getAllEvents } from "@/lib/api";
import Link from "next/link";

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAllEvents()
      .then(setEvents)
      .catch((err) => setError(err.message));
  }, []);

  const handleDeleteLocally = (id) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Link href="/createevents">CreateEvent</Link>

      <h1 className="text-3xl font-bold mb-6">Mit Dashboard</h1>

      {error && <p className="text-red-600 text-center mb-4">{error}</p>}

      <h2 style={{ fontSize: "18px", fontWeight: "bold" }}>Events</h2>

      {/* Card-visning */}
      {events.length === 0 ? (
        <p className="text-center text-gray-500">Ingen events at vise.</p>
      ) : (
        <div className="space-y-4 mt-6">
          {events.map((ev) => (
            <EventCard key={ev.id} event={ev} showDelete onDelete={handleDeleteLocally} />
          ))}
        </div>
      )}
    </div>
  );
}
