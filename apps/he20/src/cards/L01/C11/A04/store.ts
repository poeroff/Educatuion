import { atom } from 'recoil';

export const L01C11A04 = atom({
  key: 'L01C11A04',
  default: {
    p01: {
      answer: -1,
      solution: 2,
      isCorrect: false,
      isSubmitted: false,
    },
    p02: {
      answer: ['', '', ''],
      solution: [
        { num: '(A)', text: 'had been' },
        { num: '(B)', text: 'filled' },
        { num: '(C)', text: 'active' },
      ],
      isCorrect: [false, false, false],
      isSubmitted: false,
    },
  },
});
