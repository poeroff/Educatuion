import { atom } from 'recoil';

export const wordArr = ['advice', 'trash', 'fill', 'secondhand', 'join'];

export const L05C12A02 = atom({
  key: 'L05C12A02',
  default: {
    p01: {
      answer: '',
      solution: 'join',
      isCorrect: false,
      isSubmitted: false,
    },
    p02: {
      answer: '',
      solution: 'trash',
      isCorrect: false,
      isSubmitted: false,
    },
    p03: {
      answer: '',
      solution: 'advice',
      isCorrect: false,
      isSubmitted: false,
    },
    p04: {
      answer: '',
      solution: 'fill',
      isCorrect: false,
      isSubmitted: false,
    },
    p05: {
      answer: '',
      solution: 'secondhand',
      isCorrect: false,
      isSubmitted: false,
    },
  },
});
