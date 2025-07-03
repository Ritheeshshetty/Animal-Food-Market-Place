// import { useSelector, useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { useEffect } from "react";
// import { toast } from "react-toastify";
// import {
//   FiShoppingCart,
//   FiTrash2,
//   FiMinus,
//   FiPlus,
//   FiArrowRight,
//   FiArrowLeft,
// } from "react-icons/fi";

// import {
//   fetchCart,
//   addOrUpdateCartItem,
//   removeCartItem,
// } from "../../redux/slices/cartSlice";

// export default function CartScreen() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const {
//     items: cartItemsRaw = [],
//     loading,
//     error,
//   } = useSelector((state) => state.cart);

//   // Ensure cartItems is always an array
//   const cartItems = Array.isArray(cartItemsRaw) ? cartItemsRaw : [];

//   useEffect(() => {
//     dispatch(fetchCart());
//   }, [dispatch]);

//   useEffect(() => {
//     if (error) {
//       toast.error(error);
//     }
//   }, [error]);

//   const updateQuantity = (productId, quantityLabel, newQuantity) => {
//     const product = cartItems.find(
//       (item) =>
//         item.product._id === productId && item.quantityLabel === quantityLabel
//     );

//     // Stock validation
//     if (product?.product?.quantityOptions) {
//       const option = product.product.quantityOptions.find(
//         (opt) => opt.label === quantityLabel
//       );
//       if (option && newQuantity > option.stock) {
//         toast.error(`Only ${option.stock} items available`);
//         return;
//       }
//     }

//     if (newQuantity < 1) return;
//     dispatch(
//       addOrUpdateCartItem({
//         product: productId,
//         quantityLabel,
//         quantity: newQuantity,
//       })
//     );
//   };

//   const removeItem = (productId) => {
//     dispatch(removeCartItem(productId));
//   };

//   const total = cartItems.reduce(
//     (sum, item) =>
//       sum + (Number(item.price) || 0) * (Number(item.quantity) || 0),
//     0
//   );

//   if (loading)
//     return <div className="cart-loading-main">Loading your cart...</div>;

//   return (
//     <div className="cart-main">
//       <div className="cart-header-main">
//         <button className="back-button" onClick={() => navigate(-1)}>
//           <FiArrowLeft /> Back
//         </button>
//         <h1 className="cart-title-main">
//           <FiShoppingCart className="cart-title-icon-main" />
//           Your Shopping Cart
//         </h1>
//         <p className="cart-subtitle-main">
//           {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in your
//           cart
//         </p>
//       </div>

//       {error && <div className="cart-error-main">{error}</div>}

//       {cartItems.length === 0 ? (
//         <div className="cart-empty-main">
//           <FiShoppingCart className="cart-empty-icon-main" />
//           <p className="cart-empty-text-main">Your cart is empty</p>
//           <a href="/browse" className="cart-empty-button-main">
//             Browse Products
//           </a>
//         </div>
//       ) : (
//         <div className="cart-content-main">
//           <div className="cart-items-main">
//             {(Array.isArray(cartItems) ? cartItems : []).map((item) => (
//               <div
//                 key={`${item.product._id}-${item.quantityLabel}`}
//                 className="cart-item-main"
//               >
//                 <div className="cart-item-info-main">
//                   <h3 className="cart-item-name-main">{item.product.name}</h3>
//                   <p className="cart-item-type-main">
//                     <span className="cart-item-label-main">Type:</span>{" "}
//                     {item.product.animalType}
//                   </p>
//                   <p className="cart-item-option-main">
//                     <span className="cart-item-label-main">Option:</span>{" "}
//                     {item.quantityLabel}
//                   </p>
//                   <p className="cart-item-price-main">
//                     <span className="cart-item-label-main">Price:</span> ₹
//                     {item.price.toFixed(2)}
//                   </p>
//                 </div>

//                 <div className="cart-item-controls-main">
//                   <div className="cart-item-quantity-main">
//                     <button
//                       className="cart-item-quantity-button-main"
//                       onClick={() =>
//                         updateQuantity(
//                           item.product._id,
//                           item.quantityLabel,
//                           item.quantity - 1
//                         )
//                       }
//                       disabled={item.quantity <= 1}
//                     >
//                       <FiMinus />
//                     </button>
//                     <span className="cart-item-quantity-value-main">
//                       {item.quantity}
//                     </span>
//                     <button
//                       className="cart-item-quantity-button-main"
//                       onClick={() =>
//                         updateQuantity(
//                           item.product._id,
//                           item.quantityLabel,
//                           item.quantity + 1
//                         )
//                       }
//                       disabled={
//                         item.product?.quantityOptions &&
//                         (() => {
//                           const option = item.product.quantityOptions.find(
//                             (opt) => opt.label === item.quantityLabel
//                           );
//                           return option ? item.quantity >= option.stock : false;
//                         })()
//                       }
//                     >
//                       <FiPlus />
//                     </button>
//                   </div>

//                   <button
//                     className="cart-item-remove-main"
//                     onClick={() => removeItem(item.product._id)}
//                   >
//                     <FiTrash2 className="cart-item-remove-icon-main" />
//                     Remove
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>

//           <div className="cart-summary-main">
//             <div className="cart-summary-content-main">
//               <h3 className="cart-summary-title-main">Order Summary</h3>

//               <div className="cart-summary-row-main">
//                 <span className="cart-summary-label-main">Subtotal:</span>
//                 <span className="cart-summary-value-main">
//                   ₹{total.toFixed(2)}
//                 </span>
//               </div>

//               <div className="cart-summary-row-main">
//                 <span className="cart-summary-label-main">Shipping:</span>
//                 <span className="cart-summary-value-main">
//                   Calculated at checkout
//                 </span>
//               </div>

//               <div className="cart-summary-row-main cart-summary-total-main">
//                 <span className="cart-summary-label-main">
//                   Estimated Total:
//                 </span>
//                 <span className="cart-summary-value-main">
//                   ₹{total.toFixed(2)}
//                 </span>
//               </div>

//               <button
//                 className="cart-checkout-button-main"
//                 onClick={() => navigate("/payment")}
//               >
//                 Proceed to Checkout
//                 <FiArrowRight className="cart-checkout-icon-main" />
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// --- UPDATED CART SCREEN ---

// --- UPDATED CART SCREEN ---

// import { useSelector, useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { useEffect } from "react";
// import { toast } from "react-toastify";
// import {
//   FiShoppingCart,
//   FiTrash2,
//   FiMinus,
//   FiPlus,
//   FiArrowRight,
//   FiArrowLeft,
// } from "react-icons/fi";

// import {
//   fetchCart,
//   addOrUpdateCartItem,
//   removeCartItem,
// } from "../../redux/slices/cartSlice";

// export default function CartScreen() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const {
//     items: cartItemsRaw = [],
//     loading,
//     error,
//   } = useSelector((state) => state.cart);

//   const cartItems = Array.isArray(cartItemsRaw) ? cartItemsRaw : [];

//   useEffect(() => {
//     dispatch(fetchCart());
//   }, [dispatch]);

//   useEffect(() => {
//     if (error) toast.error(error);
//   }, [error]);

//   const updateQuantity = (productId, quantityLabel, newQuantity) => {
//     const product = cartItems.find(
//       (item) =>
//         item.product._id === productId && item.quantityLabel === quantityLabel
//     );

//     if (product?.product?.quantityOptions) {
//       const option = product.product.quantityOptions.find(
//         (opt) => opt.label === quantityLabel
//       );
//       if (option && newQuantity > option.stock) {
//         toast.error(`Only ${option.stock} items available`);
//         return;
//       }
//     }

//     if (newQuantity < 1) return;

//     dispatch(
//       addOrUpdateCartItem({
//         product: productId,
//         quantityLabel,
//         quantity: newQuantity,
//       })
//     );
//   };

//   const removeItem = (productId, quantityLabel) => {
//     dispatch(removeCartItem({ product: productId, quantityLabel }));
//   };

//   const total = cartItems.reduce(
//     (sum, item) =>
//       sum + (Number(item.price) || 0) * (Number(item.quantity) || 0),
//     0
//   );

//   if (loading)
//     return <div className="cart-loading-main">Loading your cart...</div>;

//   return (
//     <div className="cart-main">
//       <div className="cart-header-main">
//         <button className="back-button" onClick={() => navigate(-1)}>
//           <FiArrowLeft /> Back
//         </button>
//         <h1 className="cart-title-main">
//           <FiShoppingCart className="cart-title-icon-main" />
//           Your Shopping Cart
//         </h1>
//         <p className="cart-subtitle-main">
//           {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in your
//           cart
//         </p>
//       </div>

//       {error && <div className="cart-error-main">{error}</div>}

//       {cartItems.length === 0 ? (
//         <div className="cart-empty-main">
//           <FiShoppingCart className="cart-empty-icon-main" />
//           <p className="cart-empty-text-main">Your cart is empty</p>
//           <a href="/browse" className="cart-empty-button-main">
//             Browse Products
//           </a>
//         </div>
//       ) : (
//         <div className="cart-content-main">
//           <div className="cart-items-main">
//             {cartItems
//               .filter((item) => item.product) // skip null products
//               .map((item) => (
//                 <div
//                   key={`${item.product._id}-${item.quantityLabel}`}
//                   className="cart-item-main"
//                 >
//                   <div className="cart-item-info-main">
//                     <h3 className="cart-item-name-main">{item.product.name}</h3>
//                     <p className="cart-item-type-main">
//                       <span className="cart-item-label-main">Type:</span>{" "}
//                       {item.product.animalType}
//                     </p>
//                     <p className="cart-item-option-main">
//                       <span className="cart-item-label-main">Option:</span>{" "}
//                       {item.quantityLabel}
//                     </p>
//                     <p className="cart-item-price-main">
//                       <span className="cart-item-label-main">Price:</span> ₹
//                       {item.price.toFixed(2)}
//                     </p>
//                   </div>

//                   <div className="cart-item-controls-main">
//                     <div className="cart-item-quantity-main">
//                       <button
//                         className="cart-item-quantity-button-main"
//                         onClick={() =>
//                           updateQuantity(
//                             item.product._id,
//                             item.quantityLabel,
//                             item.quantity - 1
//                           )
//                         }
//                         disabled={item.quantity <= 1}
//                       >
//                         <FiMinus />
//                       </button>
//                       <span className="cart-item-quantity-value-main">
//                         {item.quantity}
//                       </span>
//                       <button
//                         className="cart-item-quantity-button-main"
//                         onClick={() =>
//                           updateQuantity(
//                             item.product._id,
//                             item.quantityLabel,
//                             item.quantity + 1
//                           )
//                         }
//                         disabled={
//                           item.product?.quantityOptions &&
//                           (() => {
//                             const option = item.product.quantityOptions.find(
//                               (opt) => opt.label === item.quantityLabel
//                             );
//                             return option
//                               ? item.quantity >= option.stock
//                               : false;
//                           })()
//                         }
//                       >
//                         <FiPlus />
//                       </button>
//                     </div>

//                     <button
//                       className="cart-item-remove-main"
//                       onClick={() =>
//                         removeItem(item.product._id, item.quantityLabel)
//                       }
//                     >
//                       <FiTrash2 className="cart-item-remove-icon-main" />
//                       Remove
//                     </button>
//                   </div>
//                 </div>
//               ))}
//           </div>

//           <div className="cart-summary-main">
//             <div className="cart-summary-content-main">
//               <h3 className="cart-summary-title-main">Order Summary</h3>

//               <div className="cart-summary-row-main">
//                 <span className="cart-summary-label-main">Subtotal:</span>
//                 <span className="cart-summary-value-main">
//                   ₹{total.toFixed(2)}
//                 </span>
//               </div>

//               <div className="cart-summary-row-main">
//                 <span className="cart-summary-label-main">Shipping:</span>
//                 <span className="cart-summary-value-main">
//                   Calculated at checkout
//                 </span>
//               </div>

//               <div className="cart-summary-row-main cart-summary-total-main">
//                 <span className="cart-summary-label-main">
//                   Estimated Total:
//                 </span>
//                 <span className="cart-summary-value-main">
//                   ₹{total.toFixed(2)}
//                 </span>
//               </div>

//               <button
//                 className="cart-checkout-button-main"
//                 onClick={() => navigate("/payment")}
//               >
//                 Proceed to Checkout
//                 <FiArrowRight className="cart-checkout-icon-main" />
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }



// import { useSelector, useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import {
//   FiShoppingCart,
//   FiTrash2,
//   FiMinus,
//   FiPlus,
//   FiArrowRight,
//   FiArrowLeft,
// } from "react-icons/fi";

// import {
//   fetchCart,
//   addOrUpdateCartItem,
//   removeCartItem,
// } from "../../redux/slices/cartSlice";
// import useAuth from "../../hooks/useAuth";

// export default function CartScreen() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { user } = useAuth();

//   const {
//     items: cartItemsRaw = [],
//     loading,
//     error,
//   } = useSelector((state) => state.cart);

// const [localCart, setLocalCart] = useState([]);

// useEffect(() => {
//   if (!user) {
//     const localData = localStorage.getItem("guest_cart");
//     setLocalCart(localData ? JSON.parse(localData) : []);
//   }
// }, [user, localStorage.getItem("guest_cart")]); // triggers on localStorage change


//   useEffect(() => {
//     if (user) {
//       dispatch(fetchCart());
//     }
//   }, [user, dispatch]);

//   // Merge local cart after login
//   useEffect(() => {
//     const syncGuestCartToDB = async () => {
//       const localData = localStorage.getItem("guest_cart");
//       if (user && localData) {
//         const localItems = JSON.parse(localData);
//         for (const item of localItems) {
//           try {
//             await dispatch(addOrUpdateCartItem(item)).unwrap();
//           } catch (err) {
//             console.error("Failed to merge guest cart item:", err);
//           }
//         }
//         localStorage.removeItem("guest_cart");
//         setLocalCart([]);
//         dispatch(fetchCart()); // Refresh DB cart
//       }
//     };
//     syncGuestCartToDB();
//   }, [user, dispatch]);

//   useEffect(() => {
//     if (error) toast.error(error);
//   }, [error]);

//   const cartItems = user ? cartItemsRaw : localCart;

//   const updateQuantity = (productId, quantityLabel, newQuantity) => {
//     if (newQuantity < 1) return;

//     const itemIndex = cartItems.findIndex(
//       (item) =>
//         item.product._id === productId && item.quantityLabel === quantityLabel
//     );

//     if (user) {
//       dispatch(
//         addOrUpdateCartItem({
//           product: productId,
//           quantityLabel,
//           quantity: newQuantity,
//         })
//       );
//     } else {
//       const updatedCart = [...localCart];
//       if (itemIndex > -1) {
//         updatedCart[itemIndex].quantity = newQuantity;
//         setLocalCart(updatedCart);
//         localStorage.setItem("guest_cart", JSON.stringify(updatedCart));
//       }
//     }
//   };

//   const removeItem = (productId, quantityLabel) => {
//     if (user) {
//       dispatch(removeCartItem({ product: productId, quantityLabel }));
//     } else {
//       const updated = localCart.filter(
//         (item) =>
//           !(
//             item.product._id === productId &&
//             item.quantityLabel === quantityLabel
//           )
//       );
//       setLocalCart(updated);
//       localStorage.setItem("guest_cart", JSON.stringify(updated));
//     }
//   };

//   const total = cartItems.reduce(
//     (sum, item) =>
//       sum + (Number(item.price) || 0) * (Number(item.quantity) || 0),
//     0
//   );

//   if (loading)
//     return <div className="cart-loading-main">Loading your cart...</div>;

//   return (
//     <div className="cart-main">
//       <div className="cart-header-main">
//         <button className="back-button" onClick={() => navigate(-1)}>
//           <FiArrowLeft /> Back
//         </button>
//         <h1 className="cart-title-main">
//           <FiShoppingCart className="cart-title-icon-main" />
//           Your Shopping Cart
//         </h1>
//         <p className="cart-subtitle-main">
//           {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in your
//           cart
//         </p>
//       </div>

//       {cartItems.length === 0 ? (
//         <div className="cart-empty-main">
//           <FiShoppingCart className="cart-empty-icon-main" />
//           <p className="cart-empty-text-main">Your cart is empty</p>
//           <a href="/browse" className="cart-empty-button-main">
//             Browse Products
//           </a>
//         </div>
//       ) : (
//         <div className="cart-content-main">
//           <div className="cart-items-main">
//             {cartItems
//               .filter((item) => item.product)
//               .map((item) => (
//                 <div
//                   key={`${item.product._id}-${item.quantityLabel}`}
//                   className="cart-item-main"
//                 >
//                   <div className="cart-item-info-main">
//                     <h3 className="cart-item-name-main">{item.product.name}</h3>
//                     <p className="cart-item-type-main">
//                       <span className="cart-item-label-main">Type:</span>{" "}
//                       {item.product.animalType}
//                     </p>
//                     <p className="cart-item-option-main">
//                       <span className="cart-item-label-main">Option:</span>{" "}
//                       {item.quantityLabel}
//                     </p>
//                     <p className="cart-item-price-main">
//                       <span className="cart-item-label-main">Price:</span> ₹
//                       {item.price.toFixed(2)}
//                     </p>
//                   </div>

//                   <div className="cart-item-controls-main">
//                     <div className="cart-item-quantity-main">
//                       <button
//                         className="cart-item-quantity-button-main"
//                         onClick={() =>
//                           updateQuantity(
//                             item.product._id,
//                             item.quantityLabel,
//                             item.quantity - 1
//                           )
//                         }
//                         disabled={item.quantity <= 1}
//                       >
//                         <FiMinus />
//                       </button>
//                       <span className="cart-item-quantity-value-main">
//                         {item.quantity}
//                       </span>
//                       <button
//                         className="cart-item-quantity-button-main"
//                         onClick={() =>
//                           updateQuantity(
//                             item.product._id,
//                             item.quantityLabel,
//                             item.quantity + 1
//                           )
//                         }
//                       >
//                         <FiPlus />
//                       </button>
//                     </div>

//                     <button
//                       className="cart-item-remove-main"
//                       onClick={() =>
//                         removeItem(item.product._id, item.quantityLabel)
//                       }
//                     >
//                       <FiTrash2 className="cart-item-remove-icon-main" />
//                       Remove
//                     </button>
//                   </div>
//                 </div>
//               ))}
//           </div>

//           <div className="cart-summary-main">
//             <div className="cart-summary-content-main">
//               <h3 className="cart-summary-title-main">Order Summary</h3>

//               <div className="cart-summary-row-main">
//                 <span className="cart-summary-label-main">Subtotal:</span>
//                 <span className="cart-summary-value-main">
//                   ₹{total.toFixed(2)}
//                 </span>
//               </div>

//               <div className="cart-summary-row-main">
//                 <span className="cart-summary-label-main">Shipping:</span>
//                 <span className="cart-summary-value-main">
//                   Calculated at checkout
//                 </span>
//               </div>

//               <div className="cart-summary-row-main cart-summary-total-main">
//                 <span className="cart-summary-label-main">
//                   Estimated Total:
//                 </span>
//                 <span className="cart-summary-value-main">
//                   ₹{total.toFixed(2)}
//                 </span>
//               </div>

//               <button
//                 className="cart-checkout-button-main"
//                 onClick={() => {
//                   if (!user) {
//                     toast.info("Please login to proceed to checkout");
//                     navigate("/login");
//                   } else {
//                     navigate("/payment");
//                   }
//                 }}
//               >
//                 Proceed to Checkout
//                 <FiArrowRight className="cart-checkout-icon-main" />
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }






// 888**********************************//
// import { useSelector, useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import {
//   FiShoppingCart,
//   FiTrash2,
//   FiMinus,
//   FiPlus,
//   FiArrowRight,
//   FiArrowLeft,
// } from "react-icons/fi";

// import {
//   fetchCart,
//   addOrUpdateCartItem,
//   removeCartItem,
// } from "../../redux/slices/cartSlice";
// import useAuth from "../../hooks/useAuth";

// export default function CartScreen() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { user } = useAuth();

//   const [guestCart, setGuestCart] = useState([]);

//   const {
//     items: cartItemsRaw = [],
//     loading,
//     error,
//   } = useSelector((state) => state.cart);

//   useEffect(() => {
//     if (user) {
//       dispatch(fetchCart());
//     } else {
//       const localItems = JSON.parse(localStorage.getItem("guest_cart") || "[]");
//       setGuestCart(localItems);
//     }
//   }, [dispatch, user]);

//   const updateQuantity = (productId, quantityLabel, newQuantity) => {
//     if (!user) {
//       const updated = guestCart.map((item) => {
//         if (item.product === productId && item.quantityLabel === quantityLabel) {
//           return { ...item, quantity: newQuantity };
//         }
//         return item;
//       }).filter((item) => item.quantity > 0);
//       setGuestCart(updated);
//       localStorage.setItem("guest_cart", JSON.stringify(updated));
//     } else {
//       dispatch(addOrUpdateCartItem({ product: productId, quantityLabel, quantity: newQuantity }));
//     }
//   };

//   const removeItem = (productId, quantityLabel) => {
//     if (!user) {
//       const updated = guestCart.filter(
//         (item) => !(item.product === productId && item.quantityLabel === quantityLabel)
//       );
//       setGuestCart(updated);
//       localStorage.setItem("guest_cart", JSON.stringify(updated));
//     } else {
//       dispatch(removeCartItem({ product: productId, quantityLabel }));
//     }
//   };

//   const cartItems = user ? cartItemsRaw : guestCart;
//   const total = cartItems.reduce(
//     (sum, item) =>
//       sum + (Number(item.price) || 0) * (Number(item.quantity) || 0),
//     0
//   );

//   return (
//     <div className="cart-main">
//       <div className="cart-header-main">
//         <button className="back-button" onClick={() => navigate(-1)}>
//           <FiArrowLeft /> Back
//         </button>
//         <h1 className="cart-title-main">
//           <FiShoppingCart /> Your Shopping Cart
//         </h1>
//         <p>{cartItems.length} item(s)</p>
//       </div>

//       {cartItems.length === 0 ? (
//         <div>
//           <p>Your cart is empty</p>
//           <a href="/browse">Browse Products</a>
//         </div>
//       ) : (
//         <div className="cart-content-main">
//           {cartItems.map((item) => (
//             <div key={`${item.product}-${item.quantityLabel}`}>
//               <h3>{item.name || item.product?.name}</h3>
//               <p>Type: {item.animalType || item.product?.animalType}</p>
//               <p>Option: {item.quantityLabel}</p>
//               <p>Price: ₹{item.price}</p>
//               <div>
//                 <button onClick={() => updateQuantity(item.product, item.quantityLabel, item.quantity - 1)} disabled={item.quantity <= 1}><FiMinus /></button>
//                 <span>{item.quantity}</span>
//                 <button onClick={() => updateQuantity(item.product, item.quantityLabel, item.quantity + 1)}><FiPlus /></button>
//               </div>
//               <button onClick={() => removeItem(item.product, item.quantityLabel)}><FiTrash2 /> Remove</button>
//             </div>
//           ))}

//           <h3>Total: ₹{total.toFixed(2)}</h3>
//           <button onClick={() => navigate("/payment")}>
//             Proceed to Checkout <FiArrowRight />
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }



// import { useSelector, useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import {
//   FiShoppingCart,
//   FiTrash2,
//   FiMinus,
//   FiPlus,
//   FiArrowRight,
//   FiArrowLeft,
// } from "react-icons/fi";

// import {
//   fetchCart,
//   addOrUpdateCartItem,
//   removeCartItem,
// } from "../../redux/slices/cartSlice";
// import useAuth from "../../hooks/useAuth";

// export default function CartScreen() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { user } = useAuth();

//   const [guestCart, setGuestCart] = useState([]);

//   const {
//     items: cartItemsRaw = [],
//     loading,
//     error,
//   } = useSelector((state) => state.cart);

//   useEffect(() => {
//     if (user) {
//       dispatch(fetchCart());
//     } else {
//       const localItems = JSON.parse(localStorage.getItem("guest_cart") || "[]");
//       setGuestCart(localItems);
//     }
//   }, [dispatch, user]);

//   const updateQuantity = (productId, quantityLabel, newQuantity) => {
//     if (!user) {
//       const updated = guestCart.map((item) => {
//         if (item.product === productId && item.quantityLabel === quantityLabel) {
//           return { ...item, quantity: newQuantity };
//         }
//         return item;
//       }).filter((item) => item.quantity > 0);
//       setGuestCart(updated);
//       localStorage.setItem("guest_cart", JSON.stringify(updated));
//     } else {
//       dispatch(addOrUpdateCartItem({ product: productId, quantityLabel, quantity: newQuantity }));
//     }
//   };

//   const removeItem = (productId, quantityLabel) => {
//     if (!user) {
//       const updated = guestCart.filter(
//         (item) => !(item.product === productId && item.quantityLabel === quantityLabel)
//       );
//       setGuestCart(updated);
//       localStorage.setItem("guest_cart", JSON.stringify(updated));
//     } else {
//       dispatch(removeCartItem({ product: productId, quantityLabel }));
//     }
//   };

//   const cartItems = user ? cartItemsRaw : guestCart;
//   const total = cartItems.reduce(
//     (sum, item) =>
//       sum + (Number(item.price) || 0) * (Number(item.quantity) || 0),
//     0
//   );

//   return (
//     <div className="cart-container">
//       <div className="cart-header">
//         <button className="btn-back" onClick={() => navigate(-1)}>
//           <FiArrowLeft /> Back
//         </button>
//         <h1 className="cart-title">
//           <FiShoppingCart /> Your Shopping Cart
//         </h1>
//         <p className="cart-count">{cartItems.length} item(s)</p>
//       </div>

//       {cartItems.length === 0 ? (
//         <div className="empty-cart">
//           <p>Your cart is empty</p>
//           <a href="/browse" className="btn-browse">Browse Products</a>
//         </div>
//       ) : (
//         <div className="cart-content">
//           <div className="cart-items">
//             {cartItems.map((item) => (
//               <div className="cart-item" key={`${item.product}-${item.quantityLabel}`}>
//                 <div className="item-info">
//                   <h3 className="item-name">{item.name || item.product?.name}</h3>
//                   <p className="item-type">Type: {item.animalType || item.product?.animalType}</p>
//                   <p className="item-option">Option: {item.quantityLabel}</p>
//                   <p className="item-price">Price: ₹{item.price}</p>
//                 </div>
//                 <div className="item-actions">
//                   <div className="quantity-control">
//                     <button 
//                       className="btn-quantity" 
//                       onClick={() => updateQuantity(item.product, item.quantityLabel, item.quantity - 1)} 
//                       disabled={item.quantity <= 1}
//                     >
//                       <FiMinus />
//                     </button>
//                     <span className="quantity-value">{item.quantity}</span>
//                     <button 
//                       className="btn-quantity" 
//                       onClick={() => updateQuantity(item.product, item.quantityLabel, item.quantity + 1)}
//                     >
//                       <FiPlus />
//                     </button>
//                   </div>
//                   <button 
//                     className="btn-remove" 
//                     onClick={() => removeItem(item.product, item.quantityLabel)}
//                   >
//                     <FiTrash2 /> Remove
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>

//           <div className="cart-summary">
//             <h3 className="total-amount">Total: ₹{total.toFixed(2)}</h3>
//             <button className="btn-checkout" onClick={() => navigate("/payment")}>
//               Proceed to Checkout <FiArrowRight />
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }



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
    <div className="cart-container">
      <div className="cart-header">
        <button className="btn-back" onClick={() => navigate(-1)}>
          <FiArrowLeft /> Back
        </button>
        <h1 className="cart-title">
          <FiShoppingCart /> Your Shopping Cart
        </h1>
        <p className="cart-count">{cartItems.length} item(s)</p>
      </div>

      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty</p>
          <a href="/browse" className="btn-browse">Browse Products</a>
        </div>
      ) : (
        <div className="cart-content">
          <div className="cart-items">
            {cartItems.map((item) => (
              <div className="cart-item" key={`${item.product?._id || item.product}-${item.quantityLabel}`}>
                <div className="item-info">
                  <h3 className="item-name">{item.name || item.product?.name}</h3>
                  <p className="item-type">Type: {item.animalType || item.product?.animalType}</p>
                  <p className="item-option">Option: {item.quantityLabel}</p>
                  <p className="item-price">Price: ₹{item.price}</p>
                </div>
                <div className="item-actions">
                  <div className="quantity-control">
                    <button 
                      className="btn-quantity" 
                      onClick={() => updateQuantity(item.product?._id || item.product, item.quantityLabel, item.quantity - 1)} 
                      disabled={item.quantity <= 1}
                    >
                      <FiMinus />
                    </button>
                    <span className="quantity-value">{item.quantity}</span>
                    <button 
                      className="btn-quantity" 
                      onClick={() => updateQuantity(item.product?._id || item.product, item.quantityLabel, item.quantity + 1)}
                    >
                      <FiPlus />
                    </button>
                  </div>
                  <button 
                    className="btn-remove" 
                    onClick={() => removeItem(item.product?._id || item.product, item.quantityLabel)}
                  >
                    <FiTrash2 /> Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3 className="total-amount">Total: ₹{total.toFixed(2)}</h3>
            <button className="btn-checkout" onClick={() => navigate("/payment")}>
              Proceed to Checkout <FiArrowRight />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}