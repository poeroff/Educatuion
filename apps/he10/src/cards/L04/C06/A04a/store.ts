import { atom } from 'recoil';

export const L04C06A04a = atom<TL04C06A04a>({
  key: 'L04C06A04a',
  default: {
    P02: {
      answer: '',
      isSubmitted: false,
    },
  },
});

type TL04C06A04a = {
  P02: {
    answer: string;
    isSubmitted: boolean;
  };
};
