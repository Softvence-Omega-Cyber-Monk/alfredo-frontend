import { useState } from "react";
import axios from "axios";
import { Review } from "@/types/PropertyDetails";
import { toast } from "sonner";

interface ReviewsProps {
  reviews: Review[];
  propertyId: string;
  isOwner: boolean;
  userId: string | null;
}

const Reviews = ({ reviews, propertyId, isOwner, userId }: ReviewsProps) => {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();

    if (rating === 0) {
      setError("Please select a rating");
      return;
    }

    if (!comment.trim()) {
      setError("Please write a comment");
      return;
    }

    setIsSubmitting(true);
    setError("");
    setSuccess("");

    try {
      const token = localStorage.getItem("token"); // Or your preferred token storage method

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/reviews/${propertyId}`,
        {
          rating,
          comment: comment.trim(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        setSuccess("Review submitted successfully!");
        setRating(0);
        setComment("");
        setShowReviewForm(false);
        toast.success("Review submitted successfully!!");
        // You might want to refresh the reviews data here
        window.location.reload(); // Simple approach, or use a state update function
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to submit review");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStarRating = (
    forInput: boolean = false,
    currentRating: number = 0
  ) => {
    return [...Array(5)].map((_, i) => (
      <span
        key={i}
        className={`text-2xl cursor-pointer ${
          i < (forInput ? rating : currentRating)
            ? "text-yellow-400"
            : "text-gray-300"
        } ${forInput ? "hover:text-yellow-300" : ""}`}
        onClick={() => forInput && setRating(i + 1)}
      >
        ★
      </span>
    ));
  };

  if (!reviews || reviews.length === 0) {
    return (
      <div className="py-8">
        <h2 className="font-semibold text-primary-blue text-xl md:text-2xl font-regular mb-6">
          Reviews
        </h2>
        <p className="text-dark-3 mb-4">No reviews yet.</p>

        {!isOwner && userId && (
          <button
            onClick={() => setShowReviewForm(!showReviewForm)}
            className="bg-primary-blue text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            {showReviewForm ? "Cancel Review" : "Add a Review"}
          </button>
        )}

        {showReviewForm && (
          <div className="mt-6 p-6 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold text-dark-3 mb-4">
              Write a Review
            </h3>
            <form onSubmit={handleSubmitReview}>
              <div className="mb-4">
                <label className="block text-dark-3 mb-2">Rating</label>
                <div className="flex">{renderStarRating(true)}</div>
                <span className="text-sm text-dark-2">{rating}/5</span>
              </div>

              <div className="mb-4">
                <label htmlFor="comment" className="block text-dark-3 mb-2">
                  Comment
                </label>
                <textarea
                  id="comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-blue"
                  rows={4}
                  placeholder="Share your experience with this property..."
                />
              </div>

              {error && <p className="text-red-500 mb-4">{error}</p>}
              {success && <p className="text-green-500 mb-4">{success}</p>}

              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-primary-blue text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors disabled:bg-gray-400"
              >
                {isSubmitting ? "Submitting..." : "Submit Review"}
              </button>
            </form>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-semibold text-primary-blue text-xl md:text-2xl font-regular">
          Reviews ({reviews.length})
        </h2>

        {!isOwner && userId && (
          <button
            onClick={() => setShowReviewForm(!showReviewForm)}
            className="bg-primary-blue text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            {showReviewForm ? "Cancel Review" : "Add a Review"}
          </button>
        )}
      </div>

      {showReviewForm && (
        <div className="mb-8 p-6 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold text-dark-3 mb-4">
            Write a Review
          </h3>
          <form onSubmit={handleSubmitReview}>
            <div className="mb-4">
              <label className="block text-dark-3 mb-2">Rating</label>
              <div className="flex">{renderStarRating(true)}</div>
              <span className="text-sm text-dark-2">{rating}/5</span>
            </div>

            <div className="mb-4">
              <label htmlFor="comment" className="block text-dark-3 mb-2">
                Comment
              </label>
              <textarea
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-blue"
                rows={4}
                placeholder="Share your experience with this property..."
              />
            </div>

            {error && <p className="text-red-500 mb-4">{error}</p>}
            {success && <p className="text-green-500 mb-4">{success}</p>}

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-primary-blue text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors disabled:bg-gray-400"
            >
              {isSubmitting ? "Submitting..." : "Submit Review"}
            </button>
          </form>
        </div>
      )}

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
                {renderStarRating(false, review.rating || 0)}
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
