"use client";
import React from "react";

export default function KunstTextBox({ data }) {
  const { title, artist, year, period, description, material, dimensions, location, status } = data;

  return (
    <div className={` p-8  space-y-6 h-auto`}>
      <header className="mt-10 mr-18">
        {/* <h1 className="text-3xl md:text-4xl font-bold text-my-blue whitespace-nowrap font-playfair">{title}</h1> */}

        <h1 className="text-[1.4rem] [@media(min-width:390px)]:text-3xl md:text-4xl font-bold text-my-blue whitespace-nowrap font-playfair">{title}</h1>

        <p className="text-md text-gray-700 mt-1 whitespace-normal md:whitespace-nowrap font-noto">
          af <span className="italic font-noto text-gray-700">{artist}</span> • {year} • {period}
        </p>
      </header>

      <section>
        <h2 className="text-xl font-semibold text-my-blue font-playfair mb-2">Beskrivelse</h2>
        <p className="text-my-black  leading-relaxed font-noto">{description}</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-my-blue font-playfair mb-2 mt-2">Detaljer</h2>
        <ul className="text-gray-700 space-y-1 ">
          <li className="text-my-blue font-noto mb-2 mt-2">
            <strong>Materiale:</strong> {material}
          </li>
          <li className="text-my-blue font-noto mb-2 mt-2">
            <strong>Størrelse:</strong> {dimensions}
          </li>
          <li className="text-my-blue font-noto mb-2 mt-2">
            <strong>Placering:</strong> {location}
          </li>
          <li className="text-my-blue font-noto mb-2 mt-2">
            <strong>Udstillingsstatus:</strong> {status}
          </li>
        </ul>
      </section>
    </div>
  );
}
