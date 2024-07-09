import { atom } from 'recoil';

export const L02C06A07b = atom<TL02C06A07b>({
  key: 'L02C06A07b',
  default: {
    p02: {
      answer: 0,
      solution: 2,
      isCorrect: false,
      isSubmitted: false,
    },
  },
});

type TL02C06A07b = {
  p02: {
    answer: number;
    solution: number;
    isCorrect: boolean;
    isSubmitted: boolean;
  };
};
