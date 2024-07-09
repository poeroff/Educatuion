import { atom } from 'recoil';

export const L02C06A04a = atom<TAL02C06A04a>({
  key: 'L02C06A04a',
  default: {
    p02: {
      userInput: '',
      isSubmitted: false,
    },
  },
});

type TAL02C06A04a = {
  p02: {
    userInput: string;
    isSubmitted: boolean;
  };
};
