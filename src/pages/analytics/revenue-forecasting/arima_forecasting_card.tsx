import React, { useState } from 'react'
import axios from 'axios';
import { historicalData } from '@/utils/typeData';
import dynamic from 'next/dynamic';

import { ApexOptions } from 'apexcharts';
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface ApiResponse {
  predictedRevenue: number[];
}

function ArimaForecastingCard() {
  const [predictedRevenue, setPredictedRevenue] = useState<number[] | null>(null);

  const handleForecastRevenue = async () => {

    const numPoints = 24;
    const minRange = 0.5;
    const maxRange = 1.0;

    const requestBody = {
      historicalData,
      numPoints,
      minRange,
      maxRange,
    };

    try {
      const response = await axios.post<ApiResponse>('http://localhost:1933/forecast-revenue', requestBody);

      const data = response.data;
      setPredictedRevenue(data.predictedRevenue);
    } catch (error) {
      console.error(error);
    }
  };

  // Generate an array of datetime values between start and end dates (inclusive)
  const generateDates = (startDate: string, endDate: string): number[] => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const dates: number[] = [];

    while (start <= end) {
      dates.push(start.getTime());
      start.setDate(start.getDate() + 1);
    }

    return dates;
  };

  const dateNow = historicalData.map((entry) => entry.date);

  const chartOptions: ApexOptions = {
    chart: {
      type: 'line',
      height: 350,
      animations: {
        enabled: true,
        easing: 'linear',
        dynamicAnimation: {
          speed: 2000,
        },
      },
      toolbar: {
        show: false,
      },
    },
    stroke: {
      width: 5,
      curve: 'smooth'
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        gradientToColors: [ '#FDD835'],
        shadeIntensity: 1,
        type: 'horizontal',
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100, 100, 100]
      },
    },
    forecastDataPoints: {
      count: 7
    },
    xaxis: {
      type: 'datetime',
      categories: generateDates('7/7/2023', '8/8/2023'),
      tickAmount: 10,
      labels: {
        formatter: function (value: string, timestamp?: number, opts?: any) {
          if (timestamp) {
            return opts.dateFormatter(new Date(timestamp), 'dd MMM yyyy');
          }
          return '';
        },
      },
    },
    yaxis: {
      title: {
        text: 'Revenue',
      },
    },
    markers: {
      size: 0,
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      enabled: true,
      x: {
        show: true,
        format: 'dd MMM yyyy',
      },
    },
  };

  const chartSeries = [
    {
      name: 'Revenue',
      data: predictedRevenue,
    },
  ];

  return (
    <div className='flex flex-col justify-between w-full h-full px-6 py-6 bg-white rounded-3xl shadow-xl shadow-gray-100'>
      <button onClick={handleForecastRevenue}>Forecast Revenue</button>
      {predictedRevenue && (
        <div>
          <ReactApexChart
            options={chartOptions}
            series={chartSeries}
            type="line"
            height={350}
          />
        </div>
      )}
    </div>
  );
}

export default ArimaForecastingCard