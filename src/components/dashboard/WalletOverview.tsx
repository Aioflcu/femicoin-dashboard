import { useWallet } from '@/contexts/WalletContext';
import { Eye, EyeOff, TrendingUp } from 'lucide-react';
import { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const COLORS = ['#F59E0B', '#3B82F6', '#10B981', '#8B5CF6', '#EC4899', '#06B6D4'];

const WalletOverview = () => {
  const { balances, totalBalance } = useWallet();
  const [showBalance, setShowBalance] = useState(true);

  const chartData = balances.map((b, i) => ({
    name: b.symbol,
    value: b.usdValue,
    color: COLORS[i % COLORS.length],
  }));

  return (
    <div className="glass-card rounded-2xl p-6 animate-fade-in">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Balance Section */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h2 className="text-sm font-medium text-muted-foreground">Total Balance</h2>
            <button
              onClick={() => setShowBalance(!showBalance)}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {showBalance ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            </button>
          </div>
          
          <div className="flex items-baseline gap-3 mb-4">
            <span className="text-4xl font-display font-bold">
              {showBalance ? `$${totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : '••••••'}
            </span>
            <span className="flex items-center gap-1 text-success text-sm font-medium">
              <TrendingUp className="w-4 h-4" />
              +5.23%
            </span>
          </div>

          {/* Portfolio List */}
          <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
            {balances.map((balance) => (
              <div
                key={balance.symbol}
                className="flex items-center justify-between p-3 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={balance.image}
                    alt={balance.coin}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="font-medium">{balance.coin}</p>
                    <p className="text-sm text-muted-foreground">{balance.symbol}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">
                    {showBalance ? balance.amount.toLocaleString('en-US', { maximumFractionDigits: 4 }) : '••••'}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {showBalance ? `$${balance.usdValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}` : '••••'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chart Section */}
        <div className="lg:w-64">
          <h3 className="text-sm font-medium text-muted-foreground mb-4">Distribution</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-popover border border-border rounded-lg px-3 py-2 shadow-lg">
                          <p className="font-medium">{payload[0].name}</p>
                          <p className="text-sm text-muted-foreground">
                            ${Number(payload[0].value).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          {/* Legend */}
          <div className="grid grid-cols-2 gap-2 mt-4">
            {chartData.slice(0, 4).map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-xs text-muted-foreground">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletOverview;
