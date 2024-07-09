import { atom } from 'recoil';

export const C03_0001_13 = atom<TC03000113>({
  key: 'C03000113',
  default: {
    p01: {
      answers: ['', ''],
      solutions: ['8×6=48', '48'],
      isSubmitted: false,
      isCorrect: false,
    },
  },
});

type TC03000113 = {
  p01: {
    answers: string[];
    solutions: string[];
    isSubmitted: boolean;
    isCorrect: boolean;
  };
};
