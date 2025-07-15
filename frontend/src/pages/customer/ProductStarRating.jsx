// // components/ProductStarRating.jsx
// import { useState } from "react";
// import api from "../../api";
// import { FaStar, FaRegStar } from "react-icons/fa";
// import "./review.css";

// export default function ProductStarRating({ productId, initialRating = 0 }) {
//   const [rating, setRating] = useState(initialRating);
//   const [hoverRating, setHoverRating] = useState(0);

//   const submitRating = async (newRating) => {
//     setRating(newRating);
//     try {
//       await api.post(`/products/${productId}/rate`, { rating: newRating }, { withCredentials: true });
//       console.log(`Rated product ${productId} with ${newRating} stars`);
//     } catch (err) {
//       console.error("Error submitting product rating:", err);
//     }
//   };

//   return (
//     <div className="star-rating">
//       {[1, 2, 3, 4, 5].map((star) => (
//         <button
//           key={star}
//           onClick={() => submitRating(star)}
//           onMouseEnter={() => setHoverRating(star)}
//           onMouseLeave={() => setHoverRating(0)}
//           className="star-button"
//         >
//           {(hoverRating || rating) >= star ? <FaStar /> : <FaRegStar />}
//         </button>
//       ))}
//     </div>
//   );
// }


// import { useEffect, useState } from "react";
// import api from "../../api";
// import { FaStar, FaRegStar } from "react-icons/fa";
// import { FiSend } from "react-icons/fi";

// export default function ProductStarRating({ productId, initialRating = 0 }) {
//   const [rating, setRating] = useState(initialRating);
//   const [hoverRating, setHoverRating] = useState(0);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isRated, setIsRated] = useState(false);




//   useEffect(() => {
//   const fetchUserRating = async () => {
//     try {
//       const res = await api.get(`/reviews/product/${productId}`, { withCredentials: true });
//       if (res.data.hasRated) {
//         setRating(res.data.rating);
//         setIsRated(true);
//       }
//     } catch (err) {
//       console.error("Error fetching product review:", err);
//     }
//   };

//   fetchUserRating();
// }, [productId]);



//   const submitRating = async (newRating) => {
//     setIsSubmitting(true);
//     try {
//       await api.post(
//         `/products/${productId}/rate`,
//         { rating: newRating },
//         { withCredentials: true }
//       );
//       setRating(newRating);
//       setIsRated(true);
//       console.log(`Rated product ${productId} with ${newRating} stars`);
//     } catch (err) {
//       console.error("Error submitting product rating:", err);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleRateClick = () => {
//     if (rating > 0) {
//       submitRating(rating);
//     }
//   };

//   return (
//     <div className="star-rating-container">
//       <div className="stars-wrapper">
//         {[1, 2, 3, 4, 5].map((star) => (
//           <button
//             key={star}
//             onClick={() => setRating(star)}
//             onMouseEnter={() => setHoverRating(star)}
//             onMouseLeave={() => setHoverRating(0)}
//             className={`star-button ${(hoverRating || rating) >= star ? "active" : ""}`}
//             disabled={isRated}
//             aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
//           >
//             {(hoverRating || rating) >= star ? (
//               <FaStar className="star-icon" />
//             ) : (
//               <FaRegStar className="star-icon" />
//             )}
//           </button>
//         ))}
//       </div>

//       {!isRated && rating > 0 && (
//         <button
//           onClick={handleRateClick}
//           className="rate-button"
//           disabled={isSubmitting}
//         >
//           {isSubmitting ? (
//             "Submitting..."
//           ) : (
//             <>
//               <FiSend className="send-icon" />
//               Rate
//             </>
//           )}
//         </button>
//       )}

//       {isRated && (
//         <div className="rating-confirmation">
//           Thanks for your {rating}-star rating!
//         </div>
//       )}
//     </div>
//   );
// }



import { useEffect, useState } from "react";
import api from "../../api";
import { FaStar, FaRegStar } from "react-icons/fa";
import { FiSend } from "react-icons/fi";

export default function ProductStarRating({ productId }) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRated, setIsRated] = useState(false);

  useEffect(() => {
    // Fetch if user already rated
    const fetchUserReview = async () => {
      try {
        const res = await api.get(`/reviews/${productId}/user-review`, { withCredentials: true });
        if (res.data.hasRated) {
          setRating(res.data.rating);
          setIsRated(true);
        }
      } catch (err) {
        console.error("Error fetching user review:", err);
      }
    };

    fetchUserReview();
  }, [productId]);

  const submitRating = async (newRating) => {
    setIsSubmitting(true);
    try {
      await api.post(
        `/reviews/${productId}`,
        { rating: newRating },
        { withCredentials: true }
      );
      setRating(newRating);
      setIsRated(true);
      console.log(`Rated product ${productId} with ${newRating} stars`);
    } catch (err) {
      console.error("Error submitting product rating:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRateClick = () => {
    if (rating > 0) {
      submitRating(rating);
    }
  };

  return (
    <div className="star-rating-container">
      <div className="stars-wrapper">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => setRating(star)}
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
            className={`star-button ${(hoverRating || rating) >= star ? "active" : ""}`}
            disabled={isRated}
            aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
          >
            {(hoverRating || rating) >= star ? (
              <FaStar className="star-icon" />
            ) : (
              <FaRegStar className="star-icon" />
            )}
          </button>
        ))}
      </div>

      {!isRated && rating > 0 && (
        <button
          onClick={handleRateClick}
          className="rate-button"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            "Submitting..."
          ) : (
            <>
              <FiSend className="send-icon" />
              Rate
            </>
          )}
        </button>
      )}

      {isRated && (
        <div className="rating-confirmation">
          Thanks for your {rating}-star rating!
        </div>
      )}
    </div>
  );
}
