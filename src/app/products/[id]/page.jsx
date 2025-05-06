// // src/app/products/[id]/page.jsx
import React from "react";
import SingleViewData from "@/app/components/SingleViewData";
import SingleText from "@/app/components/SingleText";
import RatingContainer from "@/app/components/RatingContainer";
import CardBox from "@/app/components/CardBox";

export default async function Page({ params }) {
  const { id } = await params;
  const response = await fetch(`https://dummyjson.com/products/${id}`);
  const data = await response.json();
  console.log(data);

  return (
    <main>
      <div className="flex flex-col lg:flex-row gap-4">
        <SingleViewData mainImage={data.images} thumbnailImages={data.thumbnail} />
        <SingleText id={data.id} title={data.title} brand={data.brand} category={data.category} description={data.description} price={data.price} rating={data.rating} discount={data.discountPercentage} />
        <CardBox />
        {/* må ikke rør cardbox */}
      </div>
      <div>
        <RatingContainer reviews={data.reviews} />
      </div>
    </main>
  );
}
