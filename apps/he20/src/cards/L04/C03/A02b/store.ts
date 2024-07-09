import { atom } from 'recoil';

export const L04C03A02b = atom<TL04C03A02b>({
  key: 'HE20L04C03A02b',
  default: {
    p01: {
      answer1: '',
      answer2: '',
      solution1: '150',
      solution2: 'destroyed',
      isSubmitted: false,
      isCorrect: false,
    },
    p03: {
      answer1: undefined,
      answer2: undefined,
      answer3: undefined,
      solution1: false,
      solution2: true,
      solution3: true,
      isSubmitted: false,
      isCorrect: false,
    },
  },
});

type TL04C03A02b = {
  p01: {
    answer1: string;
    answer2: string;
    solution1: string;
    solution2: string;
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
