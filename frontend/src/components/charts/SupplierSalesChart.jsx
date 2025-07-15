// // components/charts/SupplierSalesChart.jsx
// import { Line } from 'react-chartjs-2';
// export default function SupplierSalesChart({ data }) {
//   const chartData = {
//     labels: data.map(item => item.date),
//     datasets: [{
//       label: 'Sales ₹',
//       data: data.map(item => item.amount),
//       borderColor: 'blue',
//       tension: 0.3
//     }]
//   };
//   return <Line data={chartData} />;
// }
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

export default function SupplierSalesChart({ data }) {
  const chartData = {
    labels: data.map(item => item.date),
    datasets: [
      {
        label: "Sales (₹)",
        data: data.map(item => item.amount),
        borderColor: "#4CAF50",
        backgroundColor: "rgba(76, 175, 80, 0.2)",
        tension: 0.3,
        fill: true,
        pointRadius: 3,
        pointHoverRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      tooltip: { mode: "index", intersect: false },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  return <Line data={chartData} options={options} />;
}
