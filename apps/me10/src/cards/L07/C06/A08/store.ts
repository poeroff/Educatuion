import { atom } from 'recoil';

export const L07C06A08 = atom<TL07C06A08>({
  key: 'L07C06A08',
  default: {
    p02: {
      answer: '',
      isSubmitted: false,
    },
  },
});

type TL07C06A08 = {
  p02: {
    answer: string;
    isSubmitted: boolean;
  };
};
