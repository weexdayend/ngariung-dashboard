import React from 'react';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';

// Use dynamic import to load ApexCharts only on the client-side
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface CustomerSegmentationChartProps {
  categories: string[];
  series: number[];
}

const CustomerSegmentationChart: React.FC<CustomerSegmentationChartProps> = ({
  categories,
  series,
}) => {
  const chartOptions: ApexOptions = {
    chart: {
      type: 'bar',
      height: 350,
    },
    xaxis: {
      categories,
    },
    yaxis: {
      title: {
        text: 'Customers',
      },
    },
  };

  const chartSeries = [
    {
      name: 'Customers',
      data: series,
    },
  ];

  return (
    <div className='flex flex-col justify-between w-full h-full px-6 py-6 bg-white rounded-3xl shadow-xl shadow-gray-100'>
      <h3>Customers Segmentation Chart</h3>
      <ReactApexChart
        options={chartOptions}
        series={chartSeries}
        type="bar"
        height={350}
      />
      <p>Divide customers based on demographic characteristics such as age, gender, income, and occupation.</p>
    </div>
  );
};

export default CustomerSegmentationChart;
