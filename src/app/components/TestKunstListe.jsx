"use client";
import { useRouter } from "next/navigation";

const TestKunstListe = ({ data }) => {
  const router = useRouter();

  function searchThingy() {
    const search = "bob";
    router.push(`/testkunst?search=${search}`);
  }
  return (
    <div>
      <button onClick={searchThingy}>skift</button>
      {data.items.map((item) => {
        return <li key={item.id}>{item.id}</li>;
      })}
    </div>
  );
};

export default TestKunstListe;
