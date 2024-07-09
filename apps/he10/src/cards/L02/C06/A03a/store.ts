import { atom } from 'recoil';

export const L02C06A03a = atom<TL02C06A03a>({
  key: 'L02C06A03a',
  default: {
    p02: {
      answer: {
        value1: '',
      },
      isSubmitted: false,
    },
  },
});

type TL02C06A03a = {
  p02: {
    answer: {
      [key: string]: string;
    };
    isSubmitted: boolean;
  };
};
