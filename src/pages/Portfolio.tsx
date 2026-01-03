import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { usePortfolio } from '@/contexts/PortfolioContext';
import { useQuery } from '@tanstack/react-query';
import Header from '@/components/dashboard/Header';
import Footer from '@/components/dashboard/Footer';
import AddTradeModal from '@/components/portfolio/AddTradeModal';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Plus, TrendingUp, TrendingDown, Trash2, Briefcase } from 'lucide-react';
import { format } from 'date-fns';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  AreaChart,
  Area,
  XAxis,
  YAxis,
} from 'recharts';

const COLORS = ['#F59E0B', '#3B82F6', '#10B981', '#8B5CF6', '#EC4899', '#06B6D4', '#EF4444', '#84CC16'];

interface CoinPrice {
  [key: string]: { usd: number };
}

const fetchCurrentPrices = async (coinIds: string[]): Promise<CoinPrice> => {
  if (coinIds.length === 0) return {};
  const response = await fetch(
    `https://api.coingecko.com/api/v3/simple/price?ids=${coinIds.join(',')}&vs_currency=usd`
  );
  if (!response.ok) throw new Error('Failed to fetch prices');
  return response.json();
};

const Portfolio = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { trades, holdings, deleteTrade, getTotalInvested } = usePortfolio();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const coinIds = holdings.map((h) => h.coinId);

  const { data: prices } = useQuery({
    queryKey: ['portfolioPrices', coinIds],
    queryFn: () => fetchCurrentPrices(coinIds),
    enabled: coinIds.length > 0,
    refetchInterval: 60000,
  });

  if (!isAuthenticated) return null;

  const totalInvested = getTotalInvested();
  
  const holdingsWithCurrentValue = holdings.map((h) => {
    const currentPrice = prices?.[h.coinId]?.usd || 0;
    const currentValue = h.totalAmount * currentPrice;
    const pnl = currentValue - h.totalInvested;
    const pnlPercent = h.totalInvested > 0 ? (pnl / h.totalInvested) * 100 : 0;
    return { ...h, currentPrice, currentValue, pnl, pnlPercent };
  });

  const totalCurrentValue = holdingsWithCurrentValue.reduce((sum, h) => sum + h.currentValue, 0);
  const totalPnL = totalCurrentValue - totalInvested;
  const totalPnLPercent = totalInvested > 0 ? (totalPnL / totalInvested) * 100 : 0;

  const pieData = holdingsWithCurrentValue.map((h, i) => ({
    name: h.coinSymbol,
    value: h.currentValue,
    color: COLORS[i % COLORS.length],
  }));

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container py-6 px-4">
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" onClick={() => navigate('/dashboard')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          <Button variant="gold" onClick={() => setIsAddModalOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Trade
          </Button>
        </div>

        {holdings.length === 0 ? (
          <div className="glass-card rounded-2xl p-12 text-center animate-fade-in">
            <Briefcase className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-2xl font-display font-semibold mb-2">No Holdings Yet</h2>
            <p className="text-muted-foreground mb-6">
              Start tracking your portfolio by adding your first trade.
            </p>
            <Button variant="gold" onClick={() => setIsAddModalOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Trade
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Portfolio Summary */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="glass-card rounded-2xl p-6 animate-fade-in">
                <p className="text-sm text-muted-foreground mb-1">Current Value</p>
                <p className="text-3xl font-display font-bold">
                  ${totalCurrentValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
              </div>
              <div className="glass-card rounded-2xl p-6 animate-fade-in" style={{ animationDelay: '0.05s' }}>
                <p className="text-sm text-muted-foreground mb-1">Total Invested</p>
                <p className="text-3xl font-display font-bold">
                  ${totalInvested.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
              </div>
              <div className="glass-card rounded-2xl p-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                <p className="text-sm text-muted-foreground mb-1">Total P&L</p>
                <div className="flex items-baseline gap-2">
                  <p className={`text-3xl font-display font-bold ${totalPnL >= 0 ? 'text-success' : 'text-destructive'}`}>
                    {totalPnL >= 0 ? '+' : ''}${totalPnL.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                  <span className={`flex items-center gap-1 text-sm font-medium ${totalPnL >= 0 ? 'text-success' : 'text-destructive'}`}>
                    {totalPnL >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                    {totalPnLPercent >= 0 ? '+' : ''}{totalPnLPercent.toFixed(2)}%
                  </span>
                </div>
              </div>
            </div>

            {/* Holdings and Chart */}
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Holdings List */}
              <div className="lg:col-span-2 glass-card rounded-2xl p-6 animate-fade-in" style={{ animationDelay: '0.15s' }}>
                <h2 className="text-xl font-display font-semibold mb-4">Holdings</h2>
                <div className="space-y-3">
                  {holdingsWithCurrentValue.map((holding, index) => (
                    <div
                      key={holding.coinId}
                      onClick={() => navigate(`/coin/${holding.coinId}`)}
                      className="flex items-center justify-between p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        />
                        <div>
                          <p className="font-medium">{holding.coinName}</p>
                          <p className="text-sm text-muted-foreground">
                            {holding.totalAmount.toLocaleString('en-US', { maximumFractionDigits: 6 })} {holding.coinSymbol}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">
                          ${holding.currentValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </p>
                        <p className={`text-sm flex items-center justify-end gap-1 ${holding.pnl >= 0 ? 'text-success' : 'text-destructive'}`}>
                          {holding.pnl >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                          {holding.pnl >= 0 ? '+' : ''}{holding.pnlPercent.toFixed(2)}%
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Allocation Chart */}
              <div className="glass-card rounded-2xl p-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <h2 className="text-xl font-display font-semibold mb-4">Allocation</h2>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={80}
                        paddingAngle={3}
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            const percent = ((Number(payload[0].value) / totalCurrentValue) * 100).toFixed(1);
                            return (
                              <div className="bg-popover border border-border rounded-lg px-3 py-2 shadow-lg">
                                <p className="font-medium">{payload[0].name}</p>
                                <p className="text-sm text-muted-foreground">
                                  ${Number(payload[0].value).toLocaleString()} ({percent}%)
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
                <div className="grid grid-cols-2 gap-2 mt-4">
                  {pieData.map((item) => (
                    <div key={item.name} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-xs text-muted-foreground">{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Trade History */}
            <div className="glass-card rounded-2xl p-6 animate-fade-in" style={{ animationDelay: '0.25s' }}>
              <h2 className="text-xl font-display font-semibold mb-4">Trade History</h2>
              <div className="space-y-3">
                {trades.map((trade) => (
                  <div
                    key={trade.id}
                    className="flex items-center justify-between p-4 rounded-xl bg-secondary/50"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          trade.type === 'buy' ? 'bg-success/20' : 'bg-destructive/20'
                        }`}
                      >
                        {trade.type === 'buy' ? (
                          <TrendingUp className="w-5 h-5 text-success" />
                        ) : (
                          <TrendingDown className="w-5 h-5 text-destructive" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">
                          <span className="capitalize">{trade.type}</span> {trade.coinName}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {trade.amount} {trade.coinSymbol} @ ${trade.pricePerCoin.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-medium">${trade.totalValue.toLocaleString()}</p>
                        <p className="text-sm text-muted-foreground">
                          {format(new Date(trade.date), 'MMM d, yyyy')}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteTrade(trade.id)}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
      <AddTradeModal open={isAddModalOpen} onOpenChange={setIsAddModalOpen} />
    </div>
  );
};

export default Portfolio;
