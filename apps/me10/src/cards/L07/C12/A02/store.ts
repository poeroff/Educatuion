import { atom } from 'recoil';

export const wordArr = ['close', 'above', 'final', 'correct', 'bottom'];

export const L07C12A02 = atom({
  key: 'L07C12A02',
  default: {
    p01: {
      answer: '',
      solution: 'bottom',
      isCorrect: false,
      isSubmitted: false,
    },
    p02: {
      answer: '',
      solution: 'correct',
      isCorrect: false,
      isSubmitted: false,
    },
    p03: {
      answer: '',
      solution: 'above',
      isCorrect: false,
      isSubmitted: false,
    },
    p04: {
      answer: '',
      solution: 'close',
      isCorrect: false,
      isSubmitted: false,
    },
    p05: {
      answer: '',
      solution: 'final',
      isCorrect: false,
      isSubmitted: false,
    },
  },
});
