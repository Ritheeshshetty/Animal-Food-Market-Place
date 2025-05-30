import { useEffect, useState } from 'react';
import api from '../../api';
import AdminNav from '../../components/AdminNav';
import { FiTrash2, FiEdit2, FiPlus } from 'react-icons/fi';
import { FaDog, FaCat, FaDove, FaHorse } from 'react-icons/fa';
import { GiCow,GiGoat} from 'react-icons/gi';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const animalIcons = {
    dog: <FaDog className="animal-icon" />,
    cat: <FaCat className="animal-icon" />,
    bird: <FaDove className="animal-icon" />,
    cow: <GiCow className="animal-icon" />,
    goat: <GiGoat className="animal-icon" />,
    poultry: <FaDove className="animal-icon" />,
    horse: <FaHorse className="animal-icon" />
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await api.get('/admin/products');
      setProducts(res.data);
    } catch (err) {
      alert('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await api.delete(`/admin/products/${id}`);
      fetchProducts();
    } catch (err) {
      alert('Failed to delete product');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="admin-dashboard">
      <AdminNav />
      
      <div className="admin-container">
        <div className="admin-header">
          <h1 className="admin-title">Product Management</h1>
          <p className="admin-subtitle">Manage all products in the marketplace</p>
        </div>

        {loading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading products...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="empty-state">
            <FiPackage className="empty-icon" />
            <p>No products found</p>
          </div>
        ) : (
          <div className="products-grid">
            {products.map(product => (
              <div className="product-card" key={product._id}>
                <div className="product-header">
                  <h3 className="product-name">{product.name}</h3>
                  <div className="product-category-badge">
                    {product.category === 'pet' ? 'Pet Food' : 'Livestock Feed'}
                  </div>
                </div>

                <div className="product-meta">
                  <div className="animal-type">
                    {animalIcons[product.animalType]}
                    <span>{product.animalType}</span>
                  </div>
                </div>

                <div className="product-section">
                  <h4 className="section-title">Nutritional Info</h4>
                  <p className="nutritional-info">{product.nutritionalInfo}</p>
                </div>

                <div className="product-section">
                  <h4 className="section-title">Ingredients</h4>
                  <div className="ingredients-list">
                    {product.ingredients?.map((ingredient, index) => (
                      <span key={index} className="ingredient-tag">
                        {ingredient}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="product-section">
                  <h4 className="section-title">Available Options</h4>
                  <div className="quantity-options">
                    {product.quantityOptions?.map((option) => (
                      <div key={option._id} className="quantity-option">
                        <div className="option-label">{option.label}</div>
                        <div className="option-details">
                          <span className="option-price">₹{option.price}</span>
                          <span className="option-stock">{option.stock} in stock</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="product-actions">
                  {/* <button className="edit-btn">
                    <FiEdit2 /> Edit
                  </button> */}
                  <button 
                    className="delete-btn"
                    onClick={() => deleteProduct(product._id)}
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