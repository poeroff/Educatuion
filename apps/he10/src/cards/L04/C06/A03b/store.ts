import { atom } from 'recoil';

export const L04C06A03b = atom<TL04C06A03b>({
  key: 'L04C06A03b',
  default: {
    p02: {
      answer: 0,
      solution: 1,
      isCorrect: false,
      isSubmitted: false,
    },
  },
});

type TL04C06A03b = {
  p02: {
    answer: number;
    solution: number;
    isCorrect: boolean;
    isSubmitted: boolean;
  };
};
