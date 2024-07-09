import { atom } from 'recoil';

export const C01000720_store = atom({
  key: 'C01000720',
  default: {
    P02: {
      answer: ['', '', '', '', '', '', '', ''],
      solution: ['7', '9', '2', '284', '6', '7', '5', '538'],
      isCorrect: false,
      isSubmitted: false,
    },
    P03: {
      answer: ['', ''],
      solution: ['158', '269'],
      isCorrect: false,
      isSubmitted: false,
    },
    p04: {
      answer: '',
      solution: '124',
      isCorrect: false,
      isSubmitted: false,
    },
  },
});
