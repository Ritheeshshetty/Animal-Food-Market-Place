import { useEffect, useState } from "react";
import { FiSearch, FiFilter } from "react-icons/fi";
import api from "../../api";
import { useNavigate } from "react-router-dom";

export default function BrowseProducts() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [animalType, setAnimalType] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (search) params.append("search", search);
        if (category) params.append("category", category);
        if (animalType) params.append("animalType", animalType);

        const res = await api.get(`/products?${params.toString()}`);
        setProducts(res.data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(() => {
      fetchProducts();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [search, category, animalType]);

  const getImageUrl = (image) => {
    if (!image) return "/default-product-image.png";
    if (image.startsWith("http")) return image;
    if (image.startsWith("/")) return `http://localhost:5000${image}`;
    return `http://localhost:5000/uploads/${image}`;
  };

  return (
    <div className="browse-container">
      {/* Header Section */}
      <header className="browse-header">
        <h1 className="browse-title">Premium Animal Nutrition</h1>
        <p className="browse-subtitle">
          Discover the perfect food for your companion's health and happiness
        </p>
      </header>

      {/* Search and Filters Section */}
      <div className={`browse-filters-wrapper ${isSticky ? 'sticky' : ''}`}>
        <section className="browse-filters">
          <div className="browse-search">
            <FiSearch className="browse-search-icon" />
            <input
              type="text"
              placeholder="Search for food, treats, or supplements..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="browse-search-input"
            />
          </div>

          <div className="browse-filter-group">
            <div className="browse-filter">
              <FiFilter className="browse-filter-icon" />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="browse-filter-select"
              >
                <option value="">All Categories</option>
                <option value="pet">Pet Food</option>
                <option value="livestock">Livestock Feed</option>
              </select>
            </div>

            <div className="browse-filter">
              <FiFilter className="browse-filter-icon" />
              <select
                value={animalType}
                onChange={(e) => setAnimalType(e.target.value)}
                className="browse-filter-select"
              >
                <option value="">All Animals</option>
                <option value="dog">Dogs</option>
                <option value="cat">Cats</option>
                <option value="bird">Birds</option>
                <option value="cow">Cattle</option>
                <option value="goat">Goats</option>
                <option value="poultry">Poultry</option>
              </select>
            </div>
          </div>
        </section>
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="browse-loading">
          <div className="browse-loading-spinner"></div>
          <p>Finding the best nutrition for your animals...</p>
        </div>
      ) : (
        <div className="browse-products">
          {products.length > 0 ? (
            products.map((product) => (
              <article key={product._id} className="browse-product-card">
                <div className="browse-product-image">
                  <img
                    src={getImageUrl(product.image)}
                    alt={product.name}
                    loading="lazy"
                    className="browse-product-img"
                  />
                  <span className={`browse-product-tag ${product.category}`}>
                    {product.category}
                  </span>
                </div>
                <div className="browse-product-info">
                  <h3 className="browse-product-name">{product.name}</h3>
                  <p className="browse-product-animal">
                    For {product.animalType.charAt(0).toUpperCase() + product.animalType.slice(1)}
                  </p>
                  <div className="browse-product-price">
                    {product.quantityOptions[0]?.label}: ₹
                    {product.quantityOptions[0]?.price.toFixed(2)}
                  </div>
                  <button
                    className="browse-product-button"
                    onClick={() => navigate(`/product/${product._id}`)}
                  >
                    View Details
                  </button>
                </div>
              </article>
            ))
          ) : (
            <div className="browse-empty">
              <div className="browse-empty-icon">🐾</div>
              <h3>No products found</h3>
              <p>Try adjusting your search or filters</p>
              <button 
                className="browse-empty-button"
                onClick={() => {
                  setSearch("");
                  setCategory("");
                  setAnimalType("");
                }}
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}