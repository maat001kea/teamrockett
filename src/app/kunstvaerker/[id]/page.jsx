// // // src/app/kunstværker/[id]/page.jsx

import React from "react";
import KunstBilledBox from "@/app/components/KunstBilledBox";
import KunstTextBox from "@/app/components/KunstTextBox";

export default async function Page({ params }) {
  const { id } = params;

  const response = await fetch(`https://api.smk.dk/api/v1/art/?object_number=${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    // cache: "no-store",
  });

  const data = await response.json();
  console.log("kunst data:", data);

  return (
    <div>
      <div className="flex flex-col md:flex-row items-stretch justify-center gap-6 mt-10 mb-20 px-6 max-w-6xl mx-auto">
        <KunstBilledBox className="w-full md:w-1/2" />
        <KunstTextBox data={data} className="w-full md:w-1/2" />
      </div>
    </div>
  );
}
