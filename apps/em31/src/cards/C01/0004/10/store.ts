import { atom } from 'recoil';

export const C01_0004_10 = atom({
  key: 'C01_0004_10',
  default: {
    p01: {
      answer1: '',
      answer2: '',
      solution1: ['356+198=554', '198+356=554'],
      solution2: '554',
      isCorrect: false,
      isSubmitted: false,
    },
    p02: {
      answer1: '',
      answer2: '',
      answer3: '',
      answer4: '',
      answer5: 0,
      solution1: '1',
      solution2: '2',
      solution3: '3',
      solution4: '1',
      solution5: 3,
      isCorrect: false,
      isSubmitted: false,
    },
    p03: {
      answer1: '',
      solution1: '1090',
      isCorrect: false,
      isSubmitted: false,
    },
  },
});
