import { atom } from 'recoil';

export const C03000441_store = atom<object>({
  key: 'C03000441',
  default: {
    p01: {
      answer1: ['', '', ''],
      answer2: ['', '', ''],
      answer3: ['', '', ''],
      answer4: ['', '', ''],
      solution1: [8, 3, 24],
      solution2: [3, 8, 24],
      solution3: [24, 8, 3],
      solution4: [24, 3, 8],
      isCorrect: false,
      isSubmitted: false,
    },
  },
});
