import { format } from 'date-fns';

export const TradeHistory = ({ trades }) => {
  if (!Array.isArray(trades) || trades.length === 0) {
    return (
      <div className="shadow-lg rounded-xl p-3 bg-card">
        <h1 className="text-3xl font-semibold mb-3">Trade History</h1>
        <div className="text-center py-8">
          <p className="text-muted-foreground">
            No trades yet. Make your first trade to see history!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="shadow-lg bg-card rounded-xl p-4">
      <h1 className="text-xl font-semibold mb-4 text-foreground">
        Trade History
      </h1>
      <div className="space-y-3 overflow-scroll overflow-x-hidden [&::-webkit-scrollbar]:hidden h-90">
        {trades.slice(0, 10).map((trade) => (
          <div
            key={trade._id}
            className="flex items-center justify-between p-3 shadow-xl rounded-lg bg-secondary/30"
          >
            <div className="flex items-center space-x-3">
              <span
                className={`px-2 py-1 rounded-md text-xs font-semibold ${
                  trade.type === 'buy'
                    ? 'bg-green-500 text-white'
                    : 'bg-red-500 text-white'
                }`}
              >
                {trade.type.toUpperCase()}
              </span>
              <div>
                <h4 className="font-medium text-foreground">{trade.symbol}</h4>
                <p className="text-sm text-muted-foreground">
                  {trade.quantity} shares @ ${trade.price.toFixed(2)}
                </p>
              </div>
            </div>

            <div className="text-right">
              <div className="font-medium text-foreground">
                ${(trade.quantity * trade.price).toFixed(2)}
              </div>
              <div className="text-sm text-muted-foreground">
                {trade.date && format(new Date(trade.date), 'MMM dd, HH:mm')}
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
    </div>
  );
};
