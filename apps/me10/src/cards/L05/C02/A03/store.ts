import { atom } from 'recoil';

export const L05C02A03 = atom<TL05C02A03>({
  key: 'L05C02A03',
  default: {
    p01: {
      answer: 0,
      solution: 2,
      isSubmitted: false,
      isCorrect: false,
    },
  },
});

type TL05C02A03 = {
  p01: {
    answer: number;
    solution: number;
    isSubmitted: boolean;
    isCorrect: boolean;
  };
};
