// import React, { useEffect, useState } from "react";
// import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";

// export default function CheckoutForm({ clientSecret }) {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [message, setMessage] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);

//   const handleSubmit = async (e) => {
//   e.preventDefault();
//   if (!stripe || !elements) return;

//   setIsLoading(true);

//   const { error } = await stripe.confirmPayment({
//     elements,
//     confirmParams: {
//       return_url: window.location.origin + "/payment-success",
//     },
//   });

//   if (error) {
//     setMessage(error.message);
//     setIsLoading(false);
//   }
// };

//   return (
//     <form onSubmit={handleSubmit} className="payment-form">
//       <PaymentElement />
//       <button
//         type="submit"
//         disabled={isLoading || !stripe || !elements}
//         className="payment-button"
//       >
//         {isLoading ? "Processing..." : "Pay Now"}
//       </button>
//       {message && <div className="payment-error">{message}</div>}
//     </form>
//   );
// }

// import React, { useState } from "react";
// import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
// import { useSelector, useDispatch } from "react-redux";
// import { clearCart } from "../../redux/slices/cartSlice";

// export default function CheckoutForm({ shippingAddress }) {
//   const stripe = useStripe();
//   const elements = useElements();
//   const dispatch = useDispatch();
//   const cartItems = useSelector((state) => state.cart.items);

//   const [isLoading, setIsLoading] = useState(false);
//   const [message, setMessage] = useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!stripe || !elements || !shippingAddress.trim()) return;

//     setIsLoading(true);

//     const { error, paymentIntent } = await stripe.confirmPayment({
//       elements,
//       confirmParams: {
//         return_url: window.location.origin + "/payment-success",
//       },
//       redirect: "if_required",
//     });

//     if (error) {
//       setMessage(error.message);
//       setIsLoading(false);
//     } else {
//       try {
//         const res = await fetch("http://localhost:5000/api/orders", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           credentials: "include",
//           body: JSON.stringify({
//             items: cartItems.map((item) => ({
//               product: item.product._id,
//               quantityLabel: item.quantityLabel,
//               quantity: item.quantity,
//               price: item.price,
//             })),
//             shippingAddress,
//           }),
//         });

//         if (!res.ok) {
//           const errData = await res.json();
//           throw new Error(errData.message || "Failed to place order.");
//         }

//         dispatch(clearCart());
//         window.location.href = "/payment-success";
//       } catch (err) {
//         setMessage(err.message);
//       } finally {
//         setIsLoading(false);
//       }
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="payment-form">
//       <PaymentElement />
//       <button
//         type="submit"
//         disabled={isLoading || !stripe || !elements}
//         className="payment-button"
//       >
//         {isLoading ? "Processing..." : "Pay Now"}
//       </button>
//       {message && <div className="payment-error">{message}</div>}
//     </form>
//   );
// }






// import React, { useState } from "react";
// import {
//   useStripe,
//   useElements,
//   PaymentElement,
// } from "@stripe/react-stripe-js";
// import { useSelector, useDispatch } from "react-redux";
// import { clearCart } from "../../redux/slices/cartSlice";

// export default function CheckoutForm({ shippingAddress }) {
//   const stripe = useStripe();
//   const elements = useElements();
//   const dispatch = useDispatch();
//   const cartItems = useSelector((state) => state.cart.items);

//   const [isLoading, setIsLoading] = useState(false);
//   const [message, setMessage] = useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!stripe || !elements || !shippingAddress.trim()) return;

//     setIsLoading(true);

//     const { error, paymentIntent } = await stripe.confirmPayment({
//       elements,
//       confirmParams: {
//         return_url: window.location.origin + "/payment-success",
//       },
//       redirect: "if_required",
//     });

//     if (error) {
//       setMessage(error.message);
//       setIsLoading(false);
//     } else {
//       try {
//         const res = await fetch("http://localhost:5000/api/orders", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           credentials: "include",
//           body: JSON.stringify({
//             items: cartItems.map((item) => ({
//               product: item.product._id,
//               quantityLabel: item.quantityLabel,
//               quantity: item.quantity,
//               price: item.price,
//             })),
//             shippingAddress,
//           }),
//         });

//         if (!res.ok) {
//           const errData = await res.json();
//           throw new Error(errData.message || "Failed to place order.");
//         }

//         dispatch(clearCart());
//         window.location.href = "/payment-success";
//       } catch (err) {
//         setMessage(err.message);
//       } finally {
//         setIsLoading(false);
//       }
//     }
//   };

//   return (
//     <div className="checkout-container">
//       <form onSubmit={handleSubmit} className="payment-form">
//         <h2 className="payment-title">Payment Details</h2>
//         <div className="payment-element-container">
//           <PaymentElement />
//         </div>
//         <button
//           type="submit"
//           disabled={isLoading || !stripe || !elements}
//           className="payment-button"
//         >
//           {isLoading ? (
//             <>
//               <span className="spinner"></span>
//               Processing...
//             </>
//           ) : (
//             "Pay Now"
//           )}
//         </button>
//         {message && (
//           <div
//             className={`payment-message ${
//               message.includes("Failed") ? "error" : "success"
//             }`}
//           >
//             {message}
//           </div>
//         )}
//       </form>
//     </div>
//   );
// }







// import React, { useState } from "react";
// import {
//   useStripe,
//   useElements,
//   PaymentElement,
// } from "@stripe/react-stripe-js";
// import { useSelector, useDispatch } from "react-redux";
// import { clearCart } from "../../redux/slices/cartSlice";
// import { useNavigate } from "react-router-dom"; // ✅ import navigate

// export default function CheckoutForm({ shippingAddress }) {
//   const stripe = useStripe();
//   const elements = useElements();
//   const dispatch = useDispatch();
//   const navigate = useNavigate(); // ✅ initialize navigate
//   const cartItems = useSelector((state) => state.cart.items);

//   const [isLoading, setIsLoading] = useState(false);
//   const [message, setMessage] = useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!stripe || !elements || !shippingAddress.trim()) return;

//     setIsLoading(true);

//     const { error, paymentIntent } = await stripe.confirmPayment({
//       elements,
//       confirmParams: {
//         return_url: window.location.origin + "/payment-success",
//       },
//       redirect: "if_required", // no redirect = we must manually handle it
//     });

//     if (error) {
//       setMessage(error.message);
//       setIsLoading(false);
//     } else {
//       try {
//         const res = await fetch("http://localhost:5000/api/orders", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           credentials: "include",
//           body: JSON.stringify({
//             items: cartItems.map((item) => ({
//               product: item.product._id,
//               quantityLabel: item.quantityLabel,
//               quantity: item.quantity,
//               price: item.price,
//             })),
//             shippingAddress,
//           }),
//         });

//         if (!res.ok) {
//           const errData = await res.json();
//           throw new Error(errData.message || "Failed to place order.");
//         }

//         dispatch(clearCart());

//         // ✅ SPA-safe navigation after success
//         navigate("/payment-success");
//       } catch (err) {
//         setMessage(err.message);
//       } finally {
//         setIsLoading(false);
//       }
//     }
//   };

//   return (
//     <div className="checkout-container">
//       <form onSubmit={handleSubmit} className="payment-form">
//         <h2 className="payment-title">Payment Details</h2>
//         <div className="payment-element-container">
//           <PaymentElement />
//         </div>
//         <button
//           type="submit"
//           disabled={isLoading || !stripe || !elements}
//           className="payment-button"
//         >
//           {isLoading ? (
//             <>
//               <span className="spinner"></span>
//               Processing...
//             </>
//           ) : (
//             "Pay Now"
//           )}
//         </button>
//         {message && (
//           <div
//             className={`payment-message ${
//               message.includes("Failed") ? "error" : "success"
//             }`}
//           >
//             {message}
//           </div>
//         )}
//       </form>
//     </div>
//   );
// }


import React, { useState } from "react";
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../../redux/slices/cartSlice";
import { useNavigate } from "react-router-dom";

export default function CheckoutForm({ shippingAddress }) {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements || !shippingAddress.trim()) return;

    setIsLoading(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.origin + "/payment-success",
      },
      redirect: "if_required",
    });

    if (error) {
      setMessage(error.message);
      setIsLoading(false);
    } else {
      try {
        const res = await fetch("http://localhost:5000/api/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            items: cartItems.map((item) => ({
              product: item.product._id,
              quantityLabel: item.quantityLabel,
              quantity: item.quantity,
              price: item.price,
            })),
            shippingAddress,
          }),
        });

        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.message || "Failed to place order.");
        }

        dispatch(clearCart());
        navigate("/payment-success");
      } catch (err) {
        setMessage(err.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="checkout-container">
      <form onSubmit={handleSubmit} className="payment-form">
        <div className="payment-header">
          <h2 className="payment-title">Secure Payment</h2>
          <p className="payment-subtitle">Enter your card details to complete the purchase</p>
        </div>
        
        <div className="payment-element-container">
          <PaymentElement />
        </div>
        
        <div className="payment-actions">
          <button
            type="submit"
            disabled={isLoading || !stripe || !elements}
            className="payment-button"
          >
            {isLoading ? (
              <>
                <span className="spinner"></span>
                Processing Payment...
              </>
            ) : (
              <>
                <span className="icon-lock"></span>
                Pay Securely
              </>
            )}
          </button>
        </div>
        
        {message && (
          <div className={`payment-message ${message.includes("Failed") ? "error" : "success"}`}>
            <span className="message-icon">
              {message.includes("Failed") ? "⚠️" : "✓"}
            </span>
            {message}
          </div>
        )}
        
        <div className="payment-security">
          <span className="security-badge">🔒 Secure SSL Encryption</span>
          <div className="payment-methods">
            <span className="visa-icon"></span>
            <span className="mastercard-icon"></span>
            <span className="amex-icon"></span>
          </div>
        </div>
      </form>
    </div>
  );
}
