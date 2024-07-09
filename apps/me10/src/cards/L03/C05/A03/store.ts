import { atom } from 'recoil';

export const L03C05A03 = atom({
  key: 'L03C05A03',
  default: {
    p01: {
      dropArr: ['pass the ball', 'jump into the air', 'go over the fence', 'bump into each other'],
      answer: ['', ''],
      solution: ['jump into the air', 'bump into each other'],
      isCorrect: false,
      isSubmitted: false,
    },
    p02: {
      dropArr: ['pass the ball', 'jump into the air', 'go over the fence', 'bump into each other'],
      answer: ['', ''],
      solution: ['pass the ball', 'go over the fence'],
      isCorrect: false,
      isSubmitted: false,
    },
  },
});
