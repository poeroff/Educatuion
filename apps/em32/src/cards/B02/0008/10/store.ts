import { atom } from 'recoil';

export const B02_0008_10 = atom({
  key: 'B02000810',
  default: {
    p02: {
      answer1: {
        value: '',
      },
      answer2: {
        value: '',
      },
      answer3: {
        value: '',
      },
      solution1: '5',
      solution2: '5',
      solution3: '10',
      isCorrect: false,
      isSubmitted: false,
    },
    p03: {
      answer1: {
        value: '',
      },
      answer2: {
        value: '',
      },
      answer3: {
        value: '',
      },
      solution1: '10',
      solution2: '10',
      solution3: '20',
      isCorrect: false,
      isSubmitted: false,
    },
    p04: {
      answer: 0,
      solution: 2,
      isCorrect: false,
      isSubmitted: false,
    },
    p05: {
      answer: 0,
      solution: 40,
      isCorrect: false,
      isSubmitted: false,
    },
  },
});
