import { useQuery } from '@tanstack/react-query';
import { ExternalLink, RefreshCw } from 'lucide-react';
import { fetchWithApiKey } from '@/lib/coingecko';

interface NewsItem {
  id: string;
  title: string;
  description: string;
  url: string;
  thumb_2x: string;
  news_site: string;
  updated_at: string;
}

interface TrendingCoin {
  item: {
    id: string;
    name: string;
    symbol: string;
    thumb: string;
    data: {
      price_change_percentage_24h?: { usd?: number };
    };
  };
}

const fetchCryptoNews = async (): Promise<NewsItem[]> => {
  try {
    // Fetch trending coins as "news" since CoinGecko's news API is limited
    const trending = await fetchWithApiKey('https://api.coingecko.com/api/v3/search/trending');
    
    // Transform trending data into news-like format
    const trendingCoins = trending.coins?.slice(0, 4) || [];
    
    const newsItems: NewsItem[] = trendingCoins.map((coin: TrendingCoin, index: number) => ({
      id: `trending-${index}`,
      title: `${coin.item.name} (${coin.item.symbol.toUpperCase()}) is Trending`,
      description: `${coin.item.name} is currently trending on CoinGecko with ${
        coin.item.data?.price_change_percentage_24h?.usd 
          ? `${coin.item.data.price_change_percentage_24h.usd.toFixed(2)}% 24h change`
          : 'high trading volume'
      }. Stay updated with the latest market movements.`,
      url: `https://www.coingecko.com/en/coins/${coin.item.id}`,
      thumb_2x: coin.item.thumb,
      news_site: 'CoinGecko Trending',
      updated_at: new Date().toISOString(),
    }));

    return newsItems;
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
};

const NewsSection = () => {
  const { data: newsItems, isLoading, refetch, dataUpdatedAt } = useQuery({
    queryKey: ['cryptoNews'],
    queryFn: fetchCryptoNews,
    refetchInterval: 30 * 60 * 1000, // Refetch every 30 minutes
    staleTime: 15 * 60 * 1000, // Consider stale after 15 minutes
  });

  const formatTimestamp = (date: string) => {
    const now = new Date();
    const updated = new Date(date);
    const diffMs = now.getTime() - updated.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 60) return `${diffMins} min ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours} hours ago`;
    return `${Math.floor(diffHours / 24)} days ago`;
  };

  return (
    <div className="glass-card rounded-2xl p-6 animate-fade-in" style={{ animationDelay: '0.4s' }}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-display font-semibold">Trending & News</h2>
          {dataUpdatedAt && (
            <span className="text-xs text-muted-foreground">
              Updated {formatTimestamp(new Date(dataUpdatedAt).toISOString())}
            </span>
          )}
        </div>
        <button 
          onClick={() => refetch()}
          className="text-sm text-primary hover:underline flex items-center gap-1"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </button>
      </div>

      {isLoading ? (
        <div className="grid sm:grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="rounded-xl overflow-hidden bg-secondary/50 animate-pulse">
              <div className="aspect-video bg-muted" />
              <div className="p-4 space-y-2">
                <div className="h-4 bg-muted rounded w-3/4" />
                <div className="h-3 bg-muted rounded w-full" />
                <div className="h-3 bg-muted rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {newsItems?.map((news) => (
            <a
              key={news.id}
              href={news.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-xl overflow-hidden bg-secondary/50 hover:bg-secondary transition-all cursor-pointer"
            >
              <div className="aspect-video overflow-hidden bg-gradient-to-br from-primary/20 to-warning/20 flex items-center justify-center">
                <img
                  src={news.thumb_2x}
                  alt={news.title}
                  className="w-24 h-24 object-contain group-hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
              <div className="p-4">
                <h3 className="font-medium mb-2 line-clamp-2 group-hover:text-primary transition-colors flex items-center gap-2">
                  {news.title}
                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                  {news.description}
                </p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{news.news_site}</span>
                  <span>{formatTimestamp(news.updated_at)}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default NewsSection;
