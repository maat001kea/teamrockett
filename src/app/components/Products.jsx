"use client";
import Kategori from "./Kategori";
import ProductsMain from "./ProductsMain";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { FaSortAmountDown, FaStar } from "react-icons/fa";

const Products = ({ datacat, dataprod, activeCat }) => {
  const router = useRouter();
  const [list, setList] = useState(dataprod.products);

  function sortPrice(type) {
    const params = activeCat ? `category=${activeCat}` : "";
    type ? setList((prev) => prev.toSorted((b, a) => a[type] - b[type])) : setList((prev) => prev.toSorted((a, b) => a["id"] - b["id"]));
    router.push(`?${params}&sort=${type}`);
  }

  return (
    <div>
      <div className="flex gap-20 mt-15">
        <Kategori data={datacat} />
        {/* <div className="w-full max-w-screen-md mx-auto px-4">
          <div className="flex gap-4 items-center flex-wrap"> */}
        <div className="px-4 ">
          <div className="flex gap-4 items-center flex-wrap ml-[-20px]">
            <button className="ml-2 px-2 py-2 bg-white border border-gray-300 rounded-md text-[#F27F3D] font-semibold shadow-sm hover:bg-gray-100 transition flex items-center gap-2 min-w-[120px]" onClick={() => sortPrice("price")}>
              <FaSortAmountDown className="text-[#F27F3D]" />
              Price
            </button>
            <button className="ml-2 px-2 py-2 bg-white border border-gray-300 rounded-md text-[#F27F3D] font-semibold shadow-sm hover:bg-gray-100 transition flex items-center gap-2 min-w-[120px]" onClick={() => sortPrice("rating")}>
              <FaStar className="text-[#F27F3D]" />
              Rating
            </button>
          </div>
        </div>
      </div>

      <ProductsMain data={dataprod.products} list={list} setList={setList} />
    </div>
  );
};

export default Products;
