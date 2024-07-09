import { atom } from 'recoil';

export const C03000410_store = atom<object>({
  key: 'C03000410',
  default: {
    p01: {
      answer1: ['', '', ''],
      solution1: [1, 0, 2],
      isCorrect: false,
      isSubmitted: false,
    },
    p02: {
      answer1: ['', '', ''],
      answer2: ['', '', ''],
      answer3: ['', '', ''],
      answer4: ['', '', ''],
      solution1: [5, 4, 20],
      solution2: [4, 5, 20],
      solution3: [20, 5, 4],
      solution4: [20, 4, 5],
      isCorrect: false,
      isSubmitted: false,
    },
    p03: {
      answer1: ['', '', ''],
      answer2: ['', '', '', ''],
      answer3: ['', '', '', ''],
      solution1: [9, 6, 3],
      solution2: [6, 3, 7, 9],
      solution3: [6, 3, 9, 7],
      isCorrect: false,
      isSubmitted: false,
    },
  },
});
