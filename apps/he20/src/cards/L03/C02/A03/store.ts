import { atom } from 'recoil';

export const L03C02A03 = atom<TL03C02A03>({
  key: 'L03C02A03',
  default: {
    p01: {
      answer1: -1,
      solutoin1: 3,
      isSubmitted: false,
      isCorrect: false,
    },
    p03: {
      answer1: [],
      solutoin1: [1, 3],
      isSubmitted: false,
      isCorrect: false,
    },
  },
});

type TL03C02A03 = {
  p01: {
    answer1: number;
    solutoin1: number;
    isSubmitted: boolean;
    isCorrect: boolean;
  };
  p03: {
    answer1: number[];
    solutoin1: number[];
    isSubmitted: boolean;
    isCorrect: boolean;
  };
};
