import { defineStore } from 'pinia';
import type { IOrderBookStoreState } from '@/modules/order-book/types/IOrderBookStoreState';
import { useFeedbackStore } from '@/modules/feedback/stores/feedbackStore';
import { $restRequest } from '@/api-client/modules/rest-api/rest-api';
import { useCurrencyStore } from '@/modules/currency/store/useCurrencyStore';
import type { IDepthStreamResponse } from '@/modules/order-book/types/IDepthStreamResponse';
import { $websocketStreamClient } from '@/api-client/modules/websocket-api/websocket-api';

export const useOrderBookStore = defineStore('orderBookStore', {
  state: (): IOrderBookStoreState => ({
    lastUpdateId: 0,
    bids: {},
    asks: {},
    limitList: [100, 500, 1000],
    limit: 100,
  }),
  getters: {
    resultedBids(): string[] {
      return Object.keys(this.bids)
        .sort((price1, price2) => Number(price2) - Number(price1))
        .slice(0, this.limit);
    },

    resultedAsks(): string[] {
      return Object.keys(this.asks)
        .sort((price1, price2) => Number(price2) - Number(price1))
        .slice(0, this.limit);
    },
  },
  actions: {
    async getOrderBook() {
      const currencyStore = useCurrencyStore();
      const feedbackStore = useFeedbackStore();
      try {
        const {
          lastUpdateId,
          bids,
          asks,
        }: {
          lastUpdateId: number,
          bids: string[][],
          asks: string[][],
        } = await $restRequest.get('/api/v3/depth', {
          params: {
            symbol: currencyStore.current,
            limit: this.limit,
          },
        });

        this.lastUpdateId = lastUpdateId;
        bids.forEach((bid) => {
          this.bids[bid[0]] = bid[1];
        });
        asks.forEach((ask) => {
          this.asks[ask[0]] = ask[1];
        });

        await this.subscribeOrderBookStream();
      } catch (error) {
        feedbackStore.showSnackbar({
          text: 'Failed to get order book data',
          color: 'error',
        });
      }
    },

    async subscribeOrderBookStream() {
      const currencyStore = useCurrencyStore();
      const feedbackStore = useFeedbackStore();

      try {
        $websocketStreamClient.send(JSON.stringify({
          method: 'SUBSCRIBE',
          params: [
            `${currencyStore.current.toLowerCase()}@depth@1000ms`,
          ],
          id: 1,
        }));

        $websocketStreamClient.onmessage = (event: { data: string }) => {
          const streamData: IDepthStreamResponse = JSON.parse(event.data) as IDepthStreamResponse;
          if (streamData.e !== 'depthUpdate' && streamData.s !== currencyStore.current) {
            return;
          }

          if (streamData.u <= this.lastUpdateId) {
            return;
          }

          if (streamData.U <= this.lastUpdateId + 1 && streamData.u >= this.lastUpdateId + 1) {
            this.lastUpdateId = streamData.u;
            streamData.b.forEach((bidFromSocket: string[]) => {
              // check if Quantity is 0
              if (Number(bidFromSocket[1]) === 0) {
                delete this.bids[`${bidFromSocket[0]}`];
                return;
              }

              this.bids[`${bidFromSocket[0]}`] = bidFromSocket[1];
            });

            streamData.a.forEach((askFromSocket: string[]) => {
              // check if Quantity is 0
              if (Number(askFromSocket[1]) === 0) {
                delete this.asks[`${askFromSocket[0]}`];
                return;
              }

              this.asks[`${askFromSocket[0]}`] = askFromSocket[1];
            });
          }
        };

        $websocketStreamClient.onerror = () => {
          feedbackStore.showSnackbar({
            text: 'Failed to subscribe to order book stream',
            color: 'error',
          });
        };

        $websocketStreamClient.onclose = () => {
          feedbackStore.showSnackbar({
            text: 'Order book stream closed',
            color: 'success',
          });
        };
      } catch (error) {
        console.log('error', error);
        feedbackStore.showSnackbar({
          text: 'The error occurred while try to subscribe to order book stream',
          color: 'error',
        });
      }
    },

    unsubscribeOrderBookStream() {
      const feedbackStore = useFeedbackStore();
      const currencyStore = useCurrencyStore();

      $websocketStreamClient.send(JSON.stringify({
        method: 'UNSUBSCRIBE',
        params: [
          `${currencyStore.current.toLowerCase()}`,
        ],
        id: 312,
      }));

      $websocketStreamClient.onmessage = (event: { data: string }) => {
        const errorMessage: { result: null, id: number } = JSON.parse(event.data) as { result: null, id: number };
        if (errorMessage.result !== null && errorMessage.id !== 312) {
          return;
        }

        feedbackStore.showSnackbar({
          text: 'Unsubscribed from order book stream',
          color: 'success',
        });
      };
    },
  },
});
