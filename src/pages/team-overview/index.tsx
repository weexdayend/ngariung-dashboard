import React from 'react'
import Layout from '../../app/layout'

import ProfileCard from './profile_card';
import StatsCardOne from './stats_card_one';
import StatsCardTwo from './stats_card_two';
import StatsCardThree from './stats_card_three';
import DealsTableCard from './deals_table_card';

function ProfileOverview() {
  return (
    <Layout>
      <div className='space-y-4'>

        {/* Profile Card and Stats */}
        <div className='grid grid-cols-2 gap-4'>
          <ProfileCard />
          <StatsCardOne />
        </div>

        {/* Stats Conversion */}
        <div className='grid grid-cols-3 gap-4'>
          <StatsCardTwo />
          <StatsCardThree />
        </div>

        {/* Table Presence */}
        <DealsTableCard />
      </div>
    </Layout>
  )
}

export default ProfileOverview