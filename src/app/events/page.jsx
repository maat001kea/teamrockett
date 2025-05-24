"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import EventCard from "../components/EventCard";
import { getAllEvents } from "@/lib/api";
import { eventsFilter } from "@/lib/eventsFilter";
import Spinner from "../components/Spinner";
import { SignedIn } from "@clerk/nextjs"; // <-- VIGTIGT!
import AnimatedButton from "../components/AnimatedButton";
// import { motion } from "framer-motion";

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [locations, setLocations] = useState([]);
  const [error, setError] = useState(null);
  const [loadingTarget, setLoadingTarget] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchLocations = async () => {
      const allLocations = await eventsFilter();
      console.log("all locations", locations);
      setLocations(allLocations);
      console.log("locations", locations);
    };

    fetchLocations();
  }, []);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const allEvents = await getAllEvents();

        // Sortering så den tidligste dato viser mest
        const sortedEvents = allEvents.sort((a, b) => {
          const idA = a.date || "";
          const idB = b.date || "";
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
      {/* {locations.map((loc) => (
        <div key={loc.id}>
          <h2>{loc.name}</h2>
          {events.length === 0 ? <p className="text-center text-gray-500">Ingen events at vise.</p> : <div className="space-y-4  mt-6 flex flex-col md:flex-row overflow-x-auto gap-4 pb-4 scroll-smooth mb-30 scrollbar-hide">{events.map((ev) => (ev.location.id === loc.id ? <EventCard key={ev.id} event={ev} showDelete onDelete={handleDeleteLocally} /> : ""))}</div>}
        </div>
      ))} */}

      {/* 
      {locations.map((loc) => (
        <div key={loc.id} className="mb-10">
      
        
          <h2 className="text-xl font-semibold mb-4">{loc.name}</h2>
          {events.length === 0 ? (
            <p className="text-center text-gray-500">Ingen events at vise.</p>
          ) : (
            <div
              className="
          flex flex-row 
          overflow-x-auto 
          space-x-4 
          pb-4 
          scrollbar-hide
          scroll-smooth
          max-w-full
        "
            >
              {events
                .filter((ev) => ev.location.id === loc.id)
                .map((ev) => (
                  <div key={ev.id} className="min-w-[250px] flex-shrink-0">
                
                
                    <EventCard event={ev} showDelete onDelete={handleDeleteLocally} />
                  </div>
                ))}
            </div>
          )}
        </div>
      ))} */}

      {locations.map((loc) => (
        <div key={loc.id} className="mb-10 px-4 md:px-0 max-w-full overflow-hidden">
          {" "}
          {/* Overflow hidden here to prevent page overflow */}
          <h2 className="text-xl font-semibold mb-4">{loc.name}</h2>
          {events.length === 0 ? (
            <p className="text-center text-gray-500">Ingen events at vise.</p>
          ) : (
            <div
              className="
          flex flex-row
          overflow-x-auto
          space-x-4
          pb-4
          scrollbar-hide
          scroll-smooth
          max-w-full
          -mx-4 md:mx-0  /* Negative margin to offset padding on parent for full-width scroll */
        "
              style={{ scrollPaddingLeft: "1rem" }} // for smooth snap offset if you want snapping later
            >
              {events
                .filter((ev) => ev.location.id === loc.id)
                .map((ev) => (
                  <div key={ev.id} className="min-w-[250px] flex-shrink-0">
                    <EventCard event={ev} showDelete onDelete={handleDeleteLocally} />
                  </div>
                ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
