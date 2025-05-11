// // // src/app/events/[id]/page.jsx
import React from "react";
import EventDetailsBox from "@/app/components/EventDetailsBox";
import EventBilledeBox from "@/app/components/EventBilledeBox";
import EventGalleri from "@/app/components/EventGalleri";

export default async function Page({ params }) {
  const { id } = await params;
  console.log("Params:", params);
  const response = await fetch(`http://localhost:8080/events/${id}`);
  // const response = await fetch(`http://localhost:8080/events/9b9a9dc0-0373-403d-bb28-c7eaa296395a`);
  const data = await response.json();
  console.log(data);

  return (
    <div>
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 mt-15 mb-20 p-7">
        <EventBilledeBox className="w-full md:w-1/2" />
        <EventDetailsBox className="w-full md:w-1/2" />
      </div>
      <EventGalleri />
    </div>
  );
}
