import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function SupplierTopProductsChart({ topProducts }) {
  const chartData = {
    labels: topProducts.map((p) => p.name),
    datasets: [
      {
        label: 'Units Sold',
        data: topProducts.map((p) => p.salesCount), // MUST be numeric array
        backgroundColor: [
          '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'
        ],
        borderWidth: 1
      }
    ]
  };

  return (
    <div className="top-products-chart">
      <h3>Top Performing Products</h3>
      <Pie data={chartData} />
    </div>
  );
}
