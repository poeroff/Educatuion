import { atom } from 'recoil';

export const L02C06A06 = atom({
  key: 'L02C06A06',
  default: {
    p02: {
      answer1: {
        value: '',
        solution: 'missing',
        isCorrect: false,
      },
      answer2: {
        value: '',
        solution: 'names',
        isCorrect: false,
      },
      isAllCorrect: false,
      isSubmitted: false,
    },
  },
});
