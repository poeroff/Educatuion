import { atom } from 'recoil';

export const A04_0002_07 = atom({
  key: 'A04000207',
  default: {
    p01: {
      answer1: {
        value: '',
        isCorrect: false,
      },
      solution1: ['20x3=60', '3x20=60', '3x20', '20x3'],
      answer2: {
        value: '',
        isCorrect: false,
      },
      solution2: '60',
      isSubmitted: false,
    },
  },
});
