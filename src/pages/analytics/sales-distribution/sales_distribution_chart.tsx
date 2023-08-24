import React from 'react';
import dynamic from 'next/dynamic';
import { salesData, SalesDatas } from '@/utils/typeData';
import { ApexOptions } from 'apexcharts';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const SalesDistributionChart = () => {
  const { regions, channels, categories }: SalesDatas = salesData;

  // Configure the chart options (example)
  // Chart options
  const options: ApexOptions = {
    chart: {
      type: 'bar',
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: true,
      },
    },
    xaxis: {
      labels: {
        formatter: function (val: any) {
          return val.toLocaleString();
        },
      },
    },
    colors: ['#5A67D8'],
  };

  // Prepare series data for the chart (example)
  // Prepare data for chart
  const regionData = Object.entries(regions).map(([region, sales]) => ({
    x: region,
    y: sales,
  }));

  const channelData = Object.entries(channels).map(([channel, sales]) => ({
    x: channel,
    y: sales,
  }));

  const categoriesData = Object.entries(categories).map(([product, sales]) => ({
    x: product,
    y: sales,
  }));

  const region = [
    {
      name: 'Sales by Region',
      data: regionData,
    },
  ];

  const channel = [
    {
      name: 'Sales by Channle',
      data: channelData,
    },
  ];

  const category = [
    {
      name: 'Sales by Products',
      data: categoriesData,
    },
  ];

  return (
    <div className='flex flex-col justify-between w-full h-fit px-6 py-6 bg-white rounded-3xl shadow-xl shadow-gray-100'>
      <div className='flex flex-col justify-between space-y-8'>
        <div>
          <h2 className='text-lg font-bold text-blue-950'>Sales Distribution by Regions</h2>
          <Chart options={options} series={region} type="bar" height={300} />
        </div>
        <div>
          <h2 className='text-lg font-bold text-blue-950'>Sales Distribution by Channels</h2>
          <Chart options={options} series={channel} type="bar" height={300} />
        </div>
        <div>
          <h2 className='text-lg font-bold text-blue-950'>Sales Distribution by Categories</h2>
          <Chart options={options} series={category} type="bar" height={300} />
        </div>
      </div>
      <ul className='space-y-2 text-base my-2'>
        <li>Provide analysis and insights based on the sales distribution data: Analyze the sales distribution data to gain a deeper understanding of how sales are distributed across different regions, channels, or product categories.</li>
        <li>Identify top-performing regions, channels, or products: Determine the regions, channels, or products that contribute the most to overall sales. Identify the areas of strength and focus on maximizing their potential.</li>
        <li>Highlight any trends, patterns, or anomalies observed in the sales distribution: Look for any recurring trends or patterns in the sales distribution data. Identify any anomalies or unexpected variations that may require further investigation.</li>
        <li>Discuss the implications of the findings on business strategy and decision-making: Discuss how the sales distribution insights can impact business strategy and decision-making. Consider how to leverage top-performing regions, channels, or products and address any areas of weakness to optimize sales distribution.</li>
      </ul>
    </div>
  );
};

export default SalesDistributionChart;
