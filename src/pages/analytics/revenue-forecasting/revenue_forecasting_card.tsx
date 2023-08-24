import React, { useState } from 'react';

interface RevenueData {
  month: string;
  revenue: number;
}

const RevenueForecastingCard: React.FC = () => {
  // Dummy historical revenue data
  const historicalData: RevenueData[] = [
    { month: 'Jan', revenue: 1000 },
    { month: 'Feb', revenue: 1200 },
    { month: 'Mar', revenue: 1300 },
    { month: 'Apr', revenue: 1100 },
    { month: 'May', revenue: 1500 },
    { month: 'Jun', revenue: 1700 },
    { month: 'Jul', revenue: 1600 },
    { month: 'Aug', revenue: 1800 },
    { month: 'Sep', revenue: 1900 },
    { month: 'Oct', revenue: 2100 },
    { month: 'Nov', revenue: 2200 },
    { month: 'Dec', revenue: 2400 },
  ];

  // State for storing the forecasted revenue
  const [forecast, setForecast] = useState<number | null>(null);

  // Function to calculate revenue forecast
  const calculateForecast = () => {
    // Extract revenue values from historical data
    const revenues = historicalData.map((data) => data.revenue);

    // Simple linear regression model
    const n = revenues.length;
    const xSum = revenues.reduce((sum, revenue, index) => sum + index + 1, 0);
    const ySum = revenues.reduce((sum, revenue) => sum + revenue, 0);
    const xySum = revenues.reduce((sum, revenue, index) => sum + (index + 1) * revenue, 0);
    const xSquareSum = revenues.reduce((sum, revenue, index) => sum + (index + 1) ** 2, 0);

    const slope = (n * xySum - xSum * ySum) / (n * xSquareSum - xSum ** 2);
    const intercept = (ySum - slope * xSum) / n;

    // Forecast revenue for the next month
    const nextMonth = n + 1;
    const forecastedRevenue = slope * nextMonth + intercept;

    // Set the forecasted revenue in the state
    setForecast(forecastedRevenue);
  };

  return (
    <div>
      <h1>Revenue Forecasting</h1>

      <button onClick={calculateForecast}>Calculate Forecast</button>

      {forecast && (
        <p>
          Forecasted revenue for the next month: ${forecast.toFixed(2)}
        </p>
      )}
    </div>
  );
};

export default RevenueForecastingCard;
