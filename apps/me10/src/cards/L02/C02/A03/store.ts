import { atom } from 'recoil';

export const L02C02A03 = atom<TL02C02A03>({
  key: 'L02C02A03',
  default: {
    p01: {
      answer: 0,
      solution: 3,
      isSubmitted: false,
      isCorrect: false,
    },
  },
});

type TL02C02A03 = {
  p01: {
    answer: number;
    solution: number;
    isSubmitted: boolean;
    isCorrect: boolean;
  };
};
