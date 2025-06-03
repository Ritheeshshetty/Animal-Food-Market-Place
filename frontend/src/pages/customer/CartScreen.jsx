import { useEffect, useState } from "react";
import { FiShoppingCart, FiTrash2, FiMinus, FiPlus, FiArrowRight, FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";



export default function CartScreen() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

   const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
    setLoading(false);
  }, []);

  const updateQuantity = (index, delta) => {
    const updated = [...cartItems];
    const item = updated[index];
    const newQty = item.quantity + delta;

    if (newQty < 1 || (item.availableStock && newQty > item.availableStock)) return;

    item.quantity = newQty;
    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const removeItem = (index) => {
    const updated = [...cartItems];
    updated.splice(index, 1);
    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (loading) return (
    <div className="cart-loading-main">
      <div className="cart-loading-spinner-main">Loading your cart...</div>
    </div>
  );

  return (
    <div className="cart-main">
      
      <div className="cart-header-main">
        <button className="back-button" onClick={() => navigate(-1)}>
                        <FiArrowLeft /> Back
                      </button>
        <h1 className="cart-title-main">
          <FiShoppingCart className="cart-title-icon-main" />
          Your Shopping Cart
        </h1>
        <p className="cart-subtitle-main">
          {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
        </p>
      </div>

      {cartItems.length === 0 ? (
        <div className="cart-empty-main">
          <FiShoppingCart className="cart-empty-icon-main" />
          <p className="cart-empty-text-main">Your cart is empty</p>
          <a href="/products" className="cart-empty-button-main">
            Browse Products
          </a>
        </div>
      ) : (
        <div className="cart-content-main">
          <div className="cart-items-main">
            {cartItems.map((item, index) => (
              <div key={`${item.productId}-${item.quantityLabel}`} className="cart-item-main">
                <div className="cart-item-info-main">
                  <h3 className="cart-item-name-main">{item.name}</h3>
                  <p className="cart-item-type-main">
                    <span className="cart-item-label-main">Type:</span> {item.animalType}
                  </p>
                  <p className="cart-item-option-main">
                    <span className="cart-item-label-main">Option:</span> {item.quantityLabel}
                  </p>
                  <p className="cart-item-price-main">
                    <span className="cart-item-label-main">Price:</span> ₹{item.price.toFixed(2)}
                  </p>
                </div>

                <div className="cart-item-controls-main">
                  <div className="cart-item-quantity-main">
                    <button 
                      className="cart-item-quantity-button-main"
                      onClick={() => updateQuantity(index, -1)}
                      disabled={item.quantity <= 1}
                    >
                      <FiMinus />
                    </button>
                    <span className="cart-item-quantity-value-main">{item.quantity}</span>
                    <button 
                      className="cart-item-quantity-button-main"
                      onClick={() => updateQuantity(index, 1)}
                      disabled={item.availableStock && item.quantity >= item.availableStock}
                    >
                      <FiPlus />
                    </button>
                  </div>

                  <button 
                    className="cart-item-remove-main"
                    onClick={() => removeItem(index)}
                  >
                    <FiTrash2 className="cart-item-remove-icon-main" />
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary-main">
            <div className="cart-summary-content-main">
              <h3 className="cart-summary-title-main">Order Summary</h3>
              
              <div className="cart-summary-row-main">
                <span className="cart-summary-label-main">Subtotal:</span>
                <span className="cart-summary-value-main">₹{total.toFixed(2)}</span>
              </div>
              
              <div className="cart-summary-row-main">
                <span className="cart-summary-label-main">Shipping:</span>
                <span className="cart-summary-value-main">Calculated at checkout</span>
              </div>
              
              <div className="cart-summary-row-main cart-summary-total-main">
                <span className="cart-summary-label-main">Estimated Total:</span>
                <span className="cart-summary-value-main">₹{total.toFixed(2)}</span>
              </div>

              <button 
                className="cart-checkout-button-main"
                onClick={() => window.location.href = "/checkout"}
              >
                Proceed to Checkout
                <FiArrowRight className="cart-checkout-icon-main" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}