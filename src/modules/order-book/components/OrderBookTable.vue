<script lang="ts" setup>

  import { onMounted, onUnmounted, ref } from 'vue';
  import { useOrderBookStore } from '@/modules/order-book/store/orderBookStore';
  import { useCurrencyStore } from '@/modules/currency/store/useCurrencyStore';
  import type { ITableType } from '@/modules/currency/types/ITableType';

  const orderBookStore = useOrderBookStore();
  const currencyStore = useCurrencyStore();

  const props = defineProps<{
    prices: string[];
    tableType: ITableType;
  }>();

  const isMobile = ref(false);
  const checkMobileScreenSize = () => {
    if (window.innerWidth <= 658) {
      isMobile.value = true;
      return;
    }

    isMobile.value = false;
  };

  const resultedValue = (price: string) => {
    switch (currencyStore.current) {
    case 'BTCUSDT':
      return {
        price: Number(price)
          .toFixed(2),
        quantity: props.tableType === 'bids' ? Number(orderBookStore.bids[price])
          .toFixed(3) : Number(orderBookStore.asks[price])
            .toFixed(3),
        total: (Number(price) * (props.tableType === 'bids' ? Number(orderBookStore.bids[price]) : Number(orderBookStore.asks[price]))).toFixed(3),
      };
    case 'BNBBTC':
      return {
        price: Number(price)
          .toFixed(6),
        quantity: props.tableType === 'bids' ? Number(orderBookStore.bids[price])
          .toFixed(3) : Number(orderBookStore.asks[price])
            .toFixed(3),
        total: (Number(price) * (props.tableType === 'bids' ? Number(orderBookStore.bids[price]) : Number(orderBookStore.asks[price]))).toFixed(3),
      };
    case 'ETHBTC':
      return {
        price: Number(price)
          .toFixed(5),
        quantity: props.tableType === 'bids' ? Number(orderBookStore.bids[price])
          .toFixed(4) : Number(orderBookStore.asks[price])
            .toFixed(4),
        total: (Number(price) * (props.tableType === 'bids' ? Number(orderBookStore.bids[price]) : Number(orderBookStore.asks[price]))).toFixed(3),
      };
    default:
      return {
        price,
        quantity: props.tableType === 'bids' ? Number(orderBookStore.bids[price]) : Number(orderBookStore.asks[price]),
        total: Number(price) * (props.tableType === 'bids' ? Number(orderBookStore.bids[price]) : Number(orderBookStore.asks[price])),
      };
    }
  };

  onMounted(() => {
    window.addEventListener('resize', checkMobileScreenSize);
    checkMobileScreenSize();
  });

  onUnmounted(() => {
    window.removeEventListener('resize', checkMobileScreenSize);
  });
</script>

<template>
  <v-col
    :class="`order_book-column ${isMobile ? 'order_book-column--mobile' : ''}`"
    sm="6"
    xs="2"
  >
    <v-table
      class="table_wrap"
      fixed-header
    >
      <thead>
        <tr>
          <th :class="`table_wrap ${isMobile ? 'mobile-data-padding' : ''}`">
            Price
          </th>
          <th
            v-if="!isMobile"
            :class="`table_wrap ${isMobile ? 'mobile-data-padding' : ''}`"
          >
            Quantity
          </th>
          <th :class="`table_wrap ${isMobile ? 'mobile-data-padding' : ''}`">
            Total
          </th>
        </tr>
      </thead>
      <tbody :style="`${isMobile ? 'padding: 0 8px !important;' : ''}`">
        <tr
          v-for="price in props.prices"
          :key="price"
        >
          <td :class="`${isMobile ? 'mobile-data-padding' : ''} ${props.tableType === 'bids' ? 'bid_text-color' : 'ask_text-color'}`">
            {{ resultedValue(price).price }}
          </td>
          <td
            v-if="!isMobile"
            :class="`${isMobile ? 'mobile-data-padding' : ''}`"
          >
            {{ resultedValue(price).quantity }}
          </td>
          <td :class="`${isMobile ? 'mobile-data-padding' : ''}`">
            {{ resultedValue(price).total }}
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-col>
</template>

<style lang="scss">
.order_book-container {
  height: calc(100vh - 109px);
  overflow: auto;
}

.table_wrap {
  padding: 0;
  color: #B7BDC6 !important;
  background: #181A20 !important;
}

.v-table__wrapper {
  max-height: calc(-194px + 100vh);
  -ms-overflow-style: none; /* IE и Edge */
  scrollbar-width: none; /* Firefox */
}

.v-table__wrapper::-webkit-scrollbar {
  display: none;
}

.order_book-column--mobile {
  padding: 0;
}

.mobile-data-padding {
  padding: 0 8px !important;
}

.bid_text-color {
  color: #0ECB81 !important;
}

.ask_text-color {
  color: #F6465D !important;
}

</style>
