import { atom } from 'recoil';

export const L04C06A03b = atom<TL04C06A03b>({
  key: 'L04C06A03b',
  default: {
    p02: {
      answer: '',
      solution: 'nervous',
      isSubmitted: false,
      isCorrect: false,
    },
  },
});

export type TL04C06A03b = {
  p02: {
    answer: string;
    solution: string;
    isSubmitted: boolean;
    isCorrect: boolean;
  };
};
