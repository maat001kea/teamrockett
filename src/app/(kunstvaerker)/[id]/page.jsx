// // src/app/kunstværker/[id]/page.jsx

import React from "react";

import KunstBilledBox from "@/app/components/KunstBilledBox";
import KunstTextBox from "@/app/components/KunstTextBox";

const sampleKunst = {
  title: "Skib fra Oseberg",
  artist: "Ukendt",
  year: "ca. 820 e.Kr.",
  period: "Vikingetiden",
  description: "Osebergskibet er et af de bedst bevarede vikingskibe, fundet i en gravhøj i Norge...",
  material: "Eg og fyrretræ",
  dimensions: "21,5 meter langt",
  location: "Vikingskibsmuseet, Oslo",
  status: "Permanent udstilling",
};

export default async function Page() {
  return (
    <div>
      <div className="flex flex-col md:flex-row items-stretch justify-center gap-6 mt-10 mb-20 px-6 max-w-6xl mx-auto  ">
        <KunstBilledBox className="w-full md:w-1/2" />
        <KunstTextBox data={sampleKunst} className="w-full md:w-1/2" />
      </div>
    </div>
  );
}
