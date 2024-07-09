import { atom } from 'recoil';

export const C02000120_store = atom({
  key: 'C02000120',
  default: {
    P02: {
      isCorrect: false,
      isSubmitted: false,
      answer: [false, false, false, false],
      solution: [true, false, false, true],
    },
  },
});
