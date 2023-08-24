import React from 'react'
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, BarElement, LinearScale } from 'chart.js';

interface PerformanceMetrics {
  leadsGenerated: number;
  qualifiedLeads: number;
  proposalsSent: number;
  closedDeals: number;
}

interface PerformanceMetricsCardProps {
  metricsData: PerformanceMetrics;
}

const PerformanceMetricsCard: React.FC<PerformanceMetricsCardProps> = ({ metricsData }) => {  // Extract the required data from the metricsData object
  const { leadsGenerated, qualifiedLeads, proposalsSent, closedDeals } = metricsData;

  // Prepare the chart data
  const chartData = {
    labels: ['Leads Generated', 'Qualified Leads', 'Proposals Sent', 'Closed Deals'],
    datasets: [
      {
        label: 'Metrics',
        data: [leadsGenerated, qualifiedLeads, proposalsSent, closedDeals],
        backgroundColor: 'rgba(75, 192, 192, 0.6)', // Set the background color for the bars
        borderColor: 'rgba(75, 192, 192, 1)', // Set the border color for the bars
        borderWidth: 1, // Set the border width for the bars
      },
    ],
  };

  // Configure the chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0, // Set the precision of the y-axis tick labels to remove decimal places
        },
      },
    },
  };

  Chart.register(CategoryScale, BarElement, LinearScale);
  return (
    <div className="flex flex-col justify-between px-6 py-6 bg-white rounded-3xl shadow-xl shadow-gray-100">
      <h3 className="text-xl font-semibold mb-2">Performance Metrics</h3>
      <div className="w-full">
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default PerformanceMetricsCard