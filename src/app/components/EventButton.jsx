const EventButton = (props) => {
  const ticketGet = () => {
    fetch(`http://localhost:8080/events/${props.id}/book`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tickets: props.tickets,
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
    console.log("klikket på knap");
  };

  return (
    <div>
      {/* {" "} */}
      <button onClick={ticketGet} className="mt-4 py-2 px-4 bg-[#D97C2B] hover:bg-[#FFA04E] text-white transition font-noto">
        Tilmeld event
      </button>
    </div>
  );
};
export default EventButton;
