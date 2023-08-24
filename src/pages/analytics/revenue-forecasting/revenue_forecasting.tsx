import React, { useState } from 'react';

// RevenueForecast component
const RevenueForecastAnalytics: React.FC = () => {
  // State variables
  const [historicalRevenue, setHistoricalRevenue] = useState<number[]>([
    10000, 15000, 12000, 18000, 20000, 17000, 19000
  ]);
  const [forecastPeriods, setForecastPeriods] = useState<number>(3);
  const [forecastedRevenue, setForecastedRevenue] = useState<number[]>([]);

  // Function to calculate revenue forecast
  const calculateForecast = () => {
    // Check if enough historical data is available
    if (historicalRevenue.length < forecastPeriods) {
      alert('Insufficient historical data for forecasting.');
      return;
    }

    // Perform revenue forecasting calculations
    const forecastedRevenueArray = [];
    for (let i = 0; i < forecastPeriods; i++) {
      // Calculate moving average
      const averageRevenue = historicalRevenue.slice(i, i + forecastPeriods).reduce((acc, curr) => acc + curr, 0) / forecastPeriods;
      forecastedRevenueArray.push(averageRevenue);
    }

    setForecastedRevenue(forecastedRevenueArray);
  };

  return (
    <div>
      <h2>Revenue Forecasting</h2>

      {/* Display historical revenue data */}
      <div>
        <h3>Historical Revenue</h3>
        {historicalRevenue.length > 0 ? (
          <ul>
            {historicalRevenue.map((revenue, index) => (
              <li key={index}>{revenue}</li>
            ))}
          </ul>
        ) : (
          <p>No historical revenue data available.</p>
        )}
      </div>

      {/* Input for forecast periods */}
      <div>
        <label>Forecast Periods:</label>
        <input
          type="number"
          value={forecastPeriods}
          onChange={(e) => setForecastPeriods(Number(e.target.value))}
        />
      </div>

      {/* Display forecasted revenue */}
      {forecastedRevenue.length > 0 && (
        <div>
          <h3>Forecasted Revenue</h3>
          <ul>
            {forecastedRevenue.map((revenue, index) => (
              <li key={index}>{revenue.toFixed(2)}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Button to trigger revenue forecasting */}
      <button onClick={calculateForecast}>Calculate Forecast</button>
    </div>
  );
};

export default RevenueForecastAnalytics;
