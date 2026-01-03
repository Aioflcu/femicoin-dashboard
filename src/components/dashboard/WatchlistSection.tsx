import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useWatchlist } from '@/contexts/WatchlistContext';
import { Star, TrendingDown, TrendingUp } from 'lucide-react';

interface CoinData {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
}

const fetchWatchlistCoins = async (ids: string[]): Promise<CoinData[]> => {
  if (ids.length === 0) return [];
  const response = await fetch(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${ids.join(',')}&order=market_cap_desc&sparkline=false`
  );
  if (!response.ok) throw new Error('Failed to fetch watchlist');
  return response.json();
};

const WatchlistSection = () => {
  const { watchlist, toggleWatchlist } = useWatchlist();
  const navigate = useNavigate();

  const { data: coins, isLoading } = useQuery({
    queryKey: ['watchlistCoins', watchlist],
    queryFn: () => fetchWatchlistCoins(watchlist),
    enabled: watchlist.length > 0,
    refetchInterval: 60000,
  });

  if (watchlist.length === 0) {
    return (
      <div className="glass-card rounded-2xl p-6 animate-fade-in">
        <h2 className="text-xl font-display font-semibold mb-4">Watchlist</h2>
        <div className="text-center py-8">
          <Star className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
          <p className="text-muted-foreground">No coins in your watchlist yet.</p>
          <p className="text-sm text-muted-foreground mt-1">Click the star icon on any coin to add it.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-2xl p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-display font-semibold">Watchlist</h2>
        <span className="text-sm text-muted-foreground">{watchlist.length} coins</span>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="p-4 rounded-xl bg-secondary/50">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full shimmer" />
                <div className="h-4 w-16 shimmer rounded" />
              </div>
              <div className="h-5 w-20 shimmer rounded" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {coins?.map((coin) => {
            const isPositive = coin.price_change_percentage_24h >= 0;
            return (
              <div
                key={coin.id}
                onClick={() => navigate(`/coin/${coin.id}`)}
                className="p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors cursor-pointer group relative"
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWatchlist(coin.id);
                  }}
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Star className="w-4 h-4 fill-primary text-primary" />
                </button>
                <div className="flex items-center gap-3 mb-2">
                  <img src={coin.image} alt={coin.name} className="w-8 h-8 rounded-full" />
                  <div>
                    <p className="font-medium text-sm">{coin.symbol.toUpperCase()}</p>
                    <p className="text-xs text-muted-foreground truncate max-w-[80px]">{coin.name}</p>
                  </div>
                </div>
                <p className="font-semibold">${coin.current_price.toLocaleString()}</p>
                <p className={`text-sm flex items-center gap-1 ${isPositive ? 'text-success' : 'text-destructive'}`}>
                  {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default WatchlistSection;
