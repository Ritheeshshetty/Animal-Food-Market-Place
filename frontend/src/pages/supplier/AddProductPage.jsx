import React, { useState } from 'react';
import api from '../../api';
import { useNavigate } from 'react-router-dom';
import { FiPlus, FiTrash2, FiArrowLeft } from "react-icons/fi";
import { FaDog, FaCat, FaDove, FaHorse, FaKiwiBird } from "react-icons/fa";
import { GiCow, GiGoat } from "react-icons/gi";


function AddProductPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    category: 'pet',
    animalType: 'dog',
    nutritionalInfo: '',
    ingredients: '',
    quantityOptions: [{ label: '', price: '', stock: '' }],
  });

  const animalIcons = {
    dog: <FaDog />,
    cat: <FaCat />,
    bird: <FaDove />,
    cow: <GiCow />,
    goat: <GiGoat />,
    poultry: <FaKiwiBird />
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleQuantityChange = (index, e) => {
    const updated = [...form.quantityOptions];
    updated[index][e.target.name] = e.target.value;
    setForm({ ...form, quantityOptions: updated });
  };

  const addQuantityOption = () => {
    setForm({
      ...form,
      quantityOptions: [...form.quantityOptions, { label: '', price: '', stock: '' }],
    });
  };

  const removeQuantityOption = (index) => {
    const updated = [...form.quantityOptions];
    updated.splice(index, 1);
    setForm({ ...form, quantityOptions: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      ingredients: form.ingredients.split(',').map((i) => i.trim()),
      quantityOptions: form.quantityOptions.map((q) => ({
        label: q.label,
        price: Number(q.price),
        stock: Number(q.stock),
      })),
    };

    try {
      await api.post('/products', payload, { withCredentials: true });
      alert('Product added successfully');
      navigate('/supplier/inventory');
    } catch (err) {
      alert('Failed to add product');
    }
  };

  return (
    <div className="add-product-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        <FiArrowLeft /> Back
      </button>
      
      <form onSubmit={handleSubmit} className="product-form">
        <h2 className="form-title">
          <FiPlus className="title-icon" /> Add New Product
        </h2>

        <div className="form-group">
          <label>Product Name</label>
          <input
            name="name"
            placeholder="e.g. Premium Dog Food"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Category</label>
            <select name="category" value={form.category} onChange={handleChange}>
              <option value="pet">Pet Food</option>
              <option value="livestock">Livestock Feed</option>
            </select>
          </div>

          <div className="form-group">
            <label>Animal Type</label>
            <div className="animal-select">
              <select name="animalType" value={form.animalType} onChange={handleChange}>
                <option value="dog">Dog</option>
                <option value="cat">Cat</option>
                <option value="bird">Bird</option>
                <option value="cow">Cow</option>
                <option value="goat">Goat</option>
                <option value="poultry">Poultry</option>
              </select>
              <span className="animal-icon">
                {animalIcons[form.animalType]}
              </span>
            </div>
          </div>
        </div>

        <div className="form-group">
          <label>Nutritional Information</label>
          <textarea
            name="nutritionalInfo"
            placeholder="Enter nutritional details..."
            value={form.nutritionalInfo}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Ingredients</label>
          <input
            name="ingredients"
            placeholder="e.g. Chicken, Rice, Vegetables"
            value={form.ingredients}
            onChange={handleChange}
            required
          />
          <p className="input-hint">Separate ingredients with commas</p>
        </div>

        <div className="quantity-section">
          <h3 className="section-title">
            Quantity Options
          </h3>
          
          {form.quantityOptions.map((q, index) => (
            <div key={index} className="quantity-row">
              <div className="quantity-input-group">
                <input
                  name="label"
                  placeholder="Label (e.g. 1kg)"
                  value={q.label}
                  onChange={(e) => handleQuantityChange(index, e)}
                  required
                />
              </div>
              <div className="quantity-input-group">
                <span className="currency-symbol">₹</span>
                <input
                  name="price"
                  placeholder="Price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={q.price}
                  onChange={(e) => handleQuantityChange(index, e)}
                  required
                />
              </div>
              <div className="quantity-input-group">
                <input
                  name="stock"
                  placeholder="Stock"
                  type="number"
                  min="0"
                  value={q.stock}
                  onChange={(e) => handleQuantityChange(index, e)}
                  required
                />
              </div>
              {form.quantityOptions.length > 1 && (
                <button 
                  type="button" 
                  className="remove-option-btn"
                  onClick={() => removeQuantityOption(index)}
                >
                  <FiTrash2 />
                </button>
              )}
            </div>
          ))}
          
          <button 
            type="button" 
            className="add-option-btn"
            onClick={addQuantityOption}
          >
            <FiPlus /> Add Quantity Option
          </button>
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-btn">
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddProductPage;