import { atom } from 'recoil';

export const A04_0005_07 = atom({
  key: 'A04000507',
  default: {
    p01: {
      answer1: {
        value: '',
        isCorrect: false,
      },
      solution1: ['13×6=78', '6×13=78', '13×6', '6×13'],
      answer2: {
        value: '',
        isCorrect: false,
      },
      solution2: '78',
      isSubmitted: false,
    },
  },
});
