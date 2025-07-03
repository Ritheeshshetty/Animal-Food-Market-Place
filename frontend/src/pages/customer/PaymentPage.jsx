// import { useSelector } from "react-redux";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
// import CheckoutForm from "./CheckoutForm";

// const stripePromise = loadStripe("pk_test_51RIB6zQRjsbxdshsU28v5y1LMUOZeXBgdUgf2ErC3qjRuKh42fShu6n62l0Ji2CZctTDLCPZryfmqHBmM1wiKk8S00pjKgSEEm"); // Use your publishable key

// export default function PaymentPage() {
//   const { items: cartItems } = useSelector((state) => state.cart);
//   const [clientSecret, setClientSecret] = useState("");
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!cartItems || cartItems.length === 0) {
//       navigate("/cart");
//       return;
//     }
//     const total = cartItems.reduce(
//       (sum, item) => sum + (Number(item.price) || 0) * (Number(item.quantity) || 0),
//       0
//     );
//     // Fetch the PaymentIntent clientSecret from your backend
//     fetch("http://localhost:5000/api/payment/create-payment-intent", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ amount: total }),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         setClientSecret(data.clientSecret);
//         setLoading(false);
//       })
//       .catch(() => setLoading(false));
//   }, [cartItems, navigate]);

//   if (loading) return <div>Loading payment...</div>;
//   if (!clientSecret) return <div>Unable to initiate payment.</div>;

//   return (
//     <div className="payment-page">
//       <div className="payment-container">
//         <h1 className="payment-title">Payment Summary</h1>
//         <div className="payment-items">
//           {cartItems.map((item) => (
//             <div className="payment-item" key={`${item.product._id}-${item.quantityLabel}`}>
//               <span className="item-name">{item.product.name} ({item.quantityLabel})</span>
//               <span className="item-quantity">x {item.quantity}</span>
//               <span className="item-price">₹{(item.price * item.quantity).toFixed(2)}</span>
//             </div>
//           ))}
//         </div>
//         <div className="payment-total">
//           <strong>
//             Total: ₹
//             {cartItems.reduce(
//               (sum, item) => sum + (Number(item.price) || 0) * (Number(item.quantity) || 0),
//               0
//             ).toFixed(2)}
//           </strong>
//         </div>
//         <Elements stripe={stripePromise} options={{ clientSecret }}>
//           <CheckoutForm />
//         </Elements>
//       </div>
//     </div>
//   );
// }

// import { useSelector } from "react-redux";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
// import CheckoutForm from "./CheckoutForm";

// const stripePromise = loadStripe(
//   "pk_test_51RIB6zQRjsbxdshsU28v5y1LMUOZeXBgdUgf2ErC3qjRuKh42fShu6n62l0Ji2CZctTDLCPZryfmqHBmM1wiKk8S00pjKgSEEm"
// );

// export default function PaymentPage() {
//   const { items: cartItems } = useSelector((state) => state.cart);
//   const [clientSecret, setClientSecret] = useState("");
//   const [shippingAddress, setShippingAddress] = useState("");
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!cartItems || cartItems.length === 0) {
//       navigate("/cart");
//       return;
//     }

//    const total = cartItems
//   .filter((item) => item.product) // Ignore corrupted items
//   .reduce((sum, item) => {
//     const quantity = Number(item.quantity) || 0;
//     const price = Number(item.price) || 0;
//     return sum + price * quantity;
//   }, 0);


//     fetch("http://localhost:5000/api/payment/create-payment-intent", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       credentials: "include",
//       body: JSON.stringify({ amount: total }),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         setClientSecret(data.clientSecret);
//         setLoading(false);
//       })
//       .catch(() => setLoading(false));
//   }, [cartItems, navigate]);

//   if (loading) return <div>Loading payment...</div>;
//   if (!clientSecret) return <div>Unable to initiate payment.</div>;

//   return (
//     <div className="payment-page">
//       <div className="payment-container">
//         <h1 className="payment-title">Payment Summary</h1>

//         <div className="payment-items">
//           {cartItems
//             .filter((item) => item.product) // <- prevent null crash
//             .map((item) => (
//               <div
//                 className="payment-item"
//                 key={`${item.product._id}-${item.quantityLabel}`}
//               >
//                 <span className="item-name">
//                   {item.product.name} ({item.quantityLabel})
//                 </span>
//                 <span className="item-quantity">x {item.quantity}</span>
//                 <span className="item-price">
//                   ₹{(item.price * item.quantity).toFixed(2)}
//                 </span>
//               </div>
//             ))}
//         </div>

//         <div className="payment-total">
//           <strong>
//             Total: ₹
//             {cartItems
//               .filter((item) => item.product)
//               .reduce(
//                 (sum, item) =>
//                   sum +
//                   (Number(item.price) || 0) * (Number(item.quantity) || 0),
//                 0
//               )
//               .toFixed(2)}
//           </strong>
//         </div>

//         <div className="shipping-address-form">
//           <label htmlFor="address">Shipping Address:</label>
//           <textarea
//             id="address"
//             rows={3}
//             value={shippingAddress}
//             onChange={(e) => setShippingAddress(e.target.value)}
//             required
//             placeholder="Enter your full shipping address"
//           />
//         </div>

//         <Elements stripe={stripePromise} options={{ clientSecret }}>
//           <CheckoutForm shippingAddress={shippingAddress} />
//         </Elements>
//       </div>
//     </div>
//   );
// }


import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51RIB6zQRjsbxdshsU28v5y1LMUOZeXBgdUgf2ErC3qjRuKh42fShu6n62l0Ji2CZctTDLCPZryfmqHBmM1wiKk8S00pjKgSEEm"
);

export default function PaymentPage() {
  const { items: cartItems } = useSelector((state) => state.cart);
  const [clientSecret, setClientSecret] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!cartItems || cartItems.length === 0) {
      navigate("/cart");
      return;
    }

    const total = cartItems
      .filter((item) => item.product)
      .reduce((sum, item) => {
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

  if (loading) return <div className="loading-payment">Loading payment...</div>;
  if (!clientSecret) return <div className="payment-error">Unable to initiate payment.</div>;

  const totalAmount = cartItems
    .filter((item) => item.product)
    .reduce(
      (sum, item) => sum + (Number(item.price) || 0) * (Number(item.quantity) || 0),
      0
    )
    .toFixed(2);

  return (
    <div className="payment-page">
      <div className="payment-container">
        <h1 className="payment-title">Complete Your Purchase</h1>
        
        <div className="payment-summary-card">
          <h2 className="summary-title">Order Summary</h2>
          
          <div className="payment-items">
            {cartItems
              .filter((item) => item.product)
              .map((item) => (
                <div
                  className="payment-item"
                  key={`${item.product._id}-${item.quantityLabel}`}
                >
                  <span className="item-name">
                    {item.product.name} ({item.quantityLabel})
                  </span>
                  <span className="item-quantity">x {item.quantity}</span>
                  <span className="item-price">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
          </div>

          <div className="payment-total">
            <span>Total:</span>
            <span className="total-amount">₹{totalAmount}</span>
          </div>
        </div>

        <div className="shipping-section">
          <h2 className="section-title">Shipping Information</h2>
          <div className="shipping-address-form">
            <label htmlFor="address">Shipping Address</label>
            <textarea
              id="address"
              rows={4}
              value={shippingAddress}
              onChange={(e) => setShippingAddress(e.target.value)}
              required
              placeholder="Enter your full shipping address including postal code"
              className="address-input"
            />
          </div>
        </div>

        <div className="payment-section">
          <h2 className="section-title">Payment Method</h2>
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <CheckoutForm shippingAddress={shippingAddress} />
          </Elements>
        </div>
      </div>
    </div>
  );
}