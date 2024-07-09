import { atom } from 'recoil';

export const C02000111_store = atom({
  key: 'C02000111',
  default: {
    p01: {
      answers: ['', ''],
      solutions: ['변', '꼭짓점'],
      isCorrect: false,
      isSubmitted: false,
    },
  },
});
