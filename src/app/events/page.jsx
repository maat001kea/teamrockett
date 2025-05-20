"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import EventCard from "../components/EventCard";
import { getAllEvents } from "@/lib/api";
import Spinner from "../components/Spinner"; // Justér stien hvis nødvendigt
import { SignedIn } from "@clerk/nextjs"; // <-- VIGTIGT!
import AnimatedButton from "../components/AnimatedButton";
// import { motion } from "framer-motion";

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const [loadingTarget, setLoadingTarget] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const allEvents = await getAllEvents();

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

  const handleNavigate = (target) => {
    setLoadingTarget(target);
    setTimeout(() => {
      if (target === "create") {
        router.push("/createevents");
      } else if (target === "kunst") {
        router.push("/kunstliste");
      }
    }, 1500);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto mb-15">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 mt-10 gap-4">
        <h1 className="text-3xl font-bold mb-6 font-playfair text-my-blue mt-5">Upcoming Events</h1>

        {error && <p className="text-my-blue text-center mb-4">{error}</p>}

        <SignedIn>
          <div className="flex gap-3 mb-4">
            <AnimatedButton onClick={() => handleNavigate("create")} disabled={loadingTarget === "create"} className="flex items-center gap-2">
              {loadingTarget === "create" ? (
                <>
                  <Spinner />
                  Åbner...
                </>
              ) : (
                "CreateEvent"
              )}
            </AnimatedButton>
          </div>
        </SignedIn>
      </div>

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
