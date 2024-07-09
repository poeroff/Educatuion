import { atom } from 'recoil';

export const L02C02A02 = atom({
  key: 'L02C02A02',
  default: {
    p01: {
      answer1: '',
      solution1: `What's the weather like today?`,
      isSubmitted: false,
    },
    p03: {
      answer1: '',
      solution1: `We're late. What are you doing?`,
      isSubmitted: false,
    },
  },
});
