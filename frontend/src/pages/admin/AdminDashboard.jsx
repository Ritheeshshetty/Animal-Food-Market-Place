import { useEffect, useState } from "react";
import {
  FiTrendingUp,
  FiUsers,
  FiTruck,
  FiPackage,
  FiAlertCircle,
} from "react-icons/fi";
import AdminNav from "../../components/AdminNav";
import api from "../../api";
import SalesLineChart from "../../components/charts/SalesLineChart";
import TopProductsChart from "../../components/charts/TopProductsChart";

export default function AdminDashboard() {
  const [analytics, setAnalytics] = useState({
    salesTrends: [],
    totalSales: 0,
    activeUsers: 0,
    activeSuppliers: 0,
    topProducts: [],
    lowStockProducts: [],
    supplierPerformance: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await api.get("/admin/analytics");
        setAnalytics(res.data);
      } catch (err) {
        console.error("Failed to fetch analytics:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  return (
    <div className="admin-dashboard-main">
      <AdminNav />

      <div className="admin-content-main">
        <div className="admin-header-main">
          <h1 className="admin-title-main">Dashboard Overview</h1>
          <p className="admin-subtitle-main">
            Welcome back! Here's what's happening with your marketplace.
          </p>
        </div>

        {loading ? (
          <div className="admin-loading-main">
            <div className="admin-loading-spinner-main">
              Loading analytics...
            </div>
          </div>
        ) : (
          <>
            {/* Summary Cards */}
            <div className="admin-summary-grid-main">
              <div className="admin-summary-card-main">
                <div className="admin-summary-card-content-main">
                  <div className="admin-summary-icon-main admin-summary-icon-blue-main">
                    <FiTrendingUp size={24} />
                  </div>
                  <div>
                    <p className="admin-summary-label-main">Total Sales</p>
                    <p className="admin-summary-value-main">
                      ₹{analytics.totalSales.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="admin-summary-card-main">
                <div className="admin-summary-card-content-main">
                  <div className="admin-summary-icon-main admin-summary-icon-green-main">
                    <FiUsers size={24} />
                  </div>
                  <div>
                    <p className="admin-summary-label-main">Active Users</p>
                    <p className="admin-summary-value-main">
                      {analytics.activeUsers}
                    </p>
                  </div>
                </div>
              </div>

              <div className="admin-summary-card-main">
                <div className="admin-summary-card-content-main">
                  <div className="admin-summary-icon-main admin-summary-icon-blue-main">
                    <FiTruck size={24} />
                  </div>
                  <div>
                    <p className="admin-summary-label-main">Active Suppliers</p>
                    <p className="admin-summary-value-main">
                      {analytics.activeSuppliers}
                    </p>
                  </div>
                </div>
              </div>

              <div className="admin-summary-card-main">
                <div className="admin-summary-card-content-main">
                  <div className="admin-summary-icon-main admin-summary-icon-amber-main">
                    <FiAlertCircle size={24} />
                  </div>
                  <div>
                    <p className="admin-summary-label-main">Low Stock Items</p>
                    <p className="admin-summary-value-main">
                      {analytics.lowStockProducts.length}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Chart Section */}
            <div className="admin-chart-card-main">
              <div className="admin-chart-header-main">
                <h2 className="admin-chart-title-main">Sales Trends</h2>
                <div className="admin-chart-controls-main">
                  <button className="admin-chart-button-main admin-chart-button-active-main">
                    Monthly
                  </button>
                  <button className="admin-chart-button-main">Weekly</button>
                </div>
              </div>

              {analytics.salesTrends?.length > 0 ? (
                <div className="admin-chart-container-main">
                  <SalesLineChart data={analytics.salesTrends} />
                  <span></span>
                </div>
              ) : (
                <div className="admin-empty-state-main">
                  <FiPackage size={48} className="admin-empty-icon-main" />
                  <p>No sales data available</p>
                </div>
              )}
            </div>

            {/* Bottom Sections */}
            <div className="admin-bottom-grid-main">
              {/* Top Products */}

              {/* <div className="admin-list-card-main">
                <h3 className="admin-list-title-main">Top Selling Products</h3>
                {analytics.topProducts?.length > 0 ? (
                  <ul className="admin-list-main">
                    {analytics.topProducts.map((product, index) => (
                      <li key={index} className="admin-list-item-main">
                        <span className="admin-list-item-text-main">
                          {product.name}
                        </span>
                        <span className="admin-list-item-value-main">
                          {product.salesCount} sold
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="admin-empty-state-main">
                    <FiPackage size={32} className="admin-empty-icon-main" />
                    <p>No product data available</p>
                  </div>
                )}
              </div> */}
              <div className="admin-list-card-main">
                <h3 className="admin-list-title-main">Top Selling Products</h3>
                {analytics.topProducts?.length > 0 ? (
                  <>
                    <TopProductsChart data={analytics.topProducts} />
                    {/* <ul className="admin-list-main">
                      {analytics.topProducts.map((product, index) => (
                        <li key={index} className="admin-list-item-main">
                          <span className="admin-list-item-text-main">
                            {product.name}
                          </span>
                          <span className="admin-list-item-value-main">
                            {product.salesCount} sold
                          </span>
                        </li>
                      ))}
                    </ul> */}
                  </>
                ) : (
                  <div className="admin-empty-state-main">
                    <FiPackage size={32} className="admin-empty-icon-main" />
                    <p>No product data available</p>
                  </div>
                )}
              </div>

              {/* Supplier Performance */}
              <div className="admin-list-card-main">
                <h3 className="admin-list-title-main">Supplier Performance</h3>
                {analytics.supplierPerformance.length > 0 ? (
                  <ul className="admin-list-main">
                    {analytics.supplierPerformance
                      .slice(0, 5)
                      .map((supplier, index) => (
                        <li key={index} className="admin-list-item-main">
                          <span className="admin-list-item-text-main">
                            {supplier.name}
                          </span>
                          <span
                            className={`admin-list-item-value-main ${
                              supplier.rating >= 4
                                ? "admin-rating-good-main"
                                : supplier.rating >= 2.5
                                ? "admin-rating-medium-main"
                                : "admin-rating-poor-main"
                            }`}
                          >
                            {supplier.rating.toFixed(1)} ★
                          </span>
                        </li>
                      ))}
                  </ul>
                ) : (
                  <div className="admin-empty-state-main">
                    <FiUsers size={32} className="admin-empty-icon-main" />
                    <p>No supplier data available</p>
                  </div>
                )}
                <span></span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
