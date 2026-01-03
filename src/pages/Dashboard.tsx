import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/dashboard/Header';
import WalletOverview from '@/components/dashboard/WalletOverview';
import TopCryptos from '@/components/dashboard/TopCryptos';
import QuickActions from '@/components/dashboard/QuickActions';
import TransactionHistory from '@/components/dashboard/TransactionHistory';
import WatchlistSection from '@/components/dashboard/WatchlistSection';
import NewsSection from '@/components/dashboard/NewsSection';
import Footer from '@/components/dashboard/Footer';

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
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container py-6 px-4 space-y-6">
        {/* Top Row: Wallet Overview + Quick Actions */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <WalletOverview />
          </div>
          <div>
            <QuickActions />
          </div>
        </div>

        {/* Watchlist */}
        <WatchlistSection />
        {/* Middle Row: Top Cryptos + Transactions */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <TopCryptos />
          </div>
          <div>
            <TransactionHistory />
          </div>
        </div>

        {/* Bottom Row: News */}
        <NewsSection />
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
