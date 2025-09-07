import React from 'react'
import DashBoardNav from '../ui/DashBoardNav'

import { TradingDashboard } from './TradingDashboard';
import { StockList } from './StockList';
import { Portfolio } from './PortfolioProps';
import { TradeHistory } from './TradeHistory';
import useLiveTrading from "../../../hooks/useLiveTrading.js";


const Dashboard = () => {
const { tradingHistory } = useLiveTrading();
  return (
    <div className='dashboard text-black bg-white min-h-screen'>
      <DashBoardNav/>
      <main className="container mx-auto px-6 py-8">
        {/* Dashboard Overview */}
        <TradingDashboard  />
        
        {/* Trading Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          <StockList  />
          <Portfolio  />
        </div>
        
        {/* Trade History */}
        <TradeHistory trades={tradingHistory}  />
      </main>
    </div>
  )
}

export default Dashboard