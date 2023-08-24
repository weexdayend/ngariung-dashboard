import React from 'react'
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, BarElement, LinearScale } from 'chart.js';

function CustomerAnalysis() {
  const customerData = {
    labels: ['Acquisition Channels', 'Customer Lifetime Value', 'Repeat Purchase Rates', 'Customer Segmentation'],
    datasets: [
      {
        label: 'Customer Analytics',
        data: [75, 120, 90, 150],
        backgroundColor: '#6366F1',
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Metrics',
        },
      },
    },
  };
  
  Chart.register(CategoryScale, BarElement, LinearScale);
  return (
    <div className="flex flex-col justify-between px-6 py-6 bg-white rounded-3xl shadow-xl shadow-gray-100">
      <h2 className="text-xl font-semibold mb-4">Customer Analytics</h2>
      <div className="bg-white p-4 rounded-lg shadow">
        <Bar data={customerData} options={chartOptions} />
      </div>
    </div>
  )
}

export default CustomerAnalysis