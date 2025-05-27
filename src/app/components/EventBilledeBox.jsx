// "use client";
// import React from "react";
// import Image from "next/image";
// import singleevent from "../assets/singleevent.png";

// const EventBilledeBox = () => {
//   return (
//     // <div className="w-full relative aspect-video ">
//     <div className="w-full relative aspect-video lg:aspect-[4/3] lg:h-[500px]">
//       <Image src={singleevent} alt="Event" fill className="object-cover px-4 lg:px-0 " />
//     </div>
//   );
// };

// export default EventBilledeBox;

"use client";
import React from "react";
import Image from "next/image";
import singleevent from "../assets/singleevent.png";

const EventBilledeBox = ({ imageUrl }) => {
  return (
    // <div className="w-full relative aspect-video ">
    <div className="w-full relative aspect-video lg:aspect-[4/3] lg:h-[500px]">
      <Image src={imageUrl || singleevent} alt="Event" fill className="object-cover px-4 lg:px-0" />
    </div>
  );
};

export default EventBilledeBox;
