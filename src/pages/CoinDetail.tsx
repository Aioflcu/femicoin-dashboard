import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/contexts/AuthContext';
import { useWatchlist } from '@/contexts/WatchlistContext';
import Header from '@/components/dashboard/Header';
import Footer from '@/components/dashboard/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Star, TrendingUp, TrendingDown, ExternalLink } from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

interface CoinDetailData {
  id: string;
  name: string;
  symbol: string;
  image: { large: string };
  market_cap_rank: number;
  market_data: {
    current_price: { usd: number };
    market_cap: { usd: number };
    total_volume: { usd: number };
    high_24h: { usd: number };
    low_24h: { usd: number };
    price_change_percentage_24h: number;
    price_change_percentage_7d: number;
    price_change_percentage_30d: number;
    circulating_supply: number;
    total_supply: number;
    ath: { usd: number };
    atl: { usd: number };
  };
  description: { en: string };
  links: {
    homepage: string[];
    blockchain_site: string[];
  };
}

interface PriceHistoryData {
  prices: [number, number][];
}

const timeRanges = [
  { label: '24H', days: 1 },
  { label: '7D', days: 7 },
  { label: '30D', days: 30 },
  { label: '90D', days: 90 },
  { label: '1Y', days: 365 },
];

const fetchCoinDetail = async (coinId: string): Promise<CoinDetailData> => {
  const response = await fetch(
    `https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=false&community_data=false&developer_data=false`
  );
  if (!response.ok) throw new Error('Failed to fetch coin data');
  return response.json();
};

const fetchPriceHistory = async (coinId: string, days: number): Promise<PriceHistoryData> => {
  const response = await fetch(
    `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${days}`
  );
  if (!response.ok) throw new Error('Failed to fetch price history');
  return response.json();
};

const formatNumber = (num: number, compact = false) => {
  if (compact) {
    if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`;
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
  }
  return `$${num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

const CoinDetail = () => {
  const { coinId } = useParams<{ coinId: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { isInWatchlist, toggleWatchlist } = useWatchlist();
  const [selectedRange, setSelectedRange] = useState(7);
  
  const isWatched = coinId ? isInWatchlist(coinId) : false;

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const { data: coin, isLoading: coinLoading } = useQuery({
    queryKey: ['coinDetail', coinId],
    queryFn: () => fetchCoinDetail(coinId!),
    enabled: !!coinId,
  });

  const { data: priceHistory, isLoading: historyLoading } = useQuery({
    queryKey: ['priceHistory', coinId, selectedRange],
    queryFn: () => fetchPriceHistory(coinId!, selectedRange),
    enabled: !!coinId,
  });

  if (!isAuthenticated) return null;

  const chartData = priceHistory?.prices.map(([timestamp, price]) => ({
    time: new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: selectedRange === 1 ? '2-digit' : undefined,
    }),
    price,
  })) || [];

  const isPositive = (coin?.market_data.price_change_percentage_24h || 0) >= 0;

  const StatCard = ({ label, value, subValue }: { label: string; value: string; subValue?: string }) => (
    <div className="p-4 rounded-xl bg-secondary/50">
      <p className="text-sm text-muted-foreground mb-1">{label}</p>
      <p className="text-lg font-semibold">{value}</p>
      {subValue && <p className="text-xs text-muted-foreground">{subValue}</p>}
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container py-6 px-4">
        <Button
          variant="ghost"
          onClick={() => navigate('/dashboard')}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>

        {coinLoading ? (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full shimmer" />
              <div className="space-y-2">
                <div className="h-8 w-48 shimmer rounded" />
                <div className="h-4 w-24 shimmer rounded" />
              </div>
            </div>
            <div className="h-80 shimmer rounded-2xl" />
          </div>
        ) : coin ? (
          <div className="space-y-6">
            {/* Header */}
            <div className="glass-card rounded-2xl p-6 animate-fade-in">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <img
                    src={coin.image.large}
                    alt={coin.name}
                    className="w-16 h-16 rounded-full"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h1 className="text-3xl font-display font-bold">{coin.name}</h1>
                      <span className="text-lg text-muted-foreground uppercase">{coin.symbol}</span>
                      <span className="px-2 py-0.5 text-xs bg-secondary rounded-full">
                        Rank #{coin.market_cap_rank}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-2xl font-bold">
                        {formatNumber(coin.market_data.current_price.usd)}
                      </span>
                      <span
                        className={`flex items-center gap-1 font-medium ${
                          isPositive ? 'text-success' : 'text-destructive'
                        }`}
                      >
                        {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                        {Math.abs(coin.market_data.price_change_percentage_24h).toFixed(2)}%
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant={isWatched ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => coinId && toggleWatchlist(coinId)}
                    className={isWatched ? 'bg-primary' : ''}
                  >
                    <Star className={`w-4 h-4 mr-1 ${isWatched ? 'fill-current' : ''}`} />
                    {isWatched ? 'Watching' : 'Watch'}
                  </Button>
                  {coin.links.homepage[0] && (
                    <Button variant="outline" size="sm" asChild>
                      <a href={coin.links.homepage[0]} target="_blank" rel="noopener noreferrer">
                        Website <ExternalLink className="w-4 h-4 ml-1" />
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* Price Chart */}
            <div className="glass-card rounded-2xl p-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <h2 className="text-xl font-display font-semibold">Price Chart</h2>
                <div className="flex gap-2">
                  {timeRanges.map((range) => (
                    <Button
                      key={range.days}
                      variant={selectedRange === range.days ? 'default' : 'secondary'}
                      size="sm"
                      onClick={() => setSelectedRange(range.days)}
                    >
                      {range.label}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="h-80">
                {historyLoading ? (
                  <div className="w-full h-full shimmer rounded-xl" />
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                      <defs>
                        <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop
                            offset="5%"
                            stopColor={isPositive ? 'hsl(var(--success))' : 'hsl(var(--destructive))'}
                            stopOpacity={0.3}
                          />
                          <stop
                            offset="95%"
                            stopColor={isPositive ? 'hsl(var(--success))' : 'hsl(var(--destructive))'}
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis
                        dataKey="time"
                        stroke="hsl(var(--muted-foreground))"
                        tick={{ fontSize: 12 }}
                        tickLine={false}
                      />
                      <YAxis
                        stroke="hsl(var(--muted-foreground))"
                        tick={{ fontSize: 12 }}
                        tickLine={false}
                        tickFormatter={(value) => `$${value.toLocaleString()}`}
                        domain={['auto', 'auto']}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'hsl(var(--popover))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '0.75rem',
                        }}
                        labelStyle={{ color: 'hsl(var(--foreground))' }}
                        formatter={(value: number) => [formatNumber(value), 'Price']}
                      />
                      <Area
                        type="monotone"
                        dataKey="price"
                        stroke={isPositive ? 'hsl(var(--success))' : 'hsl(var(--destructive))'}
                        strokeWidth={2}
                        fill="url(#priceGradient)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>

            {/* Market Stats */}
            <div className="glass-card rounded-2xl p-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <h2 className="text-xl font-display font-semibold mb-4">Market Statistics</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard
                  label="Market Cap"
                  value={formatNumber(coin.market_data.market_cap.usd, true)}
                />
                <StatCard
                  label="24h Volume"
                  value={formatNumber(coin.market_data.total_volume.usd, true)}
                />
                <StatCard
                  label="24h High"
                  value={formatNumber(coin.market_data.high_24h.usd)}
                />
                <StatCard
                  label="24h Low"
                  value={formatNumber(coin.market_data.low_24h.usd)}
                />
                <StatCard
                  label="7d Change"
                  value={`${coin.market_data.price_change_percentage_7d >= 0 ? '+' : ''}${coin.market_data.price_change_percentage_7d.toFixed(2)}%`}
                />
                <StatCard
                  label="30d Change"
                  value={`${coin.market_data.price_change_percentage_30d >= 0 ? '+' : ''}${coin.market_data.price_change_percentage_30d.toFixed(2)}%`}
                />
                <StatCard
                  label="All Time High"
                  value={formatNumber(coin.market_data.ath.usd)}
                />
                <StatCard
                  label="All Time Low"
                  value={formatNumber(coin.market_data.atl.usd)}
                />
                <StatCard
                  label="Circulating Supply"
                  value={`${coin.market_data.circulating_supply.toLocaleString()} ${coin.symbol.toUpperCase()}`}
                />
                <StatCard
                  label="Total Supply"
                  value={coin.market_data.total_supply ? `${coin.market_data.total_supply.toLocaleString()} ${coin.symbol.toUpperCase()}` : 'Unlimited'}
                />
              </div>
            </div>

            {/* About */}
            {coin.description.en && (
              <div className="glass-card rounded-2xl p-6 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <h2 className="text-xl font-display font-semibold mb-4">About {coin.name}</h2>
                <div
                  className="prose prose-invert max-w-none text-muted-foreground"
                  dangerouslySetInnerHTML={{
                    __html: coin.description.en.split('. ').slice(0, 5).join('. ') + '.',
                  }}
                />
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Coin not found</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default CoinDetail;
