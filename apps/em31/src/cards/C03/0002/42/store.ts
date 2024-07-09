import { atom } from 'recoil';

export const C03_0002_42 = atom({
  key: 'C03000242',
  default: {
    p01: {
      answer1: {
        value: '',
        solution: '7',
        isCorrect: false,
      },
      answer2: {
        value: '',
        solution: '8',
        isCorrect: false,
      },
      isAllCorrect: false,

      isSubmitted: false,
    },
  },
});
