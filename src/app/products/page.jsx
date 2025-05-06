import Products from "../components/Products";

export default async function Page({ searchParams }) {
  const { category, sort } = await searchParams;

  console.log("search: ", category);
  console.log("sort: ", sort);

  const datacat = await fetch("https://dummyjson.com/products/categories");
  const categories = await datacat.json();

  const data = category ? await fetch(`https://dummyjson.com/products/category/${category}?limit=50&sortBy=${sort}&${sort === "rating" ? "order=desc" : "order=asc"}`) : await fetch("https://dummyjson.com/products?limit=50");
  // sort ? data.toSorted((b, a) => a[type] - b[type]) : s;
  const products = await data.json();

  return (
    <main>
      <Products datacat={categories} dataprod={products} activeCat={category} />
    </main>
  );
}
