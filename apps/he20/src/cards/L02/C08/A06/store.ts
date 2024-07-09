import { atom } from 'recoil';

export const L02C08A06 = atom<TL02C08A06>({
  key: 'L02C08A06',
  default: {
    p01: {
      values: ['', '', ''],
      solution: ['must', 'should', 'exercise'],
      isCorrect: false,
      isSubmitted: false,
    },
  },
});

type TL02C08A06 = {
  p01: {
    values: Array<string>;
    solution: Array<string>;
    isCorrect: boolean;
    isSubmitted: boolean;
  };
};
