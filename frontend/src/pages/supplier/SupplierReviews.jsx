import { useEffect, useState } from "react";
import api from "../../api";
import { FaStar, FaRegStar } from "react-icons/fa";
import { FiPackage } from "react-icons/fi";
import "./supplierReview.css";

export default function SupplierReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await api.get("/reviews/supplier/reviews", { 
          withCredentials: true 
        });
        setReviews(res.data.reviews || []);
      } catch (err) {
        setError("Failed to fetch reviews");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  const getImageUrl = (image) => {
    if (!image) return "/default-product-image.png";
    if (image.startsWith("http")) return image;
    if (image.startsWith("/")) return `http://localhost:5000${image}`;
    return `http://localhost:5000/uploads/${image}`;
  };

  return (
    <div className="supplier-review-container">
      <div className="supplier-review-header">
        <h2 className="supplier-review-title">Customer Reviews for Your Products</h2>
        <p className="supplier-review-subtitle">
          See what customers are saying about your products
        </p>
      </div>

      {loading ? (
        <div className="supplier-review-loading">
          <div className="supplier-review-spinner"></div>
          <p>Loading reviews...</p>
        </div>
      ) : error ? (
        <div className="supplier-review-error">
          <svg viewBox="0 0 24 24" width="20" height="20">
            <path fill="currentColor" d="M11 15h2v2h-2zm0-8h2v6h-2zm1-5C6.47 2 2 6.5 2 12a10 10 0 0 0 10 10 10 10 0 0 0 10-10A10 10 0 0 0 12 2zm0 18a8 8 0 0 1-8-8 8 8 0 0 1 8-8 8 8 0 0 1 8 8 8 8 0 0 1-8 8z"/>
          </svg>
          {error}
        </div>
      ) : reviews.length === 0 ? (
        <div className="supplier-review-empty">
          <FiPackage className="supplier-review-empty-icon" />
          <h3>No Reviews Yet</h3>
          <p>Customers haven't reviewed your products yet.</p>
        </div>
      ) : (
        <div className="supplier-review-grid">
          {reviews.map((review) => (
            <div key={review._id} className="supplier-review-card">
              <div className="supplier-review-product">
                <img 
                  src={getImageUrl(review.product?.image)} 
                  alt={review.product?.name} 
                  className="supplier-review-product-image" 
                />
                <h3 className="supplier-review-product-name">
                  {review.product?.name || "Deleted Product"}
                </h3>
              </div>

              <div className="supplier-review-content">
                <div className="supplier-review-rating">
                  {[1, 2, 3, 4, 5].map((star) =>
                    review.rating >= star ? (
                      <FaStar key={star} className="supplier-review-star filled" />
                    ) : (
                      <FaRegStar key={star} className="supplier-review-star" />
                    )
                  )}
                  <span className="supplier-review-rating-text">
                    {review.rating}.0
                  </span>
                </div>

                {review.feedback && (
                  <div className="supplier-review-feedback">
                    <p>"{review.feedback}"</p>
                  </div>
                )}

                <div className="supplier-review-meta">
                  <p className="supplier-review-customer">
                    By {review.customer?.name || "Anonymous Customer"}
                  </p>
                  <p className="supplier-review-date">
                    {new Date(review.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric"
                    })}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}