import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import "./Payment.css";

const stripePromise = loadStripe("pk_test_51RIB6zQRjsbxdshsU28v5y1LMUOZeXBgdUgf2ErC3qjRuKh42fShu6n62l0Ji2CZctTDLCPZryfmqHBmM1wiKk8S00pjKgSEEm");

export default function PaymentPage() {
  const { items: cartItems } = useSelector((state) => state.cart);
  const [clientSecret, setClientSecret] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    if (!cartItems || cartItems.length === 0) {
      navigate("/cart");
      return;
    }

    const total = cartItems.reduce((sum, item) => {
      const quantity = Number(item.quantity) || 0;
      const price = Number(item.price) || 0;
      return sum + price * quantity;
    }, 0);

    fetch("http://localhost:5000/api/payment/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ amount: total }),
    })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [cartItems, navigate]);

  if (loading) return <div className="loading-payment">Processing your order...</div>;
  if (!clientSecret) return <div className="payment-error">Unable to initiate payment. Please try again.</div>;

  const totalAmount = cartItems.reduce(
    (sum, item) =>
      sum + (Number(item.price) || 0) * (Number(item.quantity) || 0),
    0
  ).toFixed(2);

  return (
    <div className="payment-page">
      <div className="payment-header">
        <h1>Checkout</h1>
        <div className="step-indicator">
          <div className={`step ${step >= 1 ? 'active' : ''}`}>
            <span>1</span>
            <p>Shipping</p>
          </div>
          <div className={`step ${step >= 2 ? 'active' : ''}`}>
            <span>2</span>
            <p>Payment</p>
          </div>
        </div>
      </div>

      <div className="payment-container">
        <div className="slider-container" style={{ transform: `translateX(-${(step - 1) * 100}%)` }}>
          {/* Step 1: Shipping Section */}
          <div className="slide">
            <div className="shipping-section">
              <h2 className="section-title">Shipping Information</h2>
              <div className="form-group">
                <label htmlFor="shipping-address">Shipping Address</label>
                <textarea
                  id="shipping-address"
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  rows={4}
                  placeholder="Enter full shipping address including postal code"
                  className="address-input"
                  required
                />
              </div>
            </div>

            <div className="order-summary">
              <h3>Order Summary</h3>
              <div className="summary-items">
                {cartItems.map((item, i) => (
                  <div key={i} className="summary-item">
                    <span className="item-name">{item.product?.name} ({item.quantityLabel})</span>
                    <span className="item-price">₹{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="summary-total">
                <span>Total Amount:</span>
                <span>₹{totalAmount}</span>
              </div>
            </div>

            <button className="btn-primary next-button" onClick={() => setStep(2)}>
              Continue to Payment
            </button>
          </div>

          {/* Step 2: Payment Section */}
          <div className="slide">
            <div className="payment-section">
              <h2 className="section-title">Payment Details</h2>
              <Elements stripe={stripePromise} options={{ clientSecret }}>
                <CheckoutForm shippingAddress={shippingAddress} />
              </Elements>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}