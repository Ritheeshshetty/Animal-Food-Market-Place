// import { useEffect, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { FiShoppingCart, FiStar, FiInfo, FiPackage, FiTag, FiArrowLeft } from 'react-icons/fi';
// import api from '../../api';
// import { toast } from 'react-toastify';
// import { useDispatch } from 'react-redux';
// import { addOrUpdateCartItem } from '../../redux/slices/cartSlice';

// export default function ProductDetails() {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//   const [selectedOption, setSelectedOption] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const res = await api.get(`/products/${id}`);
//         setProduct(res.data);
//         setSelectedOption(res.data.quantityOptions[0]);
//       } catch (err) {
//         console.error('Error fetching product details:', err);
//         setError('Failed to load product details');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProduct();
//   }, [id]);

//   const handleQuantityChange = (e) => {
//     const option = product.quantityOptions.find(opt => opt.label === e.target.value);
//     setSelectedOption(option);
//   };

//   const handleAddToCart = async () => {
//     if (!selectedOption || selectedOption.stock <= 0) {
//       toast.error("This product is out of stock.");
//       return;
//     }

//     try {
//       // Dispatch Redux thunk to add to cart in DB
//       await dispatch(addOrUpdateCartItem({
//         product: product._id,
//         quantityLabel: selectedOption.label,
//         quantity: 1
//       })).unwrap();

//       toast.success(`${product.name} (${selectedOption.label}) added to cart!`);
//       navigate("/cart");
//     } catch (err) {
//       toast.error(err || "Failed to add to cart.");
//     }
//   };

//   if (loading) return (
//     <div className="product-details-loading-main">
//       <div className="product-details-loading-spinner-main">Loading product details...</div>
//     </div>
//   );

//   if (error) return (
//     <div className="product-details-error-main">
//       <div className="product-details-error-content-main">
//         <FiInfo className="product-details-error-icon-main" />
//         <p>{error}</p>
//       </div>
//     </div>
//   );

//   if (!product) return (
//     <div className="product-details-not-found-main">
//       <div className="product-details-not-found-content-main">
//         <FiPackage className="product-details-not-found-icon-main" />
//         <p>Product not found</p>
//       </div>
//     </div>
//   );

//   return (
//     <div className="product-details-container-main">
//       <button className="back-button" onClick={() => navigate(-1)}>
//         <FiArrowLeft /> Back
//       </button>
//       <div className="product-details-header-main">
//         <h1 className="product-details-title-main">{product.name}</h1>
//         <div className="product-details-meta-main">
//           <span className={`product-details-category-main ${
//             product.category === 'pet'
//               ? 'product-details-category-pet-main'
//               : 'product-details-category-livestock-main'
//           }`}>
//             {product.category}
//           </span>
//           <span className="product-details-animal-type-main">
//             {product.animalType}
//           </span>
//         </div>
//       </div>

//       <div className="product-details-content-main">
//         <div className="product-details-section-main">
//           <h3 className="product-details-section-title-main">
//             <FiTag className="product-details-section-icon-main" />
//             Pricing Options
//           </h3>

//           <div className="product-details-quantity-main">
//             <label htmlFor="quantitySelect" className="product-details-quantity-label-main">
//               Select Quantity:
//             </label>
//             <select
//               id="quantitySelect"
//               value={selectedOption?.label}
//               onChange={handleQuantityChange}
//               className="product-details-select-main"
//             >
//               {product.quantityOptions.map((opt) => (
//                 <option key={opt.label} value={opt.label}>
//                   {opt.label} - ₹{opt.price} ({opt.stock} in stock)
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div className="product-details-price-main">
//             <span className="product-details-price-label-main">Price:</span>
//             <span className="product-details-price-value-main">₹{selectedOption?.price}</span>
//           </div>

//           <button
//             className="product-details-add-button-main"
//             onClick={handleAddToCart}
//             disabled={selectedOption?.stock <= 0}
//           >
//             <FiShoppingCart className="product-details-add-button-icon-main" />
//             {selectedOption?.stock <= 0 ? 'Out of Stock' : 'Add to Cart'}
//           </button>
//         </div>

//         <div className="product-details-section-main">
//           <h3 className="product-details-section-title-main">
//             <FiInfo className="product-details-section-icon-main" />
//             Product Information
//           </h3>

//           <div className="product-details-info-group-main">
//             <h4 className="product-details-info-label-main">Nutritional Info:</h4>
//             <p className="product-details-info-text-main">{product.nutritionalInfo}</p>
//           </div>

//           <div className="product-details-info-group-main">
//             <h4 className="product-details-info-label-main">Ingredients:</h4>
//             <p className="product-details-info-text-main">{product.ingredients.join(', ')}</p>
//           </div>
//         </div>

//         <div className="product-details-section-main">
//           <h3 className="product-details-section-title-main">
//             <FiStar className="product-details-section-icon-main" />
//             Ratings
//           </h3>
//           <div className="product-details-ratings-main">
//             {product.ratings.length > 0 ? (
//               <>
//                 <span className="product-details-rating-value-main">
//                   {(product.ratings.reduce((a, b) => a + b) / product.ratings.length).toFixed(1)}/5
//                 </span>
//                 <span className="product-details-rating-count-main">
//                   ({product.ratings.length} reviews)
//                 </span>
//               </>
//             ) : (
//               <span className="product-details-no-ratings-main">No ratings yet</span>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// import { useEffect, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import {
//   FiShoppingCart,
//   FiStar,
//   FiInfo,
//   FiPackage,
//   FiTag,
//   FiArrowLeft
// } from 'react-icons/fi';
// import api from '../../api';
// import { toast } from 'react-toastify';
// import { useDispatch } from 'react-redux';
// import {
//   addOrUpdateCartItem,
//   addGuestItem
// } from '../../redux/slices/cartSlice';
// import useAuth from '../../hooks/useAuth'; // 👈 NEW

// export default function ProductDetails() {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//   const [selectedOption, setSelectedOption] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { user } = useAuth(); // 👈 Get auth user

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const res = await api.get(`/products/${id}`);
//         setProduct(res.data);
//         setSelectedOption(res.data.quantityOptions[0]);
//       } catch (err) {
//         console.error('Error fetching product details:', err);
//         setError('Failed to load product details');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProduct();
//   }, [id]);

//   const handleQuantityChange = (e) => {
//     const option = product.quantityOptions.find(opt => opt.label === e.target.value);
//     setSelectedOption(option);
//   };

//   const handleAddToCart = async () => {
//     if (!selectedOption || selectedOption.stock <= 0) {
//       toast.error("This product is out of stock.");
//       return;
//     }

//     const cartPayload = {
//       product: product._id,
//       quantityLabel: selectedOption.label,
//       quantity: 1,
//       price: selectedOption.price,
//     };

//     try {
//       if (user) {
//         // Logged-in: Save to DB
//         await dispatch(addOrUpdateCartItem(cartPayload)).unwrap();
//       } else {
//         // Guest: Save to localStorage
//         dispatch(addGuestItem(cartPayload));
//       }

//       toast.success(`${product.name} (${selectedOption.label}) added to cart!`);
//       navigate("/cart");
//     } catch (err) {
//       toast.error(err?.message || "Failed to add to cart.");
//     }
//   };

//   if (loading) return (
//     <div className="product-details-loading-main">
//       <div className="product-details-loading-spinner-main">Loading product details...</div>
//     </div>
//   );

//   if (error) return (
//     <div className="product-details-error-main">
//       <div className="product-details-error-content-main">
//         <FiInfo className="product-details-error-icon-main" />
//         <p>{error}</p>
//       </div>
//     </div>
//   );

//   if (!product) return (
//     <div className="product-details-not-found-main">
//       <div className="product-details-not-found-content-main">
//         <FiPackage className="product-details-not-found-icon-main" />
//         <p>Product not found</p>
//       </div>
//     </div>
//   );

//   return (
//     <div className="product-details-container-main">
//       <button className="back-button" onClick={() => navigate(-1)}>
//         <FiArrowLeft /> Back
//       </button>

//       <div className="product-details-header-main">
//         <h1 className="product-details-title-main">{product.name}</h1>
//         <div className="product-details-meta-main">
//           <span className={`product-details-category-main ${
//             product.category === 'pet'
//               ? 'product-details-category-pet-main'
//               : 'product-details-category-livestock-main'
//           }`}>
//             {product.category}
//           </span>
//           <span className="product-details-animal-type-main">
//             {product.animalType}
//           </span>
//         </div>
//       </div>

//       <div className="product-details-content-main">
//         <div className="product-details-section-main">
//           <h3 className="product-details-section-title-main">
//             <FiTag className="product-details-section-icon-main" />
//             Pricing Options
//           </h3>

//           <div className="product-details-quantity-main">
//             <label htmlFor="quantitySelect" className="product-details-quantity-label-main">
//               Select Quantity:
//             </label>
//             <select
//               id="quantitySelect"
//               value={selectedOption?.label}
//               onChange={handleQuantityChange}
//               className="product-details-select-main"
//             >
//               {product.quantityOptions.map((opt) => (
//                 <option key={opt.label} value={opt.label}>
//                   {opt.label} - ₹{opt.price} ({opt.stock} in stock)
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div className="product-details-price-main">
//             <span className="product-details-price-label-main">Price:</span>
//             <span className="product-details-price-value-main">₹{selectedOption?.price}</span>
//           </div>

//           <button
//             className="product-details-add-button-main"
//             onClick={handleAddToCart}
//             disabled={selectedOption?.stock <= 0}
//           >
//             <FiShoppingCart className="product-details-add-button-icon-main" />
//             {selectedOption?.stock <= 0 ? 'Out of Stock' : 'Add to Cart'}
//           </button>
//         </div>

//         <div className="product-details-section-main">
//           <h3 className="product-details-section-title-main">
//             <FiInfo className="product-details-section-icon-main" />
//             Product Information
//           </h3>

//           <div className="product-details-info-group-main">
//             <h4 className="product-details-info-label-main">Nutritional Info:</h4>
//             <p className="product-details-info-text-main">{product.nutritionalInfo}</p>
//           </div>

//           <div className="product-details-info-group-main">
//             <h4 className="product-details-info-label-main">Ingredients:</h4>
//             <p className="product-details-info-text-main">{product.ingredients.join(', ')}</p>
//           </div>
//         </div>

//         <div className="product-details-section-main">
//           <h3 className="product-details-section-title-main">
//             <FiStar className="product-details-section-icon-main" />
//             Ratings
//           </h3>
//           <div className="product-details-ratings-main">
//             {product.ratings.length > 0 ? (
//               <>
//                 <span className="product-details-rating-value-main">
//                   {(product.ratings.reduce((a, b) => a + b) / product.ratings.length).toFixed(1)}/5
//                 </span>
//                 <span className="product-details-rating-count-main">
//                   ({product.ratings.length} reviews)
//                 </span>
//               </>
//             ) : (
//               <span className="product-details-no-ratings-main">No ratings yet</span>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// import { useEffect, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { FiShoppingCart, FiStar, FiInfo, FiPackage, FiTag, FiArrowLeft } from 'react-icons/fi';
// import api from '../../api';
// import { toast } from 'react-toastify';
// import { useDispatch, useSelector } from 'react-redux';
// import { addOrUpdateCartItem } from '../../redux/slices/cartSlice';
// import useAuth from '../../hooks/useAuth';

// export default function ProductDetails() {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//   const [selectedOption, setSelectedOption] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { user } = useAuth();
//   const guestCart = JSON.parse(localStorage.getItem("guest_cart") || "[]");

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const res = await api.get(`/products/${id}`);
//         setProduct(res.data);
//         setSelectedOption(res.data.quantityOptions[0]);
//       } catch (err) {
//         console.error('Error fetching product details:', err);
//         setError('Failed to load product details');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProduct();
//   }, [id]);

//   const handleQuantityChange = (e) => {
//     const option = product.quantityOptions.find(opt => opt.label === e.target.value);
//     setSelectedOption(option);
//   };

//   const handleAddToCart = async () => {
//     if (!selectedOption || selectedOption.stock <= 0) {
//       toast.error("This product is out of stock.");
//       return;
//     }

//     const item = {
//       product: product._id,
//       quantityLabel: selectedOption.label,
//       quantity: 1,
//       price: selectedOption.price,
//       name: product.name,
//       animalType: product.animalType,
//     };

//     try {
//       if (user) {
//         await dispatch(addOrUpdateCartItem(item)).unwrap();
//       } else {
//         const updatedGuestCart = [...guestCart];
//         const index = updatedGuestCart.findIndex(
//           (i) => i.product === item.product && i.quantityLabel === item.quantityLabel
//         );

//         if (index > -1) {
//           updatedGuestCart[index].quantity += 1;
//         } else {
//           updatedGuestCart.push(item);
//         }

//         localStorage.setItem("guest_cart", JSON.stringify(updatedGuestCart));
//       }

//       toast.success(`${product.name} (${selectedOption.label}) added to cart!`);
//       navigate("/cart");
//     } catch (err) {
//       toast.error(err?.message || "Failed to add to cart.");
//     }
//   };

//   if (loading) return <div>Loading product details...</div>;
//   if (error) return <div>Error: {error}</div>;
//   if (!product) return <div>Product not found</div>;

//   return (
//     <div className="product-details-container-main">
//       <button className="back-button" onClick={() => navigate(-1)}>
//         <FiArrowLeft /> Back
//       </button>

//       <h1>{product.name}</h1>
//       <div>
//         <select value={selectedOption?.label} onChange={handleQuantityChange}>
//           {product.quantityOptions.map((opt) => (
//             <option key={opt.label} value={opt.label}>
//               {opt.label} - ₹{opt.price} ({opt.stock} in stock)
//             </option>
//           ))}
//         </select>
//       </div>
//       <div>Price: ₹{selectedOption?.price}</div>

//       <button
//         onClick={handleAddToCart}
//         disabled={selectedOption?.stock <= 0}
//       >
//         <FiShoppingCart /> {selectedOption?.stock <= 0 ? 'Out of Stock' : 'Add to Cart'}
//       </button>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FiShoppingCart,
  FiStar,
  FiInfo,
  FiPackage,
  FiTag,
  FiArrowLeft,
} from "react-icons/fi";
import api from "../../api";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addOrUpdateCartItem } from "../../redux/slices/cartSlice";
import useAuth from "../../hooks/useAuth";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useAuth();
  const guestCart = JSON.parse(localStorage.getItem("guest_cart") || "[]");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/products/${id}`);
        setProduct(res.data);
        setSelectedOption(res.data.quantityOptions[0]);
      } catch (err) {
        console.error("Error fetching product details:", err);
        setError("Failed to load product details");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleQuantityChange = (e) => {
    const option = product.quantityOptions.find(
      (opt) => opt.label === e.target.value
    );
    setSelectedOption(option);
  };

  const handleAddToCart = async () => {
    if (!selectedOption || selectedOption.stock <= 0) {
      toast.error("This product is out of stock.");
      return;
    }

    const item = {
      product: product._id,
      quantityLabel: selectedOption.label,
      quantity: 1,
      price: selectedOption.price,
      name: product.name,
      animalType: product.animalType,
    };

    try {
      if (user) {
        await dispatch(addOrUpdateCartItem(item)).unwrap();
      } else {
        const updatedGuestCart = [...guestCart];
        const index = updatedGuestCart.findIndex(
          (i) =>
            i.product === item.product && i.quantityLabel === item.quantityLabel
        );

        if (index > -1) {
          updatedGuestCart[index].quantity += 1;
        } else {
          updatedGuestCart.push(item);
        }

        localStorage.setItem("guest_cart", JSON.stringify(updatedGuestCart));
      }

      toast.success(`${product.name} (${selectedOption.label}) added to cart!`);
      navigate("/cart");
    } catch (err) {
      toast.error(err?.message || "Failed to add to cart.");
    }
  };

  if (loading) return <div className="loading">Loading product details...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!product) return <div className="not-found">Product not found</div>;

  const getImageUrl = (image) => {
    if (!image) return "/default-product-image.png";
    if (image.startsWith("http")) return image;
    if (image.startsWith("/")) return `http://localhost:5000${image}`;
    return `http://localhost:5000/uploads/${image}`;
  };

  return (
    <div className="product-details">
      <div className="product-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          <FiArrowLeft /> Back
        </button>
        <h1 className="product-title">{product.name}</h1>
      </div>

      <div className="product-content">
        <div className="product-image-container-details">
          <img
            src={getImageUrl(product.image)}
            alt={product.name}
            loading="lazy"
            className="product-image-details"
          />
        </div>

        <div className="product-info">
          <div className="product-meta">
            <span className={`product-type ${product.animalType}`}>
              {product.animalType}
            </span>
            <div className="product-rating">
              <FiStar className="star-icon" />
              <span>{product.rating || "4.5"}</span>
            </div>
          </div>

          <p className="product-description">{product.description}</p>

          <div className="quantity-selector">
            <label htmlFor="quantity">Select Quantity:</label>
            <select
              id="quantity"
              value={selectedOption?.label}
              onChange={handleQuantityChange}
              className="quantity-dropdown"
            >
              {product.quantityOptions.map((opt) => (
                <option key={opt.label} value={opt.label}>
                  {opt.label} - ₹{opt.price} ({opt.stock} in stock)
                </option>
              ))}
            </select>
          </div>

          <div className="price-section">
            <span className="price-label">Price:</span>
            <span className="price">₹{selectedOption?.price}</span>
          </div>

          <div className="product-specs">
            <div className="spec-item">
              <FiPackage className="spec-icon" />
              <span>Brand: {product.brand || "Generic"}</span>
            </div>
            <div className="spec-item">
              <FiInfo className="spec-icon" />
              <span>Stock: {selectedOption?.stock} available</span>
            </div>
            <div className="spec-item">
              <FiTag className="spec-icon" />
              <span>Category: {product.category || "Pet Supplies"}</span>
            </div>
          </div>

          <button
            className={`add-to-cart ${
              selectedOption?.stock <= 0 ? "out-of-stock" : ""
            }`}
            onClick={handleAddToCart}
            disabled={selectedOption?.stock <= 0}
          >
            <FiShoppingCart className="cart-icon" />
            {selectedOption?.stock <= 0 ? "Out of Stock" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}
