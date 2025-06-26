import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
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

export default function CartScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    items: cartItemsRaw = [],
    loading,
    error,
  } = useSelector((state) => state.cart);

  // Ensure cartItems is always an array
  const cartItems = Array.isArray(cartItemsRaw) ? cartItemsRaw : [];

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const updateQuantity = (productId, quantityLabel, newQuantity) => {
    const product = cartItems.find(
      (item) =>
        item.product._id === productId && item.quantityLabel === quantityLabel
    );

    // Stock validation
    if (product?.product?.quantityOptions) {
      const option = product.product.quantityOptions.find(
        (opt) => opt.label === quantityLabel
      );
      if (option && newQuantity > option.stock) {
        toast.error(`Only ${option.stock} items available`);
        return;
      }
    }

    if (newQuantity < 1) return;
    dispatch(
      addOrUpdateCartItem({
        product: productId,
        quantityLabel,
        quantity: newQuantity,
      })
    );
  };

  const removeItem = (productId) => {
    dispatch(removeCartItem(productId));
  };

  const total = cartItems.reduce(
    (sum, item) =>
      sum + (Number(item.price) || 0) * (Number(item.quantity) || 0),
    0
  );

  if (loading)
    return <div className="cart-loading-main">Loading your cart...</div>;

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
          {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in your
          cart
        </p>
      </div>

      {error && <div className="cart-error-main">{error}</div>}

      {cartItems.length === 0 ? (
        <div className="cart-empty-main">
          <FiShoppingCart className="cart-empty-icon-main" />
          <p className="cart-empty-text-main">Your cart is empty</p>
          <a href="/browse" className="cart-empty-button-main">
            Browse Products
          </a>
        </div>
      ) : (
        <div className="cart-content-main">
          <div className="cart-items-main">
            {(Array.isArray(cartItems) ? cartItems : []).map((item) => (
              <div
                key={`${item.product._id}-${item.quantityLabel}`}
                className="cart-item-main"
              >
                <div className="cart-item-info-main">
                  <h3 className="cart-item-name-main">{item.product.name}</h3>
                  <p className="cart-item-type-main">
                    <span className="cart-item-label-main">Type:</span>{" "}
                    {item.product.animalType}
                  </p>
                  <p className="cart-item-option-main">
                    <span className="cart-item-label-main">Option:</span>{" "}
                    {item.quantityLabel}
                  </p>
                  <p className="cart-item-price-main">
                    <span className="cart-item-label-main">Price:</span> ₹
                    {item.price.toFixed(2)}
                  </p>
                </div>

                <div className="cart-item-controls-main">
                  <div className="cart-item-quantity-main">
                    <button
                      className="cart-item-quantity-button-main"
                      onClick={() =>
                        updateQuantity(
                          item.product._id,
                          item.quantityLabel,
                          item.quantity - 1
                        )
                      }
                      disabled={item.quantity <= 1}
                    >
                      <FiMinus />
                    </button>
                    <span className="cart-item-quantity-value-main">
                      {item.quantity}
                    </span>
                    <button
                      className="cart-item-quantity-button-main"
                      onClick={() =>
                        updateQuantity(
                          item.product._id,
                          item.quantityLabel,
                          item.quantity + 1
                        )
                      }
                      disabled={
                        item.product?.quantityOptions &&
                        (() => {
                          const option = item.product.quantityOptions.find(
                            (opt) => opt.label === item.quantityLabel
                          );
                          return option ? item.quantity >= option.stock : false;
                        })()
                      }
                    >
                      <FiPlus />
                    </button>
                  </div>

                  <button
                    className="cart-item-remove-main"
                    onClick={() => removeItem(item.product._id)}
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
                <span className="cart-summary-value-main">
                  ₹{total.toFixed(2)}
                </span>
              </div>

              <div className="cart-summary-row-main">
                <span className="cart-summary-label-main">Shipping:</span>
                <span className="cart-summary-value-main">
                  Calculated at checkout
                </span>
              </div>

              <div className="cart-summary-row-main cart-summary-total-main">
                <span className="cart-summary-label-main">
                  Estimated Total:
                </span>
                <span className="cart-summary-value-main">
                  ₹{total.toFixed(2)}
                </span>
              </div>

              
              <button
                className="cart-checkout-button-main"
                onClick={() => navigate("/payment")}
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
