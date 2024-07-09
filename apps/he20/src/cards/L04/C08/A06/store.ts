import { atom } from 'recoil';

export const L04C08A06 = atom<TL04C08A06>({
  key: 'L04C08A06',
  default: {
    p01: {
      values: ['', ''],
      solution: ['(3) which', 'that'],
      isCorrect: false,
      isSubmitted: false,
    },
  },
});

type TL04C08A06 = {
  p01: {
    values: Array<string>;
    solution: Array<string>;
    isCorrect: boolean;
    isSubmitted: boolean;
  };
};
