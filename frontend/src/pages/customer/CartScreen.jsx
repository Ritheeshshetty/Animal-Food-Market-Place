import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  FiShoppingCart,
  FiTrash2,
  FiMinus,
  FiPlus,
  FiArrowRight,
  FiArrowLeft,
} from "react-icons/fi";

import {
  fetchCart,
  addOrUpdateCartItem,
  removeCartItem,
} from "../../redux/slices/cartSlice";
import useAuth from "../../hooks/useAuth";

export default function CartScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [guestCart, setGuestCart] = useState([]);

  const {
    items: cartItemsRaw = [],
    guestItems,
    loading,
    error,
  } = useSelector((state) => state.cart);

  useEffect(() => {
    if (user) {
      dispatch(fetchCart());
    } else {
      const localItems = JSON.parse(localStorage.getItem("guest_cart") || "[]");
      setGuestCart(localItems);
    }
  }, [dispatch, user]);

  const updateQuantity = (productId, quantityLabel, newQuantity) => {
    if (!user) {
      const updated = guestCart.map((item) => {
        if (item.product === productId && item.quantityLabel === quantityLabel) {
          return { ...item, quantity: newQuantity };
        }
        return item;
      }).filter((item) => item.quantity > 0);
      setGuestCart(updated);
      localStorage.setItem("guest_cart", JSON.stringify(updated));
    } else {
      dispatch(addOrUpdateCartItem({ product: productId, quantityLabel, quantity: newQuantity }));
    }
  };

  const removeItem = (productId, quantityLabel) => {
    if (!user) {
      const updated = guestCart.filter(
        (item) => !(item.product === productId && item.quantityLabel === quantityLabel)
      );
      setGuestCart(updated);
      localStorage.setItem("guest_cart", JSON.stringify(updated));
    } else {
      dispatch(removeCartItem({ product: productId, quantityLabel }));
    }
  };

  const cartItems = user ? cartItemsRaw : guestCart;
  const total = cartItems.reduce(
    (sum, item) => sum + (Number(item.price) || 0) * (Number(item.quantity) || 0),
    0
  );

  return (
    <div className="cart-page">
      <div className="cart-header">
        <button className="cart-back-btn" onClick={() => navigate(-1)}>
          <FiArrowLeft /> Back
        </button>
        <h1 className="cart-title">
          <FiShoppingCart /> Your Shopping Cart
        </h1>
        <p className="cart-count">{cartItems.length} item(s)</p>
      </div>

      {cartItems.length === 0 ? (
        <div className="cart-empty">
          <div className="cart-empty-icon">🛒</div>
          <h3 className="cart-empty-text">Your cart is empty</h3>
          <button className="cart-browse-btn" onClick={() => navigate("/browse")}>
            Browse Products
          </button>
        </div>
      ) : (
        <div className="cart-content">
          <div className="cart-items-list">
            {cartItems.map((item) => (
              <div className="cart-item-card" key={`${item.product?._id || item.product}-${item.quantityLabel}`}>
                <div className="cart-item-info">
                  <h3 className="cart-item-name">{item.name || item.product?.name}</h3>
                  <p className="cart-item-type">Type: {item.animalType || item.product?.animalType}</p>
                  <p className="cart-item-option">Option: {item.quantityLabel}</p>
                  <p className="cart-item-price">₹{item.price}</p>
                </div>
                <div className="cart-item-actions">
                  <div className="cart-quantity-control">
                    <button 
                      className="cart-quantity-btn" 
                      onClick={() => updateQuantity(item.product?._id || item.product, item.quantityLabel, item.quantity - 1)} 
                      disabled={item.quantity <= 1}
                    >
                      <FiMinus />
                    </button>
                    <span className="cart-quantity-value">{item.quantity}</span>
                    <button 
                      className="cart-quantity-btn" 
                      onClick={() => updateQuantity(item.product?._id || item.product, item.quantityLabel, item.quantity + 1)}
                    >
                      <FiPlus />
                    </button>
                  </div>
                  <button 
                    className="cart-remove-btn" 
                    onClick={() => removeItem(item.product?._id || item.product, item.quantityLabel)}
                  >
                    <FiTrash2 /> Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <div className="cart-total">
              <span>Subtotal:</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
            <button className="cart-checkout-btn" onClick={() => navigate("/payment")}>
              Proceed to Checkout <FiArrowRight />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}