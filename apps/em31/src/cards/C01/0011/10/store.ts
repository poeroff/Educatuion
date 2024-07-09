import { atom } from 'recoil';

export const C01001110_store = atom({
  key: 'C01001110',
  default: {
    P01: {
      answer1: '',
      answer2: '',
      solution1: '652',
      solution2: '295',
      canvasDataURL: '',
      isCorrect: false,
      isSubmitted: false,
    },
    P02: {
      answer: '',
      solution: '947',
      canvasDataURL: '',
      isCorrect: false,
      isSubmitted: false,
    },
    P03: {
      answer: '',
      solution: '469',
      canvasDataURL: '',
      isCorrect: false,
      isSubmitted: false,
    },
  },
});
