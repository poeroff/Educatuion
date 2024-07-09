import { atom } from 'recoil';

export const L04C04A02 = atom({
  key: 'L04C04A02',
  default: {
    p01: {
      answer: 0,
      solution: 2,
      isCorrect: false,
      isSubmitted: false,
    },
    p02: {
      answer1: '',
      answer2: '',
      answer3: '',
      solution1: 'decreasing',
      solution2: 'stop',
      solution3: 'Recover',
      isCorrect: false,
      isSubmitted: false,
    },
  },
});
