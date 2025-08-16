import React from 'react'
import DashBoardNav from '../ui/DashBoardNav'
import { useAuth0 } from '@auth0/auth0-react';
import { TradingDashboard } from './TradingDashboard';
import { StockList } from './StockList';
import { Portfolio } from './PortfolioProps';
import { TradeHistory } from './TradeHistory';


const Dashboard = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
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
        <TradeHistory  />
      </main>
    </div>
  )
}

export default Dashboard