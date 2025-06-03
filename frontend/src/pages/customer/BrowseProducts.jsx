import { useEffect, useState } from "react";
import { FiSearch, FiFilter, FiArrowLeft } from "react-icons/fi";
import api from "../../api";
import { useNavigate } from "react-router-dom";

export default function BrowseProducts() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [animalType, setAnimalType] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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

  // const handleLogout = async () => {
  //   try {
  //     await api.post("/auth/logout");
  //     alert("Logged out successfully");
  //     navigate("/login");
  //   } catch (err) {
  //     alert("Logout failed");
  //   }
  // };

  return (
    <div className="browse-products-main">
      <div className="browse-products-header-main">
        {/* <button onClick={handleLogout} className="delete-btn">
          Logout
        </button> */}
        <h1 className="browse-products-title-main">Browse Animal Food</h1>
        <p className="browse-products-subtitle-main">
          Find the perfect nutrition for your animals
        </p>
      </div>

      <div className="browse-products-filters-main">
        <div className="browse-products-search-main">
          <FiSearch className="browse-products-search-icon-main" />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="browse-products-search-input-main"
          />
        </div>

        <div className="browse-products-select-group-main">
          <div className="browse-products-select-wrapper-main">
            <FiFilter className="browse-products-filter-icon-main" />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="browse-products-select-main"
            >
              <option value="">All Categories</option>
              <option value="pet">Pet</option>
              <option value="livestock">Livestock</option>
            </select>
          </div>

          <div className="browse-products-select-wrapper-main">
            <FiFilter className="browse-products-filter-icon-main" />
            <select
              value={animalType}
              onChange={(e) => setAnimalType(e.target.value)}
              className="browse-products-select-main"
            >
              <option value="">All Animals</option>
              <option value="dog">Dog</option>
              <option value="cat">Cat</option>
              <option value="bird">Bird</option>
              <option value="cow">Cow</option>
              <option value="goat">Goat</option>
              <option value="poultry">Poultry</option>
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="browse-products-loading-main">
          <div className="browse-products-loading-spinner-main">
            Loading products...
          </div>
        </div>
      ) : (
        <div className="browse-products-grid-main">
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product._id} className="browse-products-card-main">
                <div className="browse-products-card-content-main">
                  <div className="browse-products-card-header-main">
                    <h3 className="browse-products-card-title-main">
                      {product.name}
                    </h3>
                    <span
                      className={`browse-products-card-category-main ${
                        product.category === "pet"
                          ? "browse-products-card-category-pet-main"
                          : "browse-products-card-category-livestock-main"
                      }`}
                    >
                      {product.category}
                    </span>
                  </div>
                  <p className="browse-products-card-animal-main">
                    {product.animalType}
                  </p>
                  <p className="browse-products-card-price-main">
                    {product.quantityOptions[0]?.label}: ₹
                    {product.quantityOptions[0]?.price}
                  </p>
                  <button
                    className="browse-products-card-button-main"
                    onClick={() =>
                      (window.location.href = `/product/${product._id}`)
                    }
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="browse-products-empty-main">
              <p className="browse-products-empty-text-main">
                No products found matching your criteria.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
