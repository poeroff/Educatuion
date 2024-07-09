import { atom } from 'recoil';

export const L02C12A03 = atom<TL02C12A03>({
  key: 'L02C12A03',
  default: {
    p01: {
      answer: -1,
      solution: 2,
      isCorrect: false,
      isSubmitted: false,
    },
    p03: {
      answer1: '',
      answer2: '',
      solution1: 'math',
      solution2: 'homework',
      isCorrect: false,
      isSubmitted: false,
    },
  },
});

type TL02C12A03 = {
  p01: {
    answer: number;
    solution: number;
    isCorrect: boolean;
    isSubmitted: boolean;
  };
  p03: {
    answer1: string;
    answer2: string;
    solution1: string;
    solution2: string;
    isCorrect: boolean;
    isSubmitted: boolean;
  };
};
