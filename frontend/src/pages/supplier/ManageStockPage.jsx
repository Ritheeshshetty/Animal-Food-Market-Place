import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api";
import { FiSave, FiArrowLeft, FiPackage } from "react-icons/fi";
import './ManageStockPage.css';

export default function ManageStockPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/supplier/manage-stock/${productId}`);
        setProduct(res.data);
      } catch (err) {
        alert("Failed to fetch product");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  const handleSave = async () => {
    try {
      setIsSaving(true);
      await api.patch(
        `/supplier/manage-stock/${productId}`,
        product,
        { withCredentials: true }
      );
      alert("Stock updated successfully");
      navigate(-1);
    } catch (err) {
      alert("Failed to update stock");
    } finally {
      setIsSaving(false);
    }
  };

  const handleChange = (index, field, value) => {
    const updatedOptions = [...product.quantityOptions];
    updatedOptions[index][field] = value;
    setProduct({ ...product, quantityOptions: updatedOptions });
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading product details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="error-container">
        <FiPackage className="error-icon" />
        <p>Product not found</p>
        <button 
          className="back-btn"
          onClick={() => navigate(-1)}
        >
          <FiArrowLeft /> Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="manage-stock-container">
      <div className="manage-stock-header">
        <button 
          className="back-btn"
          onClick={() => navigate(-1)}
        >
          <FiArrowLeft /> Back
        </button>
        <h2>Manage Stock: {product.name}</h2>
      </div>

      <div className="stock-options-container">
        {product.quantityOptions.map((option, index) => (
          <div key={index} className="stock-option-card">
            <div className="option-input-group">
              <label>Package Size</label>
              <input
                type="text"
                value={option.label}
                onChange={(e) => handleChange(index, "label", e.target.value)}
                placeholder="e.g., 1kg, 5lb"
                className="stock-input"
              />
            </div>

            <div className="option-input-group">
              <label>Price (₹)</label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={option.price}
                onChange={(e) =>
                  handleChange(index, "price", parseFloat(e.target.value))
                }
                placeholder="0.00"
                className="stock-input"
              />
            </div>

            <div className="option-input-group">
              <label>Stock Qty</label>
              <input
                type="number"
                min="0"
                value={option.stock}
                onChange={(e) =>
                  handleChange(index, "stock", parseInt(e.target.value))
                }
                placeholder="0"
                className={`stock-input ${
                  option.stock < 10 ? 'low-stock' : ''
                } ${option.stock === 0 ? 'out-of-stock' : ''}`}
              />
              <div className="stock-status">
                {option.stock === 0 ? (
                  <span className="status-badge out-of-stock-badge">Out of Stock</span>
                ) : option.stock < 10 ? (
                  <span className="status-badge low-stock-badge">Low Stock</span>
                ) : (
                  <span className="status-badge in-stock-badge">In Stock</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="action-buttons">
        <button 
          onClick={handleSave} 
          className="save-btn"
          disabled={isSaving}
        >
          {isSaving ? (
            'Saving...'
          ) : (
            <>
              <FiSave /> Save Changes
            </>
          )}
        </button>
      </div>
    </div>
  );
}