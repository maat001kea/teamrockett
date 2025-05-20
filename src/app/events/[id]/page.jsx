// // // src/app/events/[id]/page.jsx
import React from "react";
import EventDetailsBox from "@/app/components/EventDetailsBox";
import EventBilledeBox from "@/app/components/EventBilledeBox";
import EventGalleri from "@/app/components/EventGalleri";
// import EventButton from "@/app/components/EventButton";

export default async function Page({ params }) {
  const { id } = await params;
  console.log("Params:", params);
  // console.log("ID:", id);

  const response = await fetch(`https://async-exhibit-server-2awc.onrender.com/events/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();

  return (
    <div>
      <div className="flex flex-col md:flex-row items-center justify-center gap-25 mt-2 mb-8 p-7">
        <EventBilledeBox className="w-full md:w-1/2 " />
        <EventDetailsBox data={data} className="w-full md:w-1/2" />
      </div>

      <EventGalleri objectNumbers={data.artworkIds} />
    </div>
  );
}
