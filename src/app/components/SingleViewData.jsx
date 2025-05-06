"use client";
import React from "react";
import ThumbnailImages from "./ThumbnailImages";

const SingleViewData = ({ mainImage, thumbnailImages }) => {
  return (
    <div className="mt-20 mx-4">
      <div className="flex flex-col items-center md:flex-row gap-10 max-w-7xl mx-auto w-full ">
        {/* Left side - image viewer */}
        <div className="ml-0">
          <div className=" rounded-2xl shadow-2xl p-6  bg-gray-100">
            <ThumbnailImages images={mainImage} main={thumbnailImages} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleViewData;
