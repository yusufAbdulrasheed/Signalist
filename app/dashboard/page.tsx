import TradeViewWrapper from "@/components/TradeViewWrapper"
import { HEATMAP_WIDGET_CONFIG, MARKET_DATA_WIDGET_CONFIG, MARKET_OVERVIEW_WIDGET_CONFIG, TOP_STORIES_WIDGET_CONFIG } from '@/lib/constants'
import React from 'react'

const DashboardPage = () => {

  const scriptUrl =`https://s3.tradingview.com/external-embedding/embed-widget-`
  return (
    <div className="flex min-h-screen home-wrapper">
      <section className="grid w-full gap-8 home-section">

        {/* MARKET STOCK CHART */}
        <div className="md:col-span-1 xl:col-span-1 mt-8">
          <TradeViewWrapper
            title="Market Stock Chart"
            scriptUrl={`${scriptUrl}market-overview.js`}
            config={MARKET_OVERVIEW_WIDGET_CONFIG}
            className='custom-chart'
            height={600}
          />
        </div>

        {/* STOCK HEATMAP */}
        <div className="md:col-span xl:col-span-2">
          <TradeViewWrapper
            title="Stock Heatmap"
            scriptUrl={`${scriptUrl}stock-heatmap.js`}
            config={HEATMAP_WIDGET_CONFIG}
            height={600}
          />
        </div>
      </section>


      <section className="grid w-full gap-8 home-section">

        {/* MARKET STOCK CHART */}
        <div className="h-full md:col-span-1 xl:col-span-1">
          <TradeViewWrapper
            scriptUrl={`${scriptUrl}timeline.js`}
            config={TOP_STORIES_WIDGET_CONFIG}
            className='custom-chart'
            height={600}
          />
        </div>

        {/* STOCK HEATMAP */}
        <div className="h-full md:col-span-1 xl:col-span-2">
          <TradeViewWrapper
            scriptUrl={`${scriptUrl}market-quotes.js`}
            config={MARKET_DATA_WIDGET_CONFIG}
            height={600}
          />
        </div>
      </section>
    </div>
  )
}

export default DashboardPage