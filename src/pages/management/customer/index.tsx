import React from 'react'
import Layout from '../../../app/layout'
import TableCustomer from './table_customer'

type Props = {}

function CustomerManagement({}: Props) {
  return (
    <Layout>
      <TableCustomer />
    </Layout>
  )
}

export default CustomerManagement