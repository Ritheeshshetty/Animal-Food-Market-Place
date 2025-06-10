import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FiPackage,
  FiShoppingCart,
  FiStar,
  FiTrendingUp,
} from "react-icons/fi";
import "./CustomerDashboard.css";
import api from "../api";
function CustomerDashboard() {
  // Sample data - replace with actual API calls

  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const quickActions = [
    { icon: <FiShoppingCart size={20} />, label: "View Cart", path: "/cart" },
    {
      icon: <FiPackage size={20} />,
      label: "My Orders",
      path: "/customer/orders",
    },
    { icon: <FiStar size={20} />, label: "My Reviews", path: "/reviews" },
    {
      icon: <FiTrendingUp size={20} />,
      label: "Special Offers",
      path: "/offers",
    },
  ];

  useEffect(() => {
    const fetchRecommended = async () => {
      try {
        const res = await api.get("/products/recommended", {
          withCredentials: true,
        });
        setRecommendedProducts(res.data);
      } catch (err) {
        console.error(err);
        alert("Failed to load recommended products");
      } finally {
        setLoading(false);
      }
    };

    fetchRecommended();
  }, []);

  return (
    <div className="dashboard-container">
      {/* Header Section */}
      <header className="dashboard-header">
        <h1 className="dashboard-title">Welcome Back!</h1>
        <p className="dashboard-subtitle">
          Here's what's new for your pets and livestock
        </p>
      </header>

      {/* Quick Actions */}
      <section className="quick-actions-grid">
        {quickActions.map((action, index) => (
          <Link key={index} to={action.path} className="action-card">
            <div className="action-icon">{action.icon}</div>
            <span className="action-label">{action.label}</span>
          </Link>
        ))}
      </section>

      {/* Recommended Products */}
      {/* Recommended Products */}
      <section className="recommended-section">
        <h2 className="section-title">
          <FiStar className="section-icon" />
          Recommended For You
        </h2>

        {loading ? (
          <p>Loading recommendations...</p>
        ) : (
          <div className="products-grid">
            {recommendedProducts.map((product) => (
              <div key={product._id} className="product-card">
                <div className="product-badge">
                  <span
                    className={`badge ${
                      product.category === "pet"
                        ? "badge-pet"
                        : "badge-livestock"
                    }`}
                  >
                    {product.category}
                  </span>
                  <span className="product-rating">
                    <FiStar className="rating-icon" />
                    {(
                      product.ratings.reduce((acc, r) => acc + r, 0) /
                      (product.ratings.length || 1)
                    ).toFixed(1)}
                  </span>
                </div>

                <h3 className="product-name">{product.name}</h3>
                <p className="product-type">For {product.animalType}</p>

                <div className="product-footer">
                  <span className="product-price">
                    ₹{product.quantityOptions[0]?.price?.toFixed(2) || "N/A"}
                  </span>
                  <Link to={`/product/${product._id}`} className="view-button">
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Browse All Button */}
      <div className="browse-all-container">
        <Link to="/browse" className="browse-button">
          Browse All Products
        </Link>
      </div>
    </div>
  );
}

export default CustomerDashboard;
