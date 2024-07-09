import { atom } from 'recoil';

export const L02C03A02b = atom<TL02C03A02b>({
  key: 'L02C03A02b',
  default: {
    p01: {
      answer: '',
      solution: 'Make a spending plan',
      isCorrect: false,
      isSubmitted: false,
    },
    p03: {
      answer1: undefined,
      answer2: undefined,
      answer3: undefined,
      solution1: true,
      solution2: false,
      solution3: true,
      isCorrect: false,
      isSubmitted: false,
    },
  },
});

type TL02C03A02b = {
  p01: {
    answer: string;
    solution: string;
    isSubmitted: boolean;
    isCorrect: boolean;
  };
  p03: {
    answer1: boolean | undefined;
    answer2: boolean | undefined;
    answer3: boolean | undefined;
    solution1: boolean;
    solution2: boolean;
    solution3: boolean;
    isSubmitted: boolean;
    isCorrect: boolean;
  };
};
