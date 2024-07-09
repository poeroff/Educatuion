import { atom } from 'recoil';

export const L01C09A06b = atom({
  key: 'L01C09A06b',
  default: {
    p01: {
      dropArr: ['eat', 'eats', 'drinks', "doesn't eat"],
      answer: ['', '', ''],
      solution: ['drinks', 'eat', "doesn't eat"],
      isCorrect: false,
      isSubmitted: false,
    },
  },
});
