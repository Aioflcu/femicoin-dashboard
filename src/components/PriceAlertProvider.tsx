import { useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { useSettings } from '@/contexts/SettingsContext';

interface CoinPrice {
  id: string;
  name: string;
  price_change_percentage_24h: number;
}

const ALERT_COOLDOWN = 300000; // 5 minutes between alerts for same coin

const fetchPriceAlerts = async (): Promise<CoinPrice[]> => {
  const response = await fetch(
    'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum&order=market_cap_desc&per_page=2&page=1'
  );
  if (!response.ok) throw new Error('Failed to fetch prices');
  return response.json();
};

const PriceAlertProvider = ({ children }: { children: React.ReactNode }) => {
  const lastAlertTime = useRef<Record<string, number>>({});
  const { settings } = useSettings();

  const { data: prices } = useQuery({
    queryKey: ['priceAlerts'],
    queryFn: fetchPriceAlerts,
    refetchInterval: 60000, // Check every minute
    staleTime: 30000,
    enabled: settings.priceAlerts && settings.notificationsEnabled,
  });

  useEffect(() => {
    if (!prices || !settings.priceAlerts || !settings.notificationsEnabled) return;

    prices.forEach((coin) => {
      const absChange = Math.abs(coin.price_change_percentage_24h);
      const lastAlert = lastAlertTime.current[coin.id] || 0;
      const now = Date.now();

      if (absChange >= settings.alertThreshold && now - lastAlert > ALERT_COOLDOWN) {
        const isUp = coin.price_change_percentage_24h > 0;
        
        toast({
          title: (
            <div className="flex items-center gap-2">
              {isUp ? (
                <TrendingUp className="w-5 h-5 text-success" />
              ) : (
                <TrendingDown className="w-5 h-5 text-destructive" />
              )}
              <span>{coin.name} Price Alert!</span>
            </div>
          ) as unknown as string,
          description: `${coin.name} has ${isUp ? 'increased' : 'decreased'} by ${absChange.toFixed(2)}% in the last 24 hours.`,
          duration: 8000,
        });

        lastAlertTime.current[coin.id] = now;
      }
    });
  }, [prices, settings.alertThreshold, settings.priceAlerts, settings.notificationsEnabled]);

  return <>{children}</>;
};

export default PriceAlertProvider;
