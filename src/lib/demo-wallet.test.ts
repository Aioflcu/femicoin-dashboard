import { describe, it as test } from 'node:test';
import assert from 'node:assert/strict';
import { withdrawFunds } from './wallet';

const balances = [{ coin: 'Tether', symbol: 'USDT', amount: 500, usdValue: 500, image: '' }];

describe('withdrawal logic', () => {
  test('withdraws funds from the matching balance and leaves the original balance unchanged', () => {
    const result = withdrawFunds(balances, 'USDT', 100);
    assert.equal(result?.balances[0].amount, 400);
    assert.equal(result?.transaction.usdValue, 100);
    assert.equal(result?.transaction.status, 'success');
    assert.equal(result?.transaction.address, undefined);
    assert.equal(balances[0].amount, 500);
  });

  test('rejects invalid or over-balance amounts', () => {
    for (const amount of [0, -1, NaN, Infinity, 501]) {
      assert.equal(withdrawFunds(balances, 'USDT', amount), null);
    }
  });
});
