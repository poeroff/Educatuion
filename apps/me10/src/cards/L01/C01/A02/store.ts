import { IAudioData } from '@maidt-cntn/ui';
import { atom } from 'recoil';

export const L01C01A02 = atom<{
  [key: string]: {
    isSubmitted: boolean;
    audioData?: { [key in string]: IAudioData | null };
    answer1?: string;
  };
}>({
  key: 'L01C02A04',
  default: {
    p01: {
      isSubmitted: false,
      audioData: {},
    },
  },
});
