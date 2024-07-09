import { atom } from 'recoil';

export const L03C02A03a = atom({
  key: 'L03C02A03a',
  default: {
    p01: {
      userAnswer: ['', ''],
      isCorrect: false,
      isSubmitted: false,
    },
    p03: {
      userAnswer: 0,
      isCorrect: false,
      isSubmitted: false,
    },
  },
});
