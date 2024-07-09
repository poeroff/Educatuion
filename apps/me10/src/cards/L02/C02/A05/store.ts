import { atom } from 'recoil';

export const L02C02A05 = atom<TL02C02A05>({
  key: 'L02C02A05',
  default: {
    p01: {
      answer: [undefined, undefined],
      solution: [false, true],
      isCorrect: false,
      isSubmitted: false,
    },
  },
});

type TL02C02A05 = {
  p01: {
    answer: (boolean | undefined)[];
    solution: boolean[];
    isCorrect: boolean;
    isSubmitted: boolean;
  };
};
