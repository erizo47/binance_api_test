<script lang="ts" setup>
  import { useOrderBookStore } from '@/modules/order-book/store/orderBookStore';

  const orderBookStore = useOrderBookStore();

</script>

<template>
  <div class="d-flex justify-space-between w-100">
    <v-col
      class="d-flex align-center pl-0"
      cols="3"
    >
      <h2>
        Order Book
      </h2>
    </v-col>
    <v-col
      class="pr-0"
      sm="3"
      xs="4"
    >
      <v-select
        v-model="orderBookStore.limit"
        :items="orderBookStore.limitList"
        class=" pb-2"
        dense
        hide-details
        label="Limit"
        rounded="3"
        variant="solo"
        width="100"
      />
    </v-col>
  </div>
</template>
