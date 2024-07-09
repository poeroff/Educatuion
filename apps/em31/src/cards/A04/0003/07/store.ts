import { atom } from 'recoil';

export const A04_0003_07 = atom({
  key: 'A04000307',
  default: {
    p01: {
      answer1: {
        value: '',
        isCorrect: false,
      },
      solution1: ['32×3=96', '3×32=96', '3×32', '32×3', '96'],
      answer2: {
        value: '',
        isCorrect: false,
      },
      solution2: '96',
      isSubmitted: false,
    },
    p02: {
      canvasDataURL: '',
      answer: '',
      solution: '84',
      isSubmitted: false,
      isCorrect: false,
    },
  },
});
