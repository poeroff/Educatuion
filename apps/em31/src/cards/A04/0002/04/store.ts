import { atom } from 'recoil';

export const A04_0002_04 = atom({
  key: 'A04000204',
  default: {
    p01: {
      answer: '',
      solution: ['20+20+20+20', '20+20+20+20=80', '20 x 4', '4 x 20', '20 x 4 = 80', '4 x 20 = 80'],
      isCorrect: false,
      isSubmitted: false,
    },
    p02: {
      answer1: '',
      answer2: '',
      solution1: '8',
      solution2: '80',
      isCorrect: false,
      isSubmitted: false,
    },
    p03: {
      answer1: '',
      answer2: '',
      answer3: '',
      solution1: ['20', '4'],
      solution2: ['4', '20'],
      solution3: '80',
      isCorrect: false,
      isSubmitted: false,
    },
  },
});
