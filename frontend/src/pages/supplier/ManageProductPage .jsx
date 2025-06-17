import React, { useEffect, useState } from "react";
import api from "../../api";
import { useNavigate, useParams } from "react-router-dom";
import { FiSave, FiArrowLeft } from "react-icons/fi";
import { FaDog, FaCat, FaDove, FaKiwiBird } from "react-icons/fa";
import { GiCow, GiGoat } from "react-icons/gi";
import "./ManageProductPage.css";

export default function ManageProductPage() {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [form, setForm] = useState({
    name: "",
    category: "pet",
    animalType: "dog",
    nutritionalInfo: "",
    ingredients: "",
    image: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const animalIcons = {
    dog: <FaDog />,
    cat: <FaCat />,
    bird: <FaDove />,
    cow: <GiCow />,
    goat: <GiGoat />,
    poultry: <FaKiwiBird />,
  };

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await api.get(`/supplier/products/${productId}/edit`, {
          withCredentials: true,
        });
        const prod = res.data;
        setForm({
          name: prod.name || "",
          category: prod.category || "pet",
          animalType: prod.animalType || "dog",
          nutritionalInfo: prod.nutritionalInfo || "",
          ingredients: Array.isArray(prod.ingredients)
            ? prod.ingredients.join(", ")
            : typeof prod.ingredients === "string"
            ? prod.ingredients
            : "",
          image: prod.image || "",
        });
        setImagePreview(prod.image ? `http://localhost:5000${prod.image}` : "");
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load product data");
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [productId]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("category", form.category);
      formData.append("animalType", form.animalType);
      formData.append("nutritionalInfo", form.nutritionalInfo);
      formData.append("ingredients", form.ingredients); // backend handles splitting

      if (selectedFile) {
        formData.append("image", selectedFile);
      }

      await api.patch(`/supplier/products/${productId}/edit`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      alert("Product updated successfully");
      navigate("/supplier/products");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to update product");
    }
  };

  if (loading) {
    return (
      <div className="manage-product-loading-main">
        <div className="manage-product-loading-spinner-main">
          Loading product details...
        </div>
      </div>
    );
  }

  return (
    <div className="manage-product-container-main">
      <div className="manage-product-header-main">
        <button
          onClick={() => navigate(-1)}
          className="manage-product-back-button-main"
        >
          <FiArrowLeft className="manage-product-back-icon-main" />
          Back to Inventory
        </button>
        <h1 className="manage-product-title-main">
          <FiSave className="manage-product-title-icon-main" />
          Edit Product
        </h1>
      </div>

      {error && <div className="manage-product-error-main">{error}</div>}

      <form onSubmit={handleSubmit} className="manage-product-form-main">
        {/* Image Upload */}
        <div className="manage-product-form-group-main">
          <label className="manage-product-form-label-main">
            Product Image
          </label>
          <input type="file" accept="image/*" onChange={handleFileChange} />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="manage-product-image-preview-main"
            />
          )}
        </div>

        {/* Product Details */}
        <div className="manage-product-form-group-main">
          <label className="manage-product-form-label-main">Product Name</label>
          <input
            name="name"
            className="manage-product-form-input-main"
            placeholder="e.g. Premium Dog Food"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="manage-product-form-row-main">
          <div className="manage-product-form-group-main">
            <label className="manage-product-form-label-main">Category</label>
            <select
              name="category"
              className="manage-product-form-select-main"
              value={form.category}
              onChange={handleChange}
            >
              <option value="pet">Pet Food</option>
              <option value="livestock">Livestock Feed</option>
            </select>
          </div>

          <div className="manage-product-form-group-main">
            <label className="manage-product-form-label-main">
              Animal Type
            </label>
            <div className="manage-product-animal-select-main">
              <select
                name="animalType"
                className="manage-product-form-select-main"
                value={form.animalType}
                onChange={handleChange}
              >
                <option value="dog">Dog</option>
                <option value="cat">Cat</option>
                <option value="bird">Bird</option>
                <option value="cow">Cow</option>
                <option value="goat">Goat</option>
                <option value="poultry">Poultry</option>
              </select>
              <span className="manage-product-animal-icon-main">
                {animalIcons[form.animalType]}
              </span>
            </div>
          </div>
        </div>

        <div className="manage-product-form-group-main">
          <label className="manage-product-form-label-main">
            Nutritional Information
          </label>
          <textarea
            name="nutritionalInfo"
            className="manage-product-form-textarea-main"
            placeholder="Enter nutritional details..."
            value={form.nutritionalInfo}
            onChange={handleChange}
            required
            rows={5}
          />
        </div>

        <div className="manage-product-form-group-main">
          <label className="manage-product-form-label-main">Ingredients</label>
          <input
            name="ingredients"
            className="manage-product-form-input-main"
            placeholder="e.g. Chicken, Rice, Vegetables"
            value={form.ingredients}
            onChange={handleChange}
            required
          />
          <p className="manage-product-form-hint-main">
            Separate ingredients with commas
          </p>
        </div>

        <div className="manage-product-form-actions-main">
          <button type="submit" className="manage-product-submit-button-main">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
