import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';
import { FiLogOut, FiPlus, FiPackage, FiList } from 'react-icons/fi';
import { MdInventory, MdLocalShipping } from 'react-icons/md';

function SupplierDashboard() {
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
    <div className="supplier-dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <h1 className="dashboard-title">Supplier Dashboard</h1>
          <p className="dashboard-subtitle">Manage your products and orders</p>
        </div>
        <button onClick={handleLogout} className="logout-btn">
          <FiLogOut className="logout-icon" />
          Logout
        </button>
      </header>

      <div className="dashboard-grid">
        <Link to="/supplier/add-product" className="dashboard-card add-product">
          <div className="card-icon">
            <FiPlus size={28} />
          </div>
          <h3>Add New Product</h3>
          <p>Create new product listings</p>
        </Link>

        <Link to="/supplier/inventory" className="dashboard-card inventory">
          <div className="card-icon">
            <MdInventory size={28} />
          </div>
          <h3>Manage Inventory</h3>
          <p>View and update stock levels</p>
        </Link>

        <Link to="/supplier/orders" className="dashboard-card orders">
          <div className="card-icon">
            <MdLocalShipping size={28} />
          </div>
          <h3>View Orders</h3>
          <p>Process customer orders</p>
        </Link>

        <Link to="/supplier/products" className="dashboard-card products">
          <div className="card-icon">
            <FiPackage size={28} />
          </div>
          <h3>My Products</h3>
          <p>Manage existing products</p>
        </Link>

        <Link to="/supplier/reports" className="dashboard-card reports">
          <div className="card-icon">
            <FiList size={28} />
          </div>
          <h3>Sales Reports</h3>
          <p>View sales analytics</p>
        </Link>
      </div>
    </div>
  );
}

export default SupplierDashboard;