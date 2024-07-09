import { atom } from 'recoil';

export const L05C06A05 = atom<TAL05C06A05>({
  key: 'L05C06A05',
  default: {
    P02: {
      userInput: Array(1).fill(''),
      solution: ['a'],
      isSubmitted: false,
      isCorrect: false,
    },
  },
});

type TAL05C06A05 = {
  P02: {
    userInput: string[];
    solution: string[];
    isSubmitted: boolean;
    isCorrect: boolean;
  };
};
