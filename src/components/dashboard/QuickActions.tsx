import { useState } from 'react';
import { ArrowDownLeft, ArrowUpRight, CreditCard, RefreshCw, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import WithdrawModal from './WithdrawModal';

const actions = [
  { id: 'send', label: 'Send', icon: ArrowUpRight, color: 'from-blue-500 to-blue-600' },
  { id: 'receive', label: 'Receive', icon: ArrowDownLeft, color: 'from-green-500 to-green-600' },
  { id: 'buy', label: 'Buy', icon: ShoppingCart, color: 'from-purple-500 to-purple-600' },
  { id: 'sell', label: 'Sell', icon: CreditCard, color: 'from-orange-500 to-orange-600' },
  { id: 'swap', label: 'Swap', icon: RefreshCw, color: 'from-cyan-500 to-cyan-600' },
];

const QuickActions = () => {
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);

  const handleAction = (actionId: string) => {
    if (actionId === 'send') {
      setIsWithdrawOpen(true);
    }
  };

  return (
    <>
      <div className="glass-card rounded-2xl p-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
        <h2 className="text-xl font-display font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
          {actions.map((action) => (
            <Button
              key={action.id}
              variant="action"
              className="flex flex-col items-center gap-2 h-auto py-4 hover:scale-105 transition-transform"
              onClick={() => handleAction(action.id)}
            >
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center shadow-lg`}
              >
                <action.icon className="w-6 h-6 text-foreground" />
              </div>
              <span className="text-sm font-medium">{action.label}</span>
            </Button>
          ))}
        </div>
      </div>

      <WithdrawModal open={isWithdrawOpen} onOpenChange={setIsWithdrawOpen} />
    </>
  );
};

export default QuickActions;
