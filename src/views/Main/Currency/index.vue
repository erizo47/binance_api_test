<script lang="ts" setup>
  import { watch } from 'vue';
  import { useCurrencyStore } from '@/modules/currency/store/useCurrencyStore';
  import { useOrderBookStore } from '@/modules/order-book/store/orderBookStore';

  const currencyStore = useCurrencyStore();
  const orderBookStore = useOrderBookStore();

  watch(() => currencyStore.current, (newCurrency, oldCurrency) => {
    currencyStore.changeLog.push(`${oldCurrency} => ${newCurrency} at ${new Date().toLocaleTimeString()}`);
    orderBookStore.getOrderBook();
  });
</script>

<template>
  <h3 class="ml-3 mb-3">
    Select currency
  </h3>
  <v-col
    md="4"
    sm="6"
    xs="12"
  >
    <v-select
      v-model="currencyStore.current"
      :items="currencyStore.list"
      density="compact"
    />

    <div
      class="my-8"
    >
      <v-card
        border
        class="change_log"
        theme="dark"
      >
        <template #title>
          <h4>
            Currency change log
          </h4>
        </template>
        <v-divider />
        <div class="py-8 px-4">
          <p
            v-for="(sectionCodeLine, codeLineIndex) in currencyStore.changeLog"
            :key="codeLineIndex"
            class="change_log__item"
          >
            {{ sectionCodeLine }}
          </p>
        </div>
      </v-card>
    </div>
  </v-col>
</template>

<style lang="scss" scoped>
.code_description {
  font-family: 'JetBrains Mono', monospace;
  font-size: 16px;
  margin-bottom: 6px;
}

.change_log {
  background: var(--app-color-neutral-100);
  font-family: 'JetBrains Mono', monospace;
  font-size: 14px;
  opacity: 0.7;

  .change_log__item {
    margin-bottom: 6px;
  }
}

.change_log:hover {
  opacity: 1;

  .copy_icon {
    opacity: 1;
  }
}
</style>
