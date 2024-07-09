import { atom } from 'recoil';

export const A03_0005_05 = atom({
  key: 'A03000505',
  default: {
    p01: {
      answer1: '',
      answer2: '',
      solution1: '8',
      solution2: '32',
      isCorrect: false,
      isSubmitted: false,
    },
    p02: {
      answer: '',
      solution: '8',
      isCorrect: false,
      isSubmitted: false,
    },
    p03: {
      canvasDataURL: '',
      isSubmitted: false,
    },
  },
});
