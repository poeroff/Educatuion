import { atom } from 'recoil';

export const L03C02A03b = atom<TL03C02A03b>({
  key: 'L03C02A03b',
  default: {
    p01: {
      answer: -1,
      solution: 3,
      isCorrect: false,
      isSubmitted: false,
    },
    p03: {
      answer: -1,
      solution: 2,
      isCorrect: false,
      isSubmitted: false,
    },
  },
});

type TL03C02A03b = {
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
