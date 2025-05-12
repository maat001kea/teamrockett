// // // src/app/events/[id]/page.jsx
import React from "react";
import EventDetailsBox from "@/app/components/EventDetailsBox";
import EventBilledeBox from "@/app/components/EventBilledeBox";
import EventGalleri from "@/app/components/EventGalleri";

export default async function Page({ params }) {
  // const { id } = await params;
  // // console.log("Params:", params);
  // // const response = await fetch(`http://localhost:8080/events/${id}`);
  // const response = await fetch(`http://localhost:8080/events/66a808d8-e255-4b2f-ba8c-c1da251f7b61`);
  // const data = await response.json();
  // console.log("data", data);
  const { id } = await params; // no need for `await` here unless `params` is a Promise

  // Make the fetch request to get event details by ID
  const response = await fetch(`http://localhost:8080/events/66a808d8-e255-4b2f-ba8c-c1da251f7b61`, {
    method: "GET", // You are fetching data, so use GET
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Convert response to JSON
  const data = await response.json();
  console.log("Event data:", data);

  return (
    <div>
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 mt-15 mb-20 p-7">
        <EventBilledeBox className="w-full md:w-1/2 " />
        <EventDetailsBox className="w-full md:w-1/2" />
      </div>
      <EventGalleri />
    </div>
  );
}
