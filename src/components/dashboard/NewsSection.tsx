import { ExternalLink } from 'lucide-react';

const newsItems = [
  {
    id: '1',
    title: 'Bitcoin Surges Past $70K as Institutional Interest Grows',
    description: 'Major financial institutions continue to accumulate Bitcoin as the leading cryptocurrency shows strong momentum.',
    image: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=400&h=250&fit=crop',
    source: 'CryptoNews',
    timestamp: '2 hours ago',
  },
  {
    id: '2',
    title: 'Ethereum 2.0 Upgrade Shows Promising Results',
    description: 'Network throughput has increased significantly following the latest protocol improvements.',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=250&fit=crop',
    source: 'BlockchainDaily',
    timestamp: '4 hours ago',
  },
  {
    id: '3',
    title: 'DeFi Total Value Locked Reaches New Highs',
    description: 'Decentralized finance protocols are seeing record inflows as users seek yield opportunities.',
    image: 'https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=400&h=250&fit=crop',
    source: 'DeFi Pulse',
    timestamp: '6 hours ago',
  },
  {
    id: '4',
    title: 'New Regulations Could Impact Crypto Exchanges',
    description: 'Regulatory bodies worldwide are working on comprehensive frameworks for digital assets.',
    image: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=400&h=250&fit=crop',
    source: 'CoinReport',
    timestamp: '8 hours ago',
  },
];

const NewsSection = () => {
  return (
    <div className="glass-card rounded-2xl p-6 animate-fade-in" style={{ animationDelay: '0.4s' }}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-display font-semibold">News & Updates</h2>
        <button className="text-sm text-primary hover:underline flex items-center gap-1">
          View All <ExternalLink className="w-4 h-4" />
        </button>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {newsItems.map((news) => (
          <article
            key={news.id}
            className="group rounded-xl overflow-hidden bg-secondary/50 hover:bg-secondary transition-all cursor-pointer"
          >
            <div className="aspect-video overflow-hidden">
              <img
                src={news.image}
                alt={news.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4">
              <h3 className="font-medium mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                {news.title}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                {news.description}
              </p>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{news.source}</span>
                <span>{news.timestamp}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default NewsSection;
