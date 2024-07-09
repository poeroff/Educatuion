import { atom } from 'recoil';

export const B01000760_store = atom({
  key: 'B01000760',
  default: {
    P01: {
      answer: ['', '', '', '', '', '', '', ''],
      solution: ['7', '9', '2', '284', '6', '7', '5', '538'],
      isCorrect: false,
      isSubmitted: false,
    },
    P02: {
      answer: ['', ''],
      solution: ['158', '269'],
      isCorrect: false,
      isSubmitted: false,
    },
    p03: {
      answer: '',
      solution: '124',
      isCorrect: false,
      isSubmitted: false,
    },
  },
});