import { atom } from 'recoil';

export const A04_0002_05 = atom({
  key: 'A04000205',
  default: {
    p01: {
      answer: [-1, -1, -1, -1, -1, -1],
      solution: 6,
      isCorrect: false,
      isSubmitted: false,
    },
    p02: {
      answer: '',
      solution: ['6'],
      isCorrect: false,
      isSubmitted: false,
    },
    p03: {
      answer: '',
      solution: ['60'],
      isCorrect: false,
      isSubmitted: false,
    },
    p04: {
      canvasPath1: '',
      canvasDataURL: '',
      isSubmitted: false,
    },
  },
});
