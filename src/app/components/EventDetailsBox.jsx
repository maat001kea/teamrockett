"use client";

import { useState } from "react";

export default function EventDetailsBox() {
  const event = {
    title: "Lys og Mørke",
    description: "En kontrastfyldt udstilling der undersøger samspillet mellem lys og mørke i kunsten. Værker der udforsker skygger, kontraster og stemninger.",
    date: "2025-05-02",
    curator: "Jonas B.",
    totalTickets: 30,
    bookedTickets: 9,
    location: {
      name: "Galleri B",
      address: "Åboulevarden 21, 8000 Aarhus",
    },
  };

  const [tickets, setTickets] = useState(0);
  const ticketsLeft = event.totalTickets - event.bookedTickets;

  const handleIncrement = () => {
    if (tickets < ticketsLeft) setTickets(tickets + 1);
  };

  const handleDecrement = () => {
    if (tickets > 0) setTickets(tickets - 1);
  };

  return (
    <section className="max-w-xl mx-auto p-6 space-y-4">
      <h1 className="text-3xl font-bold text-[#2B346B] font-playfair">{event.title}</h1>

      <p className="text-gray-900 font-noto font-medium">{event.description}</p>

      <div className="space-y-1 text-sm text-[#2B346B] ">
        <p>
          <strong className="font-playfair pr-1.5">Kurator:</strong> {event.curator}
        </p>
        <p>
          <strong className="font-playfair pr-1.5">Dato:</strong> {new Date(event.date).toLocaleDateString("da-DK")}
        </p>
        <p>
          <strong className="font-playfair pr-1.5">Lokation:</strong> {event.location.name}, {event.location.address}
        </p>
      </div>

      <div className="flex items-center justify-between mt-4">
        <p className="text-sm text-green-700 font-medium">Billetter tilbage: {ticketsLeft}</p>

        <div className="flex items-center space-x-2">
          <button onClick={handleDecrement} className="px-3 py-1 bg-[#bcc2ef] w-8 h-8 text-xl">
            -
          </button>
          <span className="text-lg font-medium">{tickets}</span>
          <button onClick={handleIncrement} className="px-3 py-1 bg-[#bcc2ef] w-8 h-8 text-xl">
            +
          </button>
        </div>
      </div>

      <button className="mt-4  py-2 px-4 bg-[#D97C2B] hover:bg-[#FFA04E] text-white  transition font-noto">Tilmeld event</button>
    </section>
  );
}
