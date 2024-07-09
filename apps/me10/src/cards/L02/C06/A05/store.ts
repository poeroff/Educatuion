import { atom } from 'recoil';

export const L02C06A05 = atom<TAL02C06A05>({
  key: 'L02C06A05',
  default: {
    P02: {
      userInput: Array(1).fill(''),
      isSubmitted: false,
    },
    P03: {
      userInput: Array(1).fill(''),
      solution: ['AI Joe'],
      isSubmitted: false,
      isCorrect: false,
    },
  },
});

type TAL02C06A05 = {
  P02: {
    userInput: string[];
    isSubmitted: boolean;
  };
  P03: {
    userInput: string[];
    solution: string[];
    isSubmitted: boolean;
    isCorrect: boolean;
  };
};
