import { atom } from 'recoil';

export const L07C06A04 = atom<TL07C06A04>({
  key: 'L07C06A04',
  default: {
    p02: {
      answer: '',
      isSubmitted: false,
    },
    p03: {
      answer: '',
      solution: 'I',
      isSubmitted: false,
    },
  },
});

type TL07C06A04 = {
  p02: {
    answer: string;
    isSubmitted: boolean;
  };
  p03: {
    answer: string;
    solution: string;
    isSubmitted: boolean;
  };
};
