import { ApexOptions } from 'apexcharts';
import React from 'react';
import ReactApexChart from 'react-apexcharts';

interface PsychographicSegmentationProps {
  data: { category: string; percentage: number }[];
}

const PsychographicSegmentationChart: React.FC<PsychographicSegmentationProps> = ({ data }) => {
  const chartOptions: ApexOptions = {
    chart: {
      type: 'pie',
    },
    series: data.map((item) => item.percentage),
    labels: data.map((item) => item.category),
    colors: ['#FF8C00', '#FF6384', '#36A2EB', '#FFCE56', '#6B8E23'],
  };

  return (
    <div className='flex flex-col justify-between w-full h-full px-6 py-6 bg-white rounded-3xl shadow-xl shadow-gray-100'>
      <h3>Psychographic Segmentation Chart</h3>
      <ReactApexChart options={chartOptions} series={chartOptions.series} type="pie" height={350} />
      <p>Group customers based on their lifestyles, interests, values, and attitudes.</p>
    </div>
  );
};

export default PsychographicSegmentationChart;
