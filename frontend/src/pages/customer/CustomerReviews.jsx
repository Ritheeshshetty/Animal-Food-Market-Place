import { useEffect, useState } from "react";
import api from "../../api";
import { FaStar, FaRegStar } from "react-icons/fa";
import { FiPackage, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import "./review.css";

export default function CustomerOrderReviews() {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await api.get("/reviews/customer/order-reviews", {
          withCredentials: true,
        });
        setReviews(res.data.reviews || []);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch your order reviews");
      } finally {
        setIsLoading(false);
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

  const scrollLeft = (e) => {
    const container = e.currentTarget.parentElement.querySelector(
      ".myreview-product-list"
    );
    container.scrollBy({ left: -200, behavior: "smooth" });
  };

  const scrollRight = (e) => {
    const container = e.currentTarget.parentElement.querySelector(
      ".myreview-product-list"
    );
    container.scrollBy({ left: 200, behavior: "smooth" });
  };

  return (
    <div className="myreview-container">
      <div className="myreview-header">
        <h2 className="myreview-title">Your Order Reviews</h2>
        <p className="myreview-subtitle">
          View and manage feedback you've given for past orders
        </p>
      </div>

      {error && (
        <div className="myreview-error">
          <svg viewBox="0 0 24 24" width="20" height="20">
            <path
              fill="currentColor"
              d="M11 15h2v2h-2zm0-8h2v6h-2zm1-5C6.47 2 2 6.5 2 12a10 10 0 0 0 10 10 10 10 0 0 0 10-10A10 10 0 0 0 12 2zm0 18a8 8 0 0 1-8-8 8 8 0 0 1 8-8 8 8 0 0 1 8 8 8 8 0 0 1-8 8z"
            />
          </svg>
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="myreview-loading">
          <div className="myreview-spinner"></div>
          <p>Loading your reviews...</p>
        </div>
      ) : reviews.length === 0 ? (
        <div className="myreview-empty">
          <FiPackage className="myreview-empty-icon" />
          <h3>No Order Reviews Yet</h3>
          <p>You haven't reviewed any orders yet.</p>
        </div>
      ) : (
        <div className="myreview-grid">
          {reviews.map((review) => (
            <div key={review._id} className="myreview-card">
              <div className="myreview-card-header">
                <h3 className="myreview-order-id">
                  Order #{review.order?._id?.slice(-5) || "Deleted"}
                </h3>

                <div className="myreview-rating">
                  {[1, 2, 3, 4, 5].map((star) =>
                    review.rating >= star ? (
                      <FaStar key={star} className="myreview-star filled" />
                    ) : (
                      <FaRegStar key={star} className="myreview-star" />
                    )
                  )}
                  <span className="myreview-rating-text">
                    {review.rating}.0
                  </span>
                </div>
              </div>

              {review.feedback && (
                <div className="myreview-content">
                  <h4 className="myreview-feedback-title">Your Feedback</h4>
                  <p className="myreview-feedback-text">{review.feedback}</p>
                </div>
              )}

              <div className="myreview-products">
                <h4 className="myreview-products-title">Products in Order</h4>
                <div className="myreview-products-scroll-container">
                  <button
                    className="scroll-button left"
                    onClick={scrollLeft}
                    aria-label="Scroll left"
                    style={{
                      display:
                        review.order?.items?.length > 1 ? "block" : "none",
                    }}
                  >
                    <FiChevronLeft />
                  </button>
                  <ul className="myreview-product-list">
                    {review.order?.items?.map((item, index) => (
                      <li key={index} className="myreview-product-item">
                        <img
                          src={
                            getImageUrl(item.product?.image) ||
                            "/placeholder.jpg"
                          }
                          alt={item.product?.name}
                          className="myreview-product-img"
                        />
                        <div className="myreview-product-info">
                          <p className="myreview-product-name">
                            {item.product?.name}
                          </p>
                          <p className="myreview-product-qty">
                            Qty: {item.quantity}
                          </p>
                          <p className="myreview-product-price">
                            ₹{item.price}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <button
                    className="scroll-button right"
                    onClick={scrollRight}
                    aria-label="Scroll right"
                    style={{
                      display:
                        review.order?.items?.length > 1 ? "block" : "none",
                    }}
                  >
                    <FiChevronRight />
                  </button>
                </div>
              </div>

              <div className="myreview-card-footer">
                <span className="myreview-date">
                  Reviewed on{" "}
                  {new Date(review.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
