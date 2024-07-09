import { atom } from 'recoil';

export const A01_0004_05 = atom<TA01000405>({
  key: 'A01_0004_05',
  default: {
    p01: {
      answer: ['', '', ''],
      solution: ['4', '3', '6'],
      isCorrect: false,
      isSubmitted: false,
    },
    p02: {
      canvasDataURL: '',
      isSubmitted: false,
    },
  },
});

type TA01000405 = {
  p01: {
    answer: string[];
    solution: string[];
    isCorrect: boolean;
    isSubmitted: boolean;
  };
  p02: {
    canvasDataURL: string;
    isSubmitted: boolean;
  };
};
