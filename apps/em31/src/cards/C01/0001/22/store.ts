import { atom } from 'recoil';

export const C01_0001_22 = atom({
  key: 'C01000122',
  default: {
    p02: {
      answer1: {
        value: '',
        isCorrect: false,
      },
      answer2: {
        value: '',
        isCorrect: false,
      },
      answer3: {
        value: '',
        isCorrect: false,
      },
      isSubmitted: false,
    },
  },
});
