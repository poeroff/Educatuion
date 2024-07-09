import { atom } from 'recoil';

export const B01000270 = atom({
  key: 'B01000270',
  default: {
    p01: {
      answer1: '',
      answer2: '',
      solution1: '324+215=539',
      solution2: '539',
      isCorrect: false,
      isCorrect1: false,
      isCorrect2: false,
      isSubmitted: false,
    },
  },
});
