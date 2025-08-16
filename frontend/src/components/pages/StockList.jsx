// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { TrendingUp, TrendingDown, ShoppingCart } from 'lucide-react';
// import { Stock } from '@/types/trading';
import { useState } from 'react';

// interface StockListProps {
//   stocks: Stock[];
//   onBuyStock: (symbol: string, shares: number) => void;
// }

export const StockList = () => {
    const stock = [] ;
  const [selectedStock, setSelectedStock] = useState(null);
  const [shares, setShares] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

//   const handleBuy = () => {
//     if (selectedStock && shares > 0) {
//       onBuyStock(selectedStock.symbol, shares);
//       setIsDialogOpen(false);
//       setShares(1);
//     }
//   };

  const openBuyDialog = (stock) => {
    setSelectedStock(stock);
    setIsDialogOpen(true);
  };

  return (
    <div  className="shadow-lg p-3 rounded-xl">
      <div >
        <h1 className='text-3xl mb-2 font-semibold'>Market Overview</h1>
      </div >
      <div >
        <div className="space-y-4">
          {/* {stocks.map((stock) => ( */}
            <div  className="flex items-center justify-between p-4 rounded-lg border">
              <div className="flex-1">
                <div className="flex items-center space-x-3">
                  <div>
                    <h3 className="font-semibold text-foreground">AAPL</h3>
                    <p className="text-sm text-muted-foreground">Apple</p>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-xl font-bold">
                  {/* ${stock.price.toFixed(2)} */}4.88
                </div>
                <div className={`flex items-center text-sm `}>
                  {/* {stock.change >= 0 ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />} */}5.5%
                  {/* {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)} ({stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%) */}
                </div>
              </div>
              
              <button 
                size="sm" 
                className="ml-4 bg-primary text-md flex items-center bg-green-500 p-3 rounded-xl font-semibold hover:bg-green-600"
                // onClick={() => openBuyDialog(stock)}
              >
                <ShoppingCart className="h-4 w-4 mr-1" />
                Buy
              </button>
            </div>
           {/* ))} */}
        </div>

      {/* <div 
        open={isDialogOpen} onOpenChange={setIsDialogOpen}
        >
          <div  className="bg-card border-border">
            <div >
              <div  className="text-foreground">
                Buy 
                {selectedStock?.symbol} - ${selectedStock?.price.toFixed(2)}
              </div >
            </div >
            <div className="space-y-4">
              <div>
                <div  htmlFor="shares" className="text-foreground">Number of Shares</div>
                <input 
                  id="shares"
                  type="number"
                  min="1"
                  value={shares}
                  onChange={(e) => setShares(Number(e.target.value))}
                  className="bg-input border-border text-foreground"
                />
              </div>
              
              <div className="p-4 bg-secondary/50 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Total Cost:</span>
                  <span className="font-bold text-foreground">
                    ${selectedStock ? (selectedStock.price * shares).toFixed(2) : '0.00'}
                  </span>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <button 
                  variant="outline" 
                  onClick={() => setIsDialogOpen(false)}
                  className="flex-1 border-border text-foreground hover:bg-secondary"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleBuy}
                  className="flex-1 bg-success text-success-foreground hover:bg-success/90"
                >
                  Buy Shares
                </button>
              </div>
            </div>
          </div >
        </div>  */}
      </div>
    </div>
  );
};