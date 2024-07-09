import { atom } from 'recoil';

export const L01C06A05a = atom<TL01C06A05a>({
  key: 'L01C06A05a',
  default: {
    P02: {
      answer: '',
      isSubmitted: false,
    },
  },
});

type TL01C06A05a = {
  P02: {
    answer: string | undefined;
    isSubmitted: boolean;
  };
};
