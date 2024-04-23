import { useOrderBookStore } from '@/modules/order-book/store/orderBookStore';

export const useOrderBookData = () => {
  const orderBookStore = useOrderBookStore();

  async function fetchOrderBookData() {
    await orderBookStore.getOrderBook();
  }

  async function resetOrderBookData() {
    orderBookStore.unsubscribeOrderBookStream();
    orderBookStore.$reset();
  }

  return {
    fetchOrderBookData,
    resetOrderBookData,
  };
};
