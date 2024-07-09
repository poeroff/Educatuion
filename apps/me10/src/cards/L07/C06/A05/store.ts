import { atom } from 'recoil';

export const L07C06A05 = atom<TAL07C06A05>({
  key: 'L07C06A05',
  default: {
    P02: {
      userInput: Array(2).fill(''),
      solution: ['Antarctica', 'Sahara'],
      isSubmitted: false,
      isCorrect: false,
    },
  },
});

type TAL07C06A05 = {
  P02: {
    userInput: string[];
    solution: string[];
    isSubmitted: boolean;
    isCorrect: boolean;
  };
};
