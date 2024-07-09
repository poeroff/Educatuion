import { atom } from 'recoil';

export const L04C11A02 = atom<TL04C11A02>({
  key: 'L04C11A02',
  default: {
    p01: {
      answer: '',
      solution: '3',
      isCorrect: false,
      isSubmitted: false,
    },
    p02: {
      answer1: undefined,
      answer2: undefined,
      answer3: undefined,
      solution1: false,
      solution2: false,
      solution3: true,
      isSubmitted: false,
      isCorrect: false,
    },
  },
});

type TL04C11A02 = {
  p01: {
    answer: string;
    solution: string;
    isCorrect: boolean;
    isSubmitted: boolean;
  };
  p02: {
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
