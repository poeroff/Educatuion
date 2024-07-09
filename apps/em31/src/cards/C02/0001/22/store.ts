import { atom } from 'recoil';

export const C02000122_store = atom({
  key: 'C02000122',
  default: {
    p02: {
      answer: '',
      solution: '3',
      isCorrect: false,
      isSubmitted: false,
    },
  },
});
