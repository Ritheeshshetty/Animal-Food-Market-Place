// import { Link, useNavigate } from 'react-router-dom';
// import { FaShoppingCart, FaUser, FaBoxOpen } from 'react-icons/fa';
// import { MdOutlineRateReview } from 'react-icons/md';
// import { BiSolidDog } from 'react-icons/bi';
// import {  useState } from 'react';
// import api from '../api';
// // import './NavBar.css';

// export default function NavBar() {
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();

//   const handleLogout = async () => {
//     try {
//       await api.post("/auth/logout");
//       alert("Logged out successfully");
//       navigate("/");
//     } catch (err) {
//       alert("Logout failed");
//     }
//   };

//   return (
//     <nav className="navbar-main">
//       <div className="navbar-brand-main">
//         <BiSolidDog className="navbar-brand-icon-main" />
//         <Link to="/customer" className="navbar-brand-text-main">Animal Food Marketplace</Link>
//       </div>

//       <ul className="navbar-links-main">
//         <li className="navbar-item-main">
//           <Link to="/browse" className="navbar-link-main">Browse Products</Link>
//         </li>
//         <li className="navbar-item-main">
//           <Link to="/cart" className="navbar-link-main">
//             <FaShoppingCart className="navbar-link-icon-main" />
//             <span>Cart</span>
//           </Link>
//         </li>
//         <li className="navbar-item-main">
//           <Link to="/orders" className="navbar-link-main">
//             <FaBoxOpen className="navbar-link-icon-main" />
//             <span>Orders</span>
//           </Link>
//         </li>
//         <li className="navbar-item-main">
//           <Link to="/reviews" className="navbar-link-main">
//             <MdOutlineRateReview className="navbar-link-icon-main" />
//             <span>Reviews</span>
//           </Link>
//         </li>
//         <li className="navbar-item-main">
//           <Link to="/profile" className="navbar-link-main">
//             <FaUser className="navbar-link-icon-main" />
//             <span>Profile</span>
//           </Link>
//         </li>
//       </ul>

//       <div className="navbar-auth-main">
//         <button onClick={handleLogout} className="delete-btn">
//           Logout
//         </button>
//       </div>
//     </nav>
//   );
// }

import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaUser, FaBoxOpen } from "react-icons/fa";
import { MdOutlineRateReview } from "react-icons/md";
import { BiSolidDog } from "react-icons/bi";
import { useState } from "react";
import api from "../api";
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
    <nav className="navbar">
      <div className="navbar-brand">
        <BiSolidDog className="navbar-brand-icon" />
        <Link to="/customer" className="navbar-brand-text">
          Animal Food Marketplace
        </Link>
      </div>

      <div className="navbar-content">
        <ul className="navbar-links">
          <li className="navbar-item">
            <Link to="/browse" className="navbar-link">
              Browse Products
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/cart" className="navbar-link">
              <FaShoppingCart className="navbar-link-icon" />
              <span className="navbar-link-text">Cart</span>
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/customer/orders" className="navbar-link">
              <FaBoxOpen className="navbar-link-icon" />
              <span className="navbar-link-text">Orders</span>
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/customer/reviews" className="navbar-link">
              <MdOutlineRateReview className="navbar-link-icon" />
              <span className="navbar-link-text">Reviews</span>
            </Link>
          </li>
          {/* <li className="navbar-item">
            <Link to="/profile" className="navbar-link">
              <FaUser className="navbar-link-icon" />
              <span className="navbar-link-text">Profile</span>
            </Link>
          </li> */}
        </ul>

        <div className="navbar-actions">
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
