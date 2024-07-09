import { atom } from 'recoil';

export const L01C06A04b = atom<TL01C06A04b>({
  key: 'L01C06A04',
  default: {
    p02: {
      answer: 0,
      solution: 1,
      isCorrect: false,
      isSubmitted: false,
    },
  },
});

type TL01C06A04b = {
  p02: {
    answer: number;
    solution: number;
    isCorrect: boolean;
    isSubmitted: boolean;
  };
};
