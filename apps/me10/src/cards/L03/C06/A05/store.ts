import { atom } from 'recoil';

export const L03C06A05 = atom<TAL03C06A05>({
  key: 'L03C06A05',
  default: {
    P03: {
      userInput: Array(1).fill(''),
      isSubmitted: false,
    },
    P02: {
      userInput: Array(1).fill(''),
      solution: ['Cathy'],
      isSubmitted: false,
      isCorrect: false,
      dropArr: ['Max', 'Cathy'],
    },
  },
});

type TAL03C06A05 = {
  P03: {
    userInput: string[];
    isSubmitted: boolean;
  };
  P02: {
    userInput: string[];
    solution: string[];
    isSubmitted: boolean;
    isCorrect: boolean;
    dropArr: string[];
  };
};
