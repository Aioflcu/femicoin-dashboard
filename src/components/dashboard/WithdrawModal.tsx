import { useState } from 'react';
import { useWallet } from '@/contexts/WalletContext';
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
import { ArrowUpRight, Wallet } from 'lucide-react';

interface WithdrawModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const WithdrawModal = ({ open, onOpenChange }: WithdrawModalProps) => {
  const { balances, withdraw } = useWallet();
  const [selectedCoin, setSelectedCoin] = useState('');
  const [amount, setAmount] = useState('');
  const [address, setAddress] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedBalance = balances.find((b) => b.symbol === selectedCoin);
  const maxAmount = selectedBalance?.amount || 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedCoin || !amount || !address) {
      toast({
        title: 'Missing fields',
        description: 'Please fill in all fields',
        variant: 'destructive',
      });
      return;
    }

    const numAmount = parseFloat(amount);
    if (numAmount <= 0 || numAmount > maxAmount) {
      toast({
        title: 'Invalid amount',
        description: 'Please enter a valid amount within your balance',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    withdraw(selectedCoin, numAmount, address);

    toast({
      title: 'Withdrawal Submitted',
      description: `Reviewing withdrawal processing…… ${numAmount} ${selectedCoin}`,
    });

    setSelectedCoin('');
    setAmount('');
    setAddress('');
    setIsSubmitting(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-display">
            <ArrowUpRight className="w-5 h-5 text-primary" />
            Withdraw Crypto
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 mt-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Select Token</label>
            <Select value={selectedCoin} onValueChange={setSelectedCoin}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a token" />
              </SelectTrigger>
              <SelectContent>
                {balances.map((balance) => (
                  <SelectItem key={balance.symbol} value={balance.symbol}>
                    <div className="flex items-center gap-2">
                      <img
                        src={balance.image}
                        alt={balance.coin}
                        className="w-5 h-5 rounded-full"
                      />
                      <span>{balance.coin}</span>
                      <span className="text-muted-foreground">({balance.symbol})</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-muted-foreground">Amount</label>
              {selectedBalance && (
                <button
                  type="button"
                  onClick={() => setAmount(maxAmount.toString())}
                  className="text-xs text-primary hover:underline"
                >
                  Max: {maxAmount.toLocaleString('en-US', { maximumFractionDigits: 4 })} {selectedCoin}
                </button>
              )}
            </div>
            <Input
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              step="any"
              min="0"
              max={maxAmount}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Wallet Address</label>
            <div className="relative">
              <Wallet className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Enter recipient address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {selectedBalance && amount && (
            <div className="p-4 rounded-xl bg-secondary/50 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">You'll send</span>
                <span className="font-medium">{amount} {selectedCoin}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Network Fee</span>
                <span className="font-medium">~$2.50</span>
              </div>
              <div className="border-t border-border pt-2 flex justify-between">
                <span className="text-muted-foreground">USD Value</span>
                <span className="font-medium text-primary">
                  ${((parseFloat(amount) || 0) * (selectedBalance.usdValue / selectedBalance.amount)).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            </div>
          )}

          <Button
            type="submit"
            variant="gold"
            size="lg"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
            ) : (
              'Confirm Withdrawal'
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default WithdrawModal;
