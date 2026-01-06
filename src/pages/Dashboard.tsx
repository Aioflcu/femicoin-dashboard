import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/dashboard/Header';
import WalletOverview from '@/components/dashboard/WalletOverview';
import PortfolioChart from '@/components/dashboard/PortfolioChart';
import TopCryptos from '@/components/dashboard/TopCryptos';
import QuickActions from '@/components/dashboard/QuickActions';
import TransactionHistory from '@/components/dashboard/TransactionHistory';
import WatchlistSection from '@/components/dashboard/WatchlistSection';
import NewsSection from '@/components/dashboard/NewsSection';
import MarketStats from '@/components/dashboard/MarketStats';
import TrendingCoins from '@/components/dashboard/TrendingCoins';
import TopGainersLosers from '@/components/dashboard/TopGainersLosers';
import Footer from '@/components/dashboard/Footer';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const Dashboard = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background via-background to-background/95 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-primary/5 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute top-1/2 -left-40 w-80 h-80 rounded-full bg-success/5 blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-72 h-72 rounded-full bg-warning/5 blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>
      
      <Header />
      
      <motion.main
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex-1 container py-6 px-4 space-y-6 relative z-10"
      >
        {/* Top Row: Wallet Overview + Quick Actions */}
        <motion.div variants={itemVariants} className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <WalletOverview />
          </div>
          <div>
            <QuickActions />
          </div>
        </motion.div>

        {/* Portfolio Performance Chart */}
        <motion.div variants={itemVariants}>
          <PortfolioChart />
        </motion.div>

        {/* Market Overview */}
        <motion.div variants={itemVariants}>
          <MarketStats />
        </motion.div>

        {/* Watchlist */}
        <motion.div variants={itemVariants}>
          <WatchlistSection />
        </motion.div>

        {/* Middle Row: Top Cryptos + Trending */}
        <motion.div variants={itemVariants} className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <TopCryptos />
          </div>
          <div>
            <TrendingCoins />
          </div>
        </motion.div>

        {/* Top Movers */}
        <motion.div variants={itemVariants}>
          <TopGainersLosers />
        </motion.div>

        {/* Transactions + News */}
        <motion.div variants={itemVariants} className="grid lg:grid-cols-2 gap-6">
          <TransactionHistory />
          <NewsSection />
        </motion.div>
      </motion.main>

      <Footer />
    </div>
  );
};

export default Dashboard;
