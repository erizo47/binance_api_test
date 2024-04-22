import { defineStore } from 'pinia';
import type { IOrderBookStoreState } from '@/modules/order-book/types/IOrderBookStoreState';
import { $client } from '@/api-client/modules/rest-api/rest-api';
import { useCurrencyStore } from '@/modules/currency/store/useCurrencyStore';
import { useFeedbackStore } from '@/modules/feedback/stores/feedbackStore';

export const useOrderBookStore = defineStore('orderBookStore', {
  state: (): IOrderBookStoreState => ({
    lastUpdateId: 0,
    bids: [],
    asks: [],
    limit: 100,
  }),
  getters: {},
  actions: {
    async getOrderBook() {
      const currencyStore = useCurrencyStore();
      const feedbackStore = useFeedbackStore();
      try {
        feedbackStore.toggleLoading();
        const {
          lastUpdateId,
          bids,
          asks,
        } = await $client.orderBook(currencyStore.current);

        console.log('Order book data:', bids, asks);
        this.lastUpdateId = lastUpdateId;
        this.bids = bids;
        this.asks = asks;

        feedbackStore.toggleLoading();
      } catch (error) {
        feedbackStore.showSnackbar({
          text: 'Failed to get order book data',
          color: 'error',
        });
      }
    },
  },
});
