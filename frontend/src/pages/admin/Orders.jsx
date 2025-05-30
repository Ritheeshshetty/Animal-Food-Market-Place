// src/pages/admin/Orders.jsx
import { useEffect, useState } from 'react';
import api from '../../api';
import AdminNav from '../../components/AdminNav';
import { FiTrash2, FiTruck, FiCheckCircle, FiClock, FiDollarSign, FiPackage } from 'react-icons/fi';
import { BsBoxSeam, BsGeoAlt } from 'react-icons/bs';
import { MdOutlineEmail } from 'react-icons/md';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const statusIcons = {
    pending: <FiClock className="status-icon" />,
    shipped: <FiTruck className="status-icon" />,
    delivered: <FiCheckCircle className="status-icon" />
  };

  const statusColors = {
    pending: 'bg-amber-100 text-amber-800',
    shipped: 'bg-blue-100 text-blue-800',
    delivered: 'bg-green-100 text-green-800'
  };

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await api.get('/admin/orders');
      setOrders(res.data);
    } catch (err) {
      alert('Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  const deleteOrder = async (id) => {
    if (!window.confirm('Are you sure you want to delete this order?')) return;
    try {
      await api.delete(`/admin/orders/${id}`);
      fetchOrders();
    } catch (err) {
      alert('Failed to delete order');
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/admin/orders/${id}/status`, { status });
      fetchOrders();
    } catch (err) {
      alert('Failed to update status');
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="admin-dashboard">
      <AdminNav />
      
      <div className="admin-container">
        <div className="admin-header">
          <h1 className="admin-title">Order Management</h1>
          <p className="admin-subtitle">View and manage customer orders</p>
        </div>

        {loading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading orders...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="empty-state">
            <FiPackage className="empty-icon" />
            <p>No orders found</p>
          </div>
        ) : (
          <div className="orders-grid">
            {orders.map(order => (
              <div 
                className={`order-card ${statusColors[order.status]}`}
                key={order._id}
              >
                <div className="order-header">
                  <div className="order-id">Order #{order._id.slice(-6).toUpperCase()}</div>
                  <div className="order-date">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </div>
                </div>

                <div className="order-customer">
                  <div className="customer-info">
                    <div className="customer-name">{order.customer?.name}</div>
                    <div className="customer-email">
                      <MdOutlineEmail className="icon" />
                      {order.customer?.email}
                    </div>
                  </div>
                  <div className={`order-status ${statusColors[order.status]}`}>
                    {statusIcons[order.status]}
                    <select
                      value={order.status}
                      onChange={(e) => updateStatus(order._id, e.target.value)}
                      className="status-select"
                    >
                      <option value="pending">Pending</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                    </select>
                  </div>
                </div>

                <div className="order-shipping">
                  <BsGeoAlt className="icon" />
                  <div>
                    <div className="shipping-title">Shipping Address</div>
                    <div className="shipping-address">{order.shippingAddress}</div>
                  </div>
                </div>

                <div className="order-items">
                  <div className="items-title">
                    <BsBoxSeam className="icon" />
                    Ordered Items
                  </div>
                  <ul className="items-list">
                    {order.items.map(item => (
                      <li key={item._id} className="item">
                        <div className="item-name">{item.product?.name}</div>
                        <div className="item-details">
                          {item.quantity} × {item.quantityLabel} @ ₹{item.price}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="order-footer">
                  <div className="order-total">
                    <FiDollarSign className="icon" />
                    Total: ₹{order.totalAmount}
                  </div>
                  <button
                    className="delete-btn"
                    onClick={() => deleteOrder(order._id)}
                  >
                    <FiTrash2 className="icon" />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}