import { atom } from 'recoil';

export const L02C08A07 = atom<TAL02C08A07>({
  key: 'L02C08A07',
  default: {
    p02: {
      userInput: '',
      isSubmitted: false,
    },
  },
});

type TAL02C08A07 = {
  p02: {
    userInput: string;
    isSubmitted: boolean;
  };
};
