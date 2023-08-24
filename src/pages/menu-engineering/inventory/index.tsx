import React from 'react'
import Layout from '../../../app/layout'
import TableInventory from './table_inventory'

function InventoryPage() {
  return (
    <Layout>
      <div className='grid gap-4'>
        <TableInventory />
      </div>
    </Layout>
  )
}

export default InventoryPage