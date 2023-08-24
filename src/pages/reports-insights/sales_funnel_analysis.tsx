import React from 'react'
import { ApexOptions } from 'apexcharts';
import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const SalesFunnelAnalysis: React.FC<any> = ({ data }) => {
  const chartOptions: ApexOptions = {
    chart: {
      height: 350,
      type: 'bar',
    },
    plotOptions: {
      bar: {
        horizontal: true,
      }
    },
    colors: ['#ff638499'],
    dataLabels: {
      formatter: function(val: string | number, opt: any) {
        const goals = opt.w.config.series[opt.seriesIndex].data[opt.dataPointIndex].goals;

        if (goals && goals.length) {
          return `${val} / ${goals[0].value}`;
        }
        return val;
      },
    },
    series: data,
  };

  return (
    <div className="pflex flex-col justify-between px-6 py-6 bg-white rounded-3xl shadow-xl shadow-gray-100 h-fit">
      <h3 className="text-xl font-semibold mb-4">Sales Funnel Analysis</h3>
      <Chart options={chartOptions} series={chartOptions.series} type='bar' />
    </div>
  )
}

export default SalesFunnelAnalysis