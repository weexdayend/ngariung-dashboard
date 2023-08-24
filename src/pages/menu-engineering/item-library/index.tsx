import React from 'react'
import Layout from '../../../app/layout'
import TableItemLibrary from './table_item_library'

type Props = {}

function ItemLibrary({}: Props) {
  return (
    <Layout>
      <TableItemLibrary />
    </Layout>
  )
}

export default ItemLibrary