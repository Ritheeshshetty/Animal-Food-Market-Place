import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaUser, FaBoxOpen, FaBars, FaTimes } from "react-icons/fa";
import { MdOutlineRateReview } from "react-icons/md";
import { BiSolidDog } from "react-icons/bi";
import { useState } from "react";
import api from "../api";

export default function NavBar() {
  const [user, setUser] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
      alert("Logged out successfully");
      navigate("/");
    } catch (err) {
      alert("Logout failed");
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="customer-nav">
      <div className="customer-nav-container">
        <div className="customer-nav-brand">
          <BiSolidDog className="customer-nav-brand-icon" />
          <Link to="/customer" className="customer-nav-brand-text">
            Animal Food Marketplace
          </Link>
        </div>

        <button className="customer-nav-mobile-toggle" onClick={toggleMobileMenu}>
          {mobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        <div className={`customer-nav-content ${mobileMenuOpen ? 'customer-nav-content-open' : ''}`}>
          <ul className="customer-nav-links">
            <li className="customer-nav-item">
              <Link to="/browse" className="customer-nav-link" onClick={() => setMobileMenuOpen(false)}>
                <span className="customer-nav-link-text">Browse Products</span>
              </Link>
            </li>
            <li className="customer-nav-item">
              <Link to="/cart" className="customer-nav-link" onClick={() => setMobileMenuOpen(false)}>
                <FaShoppingCart className="customer-nav-link-icon" />
                <span className="customer-nav-link-text">Cart</span>
              </Link>
            </li>
            <li className="customer-nav-item">
              <Link to="/customer/orders" className="customer-nav-link" onClick={() => setMobileMenuOpen(false)}>
                <FaBoxOpen className="customer-nav-link-icon" />
                <span className="customer-nav-link-text">Orders</span>
              </Link>
            </li>
            <li className="customer-nav-item">
              <Link to="/customer/reviews" className="customer-nav-link" onClick={() => setMobileMenuOpen(false)}>
                <MdOutlineRateReview className="customer-nav-link-icon" />
                <span className="customer-nav-link-text">Reviews</span>
              </Link>
            </li>
          </ul>

          <div className="customer-nav-actions">
            <button onClick={handleLogout} className="customer-nav-logout-btn">
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}