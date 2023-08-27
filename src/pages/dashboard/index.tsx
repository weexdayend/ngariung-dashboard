import React from 'react'
import Layout from '../../app/layout'

import ProfitBalanceCard from './profit_balance_card'
import SalesSummaryCard from './sales_summary_card'
import ActivityCard from './activity_card'
import FilterCard from './filter_card'
import withAuth from '@/pages'

function Dashboard({}) {
  return (
    <Layout>
      <div className='space-y-4'>
        <div className='flex flex-row space-x-4'>
          <FilterCard />
          <ProfitBalanceCard />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <SalesSummaryCard />
        </div>
          <div className='grid grid-cols-2 gap-4'>
            <ActivityCard />
            <ActivityCard />
          </div>
      </div>
    </Layout>
  )
}

export default withAuth(Dashboard)