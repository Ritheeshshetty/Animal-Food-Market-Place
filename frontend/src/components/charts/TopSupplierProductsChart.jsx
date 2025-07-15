// // components/charts/TopSupplierProductsChart.jsx
// import { Pie } from 'react-chartjs-2';

// export default function TopSupplierProductsChart({ data }) {
//   const chartData = {
//     labels: data.map(p => p.name),
//     datasets: [{
//       data: data.map(p => p.totalSold),
//       backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#84e0a0', '#a084e0'],
//     }]
//   };
//   return <Pie data={chartData} />;
// }

import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function TopSupplierProductsChart({ data }) {
  const chartData = {
    labels: data.map((p) => p.name),
    datasets: [
      {
        data: data.map((p) => p.totalSold),
        backgroundColor: [
          "#36A2EB",
          "#FF6384",
          "#FFCE56",
          "#8BC34A",
          "#A1887F",
        ],
        borderColor: "#fff",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto" }}>
      <Pie data={chartData} />
    </div>
  );
}
