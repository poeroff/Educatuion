import { IAudioData } from '@maidt-cntn/ui';
import { atom } from 'recoil';

export const L02SP02 = atom<{
  [key: string]: {
    isSubmitted: boolean;
    audioData?: { [key in string]: IAudioData | null };
    answer?: number;
    isCorrect?: boolean;
  };
}>({
  key: 'L02SP02',
  default: {
    p09: {
      isSubmitted: false,
      audioData: {},
    },
    p10: {
      isSubmitted: false,
      audioData: {},
    },
    p11: {
      isSubmitted: false,
      audioData: {},
    },
    p12: {
      isSubmitted: false,
      audioData: {},
    },
    p13: {
      isCorrect: false,
      isSubmitted: false,
    },
  },
});
