import Link from "next/link";
const SingleViewButton = () => {
  return (
    <div>
      <Link href={`/events/${event.id}`} className="inline-block mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
        View
      </Link>
    </div>
  );
};

export default SingleViewButton;
