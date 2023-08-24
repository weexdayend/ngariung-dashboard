import React from 'react';
import dynamic from 'next/dynamic';
import { Category } from '@/utils/typeData';
import { ApexOptions } from 'apexcharts';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface Props {
  categories: Category[];
}

const ProductCategoriesAnalysis: React.FC<Props> = ({ categories }) => {
  const categoryNames = categories.map((category) => category.name);
  const revenueData = categories.map((category) => category.revenue);

  const options: ApexOptions = {
    chart: {
      type: 'bar',
      height: 350,
    },
    xaxis: {
      categories: categoryNames,
    },
    yaxis: {
      title: {
        text: 'Revenue',
      },
    },
  };

  const series = [
    {
      name: 'Revenue',
      data: revenueData,
    },
  ];

  return (
    <div className='flex flex-col justify-between w-full h-full px-6 py-6 bg-white rounded-3xl shadow-xl shadow-gray-100'>
      <h3>Product Categories Analysis</h3>
      <Chart options={options} series={series} type="bar" height={350} />
    </div>
  );
};

export default ProductCategoriesAnalysis;
