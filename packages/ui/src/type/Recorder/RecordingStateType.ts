import { IWAI } from '@emotion/react';

export type TRecordingStateType = 'inactive' | 'active' | 'paused' | 'converted';

export interface IRecorderProps extends IWAI {
  onSubmit?: () => void;
}
