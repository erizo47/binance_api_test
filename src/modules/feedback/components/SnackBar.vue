<script lang="ts" setup>
  import { storeToRefs } from 'pinia';
  import { useFeedbackStore } from '@/modules/feedback/stores/feedbackStore';

  const { globalSnackbar } = storeToRefs(useFeedbackStore());

</script>

<template>
  <v-snackbar
    v-model="globalSnackbar.value"
    :color="globalSnackbar.color"
    :min-width="globalSnackbar.minWidth"
    absolute
    close-on-content-click
    style="bottom: 40px"
    timeout="2000"
  >
    {{ globalSnackbar.text }}
  </v-snackbar>
</template>

<style>
.v-snackbar__content {
  font-size: 14px !important;
}
</style>
