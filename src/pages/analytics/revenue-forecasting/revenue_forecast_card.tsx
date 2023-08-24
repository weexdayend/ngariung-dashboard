import React, { useEffect, useState } from 'react';

const RevenueForecastCard: React.FC = () => {
  const [forecastedRevenue, setForecastedRevenue] = useState([]);

  useEffect(() => {
    const fetchForecast = async () => {
      const response = await fetch('/api/revenueForecast');
      console.log(response); // Add this line
      const data = await response.json();
      setForecastedRevenue(data);
    };
  
    fetchForecast();
  }, []);

  return (
    <div>
      <h3>Revenue Forecast</h3>
      {forecastedRevenue.map((revenue, index) => (
        <p key={index}>{revenue}</p>
      ))}
    </div>
  );
};

export default RevenueForecastCard;
