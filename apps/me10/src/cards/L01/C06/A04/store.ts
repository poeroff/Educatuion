import { atom } from 'recoil';

export const L01C06A04 = atom<TL01C06A04>({
  key: 'L01C06A04',
  default: {
    p02: {
      answer: '',
      isSubmitted: false,
    },
  },
});

type TL01C06A04 = {
  p02: {
    answer: string | undefined;
    isSubmitted: boolean;
  };
};
