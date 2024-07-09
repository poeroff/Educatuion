import { atom } from 'recoil';

export const L01_C06_A05 = atom({
  key: 'L01C06A05',
  default: {
    p02: {
      answer1: {
        value: '',
        solution: '2',
        isCorrect: false,
      },

      answer2: {
        value: '',
        solution: '1',
        isCorrect: false,
      },
      answer3: {
        value: '',
        solution: '3',
        isCorrect: false,
      },
      isAllCorrect: false,
      isSubmitted: false,
    },
  },
});
