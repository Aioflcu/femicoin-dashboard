import { useQuery } from '@tanstack/react-query';
import { Search, TrendingDown, TrendingUp } from 'lucide-react';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

interface CoinData {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  sparkline_in_7d: { price: number[] };
}

const fetchTopCryptos = async (): Promise<CoinData[]> => {
  const response = await fetch(
    'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=true&price_change_percentage=24h'
  );
  if (!response.ok) throw new Error('Failed to fetch crypto data');
  return response.json();
};

const searchCryptos = async (query: string): Promise<CoinData[]> => {
  if (!query) return [];
  const response = await fetch(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${query.toLowerCase()}&sparkline=true`
  );
  if (!response.ok) return [];
  return response.json();
};

const TopCryptos = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const { data: topCryptos, isLoading } = useQuery({
    queryKey: ['topCryptos'],
    queryFn: fetchTopCryptos,
    refetchInterval: 60000,
    staleTime: 30000,
  });

  const { data: searchResults } = useQuery({
    queryKey: ['searchCryptos', searchQuery],
    queryFn: () => searchCryptos(searchQuery),
    enabled: searchQuery.length > 2,
  });

  const displayData = searchQuery.length > 2 ? searchResults : topCryptos;

  const MiniChart = ({ data, positive }: { data: number[]; positive: boolean }) => {
    const chartData = data.slice(-24).map((price, i) => ({ value: price, index: i }));
    return (
      <div className="w-20 h-8">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <Line
              type="monotone"
              dataKey="value"
              stroke={positive ? 'hsl(var(--success))' : 'hsl(var(--destructive))'}
              strokeWidth={1.5}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  };

  return (
    <div className="glass-card rounded-2xl p-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-xl font-display font-semibold">Live Prices</h2>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search tokens..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center gap-4 p-3 rounded-xl">
              <div className="w-10 h-10 rounded-full shimmer" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-24 shimmer rounded" />
                <div className="h-3 w-16 shimmer rounded" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-muted-foreground border-b border-border">
                <th className="pb-3 font-medium">#</th>
                <th className="pb-3 font-medium">Coin</th>
                <th className="pb-3 font-medium text-right">Price</th>
                <th className="pb-3 font-medium text-right">24h Change</th>
                <th className="pb-3 font-medium text-right hidden md:table-cell">7d Chart</th>
              </tr>
            </thead>
            <tbody>
              {displayData?.map((coin, index) => {
                const isPositive = coin.price_change_percentage_24h >= 0;
                return (
                  <tr
                    key={coin.id}
                    className="border-b border-border/50 hover:bg-secondary/50 transition-colors"
                  >
                    <td className="py-4 text-muted-foreground">{index + 1}</td>
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={coin.image}
                          alt={coin.name}
                          className="w-8 h-8 rounded-full"
                        />
                        <div>
                          <p className="font-medium">{coin.name}</p>
                          <p className="text-sm text-muted-foreground uppercase">{coin.symbol}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 text-right font-medium">
                      ${coin.current_price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td className="py-4 text-right">
                      <span
                        className={`inline-flex items-center gap-1 font-medium ${
                          isPositive ? 'text-success' : 'text-destructive'
                        }`}
                      >
                        {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                        {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
                      </span>
                    </td>
                    <td className="py-4 hidden md:table-cell">
                      <div className="flex justify-end">
                        <MiniChart data={coin.sparkline_in_7d?.price || []} positive={isPositive} />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TopCryptos;
