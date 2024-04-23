<script lang="ts" setup>
  import { onMounted, watch } from 'vue';
  import ChangeLog from '@/modules/currency/components/ChangeLog.vue';
  import { useCurrencyStore } from '@/modules/currency/store/useCurrencyStore';

  const currencyStore = useCurrencyStore();

  onMounted(() => {
    const currency = sessionStorage.getItem('currency');
    if (!currency) {
      sessionStorage.setItem('currency', currencyStore.current);
      return;
    }

    currencyStore.current = currency;
  });

  watch(() => currencyStore.current, (newCurrency, oldCurrency) => {
    currencyStore.changeLog.push(`${oldCurrency} => ${newCurrency} at ${new Date().toLocaleTimeString()}`);
    sessionStorage.setItem('currency', newCurrency);
  });
</script>

<template>
  <h3 class="ml-3 mb-3">
    Select currency
  </h3>
  <change-log />
</template>

<style lang="scss" scoped>

</style>
