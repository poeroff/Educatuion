import { atom } from 'recoil';

export const A05040504_store = atom({
  key: 'A05040504',
  default: {
    P01: {
      answer: [
        ['', ''],
        ['', ''],
      ],
      isSubmitted: false,
    },
    P02: {
      answer: [
        ['', ''],
        ['', ''],
        ['', ''],
        ['', ''],
      ],
      answer2: [['', '']],
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
