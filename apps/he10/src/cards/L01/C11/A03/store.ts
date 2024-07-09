import { IAudioData } from '@maidt-cntn/ui';
import { atom } from 'recoil';

export const L01C11A03 = atom<{
  [key: string]: {
    isSubmitted: boolean;
    audioData?: { [key in string]: IAudioData | null };
    answer?: number[];
    solution?: number[];
    isCorrect?: boolean;
    aStep?: number;
    bStep?: number;
    role?: 'A' | 'B' | null;
    listenComplete?: { [key in string]: boolean };
  };
}>({
  key: 'L01C11A03',
  default: {
    p01: {
      answer: [1, 2, 3, 4, 5, 6],
      solution: [1, 5, 3, 2, 4, 6],
      isCorrect: false,
      isSubmitted: false,
    },
    p02: {
      audioData: {},
      isSubmitted: false,
      aStep: 0,
      bStep: 0,
      role: null,
      listenComplete: {},
    },
  },
});
