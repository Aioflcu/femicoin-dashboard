import { useQuery } from '@tanstack/react-query';
import { Award, TrendingUp, TrendingDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { fetchWithApiKey } from '@/lib/coingecko';

interface Gainer {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
}

const fetchTopMovers = async (): Promise<Gainer[]> => {
  const data = await fetchWithApiKey(
    'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=percent_change_24h&per_page=50&page=1&sparkline=false&price_change_percentage=24h'
  );
  return data;
};

const TopGainersLosers = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useQuery({
    queryKey: ['topMovers'],
    queryFn: fetchTopMovers,
    refetchInterval: 60000,
    staleTime: 30000,
  });

  const gainers = data?.filter(c => c.price_change_percentage_24h > 0)
    .sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h)
    .slice(0, 5) || [];
    
  const losers = data?.filter(c => c.price_change_percentage_24h < 0)
    .sort((a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h)
    .slice(0, 5) || [];

  if (isLoading) {
    return (
      <div className="glass-card rounded-2xl p-6 animate-fade-in" style={{ animationDelay: '0.3s' }}>
        <div className="flex items-center gap-2 mb-4">
          <Award className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-display font-semibold">Top Movers</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-12 bg-secondary/50 rounded-xl animate-pulse" />
            ))}
          </div>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-12 bg-secondary/50 rounded-xl animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-2xl p-6 animate-fade-in" style={{ animationDelay: '0.3s' }}>
      <div className="flex items-center gap-2 mb-4">
        <Award className="w-5 h-5 text-primary" />
        <h2 className="text-xl font-display font-semibold">Top Movers</h2>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        {/* Gainers */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-4 h-4 text-success" />
            <h3 className="font-medium text-success">Top Gainers</h3>
          </div>
          <div className="space-y-2">
            {gainers.map((coin) => (
              <div
                key={coin.id}
                onClick={() => navigate(`/coin/${coin.id}`)}
                className="flex items-center gap-3 p-2 rounded-lg bg-success/5 hover:bg-success/10 transition-colors cursor-pointer"
              >
                <img src={coin.image} alt={coin.name} className="w-6 h-6 rounded-full" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{coin.name}</p>
                </div>
                <span className="text-sm text-success font-medium">
                  +{coin.price_change_percentage_24h.toFixed(2)}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Losers */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <TrendingDown className="w-4 h-4 text-destructive" />
            <h3 className="font-medium text-destructive">Top Losers</h3>
          </div>
          <div className="space-y-2">
            {losers.map((coin) => (
              <div
                key={coin.id}
                onClick={() => navigate(`/coin/${coin.id}`)}
                className="flex items-center gap-3 p-2 rounded-lg bg-destructive/5 hover:bg-destructive/10 transition-colors cursor-pointer"
              >
                <img src={coin.image} alt={coin.name} className="w-6 h-6 rounded-full" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{coin.name}</p>
                </div>
                <span className="text-sm text-destructive font-medium">
                  {coin.price_change_percentage_24h.toFixed(2)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopGainersLosers;
