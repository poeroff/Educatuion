import { atom } from 'recoil';

export const L07C02A05 = atom<TL07C02A05>({
  key: 'L07C02A05',
  default: {
    p01: {
      answer: [undefined, undefined],
      solution: [false, true],
      isCorrect: false,
      isSubmitted: false,
    },
  },
});

type TL07C02A05 = {
  p01: {
    answer: (boolean | undefined)[];
    solution: boolean[];
    isCorrect: boolean;
    isSubmitted: boolean;
  };
};
