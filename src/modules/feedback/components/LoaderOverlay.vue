<script setup lang="ts">
  import { useFeedbackStore } from '@/modules/feedback/stores/feedbackStore';

  const feedbackStore = useFeedbackStore();
</script>

<template>
  <div
    v-if="feedbackStore.isLoading"
    class="d-flex justify-center align-center h-100 loading"
  >
    <v-progress-circular
      :size="70"
      indeterminate
      color="var(--app-color-primary)"
      class="primary--text"
    />
  </div>
</template>

<style scoped>
.loading {
  background-color: rgb(240, 242, 243);
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  position: fixed;
  z-index: 4;
}
</style>
