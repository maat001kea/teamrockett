import BookButton from "./BookButton";
import DeleteButton from "./Deletebutton";
import CreateEventsButton from "./CreateEventsButton";
import ChangeEventsButton from "./ChangeEventsButton";

export default function EventCard({ event }) {
  if (!event) return <p>Fejl: Event mangler.</p>;

  return (
    <div className=" p-4 border rounded bg-white">
      <h2 className="text-xl font-bold">{event.title}</h2>
      <p>{event.description}</p>
      <p className="text-sm">Dato: {event.date}</p>
      <p className="text-sm">Lokation: {event.location?.name || "Ukendt"}</p>

      <div className="flex gap-2 mt-2">
        <BookButton id={event.id} />
        <DeleteButton id={event.id} />

        <ChangeEventsButton id={event.id} />
      </div>
    </div>
  );
}
