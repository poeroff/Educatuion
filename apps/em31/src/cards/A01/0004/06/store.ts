import { atom } from 'recoil';

export const A01_0004_06 = atom<TA01000406>({
  key: 'A01_0004_06',
  default: {
    p01: {
      canvasDataURL: '',
      isSubmitted: false,
    },
    p02: {
      answer: ['', '', '', ''],
      solution: ['3', '2', '3', '1'],
      isCorrect: false,
      isSubmitted: false,
    },
    p03: {
      canvasDataURL: '',
      isSubmitted: false,
    },
  },
});

type TA01000406 = {
  p01: {
    canvasDataURL: string;
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
