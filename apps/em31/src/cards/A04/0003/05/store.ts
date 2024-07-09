import { atom } from 'recoil';

export const A04_0003_05 = atom({
  key: 'A04000305',
  default: {
    p01: {
      answer: ['', ''],
      solution: ['8', '4'],
      isCorrect: false,
      isSubmitted: false,
    },
    p02: {
      canvasDataURL: '',
      isSubmitted: false,
    },
  },
});
