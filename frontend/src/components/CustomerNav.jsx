import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaUser, FaBoxOpen } from 'react-icons/fa';
import { MdOutlineRateReview } from 'react-icons/md';
import { BiSolidDog } from 'react-icons/bi';
import {  useState } from 'react';
import api from '../api';
// import './NavBar.css';

export default function NavBar() {
  const [user, setUser] = useState(null);
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

  return (
    <nav className="navbar-main">
      <div className="navbar-brand-main">
        <BiSolidDog className="navbar-brand-icon-main" />
        <Link to="/customer" className="navbar-brand-text-main">Animal Food Marketplace</Link>
      </div>

      <ul className="navbar-links-main">
        <li className="navbar-item-main">
          <Link to="/browse" className="navbar-link-main">Browse Products</Link>
        </li>
        <li className="navbar-item-main">
          <Link to="/cart" className="navbar-link-main">
            <FaShoppingCart className="navbar-link-icon-main" />
            <span>Cart</span>
          </Link>
        </li>
        <li className="navbar-item-main">
          <Link to="/orders" className="navbar-link-main">
            <FaBoxOpen className="navbar-link-icon-main" />
            <span>Orders</span>
          </Link>
        </li>
        <li className="navbar-item-main">
          <Link to="/reviews" className="navbar-link-main">
            <MdOutlineRateReview className="navbar-link-icon-main" />
            <span>Reviews</span>
          </Link>
        </li>
        <li className="navbar-item-main">
          <Link to="/profile" className="navbar-link-main">
            <FaUser className="navbar-link-icon-main" />
            <span>Profile</span>
          </Link>
        </li>
      </ul>

      <div className="navbar-auth-main">
        <button onClick={handleLogout} className="delete-btn">
          Logout
        </button>
      </div>
    </nav>
  );
}