import { atom } from 'recoil';

export const C02000112_store = atom({
  key: 'C02000112',
  default: {
    p01: {
      answers: ['', ''],
      solutions: ['3', '4'],
      isCorrect: false,
      isSubmitted: false,
    },
  },
});
