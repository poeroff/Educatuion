import { atom } from 'recoil';

export const L02C06A04 = atom<TAL02C06A04>({
  key: 'L02C06A04',
  default: {
    P02: {
      userInput: Array(3).fill(''),
      isSubmitted: false,
    },
  },
});

type TAL02C06A04 = {
  P02: {
    userInput: string[];
    isSubmitted: boolean;
  };
};
