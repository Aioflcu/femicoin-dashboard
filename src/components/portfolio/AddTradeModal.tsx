import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { usePortfolio } from '@/contexts/PortfolioContext';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { Plus, Search } from 'lucide-react';

interface CoinSearchResult {
  id: string;
  name: string;
  symbol: string;
  thumb: string;
}

interface AddTradeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const searchCoins = async (query: string): Promise<CoinSearchResult[]> => {
  if (!query || query.length < 2) return [];
  const response = await fetch(`https://api.coingecko.com/api/v3/search?query=${query}`);
  if (!response.ok) return [];
  const data = await response.json();
  return data.coins.slice(0, 10);
};

const AddTradeModal = ({ open, onOpenChange }: AddTradeModalProps) => {
  const { addTrade } = usePortfolio();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCoin, setSelectedCoin] = useState<CoinSearchResult | null>(null);
  const [tradeType, setTradeType] = useState<'buy' | 'sell'>('buy');
  const [amount, setAmount] = useState('');
  const [pricePerCoin, setPricePerCoin] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: searchResults } = useQuery({
    queryKey: ['coinSearch', searchQuery],
    queryFn: () => searchCoins(searchQuery),
    enabled: searchQuery.length >= 2 && !selectedCoin,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedCoin || !amount || !pricePerCoin) {
      toast({
        title: 'Missing fields',
        description: 'Please fill in all required fields',
        variant: 'destructive',
      });
      return;
    }

    const numAmount = parseFloat(amount);
    const numPrice = parseFloat(pricePerCoin);

    if (numAmount <= 0 || numPrice <= 0) {
      toast({
        title: 'Invalid values',
        description: 'Amount and price must be positive',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 500));

    addTrade({
      coinId: selectedCoin.id,
      coinName: selectedCoin.name,
      coinSymbol: selectedCoin.symbol.toUpperCase(),
      type: tradeType,
      amount: numAmount,
      pricePerCoin: numPrice,
      totalValue: numAmount * numPrice,
      date,
      notes: notes || undefined,
    });

    toast({
      title: 'Trade added',
      description: `Successfully added ${tradeType} order for ${numAmount} ${selectedCoin.symbol.toUpperCase()}`,
    });

    // Reset form
    setSearchQuery('');
    setSelectedCoin(null);
    setTradeType('buy');
    setAmount('');
    setPricePerCoin('');
    setDate(new Date().toISOString().split('T')[0]);
    setNotes('');
    setIsSubmitting(false);
    onOpenChange(false);
  };

  const totalValue = (parseFloat(amount) || 0) * (parseFloat(pricePerCoin) || 0);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-display">
            <Plus className="w-5 h-5 text-primary" />
            Add Trade
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {/* Coin Search */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Select Coin</label>
            {selectedCoin ? (
              <div className="flex items-center justify-between p-3 rounded-lg bg-secondary">
                <div className="flex items-center gap-3">
                  <img src={selectedCoin.thumb} alt={selectedCoin.name} className="w-8 h-8 rounded-full" />
                  <div>
                    <p className="font-medium">{selectedCoin.name}</p>
                    <p className="text-sm text-muted-foreground">{selectedCoin.symbol.toUpperCase()}</p>
                  </div>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSelectedCoin(null);
                    setSearchQuery('');
                  }}
                >
                  Change
                </Button>
              </div>
            ) : (
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search for a coin..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
                {searchResults && searchResults.length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-popover border border-border rounded-lg shadow-lg max-h-48 overflow-y-auto">
                    {searchResults.map((coin) => (
                      <button
                        key={coin.id}
                        type="button"
                        onClick={() => {
                          setSelectedCoin(coin);
                          setSearchQuery('');
                        }}
                        className="w-full flex items-center gap-3 p-3 hover:bg-secondary transition-colors"
                      >
                        <img src={coin.thumb} alt={coin.name} className="w-6 h-6 rounded-full" />
                        <span className="font-medium">{coin.name}</span>
                        <span className="text-sm text-muted-foreground">{coin.symbol.toUpperCase()}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Trade Type */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Trade Type</label>
            <div className="grid grid-cols-2 gap-2">
              <Button
                type="button"
                variant={tradeType === 'buy' ? 'default' : 'secondary'}
                onClick={() => setTradeType('buy')}
                className={tradeType === 'buy' ? 'bg-success hover:bg-success/90' : ''}
              >
                Buy
              </Button>
              <Button
                type="button"
                variant={tradeType === 'sell' ? 'default' : 'secondary'}
                onClick={() => setTradeType('sell')}
                className={tradeType === 'sell' ? 'bg-destructive hover:bg-destructive/90' : ''}
              >
                Sell
              </Button>
            </div>
          </div>

          {/* Amount and Price */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Amount</label>
              <Input
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                step="any"
                min="0"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Price per Coin ($)</label>
              <Input
                type="number"
                placeholder="0.00"
                value={pricePerCoin}
                onChange={(e) => setPricePerCoin(e.target.value)}
                step="any"
                min="0"
              />
            </div>
          </div>

          {/* Date */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Date</label>
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Notes (optional)</label>
            <Input
              placeholder="Add any notes..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          {/* Summary */}
          {totalValue > 0 && (
            <div className="p-4 rounded-xl bg-secondary/50">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Value</span>
                <span className="font-semibold text-primary">
                  ${totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            </div>
          )}

          <Button
            type="submit"
            variant="gold"
            size="lg"
            className="w-full"
            disabled={isSubmitting || !selectedCoin}
          >
            {isSubmitting ? (
              <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
            ) : (
              `Add ${tradeType === 'buy' ? 'Buy' : 'Sell'} Trade`
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddTradeModal;
