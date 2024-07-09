import { atom } from 'recoil';

export const A01_0003_06 = atom<TA01000306>({
  key: 'A01000306',
  default: {
    p01: {
      solution: ['700쯤'],
      canvasDataURL: '',
      isSubmitted: false,
    },
    p02: {
      answer: ['', '', ''],
      solution: ['6', '8', '6'],
      isCorrect: false,
      isSubmitted: false,
    },
    p03: {
      solution: ['700쯤으로 어림했는데 계산하면 686입니다.'],
      canvasDataURL: '',
      isSubmitted: false,
    },
  },
});

type TA01000306 = {
  p01: {
    solution: string[];
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
    solution: string[];
    canvasDataURL: string;
    isSubmitted: boolean;
  };
};
