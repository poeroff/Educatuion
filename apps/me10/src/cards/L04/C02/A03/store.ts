import { atom } from 'recoil';

export const L04C02A03 = atom<TL04C02A03>({
  key: 'L04C02A03',
  default: {
    p01: {
      answers: [0, 0, 0, 0],
      solution: [0, 1, 1, 0],
      isSubmitted: false,
      isCorrect: false,
    },
  },
});

type TL04C02A03 = {
  p01: {
    answers: number[];
    solution: number[];
    isSubmitted: boolean;
    isCorrect: boolean;
  };
};
