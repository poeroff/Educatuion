import { atom } from 'recoil';

export const A01_0007_06 = atom<TA01000706>({
  key: 'A01_0007_06',
  default: {
    p01: {
      answer: '',
      isSubmitted: false,
    },
    p02: {
      answer: ['', '', ''],
      solution: ['3', '1', '6'],
      isCorrect: false,
      isSubmitted: false,
    },
    p03: {
      answer: '',
      canvasDataURL: '',
      isSubmitted: false,
    },
  },
});

type TA01000706 = {
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
    answer: string;
    canvasDataURL: string;
    isSubmitted: boolean;
  };
};
