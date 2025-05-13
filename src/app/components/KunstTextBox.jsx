"use client";
import React from "react";

export default function KunstTextBox({ data, className }) {
  // Log data for troubleshooting
  // console.log("Kunst data:", data);

  // const title = data.titles?.[0]?.title || "Ukendt titel";

  // console.log("Titles data:", data.items.documentation);

  const item = data?.items[0];
  const title = item?.titles[0].title || "Ukendt dokumentationstitel";
  const creatorForename = item?.production[0]?.creator_forename;
  const creatorSurname = item?.production?.[0]?.creator_surname;
  const birth = item?.production?.[0]?.creator_date_of_birth?.slice(0, 4);
  const death = item?.production?.[0]?.creator_date_of_death?.slice(0, 4);

  const fullCreator = `${creatorForename} ${creatorSurname}`;
  const lifeSpan = birth && death ? ` (${birth}–${death})` : "";
  const techniques = item?.techniques?.join(", ") || "Ukendt";
  const Dimensions = item?.dimensions[0]?.value || "Ukendt størrelse";
  const collection = item?.collection?.join(", ") || "Ukendt samling";
  const placering = item?.responsible_department || "Ukendt afdeling";

  console.log(collection);
  // console.log("Beskrivelse titel:", descriptionTitle);

  const artist = data.artist?.[0] || "Ukendt kunstner";
  const year = data.production_dates_notes?.[0] || "Ukendt år";
  const period = data.production_dates_notes?.[1] || "";
  const description = data.description || "Beskrivelse ikke tilgængelig.";
  const material = data.techniques?.[0] || "Ukendt teknik";
  const dimensions = data.dimensions?.map((d) => d.text).join(", ") || "Ukendte mål";
  const location = data.responsible_department || "Ukendt placering";
  const status = data.on_display ? "Udstillet" : "Ikke udstillet";

  return (
    // <div className={`p-8 space-y-6 h-auto`}>
    <div className={`p-8 space-y-6 h-auto ${className}`}>
      <header className="mt-10 mr-18">
        <h1 className="text-[1.4rem] md:text-4xl font-bold text-my-blue whitespace-nowrap font-playfair">{title}</h1>
        {/* <p className="text-md text-gray-700 mt-1 whitespace-normal md:whitespace-nowrap font-noto">
          af <span className="italic">{artist}</span> • {year} • {period}
        </p> */}
        <p className="text-md text-gray-700 mt-1 whitespace-normal md:whitespace-nowrap font-noto">
          af{" "}
          <span className="italic">
            {fullCreator}
            {lifeSpan}
          </span>{" "}
          • {period}
        </p>
      </header>

      <section>
        <h2 className="text-xl font-semibold text-my-blue font-playfair mb-2">Beskrivelse</h2>
        <p className="text-my-black leading-relaxed font-noto">{description}</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-my-blue font-playfair mb-2 mt-2">Detaljer</h2>
        <ul className="text-gray-700 space-y-1">
          <li className="text-my-blue font-noto mb-2 mt-2">
            <strong>Techniques:</strong> {techniques}
          </li>
          <li className="text-my-blue font-noto mb-2 mt-2">
            <strong>Dimensions:</strong> {Dimensions}
          </li>
          <li className="text-my-blue font-noto mb-2 mt-2">
            <strong>Placering:</strong> {placering}
          </li>
          <li className="text-my-blue font-noto mb-2 mt-2">
            <strong>Kollektion:</strong> {collection}
          </li>
        </ul>
      </section>
    </div>
  );
}
