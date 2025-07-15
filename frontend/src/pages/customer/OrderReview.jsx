import { useEffect, useState } from "react";
import api from "../../api";
import { FaStar, FaRegStar } from "react-icons/fa";
import { FiSend, FiEdit2 } from "react-icons/fi";
import "./review.css";

export default function OrderReview({ orderId }) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasReview, setHasReview] = useState(false);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const res = await api.get(`/reviews/order/${orderId}`, {
          withCredentials: true,
        });
        if (res.data?.review) {
          setRating(res.data.review.rating);
          setFeedback(res.data.review.feedback || "");
          setHasReview(true);
          setSuccess("You've already reviewed this order");
        }
      } catch (err) {
        console.log("No existing order review found");
      }
    };
    fetchReview();
  }, [orderId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (rating === 0) {
      setError("Please select a rating");
      return;
    }

    setIsSubmitting(true);
    try {
      await api.post(
        `/reviews/order/${orderId}`,
        { rating, feedback },
        { withCredentials: true }
      );
      setSuccess("Thank you for your review!");
      setError("");
      setHasReview(true);
      setEditMode(false);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to submit review");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="order-review-container">
      <div className="review-header">
        <h3 className="review-title">Order Feedback</h3>
        <p className="review-subtitle">
          Share your experience to help us improve
        </p>
      </div>

      <div className="review-content">
        <div className="rating-section">
          <div className="rating-card">
            <div className="rating-header">
              <h4 className="rating-title">How would you rate this order?</h4>
              {hasReview && !editMode && (
                <span className="rating-badge">
                  {rating} Star{rating > 1 ? "s" : ""}
                </span>
              )}
            </div>
            
            <div className="stars-container">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  className={`star-button ${(hoverRating || rating) >= star ? "active" : ""}`}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  disabled={hasReview && !editMode}
                  aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
                >
                  {(hoverRating || rating) >= star ? (
                    <FaStar className="star-icon" />
                  ) : (
                    <FaRegStar className="star-icon" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="feedback-section">
          <form onSubmit={handleSubmit} className="review-form">
            <div className="feedback-card">
              <label className="feedback-label">Your Comments</label>
              
              {!editMode && hasReview ? (
                <div className="feedback-display-container">
                  <p className="feedback-display">
                    {feedback || "No additional comments provided"}
                  </p>
                  <button
                    type="button"
                    className="edit-review-button"
                    onClick={() => setEditMode(true)}
                  >
                    <FiEdit2 className="edit-icon" />
                    Edit Review
                  </button>
                </div>
              ) : (
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  className="feedback-textarea"
                  placeholder="Tell us about your experience with this order..."
                  rows="4"
                />
              )}
            </div>

            {(editMode || !hasReview) && (
              <button
                type="submit"
                className="submit-review-button"
                disabled={isSubmitting || rating === 0}
              >
                {isSubmitting ? (
                  <span className="submit-spinner"></span>
                ) : (
                  <>
                    <FiSend className="send-icon" />
                    {hasReview ? "Update Review" : "Submit Review"}
                  </>
                )}
              </button>
            )}

            {error && (
              <div className="alert-message error">
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <path fill="currentColor" d="M11 15h2v2h-2zm0-8h2v6h-2zm1-5C6.47 2 2 6.5 2 12a10 10 0 0 0 10 10 10 10 0 0 0 10-10A10 10 0 0 0 12 2zm0 18a8 8 0 0 1-8-8 8 8 0 0 1 8-8 8 8 0 0 1 8 8 8 8 0 0 1-8 8z"/>
                </svg>
                {error}
              </div>
            )}
            
            {success && (
              <div className="alert-message success">
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                {success}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}