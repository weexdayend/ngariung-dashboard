import React from 'react'
import Layout from '../../../app/layout'
import CustomerSegmentationChart from './customers_segmentation_chart';
import GeographicSegmentationChart from './geographic_segmentation_card';
import PsychographicSegmentationChart from './psychographic_segmentation_chart';
import BehavioralSegmentationChart from './behavioral_segmentation_chart';
import PersonalizedMarketing from './personalized_marketing';

function CustomersSegmentation() {

  const dataSegment = [
    { segment: 'Young Professionals', value: 20 },
    { segment: 'Stay-at-Home Parents', value: 15 },
    { segment: 'Senior Citizens', value: 12 },
    { segment: 'Students', value: 18 },
    { segment: 'Business Owners', value: 25 },
    { segment: 'Freelancers', value: 10 },
  ];  

  const dataGeographic = [
    { categories: 'USA', series: 120 },
    { categories: 'Canada', series: 200 },
    { categories: 'UK', series: 150 },
    { categories: 'Germany', series: 80 },
  ];

  const dataPsychographic = [
    { category: 'Outdoor Enthusiasts', percentage: 25 },
    { category: 'Fashionistas', percentage: 15 },
    { category: 'Tech Geeks', percentage: 20 },
    { category: 'Health and Wellness Seekers', percentage: 30 },
    { category: 'Art and Culture Lovers', percentage: 10 },
  ];

  const behavioralSegmentData = [
    { segment: 'Frequent Buyers', percentage: 35 },
    { segment: 'Brand Loyalists', percentage: 25 },
    { segment: 'Occasional Shoppers', percentage: 20 },
    { segment: 'Churned Customers', percentage: 15 },
    { segment: 'Engaged Responders', percentage: 5 },
  ];

  const SegmentCategories = dataSegment.map(item => item.segment);
  const SegmentSeries = dataSegment.map(item => item.value);

  const GeographicCategories = dataGeographic.map(item => item.categories);
  const GeographicSeries = dataGeographic.map(item => item.series);

  return (
    <Layout>
      <div className="grid grid-cols-2 gap-4">
        <CustomerSegmentationChart categories={SegmentCategories} series={SegmentSeries} />
        <GeographicSegmentationChart categories={GeographicCategories} series={GeographicSeries} />
        <PsychographicSegmentationChart data={dataPsychographic} />
        <BehavioralSegmentationChart data={behavioralSegmentData} />
        <PersonalizedMarketing />
      </div>
    </Layout>
  )
}

export default CustomersSegmentation