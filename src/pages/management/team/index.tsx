import React from 'react'
import Layout from '../../../app/layout'
import TableTeam from './table_team'

type Props = {}

function TeamManagement({}: Props) {
  return (
    <Layout>
      <TableTeam />
    </Layout>
  )
}

export default TeamManagement