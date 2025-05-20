"use client";

import { useState } from "react";
import EventButton from "@/app/components/EventButton";

export default function EventDetailsBox({ data, className }) {
  const { title, description, date, curator, totalTickets, bookedTickets, location } = data;
  console.log(data.id, "id");
  const [tickets, setTickets] = useState(1);
  const ticketsLeft = totalTickets - bookedTickets;

  const handleIncrement = () => {
    if (tickets < ticketsLeft) setTickets(tickets + 1);
  };

  const handleDecrement = () => {
    if (tickets > 1) setTickets(tickets - 1);
  };

  return (
    <section className={`max-w-xl mx-auto p-6 space-y-4 ${className}`}>
      <h1 className="text-3xl font-bold text-my-blue font-playfair">{title}</h1>

      <p className="text-gray-900 font-noto font-medium">{description}</p>

      <div className="space-y-1 text-sm text-my-blue">
        <p>
          <strong className="font-playfair pr-1.5">Kurator:</strong> {curator}
        </p>
        <p>
          <strong className="font-playfair pr-1.5">Dato:</strong> {new Date(date).toLocaleDateString("da-DK")}
        </p>
        <p>
          <strong className="font-playfair pr-1.5">Lokation:</strong> {location?.name}, {location?.address}
        </p>
      </div>

      {/* <div className="flex items-center justify-between mt-4"> */}
      <div className="flex flex-wrap items-center justify-between mt-4 gap-x-4 px-2">
        <p className="text-sm text-green-700 font-medium py-1 mt-2 ">Billetter tilbage: {ticketsLeft}</p>

        <div className="flex items-center space-x-2 mt-6">
          <button onClick={handleDecrement} className="px-2 py-1 bg-[#bcc2ef] w-8 h-8 text-xl">
            -
          </button>
          <span className="text-lg font-medium">{tickets}</span>
          <button onClick={handleIncrement} className="px-2 py-1 bg-[#bcc2ef] w-8 h-8 text-xl">
            +
          </button>
        </div>
      </div>

      {/* <button className="mt-4 py-2 px-4 bg-[#D97C2B] hover:bg-[#FFA04E] text-white transition font-noto">Tilmeld event</button> */}
      <div className="mt-6">
        <EventButton tickets={tickets} id={data.id}></EventButton>
      </div>
    </section>
  );
}
