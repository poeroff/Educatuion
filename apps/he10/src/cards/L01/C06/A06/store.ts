import { atom } from 'recoil';

export const L01C06A06 = atom<TL01C06A06>({
  key: 'L01C06A06',
  default: {
    p02: {
      answer1: '',
      answer2: '',
      isSubmitted: false,
    },
  },
});

type TL01C06A06 = {
  p02: {
    answer1: string;
    answer2: string;
    isSubmitted: boolean;
  };
};
