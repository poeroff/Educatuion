import { atom } from 'recoil';

export const L06C06A05 = atom<TAL06C06A05>({
  key: 'L06C06A05',
  default: {
    P02: {
      userInput: Array(1).fill(''),
      solution: ['dream job'],
      isSubmitted: false,
      isCorrect: false,
    },
  },
});

type TAL06C06A05 = {
  P02: {
    userInput: string[];
    solution: string[];
    isSubmitted: boolean;
    isCorrect: boolean;
  };
};
