"use client";

import Link from "next/link";
import Image from "next/image";

import { useCartStore } from "@/app/store/cartStore";

import { FaStar, FaRegStar } from "react-icons/fa";

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

const ProductCard = (props) => {
  const addToCart = useCartStore((state) => state.addToCart);
  const discountAmount = (props.price * props.discount) / 100;
  const discountedPrice = props.price - discountAmount;

  return (
    <li className="bg-gray-100 shadow-2xl rounded-2xl">
      <Link href={`/products/${props.id}`}>
        <div className="relative w-full h-50 bg-white">
          <Image src={props.img} alt={props.title} width={500} height={300} className="w-full h-50 object-cover" />
          <span className="absolute top-2 left-2 inline-block bg-red-100 text-red-900 text-xs font-semibold px-2 py-1 rounded-full">{`${props.discount} % off`}</span>
          {props.rating >= 4 && (
            <span className="inline-flex items-center gap-1 bg-[#F27F3D] text-white text-xs font-semibold px-3 py-1 rounded-full mb-4 absolute top-2 right-2">
              Highly Rated <FaStar className="text-white h-4 w-4" />
            </span>
          )}
        </div>

        <div className="p-4">
          <div className="flex justify-between mt-4">
            <h1 className="text-gray-600 font-semibold font-poppins">{props.title}</h1>
          </div>
          <div className="flex justify-between mt-6 items-center">
            <div className="flex flex-col">
              <span className="text-sm line-through text-gray-500 font-poppins font-semibold">{`$${props.price}`}</span>
              <span className="font-semibold text-[#F27F3D] font-poppins">{`$${discountedPrice.toFixed(2)}`}</span>
            </div>
          </div>

          <h3 className="flex mt-6">{renderStars(props.rating)}</h3>
        </div>
      </Link>

      <div className="p-4">
        <button
          onClick={() =>
            addToCart({
              id: props.id,
              title: props.title,
              price: discountedPrice, // ✅ Brug den nedsatte pris i kurven
              quantity: 1,
            })
          }
          className="bg-[#F27F3D] rounded-lg text-white font-bold py-2 px-4 hover:bg-orange-600 transition duration-300 ease-in-out w-full"
        >
          Læg i kurv
        </button>
      </div>
    </li>
  );
};

export default ProductCard;
