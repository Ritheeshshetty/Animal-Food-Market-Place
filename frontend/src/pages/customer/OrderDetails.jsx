import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api";
import { FiInfo, FiPackage, FiTruck, FiCheckCircle, FiClock } from "react-icons/fi";

export default function OrderDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await api.get(`/orders/${id}`, { withCredentials: true });
        setOrder(res.data);
      } catch (err) {
        setError("Failed to load order details.");
      }
    };

    fetchOrder();
  }, [id]);

  if (error) {
    return (
      <div className="order-details__error">
        <FiInfo className="order-details__error-icon" /> {error}
      </div>
    );
  }

  if (!order) {
    return <div className="order-details__loading">Loading...</div>;
  }

  // Determine active step based on order status
  const getActiveStep = () => {
    switch (order.status.toLowerCase()) {
      case 'pending': return 1;
      case 'shipped': return 2;
      case 'delivered': return 3;
      default: return 1;
    }
  };

  const activeStep = getActiveStep();

  return (
    <div className="order-details">
      {/* Delivery Status Tracker */}
      <div className="delivery-tracker">
        <div className="tracker-header">
          <h2>Your Order Journey</h2>
          <p>Track your package delivery progress</p>
        </div>
        
        <div className="tracker-steps">
          {/* Step 1: Pending */}
          <div className={`tracker-step ${activeStep >= 1 ? 'active' : ''}`}>
            <div className="step-icon">
              {activeStep > 1 ? (
                <FiCheckCircle className="completed-icon" />
              ) : (
                <FiClock className="pending-icon" />
              )}
            </div>
            <div className="step-content">
              <h4>Order Confirmed</h4>
              <p>We've received your order</p>
            </div>
            <div className="step-connector"></div>
          </div>
          
          {/* Step 2: Shipped */}
          <div className={`tracker-step ${activeStep >= 2 ? 'active' : ''}`}>
            <div className="step-icon">
              {activeStep > 2 ? (
                <FiCheckCircle className="completed-icon" />
              ) : activeStep === 2 ? (
                <FiTruck className="active-icon" />
              ) : (
                <FiPackage className="pending-icon" />
              )}
            </div>
            <div className="step-content">
              <h4>Shipped</h4>
              <p>Your item is on the way</p>
            </div>
            <div className="step-connector"></div>
          </div>
          
          {/* Step 3: Delivered */}
          <div className={`tracker-step ${activeStep >= 3 ? 'active' : ''}`}>
            <div className="step-icon">
              {activeStep === 3 ? (
                <FiCheckCircle className="delivered-icon" />
              ) : (
                <FiPackage className="pending-icon" />
              )}
            </div>
            <div className="step-content">
              <h4>Delivered</h4>
              <p>Your package has arrived</p>
            </div>
          </div>
        </div>
      </div>

      {/* Order Info Section */}
       <div className="order-details__info">
        <div className="order-details__header">
          <FiPackage className="order-details__package-icon" />
          <h2 className="order-details__title">Order #{order._id}</h2>
          <span className={`order-details__status order-details__status--${order.status.toLowerCase()}`}>
            {order.status}
          </span>
        </div>
        
        <ul className="order-details__items">
          {order.items.map((item, index) => (
            <li key={index} className="order-details__item">
              <div className="order-details__item-content">
                <h3 className="order-details__item-name">{item.product?.name}</h3>
                <div className="order-details__item-details">
                  <span>Qty: {item.quantity} ({item.quantityLabel})</span>
                  <span className="order-details__item-price">₹{item.price}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
        
        <div className="order-details__summary">
          <div className="order-details__summary-row">
            <span>Subtotal</span>
            <span>₹{order.totalAmount}</span>
          </div>
          <div className="order-details__summary-row">
            <span>Shipping</span>
            <span>FREE</span>
          </div>
          <div className="order-details__summary-row order-details__summary-row--total">
            <span>Total</span>
            <span>₹{order.totalAmount}</span>
          </div>
          
          <div className="order-details__shipping">
            <h4>Shipping Address</h4>
            <p>{order.shippingAddress}</p>
          </div>
        </div>
      </div>

      <div className="order-details__feature">
        <div className="order-details__feature-content">
          <h2 className="order-details__feature-title">Rate Your Products</h2>
          <p className="order-details__feature-description">
            Share your experience to help other customers. Your feedback matters!
          </p>
          <div className="order-details__coming-soon">
            Coming Soon
          </div>
        </div>
      </div>
    </div>
  );
}