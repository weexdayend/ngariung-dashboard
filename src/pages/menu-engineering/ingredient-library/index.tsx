import React from 'react'
import Layout from '../../../app/layout'
import TableIngredientLibrary from './table_ingredient_library'

type Props = {}

function IngredientLibrary({}: Props) {
  return (
    <Layout>
      <TableIngredientLibrary />
    </Layout>
  )
}

export default IngredientLibrary