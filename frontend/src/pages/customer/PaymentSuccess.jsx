import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Payment.css"; // Import the CSS file

export default function PaymentSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    // Optionally, extract info from URL or state
    // Run any post-payment logic here, e.g., clear cart, update DB, etc.
    console.log("Payment successful!");

    // For example, clear cart or show confirmation
    // You can also fetch order details from backend here
  }, []);

  return (
    <div className="payment-success-container">
      <div className="payment-success-card">
        <div className="checkmark-circle">
          <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
            <circle className="checkmark-circle-bg" cx="26" cy="26" r="25" fill="none"/>
            <path className="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
          </svg>
        </div>
        <h1 className="payment-success-title">Thank you for your order!</h1>
        <p className="payment-success-message">
          Your payment was successful. We've sent a confirmation email to your registered address.
          Your order will be processed shortly.
        </p>
        <div className="payment-success-actions">
          <button 
            className="home-button"
            onClick={() => navigate("/customer")}
          >
            Back to Home
          </button>
          <button 
            className="orders-button"
            onClick={() => navigate("/customer/orders")}
          >
            View Your Orders
          </button>
        </div>
      </div>
    </div>
  );
}