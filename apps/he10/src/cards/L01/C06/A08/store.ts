import { atom } from 'recoil';

export const L01C06A08 = atom<TL01C06A08>({
  key: 'L01C06A08',
  default: {
    p01: {
      answer1: '',
      isSubmitted: false,
    },
  },
});

type TL01C06A08 = {
  p01: {
    answer1: string;
    isSubmitted: boolean;
  };
};
