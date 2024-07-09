import { atom } from 'recoil';

export const L01C12A03 = atom({
  key: 'L01C12A03',
  default: {
    p01: {
      answer1: '',
      solution1: 'English',
      isCorrect: false,
      isSubmitted: false,
    },
    p03: {
      answer1: '',
      answer2: '',
      solution1: 'math',
      solution2: 'science',
      isCorrect: false,
      isSubmitted: false,
    },
  },
});
