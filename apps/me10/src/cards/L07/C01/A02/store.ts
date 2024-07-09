import { IAudioData } from '@maidt-cntn/ui';
import { atom } from 'recoil';

export const L07C01A02 = atom<{
  [key: string]: {
    isSubmitted: boolean;
    audioData?: { [key in string]: IAudioData | null };
    answer1?: string;
  };
}>({
  key: 'L07C01A02',
  default: {
    p01: {
      audioData: { 1: {} },
      isSubmitted: false,
    },
  },
});
