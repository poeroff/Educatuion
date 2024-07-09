import { atom } from 'recoil';

export const L01C03A02a = atom<{
  [key: string]: {
    isSubmitted: boolean;
    answers: string[];
    isCorrect: boolean;
  };
}>({
  key: 'L01C03A02a',
  default: {
    p01: {
      isSubmitted: false,
      answers: ['', ''],
      isCorrect: false,
    },
    p03: {
      isSubmitted: false,
      answers: ['', '', '', '', '', '', '', ''],
      isCorrect: false,
    },
  },
});
