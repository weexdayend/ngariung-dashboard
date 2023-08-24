import React from 'react';
import ReactApexChart from 'react-apexcharts';

// Assuming you have a data array with sales trend data
const salesTrendData = [
  { year: '2018', sales: 500 },
  { year: '2019', sales: 800 },
  { year: '2020', sales: 1200 },
  { year: '2021', sales: 1500 },
  { year: '2022', sales: 2000 },
];

const SalesTrendAnalysis: React.FC = () => {
  const chartOptions = {
    chart: {
      id: 'sales-trend',
    },
    xaxis: {
      categories: salesTrendData.map((data) => data.year),
    },
    yaxis: {
      title: {
        text: 'Sales',
      },
    },
  };

  const chartSeries = [
    {
      name: 'Sales',
      data: salesTrendData.map((data) => data.sales),
    },
  ];

  return (
    <div className='flex flex-col justify-between w-full h-full px-6 py-6 bg-white rounded-3xl shadow-xl shadow-gray-100'>
      <h3>Sales Trend</h3>
      <ReactApexChart
        options={chartOptions}
        series={chartSeries}
        type="line"
        height={300}
      />
    </div>
  );
};

export default SalesTrendAnalysis;
