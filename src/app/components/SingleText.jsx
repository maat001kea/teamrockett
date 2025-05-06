"use client";

import SingleButton from "./SingleViewButton";
import { FaStar, FaRegStar } from "react-icons/fa";

const SingleText = (product) => {
  const { title, brand, category, description, price, rating, discount } = product;
  const discountAmount = (price * discount) / 100;
  const discountedPrice = price - discountAmount;
  console.log("Price:", price, "Discount:", discount);

  const renderStars = (rating) => {
    const totalStars = 5;
    const stars = [];

    for (let i = 0; i < totalStars; i++) {
      if (i + 1 <= rating) {
        stars.push(<FaStar key={i} className="text-[#F27F3D] h-6 w-6" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-[#F27F3D] h-6 w-6" />);
      }
    }

    return stars;
  };

  return (
    <div className="mt-5 lg:mt-24 xl:mt-28">
      <div className="grid grid-cols-1 gap-6">
        <div className="p-4">
          <h1 className="text-gray-600 font-bold mb-4 text-2xl sm:text-3xl md:text-4xl font-poppins">{title}</h1>
          <h2 className="text-gray-500 mb-4 lg:text-xl font-semibold font-poppins">{brand}</h2>
          <p className="text-gray-500 mb-4 lg:text-xl">{category}</p>
          {/* Highly Rated Badge */}
          {rating >= 4 && (
            <span className="inline-flex items-center gap-2 bg-[#F27F3D] text-white text-sm font-semibold px-3 py-1 rounded-full mb-4">
              Highly Rated <FaStar className="text-white h-4 w-4" />
            </span>
          )}
          <p className="text-gray-600 mb-4 text-base sm:text-lg md:text-xl lg:text-xl">{description}</p>
          {/* <h3 className="text-gray-800 mb-4 font-bold text-xl">${price}</h3> */}
          <div className="flex flex-col">
            <span className="text-sm line-through text-gray-500 font-semibold font-poppins">{`$${price}`}</span>
            <span className=" text-gray-800 mb-4 font-semibold text-xl font-poppins">{`$${discountedPrice.toFixed(2)}`}</span>
          </div>
          <div className="flex items-center mb-4 gap-5">
            <h3 className="flex">{renderStars(rating)}</h3>
            <h3 className="text-gray-600 font-semibold font-poppins">{rating}</h3>
          </div>
          <div className="mt-4 p-4">
            <SingleButton product={product} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleText;
