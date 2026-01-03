import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Transaction {
  id: string;
  type: 'received' | 'sent' | 'swapped' | 'bought' | 'withdrawn';
  coin: string;
  amount: number;
  usdValue: number;
  status: 'pending' | 'success';
  date: string;
  address?: string;
}

export interface WalletBalance {
  coin: string;
  symbol: string;
  amount: number;
  usdValue: number;
  image: string;
}

interface WalletContextType {
  balances: WalletBalance[];
  transactions: Transaction[];
  totalBalance: number;
  withdraw: (coin: string, amount: number, address: string) => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

const initialBalances: WalletBalance[] = [
  { coin: 'Bitcoin', symbol: 'BTC', amount: 1.5234, usdValue: 65432.10, image: 'https://assets.coingecko.com/coins/images/1/small/bitcoin.png' },
  { coin: 'Ethereum', symbol: 'ETH', amount: 12.456, usdValue: 29876.50, image: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png' },
  { coin: 'Tether', symbol: 'USDT', amount: 5000, usdValue: 5000, image: 'https://assets.coingecko.com/coins/images/325/small/Tether.png' },
  { coin: 'BNB', symbol: 'BNB', amount: 25.8, usdValue: 8234.50, image: 'https://assets.coingecko.com/coins/images/825/small/bnb-icon2_2x.png' },
  { coin: 'Solana', symbol: 'SOL', amount: 45.23, usdValue: 3567.80, image: 'https://assets.coingecko.com/coins/images/4128/small/solana.png' },
];

const initialTransactions: Transaction[] = [
  { id: '1', type: 'received', coin: 'BTC', amount: 0.05, usdValue: 2150, status: 'success', date: '2024-01-15T10:30:00Z' },
  { id: '2', type: 'sent', coin: 'ETH', amount: 1.2, usdValue: 2880, status: 'success', date: '2024-01-14T15:45:00Z' },
  { id: '3', type: 'bought', coin: 'SOL', amount: 10, usdValue: 789, status: 'success', date: '2024-01-13T09:20:00Z' },
  { id: '4', type: 'swapped', coin: 'USDT → BNB', amount: 500, usdValue: 500, status: 'success', date: '2024-01-12T18:00:00Z' },
  { id: '5', type: 'received', coin: 'USDT', amount: 1000, usdValue: 1000, status: 'success', date: '2024-01-11T12:15:00Z' },
];

export const WalletProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [balances, setBalances] = useState<WalletBalance[]>(initialBalances);
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);

  const totalBalance = balances.reduce((sum, b) => sum + b.usdValue, 0);

  const withdraw = (coin: string, amount: number, address: string) => {
    const balance = balances.find(b => b.symbol === coin);
    if (!balance || balance.amount < amount) return;

    const pricePerUnit = balance.usdValue / balance.amount;
    const usdValue = amount * pricePerUnit;

    setBalances(prev => prev.map(b => 
      b.symbol === coin 
        ? { ...b, amount: b.amount - amount, usdValue: b.usdValue - usdValue }
        : b
    ));

    const newTransaction: Transaction = {
      id: Date.now().toString(),
      type: 'withdrawn',
      coin,
      amount,
      usdValue,
      status: 'pending',
      date: new Date().toISOString(),
      address,
    };

    setTransactions(prev => [newTransaction, ...prev]);
  };

  return (
    <WalletContext.Provider value={{ balances, transactions, totalBalance, withdraw }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};
