import React from 'react'
import Layout from '@/app/layout'
import TablePurchasingOrder from './table_purchasing_order'

type Props = {}

function PurchasingOrder({}: Props) {
  return (
    <Layout>
      <TablePurchasingOrder />
    </Layout>
  )
}

export default PurchasingOrder