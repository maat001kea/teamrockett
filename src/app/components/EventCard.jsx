import { SignedIn } from "@clerk/nextjs";
import BookButton from "./BookButton";
import DeleteButton from "./Deletebutton";
import ChangeEventsButton from "./ChangeEventsButton";
import Link from "next/link";
import AnimatedButton from "./AnimatedButton";
import { motion } from "framer-motion";

export default function EventCard({ event }) {
  if (!event) return <p>Fejl: Event mangler.</p>;

  return (
    <div className="p-4 bg-white/80">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md mx-auto sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl 
       p-4 sm:p-6 md:p-8 
       border border-my-orangedark/20 
       bg-gradient-to-br from-white/70 to-orange-100/40 
       shadow-md backdrop-blur-sm 
       transition-transform duration-300 hover:scale-[1.02]"
      >
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold font-playfair text-my-blue py-2 sm:py-3">{event.title}</h2>

        <p className="text-sm sm:text-base font-sans text-my-blue py-2 sm:py-3">{event.description}</p>

        <p className="text-xs sm:text-sm font-sans font-bold text-my-orangedark py-1.5 sm:py-2.5">Dato: {event.date}</p>

        <p className="text-xs sm:text-sm font-sans font-bold text-my-orangedark">Lokation: {event.location?.name || "Ukendt"}</p>

        {/* Buttons inside the card */}
        <div className="mt-6 pt-4 border-t border-my-orangedark/20 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0">
          {/* Left side: curator buttons */}
          <SignedIn>
            <div className="flex gap-2">
              <DeleteButton id={event.id} />
              <ChangeEventsButton id={event.id} />
            </div>
          </SignedIn>

          {/* Right side: View button (always visible) */}
          <div className="font-sans mt-4">
            <AnimatedButton href={`/events/${event.id}`}>View</AnimatedButton>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
