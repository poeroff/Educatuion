import { atom } from 'recoil';

export const L04C06A05 = atom<TAL04C06A05>({
  key: 'L04C06A05',
  default: {
    P02: {
      userInput: Array(1).fill(''),
      solution: ['seafood restaurant'],
      isSubmitted: false,
      isCorrect: false,
    },
  },
});

type TAL04C06A05 = {
  P02: {
    userInput: string[];
    solution: string[];
    isSubmitted: boolean;
    isCorrect: boolean;
  };
};
