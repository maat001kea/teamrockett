"use client";
import React from "react";

export default function KunstTextBox({ data, className }) {
  const item = data?.items[0];
  // const title = item?.titles[0].title || "Ukendt dokumentationstitel";
  const fullTitle = item?.titles[0].title || "Ukendt dokumentationstitel";
  const title = fullTitle.split(":")[0];
  const creatorForename = item?.production[0]?.creator_forename;
  const creatorSurname = item?.production?.[0]?.creator_surname;
  const birth = item?.production?.[0]?.creator_date_of_birth?.slice(0, 4);
  const death = item?.production?.[0]?.creator_date_of_death?.slice(0, 4);

  const fullCreator = `${creatorForename} ${creatorSurname}`;
  const lifeSpan = birth && death ? ` (${birth}–${death})` : "";
  const techniques = item?.techniques?.join(", ") || "Ukendt";
  const Dimensions = item?.dimensions?.[0]?.value || "Ukendt størrelse";
  const collection = item?.collection?.join(", ") || "Ukendt samling";
  const placering = item?.responsible_department || "Ukendt afdeling";
  const documentation = item?.documentation || [];

  console.log(collection);

  const period = data.production_dates_notes?.[1] || "";

  return (
    // <div className={`p-8 space-y-6 h-auto ${className}`}>
    // <div className={`px-4 sm:px-6 md:px-8  space-y-4 h-auto ${className}`}>
    <div className={`sm:px-4 md:px-10 space-y-4 h-auto ${className}`}>
      <header className="mt-10 mr-23">
        <h1 className="text-[20px] sm:text-lg md:text-4xl font-bold text-my-blue font-playfair whitespace-nowrap">{title}</h1>

        <p className="text-sm sm:text-base md:text-lg text-gray-700 mt-1  font-noto  md:whitespace-nowrap">
          af{" "}
          <span className="italic">
            {fullCreator}
            {lifeSpan}
          </span>{" "}
          • {period}
        </p>
      </header>

      {/* beskrivelse */}
      {documentation.length > 0 && (
        <section>
          {/* <h2 className="text-xl font-semibold text-my-blue font-playfair mb-2 mt-4">Dokumentation</h2> */}
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-my-blue font-playfair mb-2 mt-4">Dokumentation</h2>
          <div className="space-y-2 text-my-blue font-noto leading-relaxed text-sm sm:text-base md:text-lg">
            {documentation.map((doc, index) => (
              <p key={index}>
                <strong className="font-medium">{doc.title}</strong> af {doc.author}, {doc.year_of_publication}, {doc.shelfmark && `Hyldenummer: ${doc.shelfmark}`}
              </p>
            ))}
          </div>
        </section>
      )}

      <section>
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-my-blue font-playfair mb-2 mt-2">Detaljer</h2>

        <ul className="text-my-blue font-noto space-y-1 text-sm sm:text-base md:text-lg">
          <li className="mb-2 mt-2">
            <strong>Techniques:</strong> {techniques}
          </li>
          <li className="mb-2 mt-2">
            <strong>Dimensions:</strong> {Dimensions}
          </li>
          <li className="mb-2 mt-2">
            <strong>Placering:</strong> {placering}
          </li>
          <li className="mb-2 mt-2">
            <strong>Kollektion:</strong> {collection}
          </li>
        </ul>
      </section>
    </div>
  );
}
