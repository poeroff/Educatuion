import { atom } from 'recoil';

export const L02C03A02a = atom<TL02C03A02a>({
  key: 'L02C03A02a',
  default: {
    p01: {
      answer1: '',
      answer2: '',
      answer3: '',
      solution1: 'spending',
      solution2: 'plan',
      solution3: 'money',
      isCorrect: false,
      isSubmitted: false,
    },
    p03: {
      answer1: undefined,
      answer2: undefined,
      answer3: undefined,
      solution1: false,
      solution2: false,
      solution3: true,
      isCorrect: false,
      isSubmitted: false,
    },
  },
});

type TL02C03A02a = {
  p01: {
    answer1: string;
    answer2: string;
    answer3: string;
    solution1: string;
    solution2: string;
    solution3: string;
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
