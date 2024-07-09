import { atom } from 'recoil';

export const L01C02A03 = atom({
  key: 'L01C02A03',
  default: {
    p01: {
      answer: 0,
      solution: 3,
      isCorrect: false,
      isSubmitted: false,
    },
    p03: {
      answer1: '',
      answer2: '',
      answer3: '',
      solution1: '14',
      solution2: 'studio',
      solution3: '500',
      isCorrect: false,
      isSubmitted: false,
    },
  },
});
