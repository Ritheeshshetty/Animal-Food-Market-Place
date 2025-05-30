import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api';
import { FiEdit2, FiPlus, FiTrash2 } from 'react-icons/fi';
import { FaDog, FaCat, FaDove, FaHorse } from 'react-icons/fa';
import { GiCow } from 'react-icons/gi';

function SupplierInventoryPage() {
  const [products, setProducts] = useState([]);
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
        const res = await api.get('/products/my', { withCredentials: true });
        setProducts(res.data);
      } catch (err) {
        alert('Failed to fetch products');
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
    <div className="inventory-container">
      <div className="inventory-header">
        <h2 className="inventory-title">Your Inventory</h2>
        <button 
          className="add-product-btn"
          onClick={() => navigate('/supplier/add-product')}
        >
          <FiPlus /> Add Product
        </button>
      </div>

      {products.length === 0 ? (
        <div className="empty-state">
          <p>You haven't added any products yet.</p>
          <button 
            className="add-product-btn"
            onClick={() => navigate('/supplier/add-product')}
          >
            <FiPlus /> Add Your First Product
          </button>
        </div>
      ) : (
        <div className="inventory-table-container">
          <table className="inventory-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Animal</th>
                <th>Category</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>
                    <div className="product-name">{product.name}</div>
                    <div className="product-category">{product.category}</div>
                  </td>
                  <td>
                    <div className="animal-cell">
                      {animalIcons[product.animalType]}
                      <span>{product.animalType}</span>
                    </div>
                  </td>
                  <td>
                    <span className={`category-badge ${product.category}`}>
                      {product.category}
                    </span>
                  </td>
                  <td>
                    <div className="stock-indicator">
                      <div 
                        className="stock-bar" 
                        style={{ width: `${Math.min(100, calculateTotalStock(product.quantityOptions))}%` }}
                      />
                      <span>{calculateTotalStock(product.quantityOptions)} in stock</span>
                    </div>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="edit-btn"
                        onClick={() => handleUpdate(product._id)}
                      >
                        <FiEdit2 /> Edit
                      </button>
                      <button 
                        className="delete-btn-supplier"
                        onClick={() => handleDelete(product._id)}
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default SupplierInventoryPage;