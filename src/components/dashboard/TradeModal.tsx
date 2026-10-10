import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useWallet } from '@/contexts/WalletContext';
import { useToast } from '@/hooks/use-toast';
import { TrendingUp, TrendingDown, ArrowRightLeft, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { fetchWithApiKey } from '@/lib/coingecko';

interface TradeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultTab?: 'buy' | 'sell' | 'swap';
}

interface CoinPrice {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  image: string;
  price_change_percentage_24h: number;
}

const TradeModal = ({ open, onOpenChange, defaultTab = 'buy' }: TradeModalProps) => {
  const { balances, executeTrade } = useWallet();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [selectedCoin, setSelectedCoin] = useState('');
  const [swapFromCoin, setSwapFromCoin] = useState('');
  const [swapToCoin, setSwapToCoin] = useState('');
  const [amount, setAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [tradeStatus, setTradeStatus] = useState<'idle' | 'processing' | 'confirming' | 'success' | 'error'>('idle');

  const { data: prices } = useQuery<CoinPrice[]>({
    queryKey: ['trade-prices'],
    queryFn: async () => {
      const response = await fetchWithApiKey(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1'
      );
      return response.json();
    },
    refetchInterval: 10000,
  });

  useEffect(() => {
    if (defaultTab) {
      setActiveTab(defaultTab);
    }
  }, [defaultTab]);

  const getSelectedCoinPrice = (coinSymbol: string) => {
    if (!prices) return 0;
    const coin = prices.find(p => p.symbol.toUpperCase() === coinSymbol.toUpperCase());
    return coin?.current_price || 0;
  };

  const getSelectedCoinData = (coinSymbol: string) => {
    if (!prices) return null;
    return prices.find(p => p.symbol.toUpperCase() === coinSymbol.toUpperCase());
  };

  const calculateTotal = () => {
    const price = getSelectedCoinPrice(selectedCoin);
    return parseFloat(amount || '0') * price;
  };

  const getMaxAmount = (coinSymbol: string) => {
    const balance = balances.find(b => b.symbol === coinSymbol);
    return balance?.amount || 0;
  };

  const resetForm = () => {
    setAmount('');
    setSelectedCoin('');
    setSwapFromCoin('');
    setSwapToCoin('');
    setTradeStatus('idle');
  };

  const processTrade = async () => {
    setIsProcessing(true);
    setTradeStatus('processing');

    await new Promise(resolve => setTimeout(resolve, 1500));
    setTradeStatus('confirming');

    await new Promise(resolve => setTimeout(resolve, 1200));

    const isSuccess = Math.random() > 0.05;

    if (isSuccess) {
      setTradeStatus('success');
      return true;
    } else {
      setTradeStatus('error');
      return false;
    }
  };

  const handleBuy = async () => {
    if (!selectedCoin || !amount || parseFloat(amount) <= 0) {
      toast({ title: 'Error', description: 'Please enter a valid amount', variant: 'destructive' });
      return;
    }

    const total = calculateTotal();
    const usdtBalance = balances.find(b => b.symbol === 'USDT');

    if (!usdtBalance || usdtBalance.amount < total) {
      toast({ title: 'Insufficient Balance', description: 'Not enough USDT to complete this purchase', variant: 'destructive' });
      return;
    }

    const success = await processTrade();

    if (success) {
      const price = getSelectedCoinPrice(selectedCoin);
      const coinData = getSelectedCoinData(selectedCoin);
      executeTrade('buy', selectedCoin, parseFloat(amount), price, coinData?.name || selectedCoin, coinData?.image || '');

      toast({
        title: 'Trade Complete!',
        description: `Bought ${amount} ${selectedCoin} for $${total.toFixed(2)}`,
      });

      setTimeout(() => {
        setIsProcessing(false);
        resetForm();
        onOpenChange(false);
      }, 1500);
    } else {
      toast({ title: 'Trade Failed', description: 'Network error. Please try again.', variant: 'destructive' });
      setIsProcessing(false);
    }
  };

  const handleSell = async () => {
    if (!selectedCoin || !amount || parseFloat(amount) <= 0) {
      toast({ title: 'Error', description: 'Please enter a valid amount', variant: 'destructive' });
      return;
    }

    const balance = balances.find(b => b.symbol === selectedCoin);
    if (!balance || balance.amount < parseFloat(amount)) {
      toast({ title: 'Insufficient Balance', description: `Not enough ${selectedCoin} to sell`, variant: 'destructive' });
      return;
    }

    const success = await processTrade();

    if (success) {
      const price = getSelectedCoinPrice(selectedCoin);
      const total = parseFloat(amount) * price;
      const coinData = getSelectedCoinData(selectedCoin);
      executeTrade('sell', selectedCoin, parseFloat(amount), price, coinData?.name || selectedCoin, coinData?.image || '');

      toast({
        title: 'Trade Complete!',
        description: `Sold ${amount} ${selectedCoin} for $${total.toFixed(2)}`,
      });

      setTimeout(() => {
        setIsProcessing(false);
        resetForm();
        onOpenChange(false);
      }, 1500);
    } else {
      toast({ title: 'Trade Failed', description: 'Network error. Please try again.', variant: 'destructive' });
      setIsProcessing(false);
    }
  };

  const handleSwap = async () => {
    if (!swapFromCoin || !swapToCoin || !amount || parseFloat(amount) <= 0) {
      toast({ title: 'Error', description: 'Please fill all fields', variant: 'destructive' });
      return;
    }

    if (swapFromCoin === swapToCoin) {
      toast({ title: 'Error', description: 'Cannot swap same coins', variant: 'destructive' });
      return;
    }

    const balance = balances.find(b => b.symbol === swapFromCoin);
    if (!balance || balance.amount < parseFloat(amount)) {
      toast({ title: 'Insufficient Balance', description: `Not enough ${swapFromCoin} to swap`, variant: 'destructive' });
      return;
    }

    const success = await processTrade();

    if (success) {
      const fromPrice = getSelectedCoinPrice(swapFromCoin);
      const toPrice = getSelectedCoinPrice(swapToCoin);
      const usdValue = parseFloat(amount) * fromPrice;
      const toAmount = usdValue / toPrice;
      const toCoinData = getSelectedCoinData(swapToCoin);

      executeTrade('swap', swapFromCoin, parseFloat(amount), fromPrice, `${swapFromCoin} → ${swapToCoin}`, '');
      executeTrade('buy', swapToCoin, toAmount, toPrice, toCoinData?.name || swapToCoin, toCoinData?.image || '');

      toast({
        title: 'Swap Complete!',
        description: `Swapped ${amount} ${swapFromCoin} for ${toAmount.toFixed(6)} ${swapToCoin}`,
      });

      setTimeout(() => {
        setIsProcessing(false);
        resetForm();
        onOpenChange(false);
      }, 1500);
    } else {
      toast({ title: 'Swap Failed', description: 'Network error. Please try again.', variant: 'destructive' });
      setIsProcessing(false);
    }
  };

  const renderTradeStatus = () => (
    <AnimatePresence>
      {isProcessing && (
        <motion.div
          className="absolute inset-0 bg-background/95 backdrop-blur-sm flex flex-col items-center justify-center z-10 rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {tradeStatus === 'processing' && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="flex flex-col items-center gap-4"
            >
              <Loader2 className="w-12 h-12 text-primary animate-spin" />
              <p className="text-lg font-medium">Processing Trade...</p>
              <p className="text-sm text-muted-foreground">Executing order</p>
            </motion.div>
          )}

          {tradeStatus === 'confirming' && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="flex flex-col items-center gap-4"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              >
                <ArrowRightLeft className="w-12 h-12 text-primary" />
              </motion.div>
              <p className="text-lg font-medium">Confirming Transaction...</p>
              <p className="text-sm text-muted-foreground">Updating holdings</p>
            </motion.div>
          )}

          {tradeStatus === 'success' && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="flex flex-col items-center gap-4"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.2, 1] }}
                transition={{ duration: 0.5 }}
              >
                <CheckCircle className="w-16 h-16 text-success" />
              </motion.div>
              <p className="text-lg font-medium text-success">Trade Complete!</p>
              <p className="text-sm text-muted-foreground">Your balance has been updated</p>
            </motion.div>
          )}

          {tradeStatus === 'error' && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="flex flex-col items-center gap-4"
            >
              <AlertCircle className="w-16 h-16 text-destructive" />
              <p className="text-lg font-medium text-destructive">Trade Failed</p>
              <p className="text-sm text-muted-foreground">Please try again</p>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-display">Trade</DialogTitle>
        </DialogHeader>

        <div className="relative">
          {renderTradeStatus()}

          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as typeof activeTab)}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="buy" className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Buy
              </TabsTrigger>
              <TabsTrigger value="sell" className="flex items-center gap-2">
                <TrendingDown className="w-4 h-4" />
                Sell
              </TabsTrigger>
              <TabsTrigger value="swap" className="flex items-center gap-2">
                <ArrowRightLeft className="w-4 h-4" />
                Swap
              </TabsTrigger>
            </TabsList>

            <TabsContent value="buy" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label>Select Coin</Label>
                <Select value={selectedCoin} onValueChange={setSelectedCoin}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a cryptocurrency" />
                  </SelectTrigger>
                  <SelectContent>
                    {prices?.map((coin) => (
                      <SelectItem key={coin.id} value={coin.symbol.toUpperCase()}>
                        <div className="flex items-center gap-2">
                          <img src={coin.image} alt={coin.name} className="w-5 h-5 rounded-full" />
                          <span>{coin.name}</span>
                          <span className="text-muted-foreground">({coin.symbol.toUpperCase()})</span>
                          <span className={coin.price_change_percentage_24h >= 0 ? 'text-success' : 'text-destructive'}>
                            {coin.price_change_percentage_24h?.toFixed(2)}%
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Amount</Label>
                <Input
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
                {selectedCoin && (
                  <p className="text-sm text-muted-foreground">
                    Price: ${getSelectedCoinPrice(selectedCoin).toLocaleString()} per {selectedCoin}
                  </p>
                )}
              </div>

              <div className="p-4 bg-secondary/50 rounded-lg">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Cost</span>
                  <span className="font-bold">${calculateTotal().toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-muted-foreground">Available USDT</span>
                  <span>${balances.find(b => b.symbol === 'USDT')?.amount.toLocaleString() || '0'}</span>
                </div>
              </div>

              <Button
                className="w-full"
                onClick={handleBuy}
                disabled={isProcessing || !selectedCoin || !amount}
              >
                {isProcessing ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                Buy {selectedCoin || 'Crypto'}
              </Button>
            </TabsContent>

            <TabsContent value="sell" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label>Select Coin to Sell</Label>
                <Select value={selectedCoin} onValueChange={setSelectedCoin}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose from your holdings" />
                  </SelectTrigger>
                  <SelectContent>
                    {balances.filter(b => b.symbol !== 'USDT' && b.amount > 0).map((balance) => (
                      <SelectItem key={balance.symbol} value={balance.symbol}>
                        <div className="flex items-center gap-2">
                          <img src={balance.image} alt={balance.coin} className="w-5 h-5 rounded-full" />
                          <span>{balance.coin}</span>
                          <span className="text-muted-foreground">({balance.amount.toFixed(4)} available)</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Amount</Label>
                  {selectedCoin && (
                    <button
                      className="text-xs text-primary hover:underline"
                      onClick={() => setAmount(getMaxAmount(selectedCoin).toString())}
                    >
                      Max: {getMaxAmount(selectedCoin).toFixed(4)}
                    </button>
                  )}
                </div>
                <Input
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>

              <div className="p-4 bg-secondary/50 rounded-lg">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">You'll Receive</span>
                  <span className="font-bold text-success">
                    +${calculateTotal().toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USDT
                  </span>
                </div>
              </div>

              <Button
                className="w-full"
                variant="destructive"
                onClick={handleSell}
                disabled={isProcessing || !selectedCoin || !amount}
              >
                {isProcessing ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                Sell {selectedCoin || 'Crypto'}
              </Button>
            </TabsContent>

            <TabsContent value="swap" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label>From</Label>
                <Select value={swapFromCoin} onValueChange={setSwapFromCoin}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select coin to swap from" />
                  </SelectTrigger>
                  <SelectContent>
                    {balances.filter(b => b.amount > 0).map((balance) => (
                      <SelectItem key={balance.symbol} value={balance.symbol}>
                        <div className="flex items-center gap-2">
                          <img src={balance.image} alt={balance.coin} className="w-5 h-5 rounded-full" />
                          <span>{balance.coin}</span>
                          <span className="text-muted-foreground">({balance.amount.toFixed(4)})</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Amount</Label>
                  {swapFromCoin && (
                    <button
                      className="text-xs text-primary hover:underline"
                      onClick={() => setAmount(getMaxAmount(swapFromCoin).toString())}
                    >
                      Max: {getMaxAmount(swapFromCoin).toFixed(4)}
                    </button>
                  )}
                </div>
                <Input
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>

              <div className="flex justify-center">
                <div className="p-2 rounded-full bg-secondary">
                  <ArrowRightLeft className="w-5 h-5 text-muted-foreground" />
                </div>
              </div>

              <div className="space-y-2">
                <Label>To</Label>
                <Select value={swapToCoin} onValueChange={setSwapToCoin}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select coin to receive" />
                  </SelectTrigger>
                  <SelectContent>
                    {prices?.filter(p => p.symbol.toUpperCase() !== swapFromCoin).map((coin) => (
                      <SelectItem key={coin.id} value={coin.symbol.toUpperCase()}>
                        <div className="flex items-center gap-2">
                          <img src={coin.image} alt={coin.name} className="w-5 h-5 rounded-full" />
                          <span>{coin.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {swapFromCoin && swapToCoin && amount && (
                <div className="p-4 bg-secondary/50 rounded-lg">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">You'll Receive</span>
                    <span className="font-bold text-success">
                      ~{((parseFloat(amount) * getSelectedCoinPrice(swapFromCoin)) / getSelectedCoinPrice(swapToCoin)).toFixed(6)} {swapToCoin}
                    </span>
                  </div>
                  <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                    <span>Exchange Rate</span>
                    <span>1 {swapFromCoin} = {(getSelectedCoinPrice(swapFromCoin) / getSelectedCoinPrice(swapToCoin)).toFixed(6)} {swapToCoin}</span>
                  </div>
                </div>
              )}

              <Button
                className="w-full"
                onClick={handleSwap}
                disabled={isProcessing || !swapFromCoin || !swapToCoin || !amount}
              >
                {isProcessing ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                Swap
              </Button>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TradeModal;
