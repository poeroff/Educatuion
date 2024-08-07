import { atom } from 'recoil';

export const L02C06A06a = atom<TL02C06A06a>({
  key: 'L02C06A06a',
  default: {
    p02: {
      userAnswer: {
        value1: '',
      },
      isSubmitted: false,
    },
  },
});

type TL02C06A06a = {
  p02: {
    userAnswer: {
      [key: string]: string;
    };
    isSubmitted: boolean;
  };
};
