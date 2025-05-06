"use client";
import Link from "next/link";
import { IoCartOutline } from "react-icons/io5";
import ProductCard from "./ProductCard";
import { useState } from "react";

const ProductsList = ({ data, list, setList }) => {
  function sortPrice() {
    setList((prev) => prev.toSorted((b, a) => a["price"] - b["price"]));
  }

  return (
    <div className="col-span-2 md:col-span-3 mt-20">
      <ul className="grid  md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((item) => {
          return <ProductCard key={item.id} id={item.id} title={item.title} rating={item.rating} price={item.price} discount={item.discountPercentage} img={item.images[0]} />;
        })}
      </ul>
    </div>
  );
};

export default ProductsList;
