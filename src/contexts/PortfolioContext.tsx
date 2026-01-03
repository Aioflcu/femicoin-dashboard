import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Trade {
  id: string;
  coinId: string;
  coinName: string;
  coinSymbol: string;
  type: 'buy' | 'sell';
  amount: number;
  pricePerCoin: number;
  totalValue: number;
  date: string;
  notes?: string;
}

export interface PortfolioHolding {
  coinId: string;
  coinName: string;
  coinSymbol: string;
  totalAmount: number;
  averageBuyPrice: number;
  totalInvested: number;
}

interface PortfolioContextType {
  trades: Trade[];
  holdings: PortfolioHolding[];
  addTrade: (trade: Omit<Trade, 'id'>) => void;
  deleteTrade: (tradeId: string) => void;
  getTotalInvested: () => number;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

const calculateHoldings = (trades: Trade[]): PortfolioHolding[] => {
  const holdingsMap = new Map<string, PortfolioHolding>();

  trades.forEach((trade) => {
    const existing = holdingsMap.get(trade.coinId);
    
    if (existing) {
      if (trade.type === 'buy') {
        const newTotalAmount = existing.totalAmount + trade.amount;
        const newTotalInvested = existing.totalInvested + trade.totalValue;
        holdingsMap.set(trade.coinId, {
          ...existing,
          totalAmount: newTotalAmount,
          totalInvested: newTotalInvested,
          averageBuyPrice: newTotalInvested / newTotalAmount,
        });
      } else {
        const newTotalAmount = existing.totalAmount - trade.amount;
        const soldRatio = trade.amount / existing.totalAmount;
        const newTotalInvested = existing.totalInvested * (1 - soldRatio);
        holdingsMap.set(trade.coinId, {
          ...existing,
          totalAmount: Math.max(0, newTotalAmount),
          totalInvested: Math.max(0, newTotalInvested),
          averageBuyPrice: newTotalAmount > 0 ? newTotalInvested / newTotalAmount : 0,
        });
      }
    } else if (trade.type === 'buy') {
      holdingsMap.set(trade.coinId, {
        coinId: trade.coinId,
        coinName: trade.coinName,
        coinSymbol: trade.coinSymbol,
        totalAmount: trade.amount,
        averageBuyPrice: trade.pricePerCoin,
        totalInvested: trade.totalValue,
      });
    }
  });

  return Array.from(holdingsMap.values()).filter((h) => h.totalAmount > 0);
};

export const PortfolioProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [trades, setTrades] = useState<Trade[]>(() => {
    const saved = localStorage.getItem('femicoin_trades');
    return saved ? JSON.parse(saved) : [];
  });

  const [holdings, setHoldings] = useState<PortfolioHolding[]>([]);

  useEffect(() => {
    localStorage.setItem('femicoin_trades', JSON.stringify(trades));
    setHoldings(calculateHoldings(trades));
  }, [trades]);

  const addTrade = (trade: Omit<Trade, 'id'>) => {
    const newTrade: Trade = {
      ...trade,
      id: Date.now().toString(),
    };
    setTrades((prev) => [newTrade, ...prev]);
  };

  const deleteTrade = (tradeId: string) => {
    setTrades((prev) => prev.filter((t) => t.id !== tradeId));
  };

  const getTotalInvested = () => {
    return holdings.reduce((sum, h) => sum + h.totalInvested, 0);
  };

  return (
    <PortfolioContext.Provider value={{ trades, holdings, addTrade, deleteTrade, getTotalInvested }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
