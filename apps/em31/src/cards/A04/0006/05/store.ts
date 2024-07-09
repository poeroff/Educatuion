import { atom } from 'recoil';

export const A04000605 = atom({
  key: 'A04000605',
  default: {
    p01: {
      answer: ['', '', '', ''],
      solution: ['1', '2', '1', '9'],
      isCorrect: false,
      isSubmitted: false,
    },
    p02: {
      canvasPath1: '',
      isSubmitted: false,
    },
  },
});
