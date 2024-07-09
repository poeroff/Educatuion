import { atom } from 'recoil';

export const L04C08A04 = atom<TL04C08A04>({
  key: 'L04C08A04',
  default: {
    P02: {
      answer: '',
      isSubmitted: false,
    },
  },
});

type TL04C08A04 = {
  P02: {
    answer: string;
    isSubmitted: boolean;
  };
};
