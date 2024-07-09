import { atom } from 'recoil';

export const A01_0006_05 = atom<TA01000605>({
  key: 'A01_0006_05',
  default: {
    p01: {
      answer: ['', '', ''],
      solution: ['1', '4', '5'],
      isCorrect: false,
      isSubmitted: false,
    },
    p02: {
      answer: '',
      canvasDataURL: '',
      isSubmitted: false,
    },
  },
});

type TA01000605 = {
  p01: {
    answer: string[];
    solution: string[];
    isCorrect: boolean;
    isSubmitted: boolean;
  };
  p02: {
    answer: string;
    canvasDataURL: string;
    isSubmitted: boolean;
  };
};
