import { atom } from 'recoil';

export const L01C02A08b = atom({
  key: 'L01C02A08b',
  default: {
    p01: {
      answer1: '',
      answer2: '',
      solution1: '2',
      solution2: 'Wonder Woman',
      isCorrect: false,
      isSubmitted: false,
    },
    p02: {
      answer1: undefined as unknown as boolean,
      answer2: undefined as unknown as boolean,
      solution1: true,
      solution2: false,
      isSubmitted: false,
      isCorrect: false,
    },
  },
});
