import { atom } from 'recoil';

export const L04C06A06b = atom<TL04C06A06b>({
  key: 'L04C06A06b',
  default: {
    P02: {
      answer: undefined,
      solution: true,
      isSubmitted: false,
      isCorrect: false,
    },
  },
});

type TL04C06A06b = {
  P02: {
    answer: boolean | undefined;
    solution: boolean;
    isSubmitted: boolean;
    isCorrect: boolean;
  };
};
