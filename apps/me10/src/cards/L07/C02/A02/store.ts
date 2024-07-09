import { atom } from 'recoil';

export const L07C02A02 = atom({
  key: 'L07C02A02',
  default: {
    p01: {
      answer1: '',
      solution1: `Do you know about this?`,
      isSubmitted: false,
    },
    p03: {
      answer1: '',
      solution1: `Can you tell me more about it?`,
      isSubmitted: false,
    },
  },
});
