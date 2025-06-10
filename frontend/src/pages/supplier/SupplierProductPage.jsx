import { useEffect, useState } from "react";
import api from "../../api";
import { useNavigate } from "react-router-dom";
import { FiTrash2, FiEdit2, FiPlus, FiPackage, FiArrowLeft } from "react-icons/fi";
import { FaDog, FaCat, FaDove, FaHorse } from "react-icons/fa";
import { GiCow, GiGoat } from "react-icons/gi";
import "./Supplier.css";

export default function SupplierProductPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const animalIcons = {
    dog: <FaDog className="animal-icon" />,
    cat: <FaCat className="animal-icon" />,
    bird: <FaDove className="animal-icon" />,
    cow: <GiCow className="animal-icon" />,
    goat: <GiGoat className="animal-icon" />,
    poultry: <FaDove className="animal-icon" />,
    horse: <FaHorse className="animal-icon" />,
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await api.get("/supplier/products", {
        withCredentials: true,
      });
      setProducts(res.data);
    } catch (err) {
      alert("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;
    try {
      await api.delete(`/supplier/products/${id}`, { withCredentials: true });
      alert("Product deleted!");
      fetchProducts();
    } catch (err) {
      alert("Failed to delete product");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="supplier-products-container">
      <div className="supplier-products-content">
        {/* Header Section */}
        <div className="supplier-products-header">
          <button
            onClick={() => navigate(-1)}
            className="manage-product-back-button-main"
          >
            <FiArrowLeft className="manage-product-back-icon-main" />
            Back to Inventory
          </button>
          <div className="header-text">
            <h1>My Products</h1>
            <p>Manage your product listings</p>
          </div>
          <button
            className="add-product-btn"
            onClick={() => navigate("/supplier/add-product")}
          >
            <FiPlus className="btn-icon" />
            Add Product
          </button>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading products...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && products.length === 0 && (
          <div className="empty-state">
            <FiPackage className="empty-icon" />
            <h3>No products found</h3>
            <p>Get started by adding your first product</p>
            <button
              className="add-product-btn"
              onClick={() => navigate("/supplier/add-product")}
            >
              <FiPlus className="btn-icon" />
              Add Product
            </button>
          </div>
        )}

        {/* Products Grid */}
        {!loading && products.length > 0 && (
          <div className="products-grid">
            {products.map((product) => (
              <div className="product-card" key={product._id}>
                {/* Product Header */}
                <div className="product-header">
                  <div className="header-content">
                    <h3 className="product-name">{product.name}</h3>
                    <span
                      className={`category-badge ${
                        product.category === "pet"
                          ? "pet-badge"
                          : "livestock-badge"
                      }`}
                    >
                      {product.category === "pet"
                        ? "Pet Food"
                        : "Livestock Feed"}
                    </span>
                  </div>

                  <div className="animal-type">
                    {animalIcons[product.animalType]}
                    <span>{product.animalType}</span>
                  </div>
                </div>

                {/* Nutritional Info */}
                <div className="product-section">
                  <h4 className="section-title">Nutritional Info</h4>
                  <p className="nutritional-info">
                    {product.nutritionalInfo || "Not specified"}
                  </p>
                </div>

                {/* Ingredients */}
                <div className="product-section">
                  <h4 className="section-title">Ingredients</h4>
                  <div className="ingredients-list">
                    {product.ingredients?.length > 0 ? (
                      product.ingredients.map((ingredient, index) => (
                        <span key={index} className="ingredient-tag">
                          {ingredient}
                        </span>
                      ))
                    ) : (
                      <span className="no-ingredients">
                        No ingredients listed
                      </span>
                    )}
                  </div>
                </div>

                {/* Quantity Options */}
                <div className="product-section">
                  <h4 className="section-title">Available Options</h4>
                  <div className="quantity-options">
                    {product.quantityOptions?.map((option) => (
                      <div
                        key={option._id || option.label}
                        className="quantity-option"
                      >
                        <span className="option-label">{option.label}</span>
                        <div className="option-details">
                          <span className="option-price">₹{option.price}</span>
                          <span
                            className={`option-stock ${
                              option.stock > 10
                                ? "high-stock"
                                : option.stock > 0
                                ? "low-stock"
                                : "no-stock"
                            }`}
                          >
                            {option.stock} in stock
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="product-actions">
                  <button
                    className="edit-btn"
                    onClick={() =>
                      navigate(`/supplier/products/${product._id}/edit`)
                    }
                  >
                    <FiEdit2 className="btn-icon" />
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => deleteProduct(product._id)}
                  >
                    <FiTrash2 className="btn-icon" />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
