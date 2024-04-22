import type { TSnackbarColor } from '@/modules/feedback/types/TSnackbarColor';

export interface ISnackbarConfig {
  value?: boolean,
  text: string,
  color?: TSnackbarColor,
  minWidth?: string,
}
