import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FiShoppingCart,
  FiTruck,
  FiShield,
  FiStar,
  FiPackage,
  FiArrowRight,
  FiHeart,
  FiGitBranch,
  FiEye,
  FiUser,
  FiShoppingBag,
} from "react-icons/fi";
import { FaDog, FaCat, FaHorse, FaKiwiBird, FaStarHalf } from "react-icons/fa";
import { GiCow } from "react-icons/gi";
import "./LandingPage.css";
import front2 from "../assets/front2.png";

const animalCategories = [
  { icon: <FaDog size={24} />, name: "Dogs", count: 42 },
  { icon: <FaCat size={24} />, name: "Cats", count: 35 },
  { icon: <FaKiwiBird size={24} />, name: "Birds", count: 28 },
  { icon: <GiCow size={24} />, name: "Cattle", count: 19 },
  { icon: <FaHorse size={24} />, name: "Horses", count: 15 },
  { icon: <FaKiwiBird size={24} />, name: "Poultry", count: 23 },
];

const testimonials = [
  {
    id: 1,
    quote: "The best quality pet food I've found online. My dog loves it!",
    author: "Rahul Kumar",
    role: "Dog Owner",
    initials: "RK",
  },
  {
    id: 2,
    quote:
      "As a livestock farmer, I appreciate the variety and competitive prices.",
    author: "Priya Sharma",
    role: "Poultry Farmer",
    initials: "PS",
  },
  {
    id: 3,
    quote: "Fast delivery and excellent customer service. Will order again!",
    author: "Amit Patel",
    role: "Cat Owner",
    initials: "AP",
  },
];

function LandingPage() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const getImageUrl = (image) => {
    if (!image) return "/default-product-image.png";
    if (image.startsWith("http")) return image;
    if (image.startsWith("/")) return `http://localhost:5000${image}`;
    return `http://localhost:5000/uploads/${image}`;
  };

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       setLoading(true);
  //       setError(null);
  //       const res = await fetch("http://localhost:5000/api/products/featured");
  //       if (!res.ok) throw new Error("Failed to fetch products");
  //       const data = await res.json();
  //       let products = data.topSelling && data.topSelling.length
  //         ? data.topSelling
  //         : data.topRated || [];
  //       setFeaturedProducts(products.slice(0, 4));
  //     } catch (err) {
  //       setError(err.message || "Failed to load products");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchProducts();
  // }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch("http://localhost:5000/api/products/featured");
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();

        // Combine and deduplicate products
        const combined = [...data.topSelling, ...data.topRated];
        const uniqueProducts = Array.from(
          new Map(combined.map((product) => [product._id, product])).values()
        );

        setFeaturedProducts(uniqueProducts.slice(0, 6));
      } catch (err) {
        setError(err.message || "Failed to load products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="landing-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1>
              Premium Nutrition for{" "}
              <span className="text-gradient">Your Beloved Animals</span>
            </h1>
            <p className="subtitle">
              The largest marketplace for pet and livestock food products with
              1000+ happy customers nationwide
            </p>
            <div className="cta-buttons">
              <Link to="/browse" className="btn primary">
                <span>Browse Products</span>
                <FiArrowRight className="icon" />
              </Link>
              <Link to="/signup" className="btn secondary">
                Become a Seller
              </Link>
            </div>
          </div>
          <div className="hero-image">
            <Link to="/login">
            <img src={front2} alt="Happy animals" className="floating" />
            </Link>
            <div className="decoration-circle"></div>
          </div>
        </div>
        <div className="scroll-indicator">
          <div className="mouse">
            <div className="wheel"></div>
          </div>
          <span>Scroll to explore</span>
        </div>
      </section>

      {/* Animal Categories */}
      <section className="categories-section">
        <div className="section-header">
          <h2>Shop by Animal Type</h2>
          <p>Find the perfect nutrition for your companion or livestock</p>
        </div>
        <div className="categories-grid">
          {animalCategories.map((category, index) => (
            <Link
              to={`/browse?animalType=${category.name.toLowerCase()}`}
              key={index}
              className="category-card"
            >
              <div className="category-icon">{category.icon}</div>
              <h3>{category.name}</h3>
              {/* <p className="count">{category.count}+ Products</p> */}
              <div className="hover-indicator"></div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="products-section">
        <div className="section-header">
          <div>
            <h2>Featured Products</h2>
            <p>Top rated and best selling items</p>
          </div>
          <Link to="/browse" className="view-all">
            View All Products <FiArrowRight />
          </Link>
        </div>

        {/* {loading ? (
          <div className="loading-spinner">
            <div className="spinner"></div>
          </div>
        ) : error ? (
          <div className="error-message">
            <p>{error}</p>
          </div>
        ) : featuredProducts.length === 0 ? (
          <div className="no-products">
            <p>No featured products found.</p>
          </div>
        ) : (
          <div className="products-grid">
            {featuredProducts.map((product) => (
              <div key={product._id} className="product-card">
                <div className="product-image">
                  <img
                    src={getImageUrl(product.image)}
                    alt={product.name}
                  />
                  <span className={`product-category ${product.category}`}>
                    {product.category === "pet" ? "Pet" : "Livestock"}
                  </span>
                  <div className="product-overlay">
                    <Link to={`/product/${product._id}`} className="quick-view">
                      Quick View
                    </Link>
                  </div>
                </div>
                <div className="product-details">
                  <h3>{product.name}</h3>
                  <p className="animal-type">For {product.animalType}</p>
                  <div className="rating">
                    <FiStar className="star" />
                    <span>
                      {product.ratings && product.ratings.length > 0
                        ? (
                            product.ratings.reduce((a, b) => a + b, 0) /
                            product.ratings.length
                          ).toFixed(1)
                        : "0.0"}
                    </span>
                    <span className="reviews">({product.ratings?.length || 0} reviews)</span>
                  </div>
                  <div className="product-footer">
                    <span className="price">
                      ₹
                      {product.quantityOptions &&
                      product.quantityOptions[0] &&
                      product.quantityOptions[0].price
                        ? product.quantityOptions[0].price.toFixed(2)
                        : "N/A"}
                    </span>
                    <Link
                      to={`/product/${product._id}`}
                      className="details-btn"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )} */}
        {loading ? (
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Fetching the best for your pets...</p>
          </div>
        ) : error ? (
          <div className="error-message">
            <FiAlertTriangle className="error-icon" />
            <p>{error}</p>
            <button className="retry-btn" onClick={fetchProducts}>
              Try Again
            </button>
          </div>
        ) : featuredProducts.length === 0 ? (
          <div className="no-products">
            <FiPackage className="package-icon" />
            <p>No featured products found</p>
            <p className="subtext">Check back soon for new arrivals!</p>
          </div>
        ) : (
          <div className="products-grid">
            {featuredProducts.map((product) => (
              <div key={product._id} className="product-card">
                <div className="product-image">
                  <img src={getImageUrl(product.image)} alt={product.name} />
                  <span className={`product-category ${product.category}`}>
                    {product.category === "pet" ? (
                      <FiHeart className="category-icon" />
                    ) : (
                      <FiGitBranch className="category-icon" />
                    )}
                    {product.category === "pet" ? "Pet" : "Livestock"}
                  </span>
                  <div className="product-overlay">
                    <Link
                      to={`/product/${product._id.split("-")[0]}`}
                      className="quick-view"
                    >
                      <FiEye className="quick-view-icon" />
                      Quick View
                    </Link>
                  </div>
                </div>
                <div className="product-details">
                  <h3>{product.name}</h3>
                  <p className="animal-type">
                    <FiUser className="animal-icon" />
                    For {product.animalType}
                  </p>

                  {product.isOption && (
                    <div className="product-option">
                      <div className="option-left">
                        <span className="option-label">
                          {product.quantityOption.label}
                        </span>
                        <span className="option-stock">
                          ({product.quantityOption.stock} in stock)
                        </span>
                      </div>
                      <span className="option-price">
                        ₹{product.quantityOption.price.toFixed(2)}
                      </span>
                    </div>
                  )}

                  <div className="rating">
                    {(() => {
                      const avg =
                        product.ratings?.length > 0
                          ? product.ratings.reduce((a, b) => a + b, 0) /
                            product.ratings.length
                          : 0;

                      const fullStars = Math.floor(avg);
                      const hasHalfStar = avg - fullStars >= 0.5;
                      const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

                      return (
                        <>
                          {[...Array(fullStars)].map((_, i) => (
                            <FiStar
                              key={`full-${i}`}
                              className="star-icon full-star"
                            />
                          ))}
                          {hasHalfStar && (
                            <FaStarHalf
                              key="half"
                              className="star-icon half-star"
                            />
                          )}
                          {[...Array(emptyStars)].map((_, i) => (
                            <FiStar
                              key={`empty-${i}`}
                              className="star-icon empty-star"
                            />
                          ))}
                          <span className="rating-value">{avg.toFixed(1)}</span>
                          <span className="reviews">
                            ({product.ratings?.length || 0} reviews)
                          </span>
                        </>
                      );
                    })()}
                  </div>
                  <div className="product-footer">
                    <Link
                      to={`/product/${product._id.split("-")[0]}`}
                      className="details-btn"
                    >
                      <FiShoppingBag className="cart-icon" />
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="section-header center">
          <h2>Why Choose Our Marketplace?</h2>
          <p>We provide the best experience for both buyers and sellers</p>
        </div>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <FiShoppingCart size={32} />
            </div>
            <h3>Easy Shopping</h3>
            <p>
              Browse thousands of products with intuitive filters and search
              functionality.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <FiTruck size={32} />
            </div>
            <h3>Fast Delivery</h3>
            <p>
              Get your orders delivered quickly with our reliable logistics
              partners.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <FiShield size={32} />
            </div>
            <h3>Secure Payments</h3>
            <p>
              All transactions are protected with industry-standard encryption.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <FiPackage size={32} />
            </div>
            <h3>Quality Assurance</h3>
            <p>All products are verified for quality and safety standards.</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section">
        <div className="section-header center">
          <h2>What Our Customers Say</h2>
          <p>Hear from our satisfied customers</p>
        </div>
        <div className="testimonials-container">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`testimonial-card ${
                index === activeTestimonial ? "active" : ""
              }`}
            >
              <div className="testimonial-content">
                <p>"{testimonial.quote}"</p>
              </div>
              <div className="testimonial-author">
                <div className="avatar">{testimonial.initials}</div>
                <div className="author-info">
                  <h4>{testimonial.author}</h4>
                  <p>{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
          <div className="testimonial-dots">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === activeTestimonial ? "active" : ""}`}
                onClick={() => setActiveTestimonial(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Get Started?</h2>
          <p>
            Join thousands of happy customers and suppliers in our marketplace
            today.
          </p>
          <div className="cta-buttons">
            <Link to="/signup" className="btn primary">
              Sign Up Free
            </Link>
            <Link to="/about" className="btn secondary">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        {/* <div className="footer-content"> */}
          {/* <div className="footer-brand">
            <h3>Animal Food Marketplace</h3>
            <p>Premium nutrition for all your animals</p>
            <div className="social-links">
              <a href="#">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#">
                <i className="fab fa-linkedin"></i>
              </a>
            </div>
          </div> */}
          {/* <div className="footer-links">
            <div className="link-column">
              <h4>Shop</h4>
              <Link to="/browse">All Products</Link>
              <Link to="/browse?category=pet">Pet Food</Link>
              <Link to="/browse?category=livestock">Livestock Feed</Link>
              <Link to="/browse?filter=featured">Featured</Link>
            </div>
            <div className="link-column">
              <h4>Company</h4>
              <Link to="/about">About Us</Link>
              <Link to="/contact">Contact</Link>
              <Link to="/blog">Blog</Link>
              <Link to="/careers">Careers</Link>
            </div>
            <div className="link-column">
              <h4>Support</h4>
              <Link to="/faq">FAQs</Link>
              <Link to="/shipping">Shipping</Link>
              <Link to="/returns">Returns</Link>
              <Link to="/contact">Help Center</Link>
            </div>
            <div className="link-column">
              <h4>Legal</h4>
              <Link to="/privacy">Privacy Policy</Link>
              <Link to="/terms">Terms of Service</Link>
              <Link to="/cookies">Cookie Policy</Link>
            </div>
          </div> */}
        {/* </div> */}
        <div className="footer-bottom">
          <p>
            &copy; {new Date().getFullYear()} Animal Food Marketplace. All
            rights reserved.
          </p>
          <div className="payment-methods">
            <i className="fab fa-cc-visa"></i>
            <i className="fab fa-cc-mastercard"></i>
            <i className="fab fa-cc-paypal"></i>
            <i className="fab fa-cc-amazon-pay"></i>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
