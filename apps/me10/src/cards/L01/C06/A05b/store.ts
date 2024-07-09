import { atom } from 'recoil';

export const L01C06A05b = atom<TL01C06A05b>({
  key: 'L01C06A05b',
  default: {
    P02: {
      answer: undefined,
      solution: true,
      isSubmitted: false,
      isCorrect: false,
    },
  },
});

type TL01C06A05b = {
  P02: {
    answer: boolean | undefined;
    solution: boolean;
    isSubmitted: boolean;
    isCorrect: boolean;
  };
};
