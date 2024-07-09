import { atom } from 'recoil';

export const L04C03A02b = atom({
  key: 'L04C03A02b',
  default: {
    p01: {
      answer: 0,
      solution: 3,
      isCorrect: false,
      isSubmitted: false,
    },
    p03: {
      dropArr: [
        ['small', 'large'],
        ['call', 'visit our website'],
      ],
      answer: ['', ''],
      solution: ['large', 'visit our website'],
      isCorrect: false,
      isSubmitted: false,
    },
  },
});
