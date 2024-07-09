import { atom } from 'recoil';

export const L04C02A05 = atom<TL04C02A05>({
  key: 'L04C02A05',
  default: {
    p01: {
      answer: undefined,
      solution: 3,
      isCorrect: false,
      isSubmitted: false,
    },
  },
});

type TL04C02A05 = {
  p01: {
    answer: number | undefined;
    solution: number;
    isCorrect: boolean;
    isSubmitted: boolean;
  };
};
