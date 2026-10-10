import type { Transaction, WalletBalance } from '@/contexts/WalletContext';

export function withdrawFunds(balances: WalletBalance[], coin: string, amount: number) {
  const balance = balances.find(item => item.symbol === coin);
  if (!balance || !Number.isFinite(amount) || amount <= 0 || amount > balance.amount) return null;

  const usdValue = (amount * balance.usdValue) / balance.amount;
  const transaction: Transaction = {
    id: crypto.randomUUID(),
    type: 'withdrawn',
    coin,
    amount,
    usdValue,
    status: 'success',
    date: new Date().toISOString(),
  };

  return {
    balances: balances.map(item => item.symbol === coin
      ? { ...item, amount: item.amount - amount, usdValue: item.usdValue - usdValue }
      : item),
    transaction,
  };
}
