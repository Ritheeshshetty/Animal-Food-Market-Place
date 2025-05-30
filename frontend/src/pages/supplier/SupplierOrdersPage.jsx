import React, { useEffect, useState } from 'react';
import api from '../../api';

function SupplierOrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchSupplierOrders = async () => {
      try {
        const res = await api.get('/products/my', { withCredentials: true });
        setOrders(res.data);
      } catch (err) {
        alert('Failed to fetch orders');
      }
    };

    fetchSupplierOrders();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Your Orders</h2>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Customer</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.product?.name || 'N/A'}</td>
                <td>{order.quantity}</td>
                <td>{order.customer?.name || 'N/A'}</td>
                <td>{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const styles = {
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    borderBottom: '1px solid #ccc',
    padding: '0.5rem',
  },
  td: {
    borderBottom: '1px solid #eee',
    padding: '0.5rem',
  },
};

export default SupplierOrdersPage;
