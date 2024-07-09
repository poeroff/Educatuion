import { atom } from 'recoil';

export const L01C02A03b = atom<TL01C02A03b>({
  key: 'L01C02A03b',
  default: {
    p01: {
      answer: 0,
      solution: 2,
      isCorrect: false,
      isSubmitted: false,
    },
    p03: {
      answer1: undefined,
      answer2: undefined,
      answer3: undefined,
      solution1: true,
      solution2: true,
      solution3: true,
      isSubmitted: false,
      isCorrect: false,
    },
  },
});

type TL01C02A03b = {
  p01: {
    answer: number;
    solution: number;
    isCorrect: boolean;
    isSubmitted: boolean;
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
