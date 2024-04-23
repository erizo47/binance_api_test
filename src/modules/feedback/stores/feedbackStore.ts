import { defineStore } from 'pinia';
import type { IFeedbackStoreState } from '@/modules/feedback/types/IFeedbackStoreState';
import type { ISnackbarConfig } from '@/modules/feedback/types/ISnackbarConfig';

export const useFeedbackStore = defineStore('feedbackStore', {
  state: (): IFeedbackStoreState => ({
    globalSnackbar: {
      value: false,
      text: '',
      color: 'success',
      minWidth: 'auto',
    },
  }),
  getters: {},
  actions: {
    showSnackbar(
      {
        text,
        color,
        minWidth,
      }: ISnackbarConfig,
    ) {
      this.globalSnackbar.text = text;
      this.globalSnackbar.color = !color ? 'success' : color;
      this.globalSnackbar.minWidth = !minWidth ? 'auto' : minWidth;
      this.globalSnackbar.value = true;
    },
  },
});
