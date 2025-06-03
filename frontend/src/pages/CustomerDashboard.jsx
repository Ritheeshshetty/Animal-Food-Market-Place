import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiPackage, FiShoppingCart, FiStar, FiTrendingUp } from 'react-icons/fi';
import api from '../api';
// import './CustomerDashboard.css';

function CustomerDashboard() {
  const navigate = useNavigate();

  // Sample data - replace with actual API calls
  const recommendedProducts = [
    // { id: 1, name: 'Premium Dog Food', category: 'pet', animalType: 'dog', price: 24.99, rating: 4.5 },
    // { id: 2, name: 'Organic Cat Treats', category: 'pet', animalType: 'cat', price: 12.99, rating: 4.2 },
    // { id: 3, name: 'Poultry Feed', category: 'livestock', animalType: 'poultry', price: 18.50, rating: 4.7 },
    // { id: 4, name: 'Healthy Bird Seed', category: 'pet', animalType: 'bird', price: 8.99, rating: 4.0 },
  ];

  const quickActions = [
    { icon: <FiShoppingCart />, label: 'View Cart', path: '/cart' },
    { icon: <FiPackage />, label: 'My Orders', path: '/orders' },
    { icon: <FiStar />, label: 'My Reviews', path: '/reviews' },
    { icon: <FiTrendingUp />, label: 'Special Offers', path: '/offers' },
  ];

  return (
    <div className="customer-dashboard-main">
      {/* Header Section */}
      <div className="customer-dashboard-header-main">
        <h1 className="customer-dashboard-title-main">Welcome Back!</h1>
        <p className="customer-dashboard-subtitle-main">Here's what's new for your pets and livestock</p>
      </div>

      {/* Quick Actions */}
      <div className="customer-dashboard-actions-main">
        {quickActions.map((action, index) => (
          <Link 
            key={index} 
            to={action.path}
            className="customer-dashboard-action-card-main"
          >
            <div className="customer-dashboard-action-icon-main">
              {action.icon}
            </div>
            <span className="customer-dashboard-action-label-main">
              {action.label}
            </span>
          </Link>
        ))}
      </div>

      {/* Recommended Products */}
      <div className="customer-dashboard-section-main">
        <h2 className="customer-dashboard-section-title-main">
          <FiStar className="customer-dashboard-section-icon-main" />
          Recommended For You
        </h2>
        
        <div className="customer-dashboard-products-main">
          {recommendedProducts.map(product => (
            <div key={product.id} className="customer-dashboard-product-card-main">
              <div className="customer-dashboard-product-header-main">
                <span className={`customer-dashboard-product-category-main ${
                  product.category === 'pet' 
                    ? 'customer-dashboard-product-category-pet-main' 
                    : 'customer-dashboard-product-category-livestock-main'
                }`}>
                  {product.category}
                </span>
                <span className="customer-dashboard-product-rating-main">
                  <FiStar className="customer-dashboard-product-rating-icon-main" />
                  {product.rating}
                </span>
              </div>
              
              <h3 className="customer-dashboard-product-name-main">{product.name}</h3>
              <p className="customer-dashboard-product-type-main">For {product.animalType}</p>
              
              <div className="customer-dashboard-product-footer-main">
                <span className="customer-dashboard-product-price-main">₹{product.price.toFixed(2)}</span>
                <Link 
                  to={`/product/${product.id}`}
                  className="customer-dashboard-product-button-main"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Browse All Button */}
      <div className="customer-dashboard-browse-main">
        <Link 
          to="/browse" 
          className="customer-dashboard-browse-button-main"
        >
          Browse All Products
        </Link>
      </div>
    </div>
  );
}

export default CustomerDashboard;