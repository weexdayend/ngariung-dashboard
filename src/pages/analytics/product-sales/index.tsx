import React from 'react'
import Layout from '../../../app/layout'
import ProductSalesCard from './product_sales_card'
import ProductPerformance from './product_performance_card';

import { products, categories } from '@/utils/typeData';
import ProductCategoriesAnalysis from './product_categories_analysis';
import SalesTrendAnalysis from './sales_trend_analysis';
import Recommendations from './recommendations';

function ProductSales() {

  return (
    <Layout>
      <div className="grid grid-cols-2 gap-4">
        <div className='col-span-2'>
          {/* this section can be to show all data and can to be comparison chart for data-a vs data-b */}
          <ProductPerformance products={products} />
        </div>
        <ProductCategoriesAnalysis categories={categories} />
        <SalesTrendAnalysis />
        <ProductSalesCard />
        <Recommendations />
      </div>
    </Layout>
  )
}

export default ProductSales