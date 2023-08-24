import React from 'react'
import Layout from '../../../app/layout'
import ArimaForecastingCard from './arima_forecasting_card'

function RevenueForecasting() {
  return (
    <Layout>
      <div className="grid gap-4">
        <ArimaForecastingCard />
      </div>
    </Layout>
  )
}

export default RevenueForecasting