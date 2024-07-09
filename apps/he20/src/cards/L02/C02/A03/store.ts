import { atom } from 'recoil';

export const L02C02A03 = atom({
  key: 'L02C02A03',
  default: {
    p01: {
      answer: ['', '', '', ''],
      solution: ['20', '10', '5', '35'],
      isSubmitted: false,
    },
    p03: {
      answer: 0,
      solution: 3,
      isSubmitted: false,
    },
  },
});
