import { atom } from 'recoil';

export const C02000113_store = atom({
  key: 'C02000113_store',
  default: {
    p01: {
      answer1: '',
      answer2: '',
      solution1: ['1', '5'],
      solution2: ['1', '5'],
      isCorrect: false,
      isSubmitted: false,
    },
  },
});
