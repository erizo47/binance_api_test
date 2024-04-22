import type { ISnackbarConfig } from '@/modules/feedback/types/ISnackbarConfig';

export interface IFeedbackStoreState {
  isLoading: boolean,
  globalSnackbar: ISnackbarConfig,
}
