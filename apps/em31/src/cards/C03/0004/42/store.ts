import { atom } from 'recoil';

export const C03000442_store = atom<object>({
  key: 'C03000442',
  default: {
    p01: {
      answer1: ['', '', ''],
      answer2: ['', '', '', ''],
      answer3: ['', '', '', ''],
      solution1: [2, 1, 6],
      solution2: [1, 6, 2, 8],
      solution3: [1, 6, 8, 2],
      isCorrect: false,
      isSubmitted: false,
    },
  },
});
