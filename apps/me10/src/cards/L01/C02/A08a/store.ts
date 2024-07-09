import { atom } from 'recoil';

export const L01C02A08a = atom({
  key: 'L01C02A08a',
  default: {
    p01: {
      answer1: '',
      answer2: '',
      solution1: '2',
      solution2: 'favorite movie',
      isCorrect: false,
      isSubmitted: false,
    },
    p02: {
      answer1: '',
      answer2: '',
      solution1: ['He likes comedies.', 'Dylan likes comedies.'],
      solution2: ['She likes action movies.', 'Yuna likes action movies.'],
      isCorrect: false,
      isSubmitted: false,
    },
  },
});
