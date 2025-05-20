import CreateEvent from "../components/CrateEvent";

// Zod validering (du kan stadig bruge det i JS)

export default async function EventForm() {
  // Hent datoer
  const resDates = await fetch("http://localhost:8080/dates");
  const dateData = await resDates.json();

  // Hent lokationer
  const resLoc = await fetch("http://localhost:8080/locations");
  const locData = await resLoc.json();

  return <CreateEvent date={dateData} locations={locData} />;
}
