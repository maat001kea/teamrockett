import Link from "next/link";

const Button = (props) => {
  return (
    <button>
      <Link href={props.link} className=" uppercase sm:text-3xl mt-6 inline-block bg-orange-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-orange-600 transition">
        Shop nu
      </Link>
    </button>
  );
};

export default Button;
