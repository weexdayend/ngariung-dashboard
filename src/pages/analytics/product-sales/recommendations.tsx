import React from 'react';

const Recommendations: React.FC = () => {
  const recommendations = [
    'Implement targeted marketing campaigns for high-performing products.',
    'Consider offering discounts or promotions on slow-selling items to boost sales.',
    'Analyze customer feedback to identify areas for product improvement.',
    'Explore partnerships or collaborations to expand into new markets.',
  ];

  return (
    <div className="w-full h-fit px-6 py-6 bg-white rounded-3xl shadow-xl shadow-gray-100">
      <h2 className='text-lg font-bold'>Recommendations and Actionable Insights</h2>
      <ul>
        {recommendations.map((recommendation, index) => (
          <li key={index}>{recommendation}</li>
        ))}
      </ul>
    </div>
  );
};

export default Recommendations;
