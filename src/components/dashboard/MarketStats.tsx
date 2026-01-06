import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
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

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.4,
    },
  }),
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
      color: 'from-primary/20 to-warning/20',
    },
    {
      label: '24h Volume',
      value: formatNumber(data.data.total_volume.usd),
      icon: BarChart3,
      color: 'from-blue-500/20 to-cyan-500/20',
    },
    {
      label: 'BTC Dominance',
      value: `${data.data.market_cap_percentage.btc.toFixed(1)}%`,
      icon: Coins,
      color: 'from-orange-500/20 to-yellow-500/20',
    },
    {
      label: 'Active Cryptos',
      value: data.data.active_cryptocurrencies.toLocaleString(),
      icon: Activity,
      color: 'from-purple-500/20 to-pink-500/20',
    },
  ] : [];

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card rounded-2xl p-6"
      >
        <h2 className="text-xl font-display font-semibold mb-4">Market Overview</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-secondary/50 rounded-xl p-4 animate-pulse">
              <div className="h-4 bg-muted rounded w-1/2 mb-2" />
              <div className="h-6 bg-muted rounded w-3/4" />
            </div>
          ))}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-2xl p-6"
    >
      <h2 className="text-xl font-display font-semibold mb-4 flex items-center gap-2">
        <BarChart3 className="w-5 h-5 text-primary" />
        Market Overview
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            custom={index}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.02, y: -4 }}
            className={`relative overflow-hidden bg-gradient-to-br ${stat.color} rounded-xl p-4 border border-border/50 group cursor-pointer transition-shadow hover:shadow-lg`}
          >
            {/* Animated shine effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full"
              animate={{
                translateX: ['100%', '-100%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatDelay: 2,
                ease: 'linear',
              }}
            />
            
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-2">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <stat.icon className="w-4 h-4 text-primary" />
                </motion.div>
                <span className="text-sm text-muted-foreground">{stat.label}</span>
              </div>
              <motion.p
                className="text-lg font-display font-bold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                {stat.value}
              </motion.p>
              {stat.change !== undefined && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className={`flex items-center gap-1 text-sm mt-1 ${stat.change >= 0 ? 'text-success' : 'text-destructive'}`}
                >
                  {stat.change >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {stat.change >= 0 ? '+' : ''}{stat.change.toFixed(2)}%
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default MarketStats;
