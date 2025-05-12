"use client";

import { useEffect, useState } from "react";
import EventCard from "../components/EventCard";
import { getAllEvents } from "@/lib/api";
import Link from "next/link";

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const allEvents = await getAllEvents();

        // ✅ Sortér efter første artwork ID (KS1, KS2, ...)
        const sortedEvents = allEvents.sort((a, b) => {
          const idA = a.artworkIds?.[0] || "";
          const idB = b.artworkIds?.[0] || "";
          return idA.localeCompare(idB);
        });

        setEvents(sortedEvents);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchEvents();
  }, []);

  const handleDeleteLocally = (id) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Mit Dashboard</h1>

      {error && <p className="text-red-600 text-center mb-4">{error}</p>}

      <h2 className="text-xl font-semibold">Events</h2>
      <Link href="/createevents" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-800 ">
        CreateEvent
      </Link>

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
