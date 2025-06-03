import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FiShoppingCart, FiStar, FiInfo, FiPackage, FiTag, FiArrowLeft } from 'react-icons/fi';
import api from '../../api';
import { toast } from 'react-toastify'; 

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/products/${id}`);
        setProduct(res.data);
        setSelectedOption(res.data.quantityOptions[0]);
      } catch (err) {
        console.error('Error fetching product details:', err);
        setError('Failed to load product details');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleQuantityChange = (e) => {
    const option = product.quantityOptions.find(opt => opt.label === e.target.value);
    setSelectedOption(option);
  };

  const handleAddToCart = () => {
    if (!selectedOption || selectedOption.stock <= 0) {
      alert("This product is out of stock.");
      return;
    }

    const cartItem = {
      productId: product._id,
      name: product.name,
      quantityLabel: selectedOption.label,
      price: selectedOption.price,
      quantity: 1,
      availableStock: selectedOption.stock,
    };

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItemIndex = cart.findIndex(
      item => item.productId === product._id && item.quantityLabel === selectedOption.label
    );

    if (existingItemIndex >= 0) {
      if (cart[existingItemIndex].quantity < selectedOption.stock) {
        cart[existingItemIndex].quantity += 1;
      } else {
        alert(`Only ${selectedOption.stock} in stock!`);
        return;
      }
    } else {
      cart.push(cartItem);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    toast.success(`${product.name} (${selectedOption.label}) added to cart!`);
    navigate("/cart")
    // alert(`${product.name} (${selectedOption.label}) added to cart!`);
  };

  if (loading) return (
    <div className="product-details-loading-main">
      <div className="product-details-loading-spinner-main">Loading product details...</div>
    </div>
  );

  if (error) return (
    <div className="product-details-error-main">
      <div className="product-details-error-content-main">
        <FiInfo className="product-details-error-icon-main" />
        <p>{error}</p>
      </div>
    </div>
  );

  if (!product) return (
    <div className="product-details-not-found-main">
      <div className="product-details-not-found-content-main">
        <FiPackage className="product-details-not-found-icon-main" />
        <p>Product not found</p>
      </div>
    </div>
  );

  return (
    <div className="product-details-container-main">
       <button className="back-button" onClick={() => navigate(-1)}>
                <FiArrowLeft /> Back
              </button>
      <div className="product-details-header-main">
        <h1 className="product-details-title-main">{product.name}</h1>
        <div className="product-details-meta-main">
          <span className={`product-details-category-main ${
            product.category === 'pet'
              ? 'product-details-category-pet-main'
              : 'product-details-category-livestock-main'
          }`}>
            {product.category}
          </span>
          <span className="product-details-animal-type-main">
            {product.animalType}
          </span>
        </div>
      </div>

      <div className="product-details-content-main">
        <div className="product-details-section-main">
          <h3 className="product-details-section-title-main">
            <FiTag className="product-details-section-icon-main" />
            Pricing Options
          </h3>

          <div className="product-details-quantity-main">
            <label htmlFor="quantitySelect" className="product-details-quantity-label-main">
              Select Quantity:
            </label>
            <select
              id="quantitySelect"
              value={selectedOption?.label}
              onChange={handleQuantityChange}
              className="product-details-select-main"
            >
              {product.quantityOptions.map((opt) => (
                <option key={opt.label} value={opt.label}>
                  {opt.label} - ₹{opt.price} ({opt.stock} in stock)
                </option>
              ))}
            </select>
          </div>

          <div className="product-details-price-main">
            <span className="product-details-price-label-main">Price:</span>
            <span className="product-details-price-value-main">₹{selectedOption?.price}</span>
          </div>

          <button
            className="product-details-add-button-main"
            onClick={handleAddToCart}
            disabled={selectedOption?.stock <= 0}
          >
            <FiShoppingCart className="product-details-add-button-icon-main" />
            {selectedOption?.stock <= 0 ? 'Out of Stock' : 'Add to Cart'}
          </button>
        </div>

        <div className="product-details-section-main">
          <h3 className="product-details-section-title-main">
            <FiInfo className="product-details-section-icon-main" />
            Product Information
          </h3>

          <div className="product-details-info-group-main">
            <h4 className="product-details-info-label-main">Nutritional Info:</h4>
            <p className="product-details-info-text-main">{product.nutritionalInfo}</p>
          </div>

          <div className="product-details-info-group-main">
            <h4 className="product-details-info-label-main">Ingredients:</h4>
            <p className="product-details-info-text-main">{product.ingredients.join(', ')}</p>
          </div>
        </div>

        <div className="product-details-section-main">
          <h3 className="product-details-section-title-main">
            <FiStar className="product-details-section-icon-main" />
            Ratings
          </h3>
          <div className="product-details-ratings-main">
            {product.ratings.length > 0 ? (
              <>
                <span className="product-details-rating-value-main">
                  {(product.ratings.reduce((a, b) => a + b) / product.ratings.length).toFixed(1)}/5
                </span>
                <span className="product-details-rating-count-main">
                  ({product.ratings.length} reviews)
                </span>
              </>
            ) : (
              <span className="product-details-no-ratings-main">No ratings yet</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
