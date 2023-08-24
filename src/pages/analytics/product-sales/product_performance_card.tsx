import React from 'react';
import Chart from 'react-apexcharts';
import { Product } from '@/utils/typeData';

interface ProductPerformanceProps {
  products: Product[];
}

const ProductPerformance: React.FC<ProductPerformanceProps> = ({ products }) => {
  const revenueChartOptions = {
    chart: {
      id: 'revenue-chart',
    },
    xaxis: {
      type: 'category' as const,
    },
    yaxis: {
      title: {
        text: 'Revenue',
      },
    },
  };
  
  const salesQuantityChartOptions = {
    chart: {
      id: 'sales-quantity-chart',
    },
    xaxis: {
      type: 'category' as const,
    },
    yaxis: {
      title: {
        text: 'Sales Quantity',
      },
    },
  };
  

  const revenueChartSeries = products.map((product) => ({
    name: product.name,
    data: product.revenueData.map((dataPoint) => ({
      x: dataPoint.date,
      y: dataPoint.value,
    })),
  }));

  const salesQuantityChartSeries = products.map((product) => ({
    name: product.name,
    data: product.salesQuantityData.map((dataPoint) => ({
      x: dataPoint.date,
      y: dataPoint.value,
    })),
  }));

  return (
    <div className='grid grid-cols-2 w-full h-full px-6 py-6 bg-white rounded-3xl shadow-xl shadow-gray-100'>
      <div>
        <h2>Product Revenue</h2>
        <Chart
          options={revenueChartOptions}
          series={revenueChartSeries}
          type="bar"
          height={400}
        />
      </div>
      
      <div>
        <h2>Sales Quantity</h2>
        <Chart
          options={salesQuantityChartOptions}
          series={salesQuantityChartSeries}
          type="bar"
          height={400}
        />
      </div>
    </div>
  );
};

export default ProductPerformance;
