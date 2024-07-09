import { atom } from 'recoil';

export const wordArr = ['record', 'alarm', 'comic', 'empty', 'social'];

export const L02C12A02 = atom({
  key: 'L02C12A02',
  default: {
    p01: {
      answer: '',
      solution: 'alarm',
      isCorrect: false,
      isSubmitted: false,
    },
    p02: {
      answer: '',
      solution: 'empty',
      isCorrect: false,
      isSubmitted: false,
    },
    p03: {
      answer: '',
      solution: 'record',
      isCorrect: false,
      isSubmitted: false,
    },
    p04: {
      answer: '',
      solution: 'social',
      isCorrect: false,
      isSubmitted: false,
    },
    p05: {
      answer: '',
      solution: 'comic',
      isCorrect: false,
      isSubmitted: false,
    },
  },
});
