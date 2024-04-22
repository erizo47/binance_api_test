<script setup lang="ts">
  import { storeToRefs } from 'pinia';
  import { useFeedbackStore } from '@/modules/feedback/stores/feedbackStore';

  const { globalSnackbar } = storeToRefs(useFeedbackStore());

</script>

<template>
  <v-snackbar
    v-model="globalSnackbar.value"
    :color="globalSnackbar.color"
    close-on-content-click
    :min-width="globalSnackbar.minWidth"
    timeout="2000"
  >
    {{ globalSnackbar.text }}
  </v-snackbar>
</template>
