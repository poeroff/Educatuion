import { atom } from 'recoil';

export const L07C02A03 = atom<TL07C02A03>({
  key: 'L07C02A03',
  default: {
    p01: {
      answer: 0,
      solution: 1,
      isSubmitted: false,
      isCorrect: false,
    },
  },
});

type TL07C02A03 = {
  p01: {
    answer: number;
    solution: number;
    isSubmitted: boolean;
    isCorrect: boolean;
  };
};
