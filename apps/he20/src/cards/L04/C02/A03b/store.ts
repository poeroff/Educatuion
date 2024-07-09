import { atom } from 'recoil';

export const L04C02A03b = atom<TL04C02A03b>({
  key: 'L04C02A03b',
  default: {
    p01: {
      answer: -1,
      solution: 2,
      isCorrect: false,
      isSubmitted: false,
    },
    p03: {
      answer: -1,
      solution: 3,
      isSubmitted: false,
      isCorrect: false,
    },
  },
});

type TL04C02A03b = {
  p01: {
    answer: number;
    solution: number;
    isSubmitted: boolean;
    isCorrect: boolean;
  };
  p03: {
    answer: number;
    solution: number;
    isSubmitted: boolean;
    isCorrect: boolean;
  };
};
