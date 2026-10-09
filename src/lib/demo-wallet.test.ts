import { describe, test, expect } from 'bun:test';
import { simulateWithdrawal } from './demo-wallet';

const balances = [{ coin: 'Tether', symbol: 'USDT', amount: 500, usdValue: 500, image: '' }];

describe('demo-only withdrawals', () => {
  test('withdraws simulated funds without a deposit, wallet address, or admin approval', () => {
    const result = simulateWithdrawal(balances, 'USDT', 100);
    expect(result?.balances[0].amount).toBe(400);
    expect(result?.transaction.usdValue).toBe(100);
    expect(result?.transaction.status).toBe('success');
    expect(result?.transaction.address).toBeUndefined();
    expect(balances[0].amount).toBe(500);
  });
  test('rejects invalid or over-balance simulation amounts', () => {
    for (const amount of [0, -1, NaN, Infinity, 501]) {
      expect(simulateWithdrawal(balances, 'USDT', amount)).toBeNull();
    }
  });
});