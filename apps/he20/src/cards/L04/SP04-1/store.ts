import { atom } from 'recoil';

export const SP04_1 = atom({
  key: 'SP04_1',
  default: {
    p05: {
      answer: 0,
      solution: 2,
      isCorrect: false,
      isSubmitted: false,
    },
    p06: {
      answer: 0,
      solution: 1,
      isCorrect: false,
      isSubmitted: false,
    },
    p07: {
      answer: [] as number[],
      solution: [2, 3, 0, 4, 1],
      isCorrect: false,
      isSubmitted: false,
    },
    p08: {
      answer: [] as number[],
      solution: [2, 3, 0, 4, 1],
      isCorrect: false,
      isSubmitted: false,
    },
    p09: {
      answer: 0,
      solution: 1,
      isCorrect: false,
      isSubmitted: false,
    },
    p10: {
      answer: 0,
      solution: 3,
      isCorrect: false,
      isSubmitted: false,
    },
    p11: {
      answer: 0,
      solution: 3,
      isCorrect: false,
      isSubmitted: false,
    },
  },
});

export default SP04_1;
