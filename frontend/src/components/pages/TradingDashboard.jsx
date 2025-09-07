// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
import { TrendingUp, TrendingDown, DollarSign, PieChart, Activity } from 'lucide-react';
// import { Portfolio } from '@/types/trading';
import useLiveTrading from "../../../hooks/useLiveTrading.js";



export const TradingDashboard = () => {
const {me} = useLiveTrading();
let AvailableCash = parseFloat(me.cashBalance) ;
  const positions = me?.portfolio || [];
    const loading = !me || me.cashBalance === undefined;

// const portfolioGain = me.portfolioValue - me.investedValue; 
// const portfolioGainPercent = (portfolioGain / me.investedValue) * 100; 
// const dayChange = me.portfolioValue - me.openingValue;
// const dayChangePercent = (dayChange / me.openingValue) * 100;
if (!me) return <div className='mb-5 text-3xl font-semibold flex justify-center items-center animate-pulse'>Loading...</div>;
  return (
    <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
      {/* Total Portfolio Value */}
      <div className=" shadow-lg p-2 rounded-xl">
        <div  className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div  className="text-sm font-medium text-muted-foreground">
            Portfolio Value
          </div >
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </div >
        <div >
          <div className="text-2xl font-bold text-foreground">
            {/* ${portfolio.totalValue.toLocaleString('en-US', { minimumFractionDigits: 2 })} */} 
           {loading ? (
            <div>loading</div>
          ) : (
            <div className="text-2xl font-bold text-foreground">
              ₹{Number(me?.portfolioValue ?? 0).toFixed(2)}
            </div>
          )}
          </div>
          <div className={`flex items-center text-xs `}>
            {/* {portfolioGain >= 0 ? (
        <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
      ) : (
        <TrendingDown className="h-3 w-3 mr-1 text-red-500" />
      )} */}
      {/* ₹{Math.abs(portfolioGain).toFixed(2)} ({portfolioGainPercent.toFixed(2)}%) */}
            {/* ${Math.abs(portfolioGain).toLocaleString('en-US', { minimumFractionDigits: 2 })} ({portfolioGainPercent >= 0 ? '+' : ''}{portfolioGainPercent.toFixed(2)}%) */}
          </div>
        </div >
      </div>

      {/* Available Cash */}
      <div  className="shadow-lg p-2 rounded-xl ">
        <div  className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div  className="text-sm font-medium text-muted-foreground">
            Available Cash
          </div >
          <Activity className="h-4 w-4 text-muted-foreground" />
        </div >
        <div >
          <div className="text-2xl font-bold text-foreground">
           
             ₹{AvailableCash.toFixed(2)}
          </div>
          <p className="text-xs text-muted-foreground">
            Ready to invest
          </p>
        </div >
      </div >

      {/* Day's Change */}
      {/* <div  className="shadow-lg p-2  rounded-xl bg-card">
        <div  className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div  className="text-sm font-medium text-muted-foreground">
            Today's Change
          </div >
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </div >
        <div >
          <div className={`text-2xl font-bold `}>
            {portfolio.dayChange >= 0 ? '+' : ''}${portfolio.dayChange.toLocaleString('en-US', { minimumFractionDigits: 2 })} 20%
          </div>
          <p className="text-xs text-muted-foreground">
            Unrealized P&L
          </p>
        </div >
      </div >  */}

      {/* Total Positions */}
      <div  className="shadow-lg p-2 rounded-xl bg-card">
        <div  className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div  className="text-sm font-medium text-muted-foreground">
            Active Positions
          </div >
          <PieChart className="h-4 w-4 text-muted-foreground" />
        </div >
        <div >
          <div className="text-2xl font-bold text-foreground">
            {positions.length}
          </div>
          <p className="text-xs text-muted-foreground">
            Holdings
          </p>
        </div >
      </div >
    </div>
  );
};