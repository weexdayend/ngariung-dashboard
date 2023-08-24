import React from 'react';

type Recommendation = {
  title: string;
  description: string;
};

interface RecommendationsCardProps {
  recommendations: Recommendation[];
}

const RecommendationsCard: React.FC<RecommendationsCardProps> = ({ recommendations }) => {
  return (
    <div className="flex flex-col justify-center px-6 py-6 bg-white rounded-3xl shadow-xl shadow-gray-100">
      <h3 className="text-xl font-semibold mb-4">Recommendations</h3>
      {recommendations.map((recommendation, index) => (
        <div key={index} className="mb-4">
          <h4 className="text-lg font-semibold mb-2">{recommendation.title}</h4>
          <p className="text-gray-600">{recommendation.description}</p>
        </div>
      ))}
    </div>
  );
};

export default RecommendationsCard;
