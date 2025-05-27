"use client";

import { SignedIn } from "@clerk/nextjs";
// import BookButton from "./BookButton";
import DeleteButton from "./Deletebutton";
import ChangeEventsButton from "./ChangeEventsButton";
import Link from "next/link";
import AnimatedButton from "./AnimatedButton";
import { motion } from "framer-motion";
import Spinner from "./Spinner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import dummy from "../assets/dummy.webp";

export default function EventCard({ event }) {
  if (!event) return <p>Fejl: Event mangler.</p>;
  const router = useRouter();
  const [viewLoading, setViewLoading] = useState(false);

  // delay til at vise  spinner på view knappen
  const handleViewClick = () => {
    setViewLoading(true);
    setTimeout(() => {
      router.push(`/events/${event.id}`);
    }, 500); // delay til at vise  spinner på view knappen
  };

  return (
    // <div className="p-4 bg-white/80 flex-grow h-full w-[700px] sm:min-w-[300px] md:min-w-[250px] lg:min-w-[200px] flex-shrink-0 overflow-hidden shadow block mb-4">
    //   <motion.div
    //     initial={{ opacity: 0, y: 20 }}
    //     animate={{ opacity: 1, y: 0 }}
    //     transition={{ duration: 0.5, ease: "easeOut" }}
    //     className="w-full max-w-md mx-auto sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl
    //    p-4 sm:p-6 md:p-8
    //    border border-my-orangedark/20
    //    bg-gradient-to-br from-white/70 to-my-bluelight/40
    //    shadow-md backdrop-blur-sm
    //    transition-transform duration-300 hover:scale-[1.02]"
    //   >
    //     <div className="flex flex-col gap-4 md:flex-row h-60">
    //       <Image src={dummy} alt="dummy" className="h-auto w-60" />
    //       <div>
    //         <h2 className="text-lg sm:text-xl md:text-2xl font-bold font-playfair text-my-blue py-2 sm:py-3">{event.title}</h2>

    //         <p className="text-sm sm:text-base font-sans text-my-blue py-2 sm:py-3">{event.description}</p>

    //         <p className="text-xs sm:text-sm font-sans font-bold text-my-orangedark py-1.5 sm:py-2.5">Dato: {event.date}</p>

    //         <p className="text-xs sm:text-sm font-sans font-bold text-my-orangedark">Lokation: {event.location?.name || "Ukendt"}</p>
    //       </div>
    //     </div>
    //     {/* Buttons inside the card */}
    //     <div className="mt-6 pt-4 border-t border-my-orangedark/20 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0">
    //       {/* Left side: curator buttons */}
    //       <SignedIn>
    //         <div className="flex gap-2">
    //           <DeleteButton id={event.id} />
    //           <ChangeEventsButton id={event.id} />
    //         </div>
    //       </SignedIn>

    //       {/*  View knap */}
    //       <div className="font-sans mt-4">
    //         <AnimatedButton onClick={handleViewClick} disabled={viewLoading} className="flex items-center gap-2">
    //           {viewLoading ? (
    //             <>
    //               <Spinner color="white" /> Åbner...
    //             </>
    //           ) : (
    //             "View"
    //           )}
    //         </AnimatedButton>
    //       </div>
    //     </div>
    //   </motion.div>
    // </div>

    // <div className="p-4 bg-white/80 flex-grow h-full w-[700px] max-w-full sm:min-w-[300px] md:min-w-[250px] lg:min-w-[200px] flex-shrink-0 overflow-hidden shadow block mb-4">
    <div className="p-4 bg-white/80 flex-grow h-full w-full max-w-[700px] min-w-[250px] flex-shrink-0 overflow-hidden shadow block mb-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: "easeOut" }} className="w-full mx-auto p-4 sm:p-6 md:p-8 border border-my-bluedark/20 bg-gradient-to-br from-white/70 to-my-bluelight/40 shadow-md backdrop-blur-sm transition-transform duration-300 hover:scale-[1.02]">
        <div className="flex flex-col md:flex-row gap-4 h-auto md:h-60">
          {/* Image */}
          {/* <Image src={dummy} alt="dummy" className="w-full max-w-full md:w-60 h-auto object-cover" /> */}
          <Image src="https://laqizwqplonobdzjohhg.supabase.co/storage/v1/object/public/artworks/1748324790774.png" alt="Event billede" width={400} height={300} className="w-full h-auto object-cover rounded" />

          {/* Text content */}
          <div className="flex flex-col justify-between">
            <div>
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold font-playfair text-my-blue py-2 sm:py-3">{event.title}</h2>

              <p className="text-sm sm:text-base font-sans text-my-blue py-2 sm:py-3">{event.description}</p>
            </div>
            <div>
              <p className="text-xs sm:text-sm font-sans font-bold text-my-orangedark py-1.5 sm:py-2.5">Dato: {event.date}</p>

              <p className="text-xs sm:text-sm font-sans font-bold text-my-orangedark">Lokation: {event.location?.name || "Ukendt"}</p>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 pt-4 border-t border-my-orangedark/20 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0">
          {/* Left side: curator buttons */}
          <SignedIn>
            <div className="flex gap-2 justify-start sm:justify-start">
              <DeleteButton id={event.id} />
              <ChangeEventsButton id={event.id} />
            </div>
          </SignedIn>

          {/* View button */}
          <div className="font-sans mt-4 sm:mt-0 flex justify-start sm:justify-end">
            <AnimatedButton onClick={handleViewClick} disabled={viewLoading} className="flex items-center gap-2">
              {viewLoading ? (
                <>
                  <Spinner color="white" /> Åbner...
                </>
              ) : (
                "View"
              )}
            </AnimatedButton>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
