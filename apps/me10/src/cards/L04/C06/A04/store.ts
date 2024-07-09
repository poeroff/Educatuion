import { atom } from 'recoil';

export const L04C06A04 = atom<TL04C06A04>({
  key: 'L04C06A04',
  default: {
    p02: {
      answer: '',
      isSubmitted: false,
    },
    p03: {
      answer: '',
      solution: 'I',
      isSubmitted: false,
      isCorrect: false,
    },
  },
});

type TL04C06A04 = {
  p02: {
    answer: string;
    isSubmitted: boolean;
  };
  p03: {
    answer: string;
    solution: string;
    isSubmitted: boolean;
    isCorrect: boolean;
  };
};
