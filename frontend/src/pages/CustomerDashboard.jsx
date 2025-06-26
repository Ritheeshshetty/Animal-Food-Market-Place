import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FiStar,
  FiShoppingCart,
  FiPlus,
  FiMinus,
  FiHeart,
} from "react-icons/fi";
import { FaPaw, FaBone, FaFish } from "react-icons/fa";
import "./CustomerDashboard.css";
import api from "../api";
import { useDispatch } from "react-redux";
import { addOrUpdateCartItem } from "../redux/slices/cartSlice";
import { toast } from "react-toastify";
import dog from "../assets/dog.png";

function CustomerDashboard() {
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activePet, setActivePet] = useState("All");
  const [activeCategory, setActiveCategory] = useState("");
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchRecommended = async () => {
      try {
        const res = await api.get("/products/recommended", {
          withCredentials: true,
        });
        setRecommendedProducts(
          res.data.map((p) => ({
            ...p,
            selectedOption: p.quantityOptions[0],
            cartQuantity: 0,
            expanded: false,
            isFavorite: false,
          }))
        );
      } catch (err) {
        console.error(err);
        toast.error("Failed to load recommended products");
      } finally {
        setLoading(false);
      }
    };
    fetchRecommended();
  }, []);

  const getImageUrl = (image) => {
    if (!image) return "/default-product-image.png";
    if (image.startsWith("http")) return image;
    if (image.startsWith("/")) return `http://localhost:5000${image}`;
    return `http://localhost:5000/uploads/${image}`;
  };

  const handleQuantityChange = (productId, newLabel) => {
    setRecommendedProducts((prev) =>
      prev.map((p) =>
        p._id === productId
          ? {
              ...p,
              selectedOption: p.quantityOptions.find(
                (opt) => opt.label === newLabel
              ),
              cartQuantity: 1, // reset to 1 on quantity change
            }
          : p
      )
    );
  };

  // const toggleCartExpand = (productId) => {
  //   setRecommendedProducts((prev) =>
  //     prev.map((p) =>
  //       p._id === productId
  //         ? {
  //             ...p,
  //             expanded: true,
  //             cartQuantity: p.cartQuantity === 0 ? 1 : p.cartQuantity,
  //           }
  //         : p
  //     )
  //   );
  // };
  const toggleCartExpand = async (productId) => {
    const product = recommendedProducts.find((p) => p._id === productId);
    const quantityLabel = product.selectedOption.label;

    const initialQty = product.cartQuantity === 0 ? 1 : product.cartQuantity;

    try {
      await updateCartQuantity(productId, quantityLabel, initialQty);

      setRecommendedProducts((prev) =>
        prev.map((p) =>
          p._id === productId
            ? {
                ...p,
                expanded: true,
                cartQuantity: initialQty,
                animateCart: true,
              }
            : p
        )
      );

      // Remove animation class after animation duration (e.g. 700ms)
      setTimeout(() => {
        setRecommendedProducts((prev) =>
          prev.map((p) =>
            p._id === productId ? { ...p, animateCart: false } : p
          )
        );
      }, 700);
    } catch (err) {
      console.error("Cart add failed", err);
      toast.error("Failed to add to cart");
    }
  };

  const toggleFavorite = (productId) => {
    setRecommendedProducts((prev) =>
      prev.map((p) =>
        p._id === productId ? { ...p, isFavorite: !p.isFavorite } : p
      )
    );
  };

  const updateCartQuantity = async (productId, quantityLabel, newQty) => {
    const product = recommendedProducts.find((p) => p._id === productId);
    const option = product.quantityOptions.find(
      (opt) => opt.label === quantityLabel
    );

    if (!option || newQty > option.stock || newQty < 1) return;

    try {
      await dispatch(
        addOrUpdateCartItem({
          product: productId,
          quantityLabel,
          quantity: newQty,
        })
      ).unwrap();

      toast.success(`${product.name} ${quantityLabel} updated to ${newQty}`);
      setRecommendedProducts((prev) =>
        prev.map((p) =>
          p._id === productId ? { ...p, cartQuantity: newQty } : p
        )
      );
    } catch (err) {
      toast.error("Failed to update cart");
    }
  };

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-background">
          <div className="header-overlay">
            <div className="header-content">
              <div className="header-left">
                <h1 className="dashboard-title">
                  Fuel Their Joy with Every Bite
                </h1>
                <p className="dashboard-subtitle">
                  Discover nutrient-rich food for pets and livestock — delivered
                  fresh to your doorstep.
                </p>
                <div className="header-actions">
                  <Link to="/browse" className="browse-cta">
                    Shop Now
                  </Link>
                  <Link to="/offers" className="browse-secondary">
                    View Offers
                  </Link>
                </div>
              </div>
              <div className="header-right hero-image-container">
                <img
                  src={dog}
                  alt="Happy Pets and Livestock"
                  className="hero-image"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Recommendations */}
      <section className="recommended-section">
        <div className="section-header">
          <h2 className="section-title">
            <FiStar className="section-icon" />
            Tailored Recommendations
          </h2>
          <p className="section-description">
            Products we think you'll love based on your{" "}
            {activePet.toLowerCase()} preferences
          </p>
        </div>

        {loading ? (
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <p>Loading your personalized recommendations...</p>
          </div>
        ) : recommendedProducts.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🐾</div>
            <h3>No recommendations yet</h3>
            <p>Browse our products to get personalized suggestions</p>
            <Link to="/browse" className="browse-link">
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="products-grid">
            {recommendedProducts.map((product) => (
              <div key={product._id} className="product-card">
                <div className="product-image-container">
                  <Link to={`/product/${product._id}`}>
                    <img
                      src={getImageUrl(product.image)}
                      alt={product.name}
                      className="product-image"
                      loading="lazy"
                    />
                  </Link>
                  <button
                    className={`favorite-button ${
                      product.isFavorite ? "active" : ""
                    }`}
                    onClick={() => toggleFavorite(product._id)}
                  >
                    <FiHeart />
                  </button>
                  <div className="product-badge">
                    <span
                      className={`badge ${
                        product.category === "pet"
                          ? "badge-pet"
                          : "badge-livestock"
                      }`}
                    >
                      {product.animalType}
                    </span>
                    {product.selectedOption.stock < 10 && (
                      <span className="stock-badge">
                        Only {product.selectedOption.stock} left!
                      </span>
                    )}
                  </div>
                </div>

                <div className="product-details">
                  <div className="product-name-rating-row">
                    <h3 className="product-name">
                      <Link to={`/product/${product._id}`}>{product.name}</Link>
                    </h3>
                    <div className="product-rating">
                      <FiStar className="rating-icon" />
                      {(
                        product.ratings.reduce((acc, r) => acc + r, 0) /
                        (product.ratings.length || 1)
                      ).toFixed(1)}
                      <span className="rating-count">
                        ({product.ratings.length})
                      </span>
                    </div>
                  </div>

                  <div className="product-description">
                    {product.nutritionalInfo.substring(0, 60)}...
                  </div>

                  <div className="product-quantity-price">
                    <select
                      className="product-quantity-dropdown"
                      value={product.selectedOption?.label}
                      onChange={(e) =>
                        handleQuantityChange(product._id, e.target.value)
                      }
                    >
                      {product.quantityOptions.map((opt) => (
                        <option
                          key={opt.label}
                          value={opt.label}
                          disabled={opt.stock === 0}
                        >
                          {opt.label} - ₹{opt.price.toFixed(2)}
                          {opt.stock === 0 ? " (Out of stock)" : ""}
                        </option>
                      ))}
                    </select>
                    <span className="product-price">
                      ₹{product.selectedOption?.price.toFixed(2)}
                    </span>
                  </div>

                  <div className="product-cart-controls">
                    {product.expanded ? (
                      <div className="cart-expanded">
                        <button
                          className="qty-btn"
                          onClick={() =>
                            updateCartQuantity(
                              product._id,
                              product.selectedOption.label,
                              product.cartQuantity - 1
                            )
                          }
                          disabled={product.cartQuantity <= 1}
                        >
                          <FiMinus />
                        </button>
                        <span className="qty-value">
                          {product.cartQuantity}
                        </span>
                        <button
                          className="qty-btn"
                          onClick={() =>
                            updateCartQuantity(
                              product._id,
                              product.selectedOption.label,
                              product.cartQuantity + 1
                            )
                          }
                          disabled={
                            product.cartQuantity >= product.selectedOption.stock
                          }
                        >
                          <FiPlus />
                        </button>
                      </div>
                    ) : (
                      // <button
                      //   className={`cart-icon-button ${product.cartQuantity > 0 ? "in-cart" : ""}`}
                      //   onClick={() => toggleCartExpand(product._id)}
                      // >
                      //   <FiShoppingCart />
                      //   {product.cartQuantity > 0 && (
                      //     <span className="cart-count-bubble">{product.cartQuantity}</span>
                      //   )}
                      // </button>
                      <button
                        className={`cart-icon-button ${
                          product.cartQuantity > 0 ? "in-cart" : ""
                        } ${product.animateCart ? "cart-animate" : ""}`}
                        onClick={() => toggleCartExpand(product._id)}
                      >
                        <FiShoppingCart />
                        {product.cartQuantity > 0 && (
                          <span className="cart-count-bubble">
                            {product.cartQuantity}
                          </span>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <div className="browse-all-container">
        <Link to="/browse" className="browse-button">
          Explore Our Full Range
        </Link>
      </div>
    </div>
  );
}

export default CustomerDashboard;
