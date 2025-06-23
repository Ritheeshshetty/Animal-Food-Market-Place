import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function PaymentPage() {
  const { items: cartItems } = useSelector((state) => state.cart);
  const navigate = useNavigate();

  useEffect(() => {
    if (!cartItems || cartItems.length === 0) {
      navigate("/cart");
    }
  }, [cartItems, navigate]);

  const total = cartItems.reduce(
    (sum, item) => sum + (Number(item.price) || 0) * (Number(item.quantity) || 0),
    0
  );

  return (
    <div className="payment-page">
      <div className="payment-container">
        <h1 className="payment-title">Payment Summary</h1>
        
        <div className="payment-items">
          {cartItems.map((item) => (
            <div className="payment-item" key={`${item.product._id}-${item.quantityLabel}`}>
              <span className="item-name">{item.product.name} ({item.quantityLabel})</span>
              <span className="item-quantity">x {item.quantity}</span>
              <span className="item-price">₹{(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>
        
        <div className="payment-total">
          <strong>Total: ₹{total.toFixed(2)}</strong>
        </div>
        
        <button 
          className="payment-button"
          onClick={() => alert("Integrate payment gateway here!")}
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
}