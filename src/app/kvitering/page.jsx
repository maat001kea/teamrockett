// import BackButton from "@/app/components/BackButton";
// import lightgray from "../../app/assets/lightgray.svg";

// export default async function kivtering({ searchParams }) {
//   const { id } = await searchParams;

//   const response = await fetch(`https://async-exhibit-server-2awc.onrender.com/events/${id}`, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });
//   const data = await response.json();
//   return (
//     <div>
//       <div className="cursor-pointer hover:opacity-80 transition font-sans font-semibold  mt-5 pr-2">
//         <BackButton />
//       </div>
//       {/* <div className="min-h-screen grid place-self-center ">
//         <div className="place-self-center grid max-w-1/2 text-my-blue space-y-5">
//           <h1 className="text-3xl font-bold mb-10 text-center">Tak for tilmelling</h1>
//           <p>
//             Du har bestilt billeter til {data.title}, vi glæder os til at møde dig den {data.dato} i {data.location.name}. Det blivet en spændene event med meget information og læring
//           </p>

//           <p>Hvis du gerne vil have en mail med dine billeter kan du give din mail herunder hvor efter </p>
//           <form action="" className="flex">
//             <input type="email" name="" id="" className="border-2 border-black-700 bg-with-100 p-2 rounded w-full" placeholder="placeholder@mail.com" />
//             <button className="hover:bg-my-bluedark bg-my-blue text-white p-2 rounded-r">submit</button>
//           </form>
//         </div>
//       </div> */}

//       <div className="min-h-screen bg-white flex items-center justify-center px-4 ">
//         <div className="w-full max-w-2xl bg-white text-my-blue space-y-6 p-8  shadow-xl">
//           <h1 className="text-3xl sm:text-4xl font-bold text-center font-playfair">Tak for tilmelding</h1>

//           <p className="text-base sm:text-lg font-sans">
//             Du har bestilt billetter til <strong>{data.title}</strong>. Vi glæder os til at møde dig den <strong>{data.dato}</strong> i <strong>{data.location.name}</strong>. Det bliver en spændende event med masser af information og læring.
//           </p>

//           <p className="text-base sm:text-lg font-sans">Hvis du gerne vil have en mail med dine billetter, kan du skrive din mail herunder:</p>

//           <form className="flex flex-col sm:flex-row gap-3 sm:gap-0">
//             <input type="email" className="border border-my-blue bg-gray-100 px-4 py-2 -md w-full focus:outline-none focus:ring-2 focus:ring-my-blue" placeholder="placeholder@mail.com" />
//             <button type="submit" className="bg-my-blue hover:bg-my-bluedark text-white px-6 py-2  transition-all">
//               Send
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }
import Image from "next/image";
import lightgray from "../../app/assets/lightgray.svg"; // acts like a file path

export default async function Kvittering({ searchParams }) {
  const { id } = await searchParams;
  const response = await fetch(`https://async-exhibit-server-2awc.onrender.com/events/${id}`);
  const data = await response.json();

  return (
    <div
      className="min-h-screen bg-white flex items-center justify-center px-4"
      style={{
        backgroundImage: `url(${lightgray.src})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "auto 900px", // frame will scale to fit container
      }}
    >
      <div className="w-full max-w-3xl bg-white text-my-blue space-y-6 p-8 shadow-xl">
        <h1 className="text-3xl sm:text-4xl font-bold text-center font-playfair">Tak for tilmelding</h1>

        <p className="text-base sm:text-lg font-sans">
          Du har bestilt billetter til <strong>{data.title}</strong>. Vi glæder os til at møde dig den <strong>{data.dato}</strong> i <strong>{data.location.name}</strong>.
        </p>

        <p className="text-base sm:text-lg font-sans">Hvis du gerne vil have en mail med dine billetter, kan du skrive din mail herunder:</p>

        <form className="flex flex-col sm:flex-row gap-3 sm:gap-0">
          <input type="email" className="border border-my-blue bg-gray-100 px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-my-blue" placeholder="placeholder@mail.com" />
          <button type="submit" className="bg-my-blue hover:bg-my-bluedark text-white px-6 py-2 transition-all">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
