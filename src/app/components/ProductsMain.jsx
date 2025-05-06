import ProductsList from "./ProductsList";
import CardBox from "@/app/components/CardBox";

const ProductsMain = ({ data, list, setList }) => {
  return (
    // <div className="grid grid-cols-4 ">
    //   <ProductsList data={data} list={list} setList={setList} />

    //   <div className=" p-5 -mt-37 hidden [@media(min-width:1000px)]:block">
    //     <CardBox className="" />
    //   </div>
    // </div>
    <div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 [@media(min-width:1000px)]:grid-cols-4 gap-4">
      <div className="col-span-1 sm:col-span-2 md:col-span-3 [@media(min-width:1100px)]:col-span-3">
        <ProductsList data={data} list={list} setList={setList} />
      </div>

      <div className=" px-5 hidden pt-0 [@media(min-width:1100px)]:block">
        <CardBox />
      </div>
    </div>
  );
};

export default ProductsMain;
