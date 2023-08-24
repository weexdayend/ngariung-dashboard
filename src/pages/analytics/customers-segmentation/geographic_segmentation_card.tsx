import React from 'react';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';

// Use dynamic import to load ApexCharts only on the client-side
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface GeographicSegmentationChartProps {
  categories: string[];
  series: number[];
}

const GeographicSegmentationChart: React.FC<GeographicSegmentationChartProps> = ({
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
      <h3>Geographic Segmentation Chart</h3>
      <ReactApexChart
        options={chartOptions}
        series={chartSeries}
        type="bar"
        height={350}
      />
      <p>Segment customers based on their geographic location, such as country, region, or city.</p>
    </div>
  );
};

export default GeographicSegmentationChart;
