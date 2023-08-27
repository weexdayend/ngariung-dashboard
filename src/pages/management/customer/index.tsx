import React from 'react'
import Layout from '../../../app/layout'
import TableCustomer from './table_customer'

import withAuth from '@/pages';

type Props = {}

function Index({}: Props) {
  return (
    <Layout>
      <TableCustomer />
    </Layout>
  )
}

export default withAuth(Index)