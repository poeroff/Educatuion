import { atom } from 'recoil';
import { IAudioData } from '@maidt-cntn/ui';

export const L01SP02 = atom<{
  [key: string]: {
    isSubmitted: boolean;
    audioData?: { [key in string]: IAudioData | null };
    answer?: number;
    isCorrect?: boolean;
  };
}>({
  key: 'L01SP02',
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
