import { atom } from 'recoil';

export const L05C06A04 = atom<TL05C06A04>({
  key: 'L05C06A04',
  default: {
    p02: {
      answer: '',
      isSubmitted: false,
    },
  },
});

type TL05C06A04 = {
  p02: {
    answer: string;
    isSubmitted: boolean;
  };
};
