import { atom } from 'recoil';

export const L03C06A04 = atom<TAL03C06A04>({
  key: 'L03C06A04',
  default: {
    P02: {
      userInput: undefined,
      isSubmitted: false,
      solution: false,
      isCorrect: false,
    },
  },
});

type TAL03C06A04 = {
  P02: {
    userInput: boolean | undefined;
    isSubmitted: boolean;
    solution: boolean;
    isCorrect: boolean;
  };
};
