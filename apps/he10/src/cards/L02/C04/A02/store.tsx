import { atom } from 'recoil';

export const L02C04A02 = atom({
  key: 'L02C04A02',
  default: {
    p01: {
      answer: '' as unknown as number,
      solution: 1,
      isCorrect: false,
      isSubmitted: false,
    },
    p02: {
      answer1: '',
      answer2: '',
      solution1: 'friendship',
      solution2: 'cultures',
      isSubmitted: false,
    },
  },
});
