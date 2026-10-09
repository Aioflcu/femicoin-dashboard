import { useState } from 'react';
import { useWallet } from '@/contexts/WalletContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { ArrowUpRight } from 'lucide-react';

interface WithdrawModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const WithdrawModal = ({ open, onOpenChange }: WithdrawModalProps) => {
  const { balances, withdraw } = useWallet();
  const [selectedCoin, setSelectedCoin] = useState('');
  const [amount, setAmount] = useState('');
  const selectedBalance = balances.find(b => b.symbol === selectedCoin);
  const maxAmount = selectedBalance?.amount ?? 0;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!withdraw(selectedCoin, Number(amount))) {
      toast({ title: 'Invalid demo amount', description: 'Choose a token and an amount within your demo balance.', variant: 'destructive' });
      return;
    }
    toast({ title: 'Demo withdrawal complete', description: `${amount} ${selectedCoin} removed from your simulated balance. No real money was sent.` });
    setSelectedCoin('');
    setAmount('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-display">
            <ArrowUpRight className="w-5 h-5 text-primary" />Demo withdrawal
          </DialogTitle>
          <DialogDescription>Simulation only. No real funds are transferred and no payment or approval is needed.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-5 mt-4">
          <div className="space-y-2">
            <Label htmlFor="withdraw-token">Token</Label>
            <Select value={selectedCoin} onValueChange={value => { setSelectedCoin(value); setAmount(''); }}>
              <SelectTrigger id="withdraw-token"><SelectValue placeholder="Choose a token" /></SelectTrigger>
              <SelectContent>
                {balances.filter(b => b.amount > 0).map(balance => (
                  <SelectItem key={balance.symbol} value={balance.symbol}>{balance.coin} ({balance.symbol})</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-2">
              <Label htmlFor="withdraw-amount">Amount</Label>
              {selectedBalance && <Button type="button" variant="ghost" size="sm" onClick={() => setAmount(String(maxAmount))}>Max</Button>}
            </div>
            <Input id="withdraw-amount" type="number" placeholder="0.00" value={amount} onChange={event => setAmount(event.target.value)} step="any" min="0" max={maxAmount} required />
            {selectedBalance && <p className="text-xs text-muted-foreground">Demo available: {maxAmount.toLocaleString('en-US', { maximumFractionDigits: 6 })} {selectedCoin}</p>}
          </div>
          {selectedBalance && Number(amount) > 0 && <div className="border-t border-border pt-3 flex justify-between gap-3 text-sm">
            <span className="text-muted-foreground">Simulated value</span>
            <span>${(Number(amount) * selectedBalance.usdValue / selectedBalance.amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
          </div>}
          <Button type="submit" className="w-full" disabled={!selectedCoin || !amount}>Simulate withdrawal</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
export default WithdrawModal;
