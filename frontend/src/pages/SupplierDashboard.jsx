// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import api from '../api';
// import { FiLogOut, FiPlus, FiPackage, FiList } from 'react-icons/fi';
// import { MdInventory, MdLocalShipping } from 'react-icons/md';

// function SupplierDashboard() {
//   const navigate = useNavigate();

//   const handleLogout = async () => {
//     try {
//       await api.post('/auth/logout');
//       alert('Logged out successfully');
//       navigate('/');
//     } catch (err) {
//       alert('Logout failed');
//     }
//   };

//   return (
//     <div className="supplier-dashboard">
//       <header className="dashboard-header">
//         <div className="header-content">
//           <h1 className="dashboard-title">Supplier Dashboard</h1>
//           <p className="dashboard-subtitle">Manage your products and orders</p>
//         </div>
//         <button onClick={handleLogout} className="logout-btn">
//           <FiLogOut className="logout-icon" />
//           Logout
//         </button>
//       </header>

//       <div className="dashboard-grid">
//         <Link to="/supplier/add-product" className="dashboard-card add-product">
//           <div className="card-icon">
//             <FiPlus size={28} />
//           </div>
//           <h3>Add New Product</h3>
//           <p>Create new product listings</p>
//         </Link>

//         <Link to="/supplier/inventory" className="dashboard-card inventory">
//           <div className="card-icon">
//             <MdInventory size={28} />
//           </div>
//           <h3>Manage Inventory</h3>
//           <p>View and update stock levels</p>
//         </Link>

//         <Link to="/supplier/orders" className="dashboard-card orders">
//           <div className="card-icon">
//             <MdLocalShipping size={28} />
//           </div>
//           <h3>View Orders</h3>
//           <p>Process customer orders</p>
//         </Link>

//         <Link to="/supplier/products" className="dashboard-card products">
//           <div className="card-icon">
//             <FiPackage size={28} />
//           </div>
//           <h3>My Products</h3>
//           <p>Manage existing products</p>
//         </Link>

//         <Link to="/supplier/reports" className="dashboard-card reports">
//           <div className="card-icon">
//             <FiList size={28} />
//           </div>
//           <h3>Sales Reports</h3>
//           <p>View sales analytics</p>
//         </Link>
//       </div>
//     </div>
//   );
// }

// export default SupplierDashboard;



import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';
import { 
  FiLogOut, 
  FiPlus, 
  FiPackage, 
  FiList, 
  FiTruck,
  FiDollarSign,
  FiAlertCircle,
  FiTrendingUp
} from 'react-icons/fi';
import { MdInventory, MdLocalShipping, MdOutlineReviews } from 'react-icons/md';
import { BsGraphUp } from 'react-icons/bs';
import './SupplierDashboard.css';

function SupplierDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalProducts: 0,
    pendingOrders: 0,
    lowStockItems: 0,
    monthlySales: 0,
    recentOrders: []
  });
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchDashboardData = async () => {
  //     try {
  //       const response = await api.get('supplier/dashboard');
  //       setStats(response.data);
  //     } catch (err) {
  //       console.error('Error fetching dashboard data:', err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchDashboardData();
  // }, []);

  useEffect(() => {
  const fetchDashboardData = async () => {
    try {
      const response = await api.get('supplier/dashboard');
      setStats(response.data);
      // console.log('Dashboard data:', response.data);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };
  fetchDashboardData();
}, []);


  const handleLogout = async () => {
    try {
      await api.post('/auth/logout');
      alert('Logged out successfully');
      navigate('/');
    } catch (err) {
      alert('Logout failed');
    }
  };

  if (loading) {
    return (
      <div className="supplier-dashboard-loading">
        <div className="loading-spinner">Loading Dashboard...</div>
      </div>
    );
  }

  return (
    <div className="supplier-dashboard-main">
      {/* Header Section */}
      <header className="supplier-dashboard-header-main">
        <div className="supplier-dashboard-header-content-main">
          <h1 className="supplier-dashboard-title-main">Supplier Dashboard</h1>
          <p className="supplier-dashboard-subtitle-main">
            Welcome back! Here's your business overview
          </p>
        </div>
        <button onClick={handleLogout} className="supplier-dashboard-logout-button-main">
          <FiLogOut className="supplier-dashboard-logout-icon-main" />
          Logout
        </button>
      </header>

      {/* Stats Overview */}
      <div className="supplier-dashboard-stats-main">
        <div className="supplier-dashboard-stat-card-main">
          <div className="supplier-dashboard-stat-icon-main supplier-dashboard-stat-icon-products-main">
            <FiPackage size={24} />
          </div>
          <div>
            <h3 className="supplier-dashboard-stat-title-main">Total Products</h3>
            <p className="supplier-dashboard-stat-value-main">{stats.totalProducts}</p>
          </div>
        </div>

        <div className="supplier-dashboard-stat-card-main">
          <div className="supplier-dashboard-stat-icon-main supplier-dashboard-stat-icon-orders-main">
            <FiTruck size={24} />
          </div>
          <div>
            <h3 className="supplier-dashboard-stat-title-main">Pending Orders</h3>
            <p className="supplier-dashboard-stat-value-main">{stats.pendingOrders}</p>
          </div>
        </div>

        <div className="supplier-dashboard-stat-card-main">
          <div className="supplier-dashboard-stat-icon-main supplier-dashboard-stat-icon-stock-main">
            <FiAlertCircle size={24} />
          </div>
          <div>
            <h3 className="supplier-dashboard-stat-title-main">Low Stock Items</h3>
            <p className="supplier-dashboard-stat-value-main">{stats.lowStockItems}</p>
          </div>
        </div>

        <div className="supplier-dashboard-stat-card-main">
          <div className="supplier-dashboard-stat-icon-main supplier-dashboard-stat-icon-sales-main">
            <FiDollarSign size={24} />
          </div>
          <div>
            <h3 className="supplier-dashboard-stat-title-main">Monthly Sales</h3>
            <p className="supplier-dashboard-stat-value-main">₹{stats.monthlySales.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="supplier-dashboard-grid-main">
        <Link to="/supplier/add-product" className="supplier-dashboard-card-main supplier-dashboard-card-add-main">
          <div className="supplier-dashboard-card-icon-main">
            <FiPlus size={28} />
          </div>
          <h3 className="supplier-dashboard-card-title-main">Add New Product</h3>
          <p className="supplier-dashboard-card-text-main">Create new product listings</p>
        </Link>

        <Link to="/supplier/inventory" className="supplier-dashboard-card-main supplier-dashboard-card-inventory-main">
          <div className="supplier-dashboard-card-icon-main">
            <MdInventory size={28} />
          </div>
          <h3 className="supplier-dashboard-card-title-main">Manage Inventory</h3>
          <p className="supplier-dashboard-card-text-main">View and update stock levels</p>
        </Link>

        <Link to="/supplier/orders" className="supplier-dashboard-card-main supplier-dashboard-card-orders-main">
          <div className="supplier-dashboard-card-icon-main">
            <MdLocalShipping size={28} />
          </div>
          <h3 className="supplier-dashboard-card-title-main">View Orders</h3>
          <p className="supplier-dashboard-card-text-main">Process customer orders</p>
        </Link>

        <Link to="/supplier/products" className="supplier-dashboard-card-main supplier-dashboard-card-products-main">
          <div className="supplier-dashboard-card-icon-main">
            <FiPackage size={28} />
          </div>
          <h3 className="supplier-dashboard-card-title-main">My Products</h3>
          <p className="supplier-dashboard-card-text-main">Manage existing products</p>
        </Link>

        <Link to="/supplier/reports" className="supplier-dashboard-card-main supplier-dashboard-card-reports-main">
          <div className="supplier-dashboard-card-icon-main">
            <BsGraphUp size={28} />
          </div>
          <h3 className="supplier-dashboard-card-title-main">Sales Reports</h3>
          <p className="supplier-dashboard-card-text-main">View sales analytics</p>
        </Link>

        <Link to="/supplier/reviews" className="supplier-dashboard-card-main supplier-dashboard-card-reviews-main">
          <div className="supplier-dashboard-card-icon-main">
            <MdOutlineReviews size={28} />
          </div>
          <h3 className="supplier-dashboard-card-title-main">Order Reviews</h3>
          <p className="supplier-dashboard-card-text-main">View customer feedback</p>
        </Link>
      </div>

      {/* Recent Orders Table */}
      <div className="supplier-dashboard-recent-orders-main">
        <h2 className="supplier-dashboard-section-title-main">
          Recent Orders
        </h2>
        {stats.recentOrders.length > 0 ? (
          <div className="supplier-dashboard-orders-table-main">
            <table>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                  {/* <th>Action</th> */}
                </tr>
              </thead>
              <tbody>
                {stats.recentOrders.map(order => (
                  <tr key={order.id}>
                    <td>#{order.id}</td>
                    <td>{order.customerName}</td>
                    <td>{new Date(order.date).toLocaleDateString()}</td>
                    <td>₹{order.amount.toFixed(2)}</td>
                    <td>
                      <span className={`supplier-dashboard-order-status-main supplier-dashboard-order-status-${order.status.toLowerCase()}-main`}>
                        {order.status}
                      </span>
                    </td>
                    {/* <td>
                      <Link 
                        to={`/supplier/orders/${order.id}`} 
                        className="supplier-dashboard-order-action-main"
                      >
                        View
                      </Link>
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="supplier-dashboard-no-orders-main">
            <FiTruck className="supplier-dashboard-no-orders-icon-main" />
            <p>No recent orders found</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default SupplierDashboard;