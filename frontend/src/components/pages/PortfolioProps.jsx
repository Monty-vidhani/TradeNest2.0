// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
// import { Position } from '@/types/trading';
// import { useState } from 'react';

// interface PortfolioProps {
//   positions: Position[];
//   onSellStock: (symbol: string, shares: number) => void;
// }

export const Portfolio = () => {
  const positions = [] ;
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
        <div  className="text-foreground">Your Portfolio</div>
      </div >
      <div >
        <div className="space-y-4">
          {/* {positions.map((position) => ( */}
            <div className="flex items-center justify-between p-4 rounded-lg border border-border bg-secondary/50">
              <div className="flex-1">
                <div className="flex items-center space-x-3">
                  <div>
                    <h3 className="font-semibold text-foreground">AAPL</h3>
                    <p className="text-sm text-muted-foreground">
                      {/* {position.shares} shares @ ${position.avgPrice.toFixed(2)} */}5.3
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-lg font-bold text-foreground">
                  {/* ${position.totalValue.toFixed(2)} */}2.5
                </div>
                <div className={`flex items-center text-sm ${position.gainLoss >= 0 ? 'text-success' : 'text-danger'}`}>
                  {/* {position.gainLoss >= 0 ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />} */}666.666
                  {/* {position.gainLoss >= 0 ? '+' : ''}${position.gainLoss.toFixed(2)} ({position.gainLossPercent >= 0 ? '+' : ''}{position.gainLossPercent.toFixed(2)}%) */}
                </div>
              </div>
              
              <button 
                size="sm" 
                variant="outline"
                className="ml-4 border-danger text-danger hover:bg-danger hover:text-danger-foreground"
                onClick={() => openSellDialog(position)}
              >
                <Minus className="h-4 w-4 mr-1" />
                Sell
              </button>
            </div>
          {/* ))} */}
        </div>

        <div  open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <div  className="bg-card border-border">
            <div >
              <div  className="text-foreground">
                Sell {selectedPosition?.symbol} - ${selectedPosition?.currentPrice.toFixed(2)}
              </div >
            </div >
            <div className="space-y-4">
              <div>
                <div  htmlFor="shares" className="text-foreground">Number of Shares</div >
                <div 
                  id="shares"
                  type="number"
                  min="1"
                  // max={selectedPosition?.shares || 1}
                  // value={shares}
                  // onChange={(e) => setShares(Number(e.target.value))}
                  className="bg-input border-border text-foreground"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Available: 5 shares
                </p>
              </div>
              
              <div className="p-4 bg-secondary/50 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Total Proceeds:</span>
                  <span className="font-bold text-foreground">
                    {/* ${selectedPosition ? (selectedPosition.currentPrice * shares).toFixed(2) : '0.00'} */}8.88
                  </span>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <button 
                  // variant="outline" 
                  // onClick={() => setIsDialogOpen(false)}
                  className="flex-1 border-border text-foreground hover:bg-secondary"
                >
                  Cancel
                </button>
                <button 
                  // onClick={handleSell}
                  className="flex-1 bg-danger text-danger-foreground hover:bg-danger/90"
                >
                  Sell Shares
                </button>
              </div>
            </div>
          </div >
        </div >
      </div >
    </div>
  );
};