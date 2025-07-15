import { useEffect, useState } from "react";
import api from "../../api";
import SupplierSalesChart from "../../components/charts/SupplierSalesChart";
import SupplierTopProductsChart from "../../components/charts/SupplierTopProductsChart";
import "./SupplierReports.css";
import { FiTrendingUp, FiAward, FiLoader } from "react-icons/fi";

export default function SupplierReports() {
  const [salesData, setSalesData] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const [salesRes, topProductsRes] = await Promise.all([
          api.get("/supplier/reports/sales-trends", { withCredentials: true }),
          api.get("/supplier/reports/top-products", { withCredentials: true }),
        ]);
        setSalesData(salesRes.data.trends || []);
        setTopProducts(topProductsRes.data.topProducts || []);
      } catch (err) {
        console.error("Failed to load supplier reports:", err);
        setError("Failed to load report data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  return (
    <div className="supplier-reports-container">
      <div className="supplier-reports-header">
        <h1 className="supplier-reports-title">Business Insights</h1>
        <p className="supplier-reports-subtitle">
          Track your sales performance and product analytics
        </p>
      </div>

      {loading ? (
        <div className="supplier-reports-loading">
          <FiLoader className="loading-icon" />
          <p>Loading your business insights...</p>
        </div>
      ) : error ? (
        <div className="supplier-reports-error">
          <svg viewBox="0 0 24 24" width="20" height="20">
            <path fill="currentColor" d="M11 15h2v2h-2zm0-8h2v6h-2zm1-5C6.47 2 2 6.5 2 12a10 10 0 0 0 10 10 10 10 0 0 0 10-10A10 10 0 0 0 12 2zm0 18a8 8 0 0 1-8-8 8 8 0 0 1 8-8 8 8 0 0 1 8 8 8 8 0 0 1-8 8z"/>
          </svg>
          {error}
        </div>
      ) : (
        <div className="supplier-reports-grid">
          <div className="supplier-report-card">
            <div className="report-card-header">
              <FiTrendingUp className="report-icon" />
              <h2 className="report-card-title">Sales Trends</h2>
            </div>
            {salesData.length > 0 ? (
              <div className="report-card-content">
                <SupplierSalesChart data={salesData} />
              </div>
            ) : (
              <div className="supplier-reports-empty">
                <p>No sales data available for the selected period</p>
              </div>
            )}
          </div>

          <div className="supplier-report-card">
            <div className="report-card-header">
              <FiAward className="report-icon" />
              <h2 className="report-card-title">Top Performing Products</h2>
            </div>
            {topProducts.length > 0 ? (
              <div className="report-card-content">
                <SupplierTopProductsChart topProducts={topProducts} />
              </div>
            ) : (
              <div className="supplier-reports-empty">
                <p>No product performance data available</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}