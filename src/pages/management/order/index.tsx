import React from 'react'
import Layout from '../../../app/layout'
import TableOrder from './table_order'

import withAuth from '@/pages';

function Index() {
  return (
    <Layout>
      <TableOrder />
    </Layout>
  )
}

export default withAuth(Index)