import TestKunstListe from "../components/TestKunstListe";

export default async function Page({ searchParams }) {
  const { search } = await searchParams;

  const data = search ? await fetch(`https://api.smk.dk/api/v1/art/search/?keys=${search}&offset=0&rows=100`) : await fetch(`https://api.smk.dk/api/v1/art/search/?keys=*&offset=0&rows=100`);
  const kunst = await data.json();
  return <TestKunstListe data={kunst} />;
}
