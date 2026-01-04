import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, Flame } from 'lucide-react';
import { fetchWithApiKey } from '@/lib/coingecko';

interface TrendingCoin {
  item: {
    id: string;
    name: string;
    symbol: string;
    thumb: string;
    market_cap_rank: number;
    data: {
      price: number;
      price_change_percentage_24h?: { usd?: number };
    };
  };
}

const fetchTrendingCoins = async () => {
  return fetchWithApiKey('https://api.coingecko.com/api/v3/search/trending');
};

const TrendingCoins = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useQuery({
    queryKey: ['trendingCoins'],
    queryFn: fetchTrendingCoins,
    refetchInterval: 60000,
    staleTime: 30000,
  });

  const trendingCoins: TrendingCoin[] = data?.coins?.slice(0, 6) || [];

  if (isLoading) {
    return (
      <div className="glass-card rounded-2xl p-6 animate-fade-in" style={{ animationDelay: '0.25s' }}>
        <div className="flex items-center gap-2 mb-4">
          <Flame className="w-5 h-5 text-warning" />
          <h2 className="text-xl font-display font-semibold">Trending</h2>
        </div>
        <div className="space-y-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50 animate-pulse">
              <div className="w-8 h-8 rounded-full bg-muted" />
              <div className="flex-1">
                <div className="h-4 bg-muted rounded w-24 mb-1" />
                <div className="h-3 bg-muted rounded w-16" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-2xl p-6 animate-fade-in" style={{ animationDelay: '0.25s' }}>
      <div className="flex items-center gap-2 mb-4">
        <Flame className="w-5 h-5 text-warning" />
        <h2 className="text-xl font-display font-semibold">Trending</h2>
      </div>
      <div className="space-y-3">
        {trendingCoins.map((coin, index) => {
          const priceChange = coin.item.data?.price_change_percentage_24h?.usd;
          const isPositive = priceChange !== undefined && priceChange >= 0;
          
          return (
            <div
              key={coin.item.id}
              onClick={() => navigate(`/coin/${coin.item.id}`)}
              className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors cursor-pointer"
            >
              <span className="text-sm text-muted-foreground w-5">#{index + 1}</span>
              <img
                src={coin.item.thumb}
                alt={coin.item.name}
                className="w-8 h-8 rounded-full"
              />
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{coin.item.name}</p>
                <p className="text-sm text-muted-foreground uppercase">{coin.item.symbol}</p>
              </div>
              {priceChange !== undefined && (
                <div className={`flex items-center gap-1 text-sm ${isPositive ? 'text-success' : 'text-destructive'}`}>
                  <TrendingUp className={`w-3 h-3 ${!isPositive && 'rotate-180'}`} />
                  {Math.abs(priceChange).toFixed(2)}%
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TrendingCoins;
