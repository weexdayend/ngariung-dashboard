import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { ProductDatas } from '@/utils/typeData';
import { productData } from '@/utils/typeData';
import { ApexOptions } from 'apexcharts';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface SummaryData {
  totalItems: number;
  totalValue: number;
  topSellingItems: ProductDatas[];
}

const SummaryDashboard: React.FC = () => {
  const [summaryData, setSummaryData] = useState<SummaryData>({
    totalItems: 0,
    totalValue: 0,
    topSellingItems: [],
  });

  // Fetch inventory data and calculate summary metrics
  useEffect(() => {
    const totalItems = productData.length;
    const totalValue = productData.reduce((total, item) => total + item.quantity * item.unitPrice, 0);
    const topSellingItems = productData.slice(0, 5); // Assuming top 5 selling items

    setSummaryData({ totalItems, totalValue, topSellingItems });
  }, []);

  const { totalItems, totalValue, topSellingItems } = summaryData;

  const chartOptions: ApexOptions = {
    chart: {
      type: 'bar',
      height: 350,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        dataLabels: {
          position: 'top',
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: (val: number) => formatCurrency(val),
      offsetY: -20,
      style: {
        fontSize: '12px',
        colors: ['#ffffff'],
      },
    },
    xaxis: {
      categories: topSellingItems.map((item) => item.product),
    },
    yaxis: {
      labels: {
        formatter: (val: number) => formatCurrency(val),
      },
    },
    colors: ['#6366f1'],
    grid: {
      borderColor: '#e2e8f0',
      strokeDashArray: 5,
      xaxis: {
        lines: {
          show: true,
        },
      },
    },
  };

  const chartSeries = [
    {
      name: 'Sales',
      data: topSellingItems.map((item) => item.quantity * item.unitPrice),
    },
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
  };

  return (
    <div className="w-full h-fit px-6 py-6 bg-white rounded-3xl shadow-xl shadow-gray-100">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="p-4 bg-blue-500 rounded-lg text-white">
          <h3 className="text-lg font-semibold mb-2">Total Items</h3>
          <p className="text-2xl">{totalItems}</p>
        </div>
        <div className="p-4 bg-green-500 rounded-lg text-white">
          <h3 className="text-lg font-semibold mb-2">Total Value</h3>
          <p className="text-2xl">{formatCurrency(totalValue)}</p>
        </div>
        <div className="p-4 bg-indigo-500 rounded-lg text-white">
          <h3 className="text-lg font-semibold mb-2">Top Selling Items</h3>
          <ul>
            {topSellingItems.map((item) => (
              <li key={item.sku} className="mb-2">
                {item.product} - {formatCurrency(item.quantity * item.unitPrice)}
              </li>
            ))}
          </ul>
        </div>
        <div className="col-span-full">
          <h3 className="text-lg font-semibold mb-2">Top Selling Items Chart</h3>
          <Chart options={chartOptions} series={chartSeries} type="bar" height={350} />
        </div>
      </div>
    </div>
  );
};

export default SummaryDashboard;
