// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
// import { Position } from '@/types/trading';
// import { useState } from 'react';
import useLiveTrading from "../../../hooks/useLiveTrading.js";


// interface PortfolioProps {
//   positions: Position[];
//   onSellStock: (symbol: string, shares: number) => void;
// }

export const Portfolio = () => {
  const { me, prices, buy, sell } = useLiveTrading();
  const positions = Array.isArray(me?.portfolio) ? me.portfolio : [];
  
  // const [selectedPosition, setSelectedPosition] = useState<Position | null>(null);
  // const [shares, setShares] = useState<number>(1);
  // const [isDialogOpen, setIsDialogOpen] = useState(false);

  // const handleSell = () => {
  //   if (selectedPosition && shares > 0) {
  //     onSellStock(selectedPosition.symbol, shares);
  //     setIsDialogOpen(false);
  //     setShares(1);
  //   }
  // };

  // const openSellDialog = (position: Position) => {
  //   setSelectedPosition(position);
  //   setShares(Math.min(1, position.shares));
  //   setIsDialogOpen(true);
  // };

  if (positions.length === 0) {
    return (
      <div className="p-3 rounded-xl shadow-lg">
        <div>
          <h1 className="text-3xl mb-2 font-semibold">Your Portfolio</h1>
        </div>
        <div >
          <div className="text-center py-8">
            <p className="text-muted-foreground">No positions yet. Start trading to build your portfolio!</p>
          </div>
        </div >
      </div >
    );
  }

  return (
    <div  className="p-3 rounded-xl shadow-lg">
      <div >
        <div  className='text-3xl mb-2 font-semibold'>Your Portfolio</div>
      </div >
      <div >
        <div className="space-y-4 overflow-scroll overflow-x-hidden [&::-webkit-scrollbar]:hidden h-90">
          {positions.map((row) => {
            const last = prices[row.symbol] ?? row.currentPrice ?? row.avgBuyPrice;
            const pnl = (last - row.avgBuyPrice) * row.quantity;
            const pnlPercent = ((last - row.avgBuyPrice) / row.avgBuyPrice) * 100;
            const totalValue = last * row.quantity;

            return  ( 
            <div key={row.symbol} className="flex  items-center  justify-between flex-col lg:flex-row md:flex-row p-2 gap-2 shadow-xl rounded-lg">
             <div className='flex justify-between items-center lg:w-17/20 md:w-9/10 w-full '>
               <div className="flex-1">
                <div className="flex items-center space-x-3">
                  <div>
                    <h3 className="font-semibold text-foreground">{row.symbol}</h3>
                    <p className="text-sm text-muted-foreground">
                      {row.quantity} shares @ ₹{row.avgBuyPrice.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-lg font-bold text-foreground">
                  ₹{totalValue.toFixed(2)}
                </div>
                 <div
                    className={`flex items-center text-sm ${
                      pnl >= 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {pnl >= 0 ? (
                      <TrendingUp className="h-3 w-3 mr-1" />
                    ) : (
                      <TrendingDown className="h-3 w-3 mr-1" />
                    )}
                    {pnl >= 0 ? "+" : ""}
                    ₹{pnl.toFixed(2)} ({pnlPercent.toFixed(2)}%)
                  </div>
              </div>
             </div>
              
              <button 
                size="sm" 
                className="bg-primary text-md flex items-center bg-red-500 lg:w-3/20 md:w-1/10 md:p-3 p-1 w-full justify-center rounded-xl font-semibold hover:bg-red-600"
                // onClick={() => openSellDialog(position)}
                onClick={() => sell(row.symbol, 1)}
              >
                <Minus className="h-4 w-4 mr-1" />
                Sell
              </button>
            </div>
              )
           })} 
        </div>

      
      </div >
    </div>
  );
};