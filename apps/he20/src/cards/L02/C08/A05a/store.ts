import { atom } from 'recoil';

export const L02C08A05a = atom<TL02C08A05a>({
  key: 'L02C08A05a',
  default: {
    p01: {
      answer: '',
      isSubmitted: false,
    },
    p02: {
      answer: '',
      isSubmitted: false,
    },
    p03: {
      answer: '',
      isSubmitted: false,
    },
    p04: {
      answer: '',
      isSubmitted: false,
    },
    p05: {
      answer: '',
      isSubmitted: false,
    },
  },
});

type TL02C08A05a = {
  [key: string]: {
    answer: string;
    isSubmitted: boolean;
  };
};
