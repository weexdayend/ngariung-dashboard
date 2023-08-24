import React, { useEffect, useRef } from 'react';
import { Chart, ChartType } from 'chart.js/auto';

interface FunnelVisualizationCardProps {
  funnelData: number[]; // Replace with your actual data
  funnelLabels: string[]; // Replace with your actual data
}

const FunnelVisualizationCard: React.FC<FunnelVisualizationCardProps> = ({ funnelData, funnelLabels }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        new Chart(ctx, {
          type: 'bar' as ChartType, // Use 'bar' as the chart type
          data: {
            labels: funnelLabels,
            datasets: [
              {
                label: 'Funnel',
                data: funnelData,
                backgroundColor: [
                  'rgba(255, 99, 132, 0.6)',
                  'rgba(54, 162, 235, 0.6)',
                  'rgba(255, 206, 86, 0.6)',
                  'rgba(75, 192, 192, 0.6)',
                  'rgba(153, 102, 255, 0.6)',
                ],
              },
            ],
          },
          options: {
            responsive: true,
            scales: {
              x: {
                beginAtZero: true,
                ticks: {
                  stepSize: 1,
                },
              },
            },
          },
        });
      }
    }
  }, [funnelData, funnelLabels]);

  return (
    <div className="flex flex-col justify-between px-6 py-6 bg-white rounded-3xl shadow-xl shadow-gray-100">
      <h3 className="text-xl font-semibold mb-2">Funnel Visualization</h3>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default FunnelVisualizationCard;
