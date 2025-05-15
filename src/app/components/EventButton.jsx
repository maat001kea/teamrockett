import AnimatedButton from "./AnimatedButton";

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
      <AnimatedButton onClick={ticketGet} className="">
        Tilmeld event
      </AnimatedButton>
    </div>
  );
};
export default EventButton;
