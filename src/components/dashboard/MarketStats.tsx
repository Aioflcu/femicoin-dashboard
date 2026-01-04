import { useQuery } from '@tanstack/react-query';
import { TrendingUp, TrendingDown, Activity, DollarSign, BarChart3, Coins } from 'lucide-react';
import { fetchWithApiKey } from '@/lib/coingecko';

interface GlobalData {
  data: {
    total_market_cap: { usd: number };
    total_volume: { usd: number };
    market_cap_percentage: { btc: number; eth: number };
    market_cap_change_percentage_24h_usd: number;
    active_cryptocurrencies: number;
  };
}

const fetchGlobalData = async (): Promise<GlobalData> => {
  return fetchWithApiKey('https://api.coingecko.com/api/v3/global');
};

const formatNumber = (num: number): string => {
  if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`;
  if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
  if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
  return `$${num.toLocaleString()}`;
};

const MarketStats = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['globalMarketData'],
    queryFn: fetchGlobalData,
    refetchInterval: 60000,
    staleTime: 30000,
  });

  const stats = data?.data ? [
    {
      label: 'Total Market Cap',
      value: formatNumber(data.data.total_market_cap.usd),
      change: data.data.market_cap_change_percentage_24h_usd,
      icon: DollarSign,
    },
    {
      label: '24h Volume',
      value: formatNumber(data.data.total_volume.usd),
      icon: BarChart3,
    },
    {
      label: 'BTC Dominance',
      value: `${data.data.market_cap_percentage.btc.toFixed(1)}%`,
      icon: Coins,
    },
    {
      label: 'Active Cryptos',
      value: data.data.active_cryptocurrencies.toLocaleString(),
      icon: Activity,
    },
  ] : [];

  if (isLoading) {
    return (
      <div className="glass-card rounded-2xl p-6 animate-fade-in" style={{ animationDelay: '0.15s' }}>
        <h2 className="text-xl font-display font-semibold mb-4">Market Overview</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-secondary/50 rounded-xl p-4 animate-pulse">
              <div className="h-4 bg-muted rounded w-1/2 mb-2" />
              <div className="h-6 bg-muted rounded w-3/4" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-2xl p-6 animate-fade-in" style={{ animationDelay: '0.15s' }}>
      <h2 className="text-xl font-display font-semibold mb-4">Market Overview</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-secondary/50 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <stat.icon className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">{stat.label}</span>
            </div>
            <p className="text-lg font-display font-bold">{stat.value}</p>
            {stat.change !== undefined && (
              <div className={`flex items-center gap-1 text-sm mt-1 ${stat.change >= 0 ? 'text-success' : 'text-destructive'}`}>
                {stat.change >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {stat.change >= 0 ? '+' : ''}{stat.change.toFixed(2)}%
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketStats;
