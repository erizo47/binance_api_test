<script lang="ts" setup>
  import { useCurrencyStore } from '@/modules/currency/store/useCurrencyStore';

  const currencyStore = useCurrencyStore();

</script>

<template>
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
.change_log {
  background: #181A20;
  font-family: 'JetBrains Mono', monospace;
  font-size: 14px;
  opacity: 0.7;

  .change_log__item {
    margin-bottom: 6px;
  }
}

.change_log:hover {
  opacity: 1;
}
</style>
