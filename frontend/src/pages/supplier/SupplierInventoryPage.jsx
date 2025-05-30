import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api';
import { FiEdit2, FiPlus, FiTrash2, FiPackage, FiArrowLeft } from 'react-icons/fi';
import { FaDog, FaCat, FaDove, FaHorse } from 'react-icons/fa';
import { GiCow } from 'react-icons/gi';

function SupplierInventoryPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const animalIcons = {
    dog: <FaDog className="animal-icon" />,
    cat: <FaCat className="animal-icon" />,
    bird: <FaDove className="animal-icon" />,
    cow: <GiCow className="animal-icon" />,
    goat: <FaHorse className="animal-icon" />,
    poultry: <FaDove className="animal-icon" />
  };

  useEffect(() => {
    const fetchMyProducts = async () => {
      try {
        setLoading(true);
        const res = await api.get('/products/my', { withCredentials: true });
        setProducts(res.data);
      } catch (err) {
        alert('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchMyProducts();
  }, []);

  const handleDelete = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await api.delete(`/products/${productId}`, { withCredentials: true });
        setProducts(products.filter(p => p._id !== productId));
        alert('Product deleted successfully');
      } catch (err) {
        alert('Failed to delete product');
      }
    }
  };

  const handleUpdate = (productId) => {
    navigate(`/supplier/edit-product/${productId}`);
  };

  const calculateTotalStock = (quantityOptions) => {
    return quantityOptions.reduce((total, option) => total + option.stock, 0);
  };

  return (
    <div className="supplier-dashboard">
      <div className="supplier-container">
         <button className="back-button" onClick={() => navigate(-1)}>
                <FiArrowLeft /> Back
          </button>
        <div className="supplier-header">
          <h1 className="supplier-title">
            <FiPackage className="title-icon" />
            Product Inventory
          </h1>
          <button 
            className="primary-btn"
            onClick={() => navigate('/supplier/add-product')}
          >
            <FiPlus /> Add New Product
          </button>
        </div>

        {loading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading your inventory...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="empty-state">
            <FiPackage className="empty-icon" />
            <h3>Your inventory is empty</h3>
            <p>Get started by adding your first product</p>
            <button 
              className="primary-btn"
              onClick={() => navigate('/supplier/add-product')}
            >
              <FiPlus /> Add Product
            </button>
          </div>
        ) : (
          <div className="inventory-grid">
            <div className="inventory-table-header">
              <div className="header-cell product">Product</div>
              <div className="header-cell animal">Animal</div>
              <div className="header-cell category">Category</div>
              <div className="header-cell stock">Stock Level</div>
              <div className="header-cell actions">Actions</div>
            </div>

            {products.map((product) => (
              <div className="inventory-card" key={product._id}>
                <div className="card-cell product-info">
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-ingredients">
                    {product.ingredients?.slice(0, 3).join(', ')}
                    {product.ingredients?.length > 3 ? '...' : ''}
                  </p>
                </div>

                <div className="card-cell animal-info">
                  <div className="animal-type">
                    {animalIcons[product.animalType]}
                    <span>{product.animalType}</span>
                  </div>
                </div>

                <div className="card-cell category-info">
                  <span className={`category-tag ${product.category}`}>
                    {product.category === 'pet' ? 'Pet Food' : 'Livestock Feed'}
                  </span>
                </div>

                <div className="card-cell stock-info">
                  <div className="stock-meter">
                    <div 
                      className="stock-fill" 
                      style={{ width: `${Math.min(100, calculateTotalStock(product.quantityOptions))}%` }}
                    ></div>
                    <span className="stock-count">
                      {calculateTotalStock(product.quantityOptions)} units
                    </span>
                  </div>
                </div>

                <div className="card-cell action-buttons">
                  <button 
                    className="edit-btn"
                    onClick={() => handleUpdate(product._id)}
                  >
                    <FiEdit2 /> Edit
                  </button>
                  <button 
                    className="delete-btn"
                    onClick={() => handleDelete(product._id)}
                  >
                    <FiTrash2 /> Delete
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

export default SupplierInventoryPage;