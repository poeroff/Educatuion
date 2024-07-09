import { atom } from 'recoil';

export const L02C06A04b = atom<TAL02C06A04b>({
  key: 'L02C06A04b',
  default: {
    p02: {
      userInput: -1,
      isSubmitted: false,
      isCorrect: false,
      solution: 2,
    },
  },
});

type TAL02C06A04b = {
  p02: {
    userInput: number;
    isSubmitted: boolean;
    isCorrect: boolean;
    solution: number;
  };
};
