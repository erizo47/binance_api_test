import { defineStore } from 'pinia';
import type { ICurrencyStoreState } from '@/modules/currency/types/ICurrencyStoreState';

export const useCurrencyStore = defineStore('currencyStore', {
  state: (): ICurrencyStoreState => ({
    current: 'BTCUSDT',
    list: [
      'BTCUSDT',
      'BNBBTC',
      'ETHBTC',
    ],
    changeLog: [],
  }),
  getters: {},
  actions: {},
});
