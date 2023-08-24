import React from 'react'
import Layout from '../../../app/layout'
import TableRecipe from './table_recipe'

type Props = {}

function Recipes({}: Props) {
  return (
    <Layout>
      <TableRecipe />
    </Layout>
  )
}

export default Recipes