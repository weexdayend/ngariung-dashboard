import { ApexOptions } from 'apexcharts';
import React from 'react';
import ReactApexChart from 'react-apexcharts';

interface BehavioralSegmentationChartProps {
  data: { segment: string; percentage: number }[];
}

const BehavioralSegmentationChart: React.FC<BehavioralSegmentationChartProps> = ({ data }) => {
  const chartOptions: ApexOptions = {
    chart: {
      type: 'pie',
    },
    labels: data.map(item => item.segment),
    series: data.map(item => item.percentage),
    colors: ['#3c8dbc', '#f56954', '#00a65a', '#f39c12', '#00c0ef'],
  };

  return (
    <div className='flex flex-col justify-between w-full h-full px-6 py-6 bg-white rounded-3xl shadow-xl shadow-gray-100'>
      <h3>Behavioral Segmentation Chart</h3>
      <ReactApexChart options={chartOptions} series={chartOptions.series} type="pie" height={350} />
      <p>Segment customers based on their purchasing behavior, brand loyalty, usage patterns, or engagement with marketing campaigns.</p>
    </div>
  );
};

export default BehavioralSegmentationChart;
