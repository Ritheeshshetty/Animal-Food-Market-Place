import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

export default function SalesLineChart({ data }) {
  const chartData = {
    labels: data.map(item => item.date),
    datasets: [
      {
        label: 'Sales ($)',
        data: data.map(item => item.amount),
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
        tension: 0.2,
      },
    ],
  };

  return <Line data={chartData} />;
}
