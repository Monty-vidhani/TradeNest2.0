// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
// import { Trade } from '@/types/trading';
// import { format } from 'date-fns';

// interface TradeHistoryProps {
//   trades: Trade[];
// }


export const TradeHistory = () => {
    const trades = [] ;
  if (trades.length === 0) {
    return (
      <div className="shadow-lg rounded-xl p-3 bg-card">
        <div>
          <h1 className="text-3xl font-semibold mb-3">Trade History</h1>
        </div>
        <div >
          <div className="text-center py-8">
            <p className="text-muted-foreground">No trades yet. Make your first trade to see history!</p>
          </div>
        </div>
      </div >
    );
  }

  return (
    <div  className="shadow-lg bg-card">
      <div >
        <div  className="text-foreground">Trade History</div>
      </div >
      <div >
        <div className="space-y-3">
          {trades.slice(0, 10).map((trade) => (
            <div key={trade.id} className="flex items-center justify-between p-3 rounded-lg border border-border bg-secondary/30">
              <div className="flex items-center space-x-3">
                <div  
                
                  className={trade.type === 'buy' ? 'bg-success text-success-foreground' : 'bg-danger text-danger-foreground'}
                >
                  {trade.type.toUpperCase()}
                </div >
                <div>
                  <h4 className="font-medium text-foreground">{trade.symbol}</h4>
                  <p className="text-sm text-muted-foreground">
                    {trade.shares} shares @ ${trade.price.toFixed(2)}
                  </p>
                </div>
              </div>
              
              <div className="text-right">
                <div className="font-medium text-foreground">
                  {/* ${trade.total.toFixed(2)} */} 55
                </div>
                <div className="text-sm text-muted-foreground">
                  {/* {format(trade.timestamp, 'MMM dd, HH:mm')} */}
                </div>
              </div>
            </div>
          ))}
          
          {trades.length > 10 && (
            <div className="text-center pt-4">
              <p className="text-sm text-muted-foreground">
                Showing latest 10 trades of {trades.length} total
              </p>
            </div>
          )}
        </div>
      </div >
    </div>
  );
};