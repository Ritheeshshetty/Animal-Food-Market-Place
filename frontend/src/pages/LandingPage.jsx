import React from "react";
import { Link } from "react-router-dom";
import {
  FiShoppingCart,
  FiTruck,
  FiShield,
  FiStar,
  FiPackage,
} from "react-icons/fi";
import { FaDog, FaCat, FaHorse, FaKiwiBird } from "react-icons/fa";
import { GiCow } from "react-icons/gi";
import "./LandingPage.css";
import front2 from '../assets/front2.png';

// Sample products data - replace with API call
const featuredProducts = [
  {
    id: 1,
    name: "Premium Dog Food",
    category: "pet",
    animalType: "dog",
    price: 24.99,
    rating: 4.5,
    image: "https://via.placeholder.com/300x200?text=Dog+Food",
  },
  {
    id: 2,
    name: "Organic Cat Treats",
    category: "pet",
    animalType: "cat",
    price: 12.99,
    rating: 4.2,
    image: "https://via.placeholder.com/300x200?text=Cat+Treats",
  },
  {
    id: 3,
    name: "Poultry Feed",
    category: "livestock",
    animalType: "poultry",
    price: 18.5,
    rating: 4.7,
    image: "https://via.placeholder.com/300x200?text=Poultry+Feed",
  },
  {
    id: 4,
    name: "Cattle Nutrition Mix",
    category: "livestock",
    animalType: "cattle",
    price: 32.99,
    rating: 4.8,
    image: "https://via.placeholder.com/300x200?text=Cattle+Feed",
  },
];

const animalCategories = [
  { icon: <FaDog />, name: "Dogs", count: 42 },
  { icon: <FaCat />, name: "Cats", count: 35 },
  { icon: <FaKiwiBird />, name: "Birds", count: 28 },
  { icon: <GiCow />, name: "Cattle", count: 19 },
  { icon: <FaHorse />, name: "Horses", count: 15 },
  { icon: <FaKiwiBird />, name: "Poultry", count: 23 },
];

function LandingPage() {
  return (
    <div className="landing-main">
      {/* Hero Section */}
      <section className="landing-hero-main">
        <div className="landing-hero-content-main">
          <h1 className="landing-hero-title-main">
            Premium Nutrition for{" "}
            <span className="text-highlight-main">Your Animals</span>
          </h1>
          <p className="landing-hero-subtitle-main">
            The largest marketplace for pet and livestock food products with
            1000+ happy customers
          </p>
          <div className="landing-hero-buttons-main">
            <Link to="/login" className="landing-hero-button-primary-main">
              Browse Products
            </Link>
            <Link to="/signup" className="landing-hero-button-secondary-main">
              Become a Seller
            </Link>
          </div>
        </div>
        <div className="landing-hero-image-main">
          <img
            src={front2}
            alt="Happy animals"
          />
        </div>
      </section>

      {/* Animal Categories */}
      <section className="landing-categories-main">
        <h2 className="landing-section-title-main">Shop by Animal Type</h2>
        <div className="landing-categories-grid-main">
          {animalCategories.map((category, index) => (
            <Link
              to={`/browse?animalType=${name.toLowerCase()}`}
              key={index}
              className="landing-category-card-main"
            >
              <div className="landing-category-icon-main">{category.icon}</div>
              <h3 className="landing-category-name-main">{category.name}</h3>
              <p className="landing-category-count-main">
                {category.count}+ Products
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="landing-products-main">
        <div className="landing-products-header-main">
          <h2 className="landing-section-title-main">Featured Products</h2>
          <Link to="/browse" className="landing-view-all-main">
            View All Products →
          </Link>
        </div>
        <div className="landing-products-grid-main">
          {featuredProducts.map((product) => (
            <div key={product.id} className="landing-product-card-main">
              <div className="landing-product-image-main">
                <img src={product.image} alt={product.name} />
                <span
                  className={`landing-product-category-main ${
                    product.category === "pet"
                      ? "landing-product-category-pet-main"
                      : "landing-product-category-livestock-main"
                  }`}
                >
                  {product.category}
                </span>
              </div>
              <div className="landing-product-content-main">
                <h3 className="landing-product-name-main">{product.name}</h3>
                <p className="landing-product-type-main">
                  For {product.animalType}
                </p>
                <div className="landing-product-rating-main">
                  <FiStar className="landing-product-rating-icon-main" />
                  <span>{product.rating}</span>
                </div>
                <div className="landing-product-footer-main">
                  <span className="landing-product-price-main">
                    ₹{product.price.toFixed(2)}
                  </span>
                  <Link
                    to={`/product/${product.id}`}
                    className="landing-product-button-main"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="landing-features-main">
        <h2 className="landing-section-title-main">
          Why Choose Our Marketplace?
        </h2>
        <div className="landing-features-grid-main">
          <div className="landing-feature-card-main">
            <FiShoppingCart className="landing-feature-icon-main" />
            <h3 className="landing-feature-title-main">Easy Shopping</h3>
            <p className="landing-feature-text-main">
              Browse thousands of products with intuitive filters and search
              functionality.
            </p>
          </div>
          <div className="landing-feature-card-main">
            <FiTruck className="landing-feature-icon-main" />
            <h3 className="landing-feature-title-main">Fast Delivery</h3>
            <p className="landing-feature-text-main">
              Get your orders delivered quickly with our reliable logistics
              partners.
            </p>
          </div>
          <div className="landing-feature-card-main">
            <FiShield className="landing-feature-icon-main" />
            <h3 className="landing-feature-title-main">Secure Payments</h3>
            <p className="landing-feature-text-main">
              All transactions are protected with industry-standard encryption.
            </p>
          </div>
          <div className="landing-feature-card-main">
            <FiPackage className="landing-feature-icon-main" />
            <h3 className="landing-feature-title-main">Quality Assurance</h3>
            <p className="landing-feature-text-main">
              All products are verified for quality and safety standards.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="landing-testimonials-main">
        <h2 className="landing-section-title-main">What Our Customers Say</h2>
        <div className="landing-testimonials-grid-main">
          <div className="landing-testimonial-card-main">
            <div className="landing-testimonial-content-main">
              "The best quality pet food I've found online. My dog loves it!"
            </div>
            <div className="landing-testimonial-author-main">
              <div className="landing-testimonial-avatar-main">RK</div>
              <div className="landing-testimonial-info-main">
                <h4>Rahul Kumar</h4>
                <p>Dog Owner</p>
              </div>
            </div>
          </div>
          <div className="landing-testimonial-card-main">
            <div className="landing-testimonial-content-main">
              "As a livestock farmer, I appreciate the variety and competitive
              prices."
            </div>
            <div className="landing-testimonial-author-main">
              <div className="landing-testimonial-avatar-main">PS</div>
              <div className="landing-testimonial-info-main">
                <h4>Priya Sharma</h4>
                <p>Poultry Farmer</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="landing-cta-main">
        <h2 className="landing-cta-title-main">Ready to Get Started?</h2>
        <p className="landing-cta-text-main">
          Join thousands of happy customers and suppliers in our marketplace
          today.
        </p>
        <div className="landing-cta-buttons-main">
          <Link to="/signup" className="landing-cta-button-primary-main">
            Sign Up Free
          </Link>
          <Link to="/about" className="landing-cta-button-secondary-main">
            Learn More
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer-main">
        <div className="landing-footer-content-main">
          <div className="landing-footer-brand-main">
            <h3>Animal Food Marketplace</h3>
            <p>Premium nutrition for all your animals</p>
          </div>
          <div className="landing-footer-links-main">
            <div className="landing-footer-column-main">
              <h4>Shop</h4>
              <Link to="/browse">All Products</Link>
              <Link to="/browse?category=pet">Pet Food</Link>
              <Link to="/browse?category=livestock">Livestock Feed</Link>
            </div>
            <div className="landing-footer-column-main">
              <h4>Company</h4>
              <Link to="/about">About Us</Link>
              <Link to="/contact">Contact</Link>
              <Link to="/blog">Blog</Link>
            </div>
            <div className="landing-footer-column-main">
              <h4>Legal</h4>
              <Link to="/privacy">Privacy Policy</Link>
              <Link to="/terms">Terms of Service</Link>
              <Link to="/returns">Returns Policy</Link>
            </div>
          </div>
        </div>
        <div className="landing-footer-copyright-main">
          &copy; {new Date().getFullYear()} Animal Food Marketplace. All rights
          reserved.
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
