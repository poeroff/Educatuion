import { atom } from 'recoil';

export const L04C06A04b = atom<TL04C06A04b>({
  key: 'L04C06A04b',
  default: {
    P02: {
      answer: '',
      isSubmitted: false,
    },
  },
});

type TL04C06A04b = {
  P02: {
    answer: string;
    isSubmitted: boolean;
  };
};
