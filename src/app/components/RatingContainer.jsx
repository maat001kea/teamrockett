import RatingCard from "./RatingCard";
import avatarImg from "@/app/assets/avatar.png";

const RatingContainer = ({ reviews }) => {
  return (
    <div className="p-6 mt-10">
      <h2 className="text-2xl font-semibold mb-4 font-poppins text-gray-600">Customer Reviews</h2>
      <div className="grid gap-6 mt-4 mb-4">{reviews?.length > 0 ? reviews.map((review, index) => <RatingCard key={index} avatar={avatarImg} name={review.reviewerName} email={review.reviewerEmail} comment={review.comment} date={review.date} initialRating={review.rating} />) : <p className="text-gray-500">No reviews yet.</p>}</div>
    </div>
  );
};

export default RatingContainer;
