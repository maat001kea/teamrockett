"use client";

import { FaStar } from "react-icons/fa";
import Image from "next/image";

const RatingCard = ({ avatar, name, comment, date, initialRating = 0 }) => {
  return (
    <div className="max-w-md p-4 space-y-4 mt-3.5">
      <div className="flex items-center gap-4">
        <Image src={avatar} alt={`${name}'s avatar`} width={48} height={48} className="rounded-full object-cover" />
        <div>
          <h4 className="font-semibold text-gray-800">{name}</h4>
          <p className="text-sm text-gray-500">{date}</p>
        </div>
      </div>

      <p className="text-gray-700">{comment}</p>

      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <FaStar key={i} size={22} className={`${initialRating > i ? "text-yellow-400" : "text-gray-300"}`} />
        ))}
      </div>
    </div>
  );
};

export default RatingCard;
