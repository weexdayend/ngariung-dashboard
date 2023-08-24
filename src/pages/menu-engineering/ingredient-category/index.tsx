import React from 'react'
import Layout from '../../../app/layout'
import TableIngredientCategory from './table_ingredient_category'

type Props = {}

function IngredientCategory({}: Props) {
  return (
    <Layout>
      <TableIngredientCategory />
    </Layout>
  )
}

export default IngredientCategory