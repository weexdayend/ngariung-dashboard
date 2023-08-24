import React from 'react'
import Layout from '../../../app/layout'
import BriefSalesDistribution from './brief_sales_distribution'
import SalesDistributionChart from './sales_distribution_chart'

function SalesDistribution() {

  return (
    <Layout>
      <div className="grid gap-4">
        <BriefSalesDistribution />
        <SalesDistributionChart />
      </div>
    </Layout>
  )
}

export default SalesDistribution