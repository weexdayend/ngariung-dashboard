import React from 'react'
import Layout from '../../app/layout'
import PreformanceTeamCard from './performance_team_card'

function TeamPerformance() {
  return (
    <Layout>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <PreformanceTeamCard />
      </div>
    </Layout>
  )
}

export default TeamPerformance