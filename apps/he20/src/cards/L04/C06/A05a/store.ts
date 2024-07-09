import { atom } from 'recoil';

export const L04C06A05a = atom<TL04C06A05a>({
  key: 'L04C06A05a',
  default: {
    p02: {
      answer: '',
      isSubmitted: false,
    },
  },
});

type TL04C06A05a = {
  p02: {
    answer: string;
    isSubmitted: boolean;
  };
};
