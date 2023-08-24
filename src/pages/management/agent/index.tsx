import React from 'react'
import Layout from '../../../app/layout'
import TableAgent from './table_agent'

type Props = {}

function AgentManagement({}: Props) {
  return (
    <Layout>
      <TableAgent />
    </Layout>
  )
}

export default AgentManagement