import { SignedIn } from "@clerk/nextjs";
import BookButton from "./BookButton";
import DeleteButton from "./Deletebutton";
import ChangeEventsButton from "./ChangeEventsButton";
import SingleViewButton from "./SingleViewButton";

export default function EventCard({ event }) {
  if (!event) return <p>Fejl: Event mangler.</p>;

  return (
    <div className="p-4 border rounded bg-white">
      <h2 className="text-xl font-bold">{event.title}</h2>
      <p>{event.description}</p>
      <p className="text-sm">Dato: {event.date}</p>
      <p className="text-sm">Lokation: {event.location?.name || "Ukendt"}</p>

      <SignedIn>
        <div className="flex gap-2 mt-2">
          <BookButton id={event.id} />
          <DeleteButton id={event.id} />
          <ChangeEventsButton id={event.id} />
        </div>
      </SignedIn>
      <SingleViewButton />
    </div>
  );
}
