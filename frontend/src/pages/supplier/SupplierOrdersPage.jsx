// import React, { useEffect, useState } from 'react';
// import api from '../../api';

// function SupplierOrdersPage() {
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     const fetchSupplierOrders = async () => {
//       try {
//         const res = await api.get('/products/my', { withCredentials: true });
//         setOrders(res.data);
//       } catch (err) {
//         alert('Failed to fetch orders');
//       }
//     };

//     fetchSupplierOrders();
//   }, []);

//   return (
//     <div style={{ padding: '2rem' }}>
//       <h2>Your Orders</h2>
//       {orders.length === 0 ? (
//         <p>No orders yet.</p>
//       ) : (
//         <table style={styles.table}>
//           <thead>
//             <tr>
//               <th>Order ID</th>
//               <th>Product</th>
//               <th>Quantity</th>
//               <th>Customer</th>
//               <th>Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {orders.map((order) => (
//               <tr key={order._id}>
//                 <td>{order._id}</td>
//                 <td>{order.product?.name || 'N/A'}</td>
//                 <td>{order.quantity}</td>
//                 <td>{order.customer?.name || 'N/A'}</td>
//                 <td>{order.status}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }

// const styles = {
//   table: {
//     width: '100%',
//     borderCollapse: 'collapse',
//   },
//   th: {
//     borderBottom: '1px solid #ccc',
//     padding: '0.5rem',
//   },
//   td: {
//     borderBottom: '1px solid #eee',
//     padding: '0.5rem',
//   },
// };

// export default SupplierOrdersPage;


// src/pages/supplier/SupplierOrdersPage.jsx
import { useEffect, useState } from 'react';
import api from '../../api';
import { FiTruck, FiCheckCircle, FiClock, FiDollarSign, FiPackage, FiArrowLeft } from 'react-icons/fi';
import { BsBoxSeam, BsGeoAlt } from 'react-icons/bs';
import { MdOutlineEmail } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
// import SupplierNav from '../../components/SupplierNav'; // If you have a supplier nav

export default function SupplierOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

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
      const res = await api.get('/supplier/orders', { withCredentials: true });
      setOrders(res.data);
    } catch (err) {
      alert('Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/supplier/orders/${id}/status`, { status });
      fetchOrders();
    } catch (err) {
      alert('Failed to update status');
    }
  };

  useEffect(() => {
    fetchOrders();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="supplier-dashboard">
      {/* Optional: <SupplierNav /> */}
      <div className="supplier-container">
        <button className="back-button" onClick={() => navigate(-1)}>
                <FiArrowLeft /> Back
          </button>
        <div className="supplier-header">
          <h1 className="supplier-title">Your Orders</h1>
          <p className="supplier-subtitle">View and manage your product orders</p>
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
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
