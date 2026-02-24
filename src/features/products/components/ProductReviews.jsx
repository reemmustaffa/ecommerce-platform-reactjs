import React, { useMemo } from "react";

export default function ProductReviews({ reviews, renderStars }) {
  const sortedReviews = useMemo(() => {
    if (!reviews) return [];
    return [...reviews].sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [reviews]);

  const averageRating = useMemo(() => {
    if (!reviews || reviews.length === 0) return 0;
    return reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
  }, [reviews]);

  if (!reviews || reviews.length === 0) {
    return (
      <div className="bg-gray-50 rounded-2xl p-8 text-center">
        <p className="text-gray-500 text-sm">No reviews yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Summary */}
      <div className="bg-gray-50 rounded-3xl p-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h3 className="text-2xl font-bold text-gray-900">
              Customer Reviews
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              {reviews.length} review
              {reviews.length > 1 ? "s" : ""}
            </p>
          </div>

          <div className="text-right">
            <div className="flex items-center gap-3 justify-end">
              <div className="flex text-yellow-400 text-lg">
                {renderStars(averageRating)}
              </div>
              <span className="text-2xl font-bold text-gray-900">
                {averageRating.toFixed(1)}
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1">Average Rating</p>
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {sortedReviews.slice(0, 5).map((review) => (
          <div
            key={review.id}
            className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="font-semibold text-primary-600">{review.user}</p>
                <p className="text-xs text-gray-400">
                  {new Date(review.date).toLocaleDateString()}
                </p>
              </div>

              <div className="flex">{renderStars(review.rating)}</div>
            </div>

            <p className="text-gray-600 text-sm leading-relaxed">
              {review.comment}
            </p>
          </div>
        ))}
      </div>

      {reviews.length > 5 && (
        <div className="text-center">
          <button className="text-primary-600 text-sm font-medium hover:underline">
            Show All Reviews
          </button>
        </div>
      )}
    </div>
  );
}
