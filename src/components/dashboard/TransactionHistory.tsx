import { useWallet, Transaction } from '@/contexts/WalletContext';
import { ArrowDownLeft, ArrowUpRight, RefreshCw, ShoppingCart } from 'lucide-react';
import { format } from 'date-fns';

const getTransactionIcon = (type: Transaction['type']) => {
  switch (type) {
    case 'received':
      return <ArrowDownLeft className="w-5 h-5" />;
    case 'sent':
    case 'withdrawn':
      return <ArrowUpRight className="w-5 h-5" />;
    case 'swapped':
      return <RefreshCw className="w-5 h-5" />;
    case 'bought':
      return <ShoppingCart className="w-5 h-5" />;
    default:
      return null;
  }
};

const getTransactionColor = (type: Transaction['type']) => {
  switch (type) {
    case 'received':
    case 'bought':
      return 'from-green-500 to-green-600';
    case 'sent':
    case 'withdrawn':
      return 'from-orange-500 to-orange-600';
    case 'swapped':
      return 'from-cyan-500 to-cyan-600';
    default:
      return 'from-gray-500 to-gray-600';
  }
};

const TransactionHistory = () => {
  const { transactions } = useWallet();

  return (
    <div className="glass-card rounded-2xl p-6 animate-fade-in" style={{ animationDelay: '0.3s' }}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-display font-semibold">Demo Transactions</h2>
        <button className="text-sm text-primary hover:underline">View All</button>
      </div>

      <div className="space-y-3">
        {transactions.slice(0, 5).map((tx) => (
          <div
            key={tx.id}
            className="flex items-center justify-between p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors"
          >
            <div className="flex items-center gap-4">
              <div
                className={`w-10 h-10 rounded-xl bg-gradient-to-br ${getTransactionColor(tx.type)} flex items-center justify-center`}
              >
                {getTransactionIcon(tx.type)}
              </div>
              <div>
                <p className="font-medium capitalize">{tx.type}</p>
                <p className="text-sm text-muted-foreground">{tx.coin}</p>
              </div>
            </div>

            <div className="text-right">
              <p className="font-medium">
                {tx.type === 'sent' || tx.type === 'withdrawn' ? '-' : '+'}
                {tx.amount.toLocaleString('en-US', { maximumFractionDigits: 4 })} {tx.coin.split(' ')[0]}
              </p>
              <div className="flex items-center gap-2 justify-end">
                <span className="text-sm text-muted-foreground">
                  {format(new Date(tx.date), 'MMM d, h:mm a')}
                </span>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${
                    tx.status === 'success'
                      ? 'bg-success/20 text-success'
                      : 'bg-warning/20 text-warning'
                  }`}
                >
                  {tx.status === 'pending' ? 'Simulated review' : 'Simulated'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionHistory;
