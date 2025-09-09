// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { TrendingUp, TrendingDown, ShoppingCart, Bitcoin } from 'lucide-react';
// import { Stock } from '@/types/trading';
import { useState } from 'react';
import useLiveTrading from "../../../hooks/useLiveTrading.js";



export const StockList = () => {
  const { prices, buy } = useLiveTrading();
    // const stock = [] ;
  const [selectedStock, setSelectedStock] = useState(null);
  const [shares, setShares] = useState(1);
  // const [isDialogOpen, setIsDialogOpen] = useState(false);
  const loading = !prices|| prices === undefined ;


  const handleBuy = () => {
    // if (selectedStock && shares > 0) {
    //   onBuyStock(selectedStock.symbol, shares);
    //   setIsDialogOpen(false);
    //   setShares(1);
    // }
  };

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
        <div className="space-y-4  overflow-scroll overflow-x-hidden [&::-webkit-scrollbar]:hidden h-90">
          
           {Object.entries(prices).slice(0,10).map(([sym, p]) => (
            <div key={sym}  className="flex items-center justify-between  flex-col lg:flex-row md:flex-row p-2 gap-2 shadow-xl rounded-lg">
              <div className='flex justify-between lg:w-17/20 md:w-9/10 items-center w-full'>
                <div className="">
                <div className="flex items-center space-x-3">
                  <div>
                    <h3 className="font-semibold text-sm  lg:text-lg md:text-xl text-foreground flex items-center "><Bitcoin/>{sym}</h3>
                  </div>
                </div>
              </div>
              
              <div className="text-left">
                <div className="text-sm lg:text-xl md:text-xl font-semibold">
                  {/* ${stock.price.toFixed(2)} */}₹{p.toFixed(2)}
                </div>
                <div className={`flex items-center text-sm `}>
               {(Math.random()).toFixed(2)+'%'}
                </div>
              </div>
              </div>
              
              <button 
                size="sm" 
                className=" bg-primary text-md flex items-center bg-green-500 lg:w-3/20 md:w-1/10 md:p-3 p-1 w-full justify-center rounded-xl font-semibold hover:bg-green-600"
                onClick={() => buy(sym, 1)}
              >
                <ShoppingCart className="h-4 w-4 mr-1" />
                Buy
              </button>
            </div>
            ))} 
        </div>

     
      </div>
    </div>
  );
};