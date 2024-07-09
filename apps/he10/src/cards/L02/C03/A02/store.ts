import { atom } from 'recoil';

export const L02C03A02 = atom({
  key: 'L02C03A02',
  default: {
    p01: {
      answer: 0,
      solution: 1,
      isCorrect: false,
      isSubmitted: false,
    },
    p03: {
      answer: ['', '', ''],
      solution: ['culture', 'Gifts', 'head'],
      isCorrect: false,
      isSubmitted: false,
    },
  },
});
