import { atom } from 'recoil';

export const L05C12A03 = atom<TL05C12A03>({
  key: 'L05C12A03',
  default: {
    p01: {
      answer: '',
      solution: 'fishing',
      isCorrect: false,
      isSubmitted: false,
    },
    p03: {
      answer1: '',
      answer2: '',
      solution1: 'an',
      solution2: 'umbrella',
      isCorrect: false,
      isSubmitted: false,
    },
  },
});

type TL05C12A03 = {
  p01: {
    answer: string;
    solution: string;
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
