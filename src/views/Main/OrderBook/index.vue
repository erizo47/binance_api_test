<script lang="ts" setup>
  import { onMounted, onUnmounted, watch } from 'vue';
  import { useOrderBookStore } from '@/modules/order-book/store/orderBookStore';
  import OrderBookTable from '@/modules/order-book/components/OrderBookTable.vue';
  import OrderBookHeader from '@/modules/order-book/components/OrderBookHeader.vue';
  import { useOrderBookData } from '@/modules/order-book/composables/useOrderBookData';

  const orderBookStore = useOrderBookStore();

  onMounted(() => {
    useOrderBookData()
      .fetchOrderBookData();
  });

  onUnmounted(() => {
    useOrderBookData()
      .resetOrderBookData();
  });

  watch(() => orderBookStore.limit, () => {
    useOrderBookData()
      .fetchOrderBookData();
  });

</script>

<template>
  <order-book-header />
  <v-row
    class="d-flex flex-row"
  >
    <order-book-table
      :prices="orderBookStore.resultedBids"
      table-type="bids"
    />
    <order-book-table
      :prices="orderBookStore.resultedAsks"
      table-type="asks"
    />
  </v-row>
</template>
