import React from 'react'
import SalesVelocityCard from './sales_velocity_card';

interface FunnelStageCardProps {
  stageName: string;
  stageCount: number;
}

function FunnelStagesCard() {
  const funnelStages: FunnelStageCardProps[] = [
    { stageName: 'Lead Generation', stageCount: 100 },
    { stageName: 'Lead Qualification', stageCount: 70 },
    { stageName: 'Proposal Sent', stageCount: 50 },
    { stageName: 'Negotiation', stageCount: 30 },
    { stageName: 'Closed Deals', stageCount: 10 },
  ];

  // Dummy data for historical comparison
  const previousPeriodData = [
    { stage: 'Lead Generation', count: 100 },
    { stage: 'Lead Qualification', count: 80 },
    { stage: 'Proposal Sent', count: 60 },
    { stage: 'Negotiation', count: 40 },
    { stage: 'Closed Deals', count: 20 },
  ];

  // Function to calculate percentage change
  const calculatePercentageChange = (currentCount: number, previousCount: number) => {
    if (previousCount === 0) {
      return '-';
    }
    const change = currentCount - previousCount;
    const percentageChange = (change / previousCount) * 100;
    return percentageChange.toFixed(2) + '%';
  };

  const calculateConversionRate = (index: number): string => {
    const previousStageCount = funnelStages[index - 1].stageCount;
    const currentStageCount = funnelStages[index].stageCount;

    const conversionRate = ((currentStageCount / previousStageCount) * 100).toFixed(2);
    return `${conversionRate}%`;
  };

  const findBottlenecks = (): string[] => {
    const bottlenecks: string[] = [];

    for (let i = 1; i < funnelStages.length; i++) {
      const previousStageCount = funnelStages[i - 1].stageCount;
      const currentStageCount = funnelStages[i].stageCount;

      if (currentStageCount < previousStageCount) {
        bottlenecks.push(funnelStages[i].stageName);
      }
    }

    return bottlenecks;
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-rows-3 grid-flow-col gap-4">
        {funnelStages.map((stage, index) => (
          <div 
            className="
              first:bg-gradient-to-br from-blue-400 to-blue-700 first:text-white first:col-span-2
              flex flex-col justify-center px-6 py-6 bg-white rounded-3xl shadow-xl shadow-gray-100 text-blue-950
            "
          >
            <div className='flex flex-row items-center justify-between space-x-4 '>
              <h3 className="text-lg">{stage.stageName}</h3>
              <p className="text-4xl font-bold">{stage.stageCount}</p>
            </div>
            <p className="text-base">
              {calculatePercentageChange(stage.stageCount, previousPeriodData[0].count)} Since last month
            </p>
            {index > 0 && (
              <p className="text-xs mt-2">
                Conversion Rate: {calculateConversionRate(index)} (from {funnelStages[index - 1].stageName})
              </p>
            )}
          </div>
        ))}
        <div className="row-span-2 flex flex-col px-6 py-6 bg-white rounded-3xl shadow-xl shadow-gray-100 text-blue-950">
          <h3 className="text-xl font-semibold mb-2">Bottlenecks and Drop-off Points</h3>
          {findBottlenecks().length > 0 ? (
            <ul className="list-disc list-inside text-gray-600">
              {findBottlenecks().map((bottleneck, index) => (
                <li key={index}>{bottleneck}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No bottlenecks or drop-off points identified.</p>
          )}
        </div>
        <SalesVelocityCard averageTime={10} />
      </div>
    </div>
  );
}

export default FunnelStagesCard