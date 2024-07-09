import { IAudioData } from '@maidt-cntn/ui';
import { atom } from 'recoil';

export const L04C11A03 = atom<TL04C11A03>({
  key: 'L04C11A03',
  default: {
    p01: {
      answer: [1, 2, 3, 4, 5, 6, 7],
      solution: [1, 3, 2, 5, 4, 6, 7],
      isCorrect: false,
      isSubmitted: false,
    },
    p02: {
      isSubmitted: false,
      audioData: {},
      isAudioPlayed: [false, false, false, false, false, false],
    },
  },
});

type TL04C11A03 = {
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
    isAudioPlayed?: boolean[];
  };
};
