import { IAudioData } from '@maidt-cntn/ui';
import { atom } from 'recoil';

export const L03C11A03 = atom<TL03C11A03>({
  key: 'L03C11A03',
  default: {
    p01: {
      answer: [1, 2, 3, 4, 5, 6, 7],
      solution: [1, 5, 2, 4, 3, 6, 7],
      isCorrect: false,
      isSubmitted: false,
    },
    p02: {
      audioData: {},
      isAudioPlayed: [false, false, false, false, false, false, false],
      isSubmitted: false,
    },
  },
});

type TL03C11A03 = {
  [key: string]: {
    answer?: number[];
    solution?: number[];
    isCorrect?: boolean;
    audioData?: { [key in string]: IAudioData | null };
    isAudioPlayed?: boolean[];
    isSubmitted: boolean;
  };
};
