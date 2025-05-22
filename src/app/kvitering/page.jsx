export default async function kivtering({ searchParams }) {
  const { id } = await searchParams;

  const response = await fetch(`https://async-exhibit-server-2awc.onrender.com/events/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return (
    <div className="min-h-screen grid place-self-center ">
      <div className="place-self-center grid max-w-1/2 text-my-blue space-y-5">
        <h1 className="text-3xl font-bold mb-10 text-center">Tak for tilmelling</h1>
        <p>
          Du har bestilt billeter til {data.title}, vi glæder os til at møde dig den {data.dato} i {data.location.name}. Det blivet en spændene event med meget information og læring
        </p>

        <p>Hvis du gerne vil have en mail med dine billeter kan du give din mail herunder hvor efter </p>
        <form action="" className="flex">
          <input type="email" name="" id="" className="border-2 border-black-700 bg-with-100 p-2 rounded w-full" placeholder="placeholder@mail.com" />
          <button className="hover:bg-my-bluedark bg-my-blue text-white p-2 rounded-r">submit</button>
        </form>
      </div>
    </div>
  );
}
