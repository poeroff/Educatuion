import { atom } from 'recoil';

export const L04SP04_2 = atom<TL04SP04_2>({
  key: 'L04SP04_2',
  default: {
    p07: {
      answer: 0,
      isCorrect: false,
      isSubmitted: false,
      solution: 3,
    },
    p08: {
      answer: 0,
      isCorrect: false,
      isSubmitted: false,
      solution: 2,
    },
    p11: {
      answer: [],
      solution: [3, 2, 0, 4, 1],
      isCorrect: false,
      isSubmitted: false,
    },
    p12: {
      answer: [],
      solution: [1, 0, 2, 3, 4],
      isCorrect: false,
      isSubmitted: false,
    },
  },
});

type TL04SP04_2= {
  [key: string]: any;
  p07: {
    answer: number;
    isSubmitted: boolean;
    isCorrect: boolean;
    solution: number;
  };
  p08: {
    answer: number;
    isSubmitted: boolean;
    isCorrect: boolean;
    solution: number;
  };
  p11: {
    answer: number[];
    solution: number[];
    isCorrect: boolean;
    isSubmitted: boolean;
  }
  p12: {
    answer: number[];
    solution: number[];
    isCorrect: boolean;
    isSubmitted: boolean;
  }
};
