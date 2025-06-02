"use client";
import React from "react";

export default function KunstTextBox({ data, className }) {
  /* for at undgå render crash error*/
  if (!data || !data.items || data.items.length === 0) {
    return <div className={`text-red-500 ${className}`}>No data available</div>;
  }
  const item = data?.items[0];

  const title = item.titles?.[0]?.title?.split(":")[0] || "titel";
  const creatorForename = item?.production?.[0]?.creator_forename;
  const creatorSurname = item?.production?.[0]?.creator_surname;
  const birth = item?.production?.[0]?.creator_date_of_birth?.slice(0, 4);
  const death = item?.production?.[0]?.creator_date_of_death?.slice(0, 4);

  const fullCreator = [creatorForename, creatorSurname].filter(Boolean).join(" ") || "Ukendt kunstner";

  const lifeSpan = birth && death ? ` (${birth}–${death})` : "";
  const techniques = item?.techniques?.join(", ") || "Ukendt";

  const dimensions = item?.dimensions?.[0]?.value || "Ukendt størrelse";
  const collection = item?.collection?.join(", ") || "Ukendt samling";
  const placering = item?.responsible_department || "Ukendt afdeling";
  const documentation = item?.documentation || [];
  const firstDoc = documentation[0];

  // console.log(collection);

  const period = data.production_dates_notes?.[1] || "";
  // const period = item?.production_dates_notes?.[1] || "";

  return (
    <div className={`sm:px-4 md:px-10 space-y-4 h-auto ${className}`}>
      <div className="mt-10 mr-23">
        <h1 className="text-[20px] sm:text-lg md:text-4xl font-bold text-my-blue font-playfair whitespace-nowrap [@media(min-width:500px)_and_(max-width:770px)]:text-[35px] [@media(min-width:500px)_and_(max-width:990px)]:mt-[50px] [@media(min-width:790px)_and_(max-width:990px)]:ml-[10px]">{title}</h1>

        <p className="text-sm sm:text-base md:text-lg text-my-blue mt-1  font-sans font-light  md:whitespace-nowrap [@media(min-width:500px)_and_(max-width:980px)]:text-[20px]">
          af{" "}
          <span className="italic">
            {fullCreator}
            {lifeSpan}
          </span>{" "}
          {period}
        </p>
      </div>

      {/* beskrivelse */}
      {firstDoc && (
        <section>
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-my-blue font-playfair mb-2 mt-4">Dokumentation</h2>
          <div className="space-y-2 font-sans font-normal text-my-blue leading-relaxed text-sm sm:text-base md:text-lg">
            <p>
              <strong className="font-medium">{firstDoc.title}</strong>
              {firstDoc.author && <> af {firstDoc.author}</>}
              {firstDoc.year_of_publication && `, ${firstDoc.year_of_publication}`}
              {firstDoc.shelfmark && `, Hyldenummer: ${firstDoc.shelfmark}`}
            </p>
          </div>
        </section>
      )}

      <section>
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-my-blue font-playfair mb-2 mt-2">Detaljer</h2>
        <ul className="text-my-blue space-y-1 text-sm sm:text-base md:text-lg">
          <li className="mb-2 mt-2 ">
            <strong className="font-playfair">Techniques:</strong> <span className="font-sans">{techniques}</span>
          </li>
          <li className="mb-2 mt-2 ">
            <strong className="font-playfair">Dimensions:</strong> <span className="font-sans">{dimensions}</span>
          </li>
          <li className="mb-2 mt-2 ">
            <strong className="font-playfair">Placering:</strong> <span className="font-sans">{placering}</span>
          </li>
          <li className="mb-2 mt-2 ">
            <strong className="font-playfair">Kollektion:</strong> <span className="font-sans">{collection}</span>
          </li>
        </ul>
      </section>
    </div>
  );
}
