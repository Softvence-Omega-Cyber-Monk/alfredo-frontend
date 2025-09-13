import { Review } from "@/types/PropertyDetails";

interface ReviewsProps {
  reviews: Review[];
}

const Reviews = ({ reviews }: ReviewsProps) => {
  if (!reviews || reviews.length === 0) {
    return (
      <div className="py-8">
        <h2 className="font-semibold text-primary-blue text-xl md:text-2xl font-regular mb-6">
          Reviews
        </h2>
        <p className="text-dark-3">No reviews yet.</p>
      </div>
    );
  }

  return (
    <div className="py-8">
      <h2 className="font-semibold text-primary-blue text-xl md:text-2xl font-regular mb-6">
        Reviews ({reviews.length})
      </h2>
      <div className="space-y-6">
        {reviews.map((review, index) => (
          <div key={index} className="border-b border-[#BFD4F0] pb-6">
            <div className="flex items-center gap-4 mb-3">
              <div className="w-12 h-12 bg-primary-blue rounded-full flex items-center justify-center text-white font-semibold">
                {review.user?.fullName?.charAt(0) || "U"}
              </div>
              <div>
                <h3 className="font-semibold text-dark-3">
                  {review.user?.fullName || "Anonymous"}
                </h3>
                <p className="text-sm text-dark-2">
                  {review.createdAt
                    ? new Date(review.createdAt).toLocaleDateString()
                    : "Unknown date"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`text-lg ${
                      i < (review.rating || 0)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <span className="text-sm text-dark-2">{review.rating}/5</span>
            </div>
            <p className="text-dark-3">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
