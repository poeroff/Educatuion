import { atom } from 'recoil';

export const C03_0001_11 = atom<TC03000111>({
  key: 'C03000111',
  default: {
    p01: {
      answers: ['', '', '', ''],
      solutions: ['3', '21', '3', '21'],
      isSubmitted: false,
      isCorrect: false,
    },
  },
});

type TC03000111 = {
  p01: {
    answers: string[];
    solutions: string[];
    isSubmitted: boolean;
    isCorrect: boolean;
  };
};
