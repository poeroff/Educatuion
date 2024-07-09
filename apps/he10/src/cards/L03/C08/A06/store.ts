import { atom } from 'recoil';

export const L03C08A06 = atom<TL03C08A06>({
  key: 'L03C08A06',
  default: {
    p01: {
      values: ['', '', ''],
      solution: ['miss', 'do we think', 'to enjoy'],
      isCorrect: false,
      isSubmitted: false,
    },
  },
});

type TL03C08A06 = {
  p01: {
    values: Array<string>;
    solution: Array<string>;
    isCorrect: boolean;
    isSubmitted: boolean;
  };
};
