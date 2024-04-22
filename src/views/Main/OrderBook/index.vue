<script lang="ts" setup>

  import { onMounted } from 'vue';
  import { useOrderBookStore } from '@/modules/order-book/store/orderBookStore';

  const orderBookStore = useOrderBookStore();

  onMounted(() => {
    orderBookStore.getOrderBook();
  });
</script>

<template>
  <h1>Order Book</h1>
</template>

<style lang="scss" scoped>

</style>
