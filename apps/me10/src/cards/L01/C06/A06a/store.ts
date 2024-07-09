import { atom } from 'recoil';

export const L01C06A06a = atom<TL01C06A06a>({
  key: 'L01C06A06a',
  default: {
    p02: {
      userAnswer: {
        value1: '',
      },
      isSubmitted: false,
    },
  },
});

type TL01C06A06a = {
  p02: {
    userAnswer: {
      [key: string]: string;
    };
    isSubmitted: boolean;
  };
};
