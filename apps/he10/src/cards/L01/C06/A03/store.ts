import { atom } from 'recoil';

export const L01C06A03 = atom<TL01C06A03>({
  key: 'L01C06A03',
  default: {
    p02: {
      answer: 0,
      solution: 3,
      isCorrect: false,
      isSubmitted: false,
    },
  },
});

type TL01C06A03 = {
  p02: {
    answer: number;
    solution: number;
    isCorrect: boolean;
    isSubmitted: boolean;
  };
};
