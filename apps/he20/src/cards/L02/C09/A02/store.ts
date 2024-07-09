import { atom } from 'recoil';

export const L02C09A02 = atom({
  key: 'L02C09A02',
  default: {
    p02: {
      answer: ['', ''],
      solution: ['refund', 'shirt'],
      results: [false, false],
      isCorrect: false,
      isSubmitted: false,
    },
    p03: {
      answer: '',
      solution: 'different',
      isCorrect: false,
      isSubmitted: false,
    },
    p04: {
      answer: '',
      solution: 'seen',
      isCorrect: false,
      isSubmitted: false,
    },
    p05: {
      answer: '',
      solution: 'bank account',
      isCorrect: false,
      isSubmitted: false,
    },
  },
});
