import React from 'react';

const InsightsCard = () => {
  // Dummy data for insights and takeaways
  const insights = [
    'The Lead Generation stage has seen a significant increase in leads compared to the previous period.',
    'The Negotiation stage has shown a decrease in conversion rates, indicating potential areas for improvement.',
    'The proposal sent stage has remained consistent with previous performance.',
  ];

  return (
    <div className="flex flex-col h-fit px-6 py-6 bg-white rounded-3xl shadow-xl shadow-gray-100">
      <h3 className="text-xl font-semibold mb-2">Insights and Takeaways</h3>
      <ul className="list-disc list-inside text-gray-700">
        {insights.map((insight) => (
          <li key={insight} className="mb-2">{insight}</li>
        ))}
      </ul>
    </div>
  );
};

export default InsightsCard;
