import React from 'react'

import Layout from '@/app/layout'
import withAuth from '@/pages';
import FormGenerator from './form_generator';

type Props = {}

const Index = (props: Props) => {
  return (
    <Layout>
      <FormGenerator />
    </Layout>
  )
}

export default withAuth(Index)