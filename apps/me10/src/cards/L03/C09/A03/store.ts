import { atom } from 'recoil';

export const L03C09A03 = atom({
  key: 'L03C09A03',
  default: {
    p01: {
      answer: ['', '', '', ''],
      solution: ['played', `didn't (did not) score`, 'won', 'said'],
      solution2: [`didn't score`, `did not score`],
      isCorrect: false,
      isSubmitted: false,
    },
  },
});
