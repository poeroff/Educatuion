import { atom } from 'recoil';

export const A01_0005_05 = atom<TA01000505>({
  key: 'A01_0005_05',
  default: {
    p01: {
      answer: ['', '', ''],
      solution: [...String(132)],
      isCorrect: false,
      isSubmitted: false,
    },
    p02: {
      canvasDataURL: '',
      isSubmitted: false,
    },
  },
});

type TA01000505 = {
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
