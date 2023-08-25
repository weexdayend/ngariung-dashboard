import React from 'react'
import Layout from '../../app/layout'

import SalesFunnelAnalysis from './sales_funnel_analysis'
import CustomerAnalysis from './customer_analysis'
import FunnelStagesCard from './funnel_stages'
import FunnelVisualizationCard from './funnel_visualization_card'
import RecommendationsCard from './recommendation_card'
import InsightsCard from './insights_card'

function ReportsInsights() {
  
  const metricsData = {
    leadsGenerated: 100,
    qualifiedLeads: 80,
    proposalsSent: 60,
    closedDeals: 40,
  };

  // Dummy data for funnel visualization
  const series = [
    {
      name: 'Actual',
      data: [
        {
          x: 'Lead Generation',
          y: 54,
          goals: [
            {
              name: 'Expected',
              value: 52,
              strokeWidth: 10,
              strokeHeight: 0,
              strokeLineCap: 'round',
              strokeColor: '#775DD0'
            }
          ]
        },
        {
          x: 'Lead Qualification',
          y: 66,
          goals: [
            {
              name: 'Expected',
              value: 61,
              strokeWidth: 10,
              strokeHeight: 0,
              strokeLineCap: 'round',
              strokeColor: '#775DD0'
            }
          ]
        },
        {
          x: 'Proposal',
          y: 81,
          goals: [
            {
              name: 'Expected',
              value: 66,
              strokeWidth: 10,
              strokeHeight: 0,
              strokeLineCap: 'round',
              strokeColor: '#775DD0'
            }
          ]
        },
        {
          x: 'Closed Deals',
          y: 67,
          goals: [
            {
              name: 'Expected',
              value: 70,
              strokeWidth: 5,
              strokeHeight: 10,
              strokeColor: '#775DD0'
            }
          ]
        }
      ]
    }
  ]
  const funnelData = [100, 75, 50, 25]; // Replace with your actual data
  const funnelLabels = ['Lead Generation', 'Lead Qualification', 'Proposal Sent', 'Closed Deals']; // Replace with your actual data

  // Dummy data for recommendations
  const recommendations = [
    {
      title: 'Improve Lead Generation Strategies',
      description: 'Invest in targeted online advertising campaigns and optimize your website for lead capture.',
    },
    {
      title: 'Implement a Lead Nurturing Program',
      description: 'Develop a systematic lead nurturing program to engage and educate prospects throughout their buying journey.',
    },
    {
      title: 'Streamline Sales Qualification Process',
      description: 'Refine your lead qualification criteria and establish clear guidelines for determining qualified leads.',
    },
    {
      title: 'Enhance Sales Training and Coaching',
      description: 'Provide regular training and coaching to your sales team to improve their skills and knowledge.',
    },
    {
      title: 'Optimize Proposal and Negotiation Process',
      description: 'Review and improve your proposal and negotiation processes to increase win rates and deal values.',
    },
    // Add more recommendations as needed
  ];


  return (
    <Layout>
      <div className="grid grid-cols-2 gap-4">
        <div className='col-span-2'>
          <FunnelStagesCard />
        </div>
        <div className='row-span-4 space-y-4'>
          <FunnelVisualizationCard funnelData={funnelData} funnelLabels={funnelLabels} />
          <CustomerAnalysis />
          <SalesFunnelAnalysis data={series} />
        </div>
        <RecommendationsCard recommendations={recommendations} />
        <InsightsCard />
      </div>
    </Layout>
  )
}

export default ReportsInsights