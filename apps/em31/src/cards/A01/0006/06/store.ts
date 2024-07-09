import { atom } from 'recoil';

export const A01_0006_06 = atom<TA01000606>({
  key: 'A01_0006_06',
  default: {
    p01: {
      answer: '',
      isSubmitted: false,
    },
    p02: {
      answer: ['', '', ''],
      solution: ['2', '7', '3'],
      isCorrect: false,
      isSubmitted: false,
    },
    p03: {
      canvasDataURL: '',
      isSubmitted: false,
    },
  },
});

type TA01000606 = {
  p01: {
    answer: string;
    isSubmitted: boolean;
  };
  p02: {
    answer: string[];
    solution: string[];
    isCorrect: boolean;
    isSubmitted: boolean;
  };
  p03: {
    canvasDataURL: string;
    isSubmitted: boolean;
  };
};
