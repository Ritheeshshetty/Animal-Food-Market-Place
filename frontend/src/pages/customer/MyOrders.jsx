import React, { useEffect, useState } from 'react';
import api from '../../api';
import { FiBox, FiClock, FiCheckCircle, FiTruck, FiAlertCircle } from 'react-icons/fi';
import './MyOrders.css';
import { useNavigate } from "react-router-dom";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get('/orders/my', { withCredentials: true });
        setOrders(res.data);
      } catch (err) {
        alert('Failed to fetch your orders.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return <FiClock className="status-icon pending" />;
      case 'processing':
        return <FiBox className="status-icon processing" />;
      case 'shipped':
        return <FiTruck className="status-icon shipped" />;
      case 'delivered':
        return <FiCheckCircle className="status-icon delivered" />;
      case 'cancelled':
        return <FiAlertCircle className="status-icon cancelled" />;
      default:
        return <FiBox className="status-icon" />;
    }
  };

  return (
    <div className="orders-page">
      <header className="orders-header">
        <FiBox className="header-icon" />
        <h1 className="orders-title">My Orders</h1>
      </header>

      {loading ? (
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading your orders...</p>
        </div>
      ) : orders.length === 0 ? (
        <div className="empty-state">
          <FiBox className="empty-icon" />
          <h3>No Orders Yet</h3>
          <p>You haven't placed any orders with us yet.</p>
        </div>
      ) : (
        <div className="orders-grid">
          {orders.map((order) => (
            <div key={order._id} className="order-card">
              <div className="order-header">
                <h3 className="order-id">Order #{order._id.slice(-6).toUpperCase()}</h3>
                <div className={`order-status ${order.status.toLowerCase()}`}>
                  {getStatusIcon(order.status)}
                  <span>{order.status}</span>
                </div>
              </div>

              <div className="order-meta">
                <div className="meta-item">
                  <span className="meta-label">Date:</span>
                  <span className="meta-value">
                    {new Date(order.createdAt).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Total:</span>
                  <span className="meta-value">₹{order.totalAmount.toFixed(2)}</span>
                </div>
              </div>

              <div className="order-items">
                <h4 className="items-title">Items Ordered</h4>
                <ul className="items-list">
                  {order.items.map((item, idx) => (
                    <li key={idx} className="item">
                      <span className="item-name">{item.product?.name}</span>
                      <span className="item-quantity">
                        {item.quantityLabel} × {item.quantity}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <button className="order-action view-button" onClick={() => navigate(`/orders/${order._id}`)}>
                View Details
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;