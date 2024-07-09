import { atom } from 'recoil';

export const wordArr = ['miss', 'instead', 'put', 'busy', 'trip'];

export const L04C12A02 = atom({
  key: 'L04C12A02',
  default: {
    p01: {
      answer: '',
      solution: 'trip',
      isCorrect: false,
      isSubmitted: false,
    },
    p02: {
      answer: '',
      solution: 'miss',
      isCorrect: false,
      isSubmitted: false,
    },
    p03: {
      answer: '',
      solution: 'busy',
      isCorrect: false,
      isSubmitted: false,
    },
    p04: {
      answer: '',
      solution: 'instead',
      isCorrect: false,
      isSubmitted: false,
    },
    p05: {
      answer: '',
      solution: 'put',
      isCorrect: false,
      isSubmitted: false,
    },
  },
});
