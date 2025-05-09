// // // src/app/events/[id]/page.jsx
import React from "react";
import EventDetailsBox from "@/app/components/EventDetailsBox";
import EventBilledeBox from "@/app/components/EventBilledeBox";
import EventGalleri from "@/app/components/EventGalleri";

export default async function Page() {
  return (
    <div>
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 mt-10 mb-10">
        <EventBilledeBox className="w-full md:w-1/2" />
        <EventDetailsBox className="w-full md:w-1/2" />
      </div>
      <EventGalleri />
    </div>
  );
}
