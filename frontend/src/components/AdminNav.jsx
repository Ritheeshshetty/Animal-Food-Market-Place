import { Link, useNavigate } from 'react-router-dom';
import api from '../api';
import { FiLogOut, FiUsers, FiPackage, FiShoppingBag, FiHome } from 'react-icons/fi';

export default function AdminNav() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post('/auth/logout');
      alert('Logged out successfully');
      navigate('/login');
    } catch (err) {
      alert('Logout failed');
    }
  };

  return (
    <nav className="admin-navbar">
      <div className="admin-navbar-container">
        <Link to="/admin" className="admin-navbar-brand">
          <FiHome className="admin-navbar-icon" />
          <span>Admin Panel</span>
        </Link>
        
        <div className="admin-navbar-links">
          <Link to="/admin/users" className="admin-navbar-link">
            <FiUsers className="admin-navbar-icon" />
            <span>Users</span>
          </Link>
          <Link to="/admin/products" className="admin-navbar-link">
            <FiPackage className="admin-navbar-icon" />
            <span>Products</span>
          </Link>
          <Link to="/admin/orders" className="admin-navbar-link">
            <FiShoppingBag className="admin-navbar-icon" />
            <span>Orders</span>
          </Link>
        </div>
        
        <button onClick={handleLogout} className="admin-navbar-logout">
          <FiLogOut className="admin-navbar-icon" />
          <span>Logout</span>
        </button>
      </div>
    </nav>
  );
}