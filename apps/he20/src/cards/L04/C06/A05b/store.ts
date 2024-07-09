import { atom } from 'recoil';

export const L04C06A05b = atom<TL04C06A05b>({
  key: 'L02C06A05b',
  default: {
    p02: {
      values: [''],
      answers: ['F'],
      isCorrect: false,
      isSubmitted: false,
    },
  },
});

type TL04C06A05b = {
  p02: {
    values: string[];
    answers: string[];
    isCorrect: boolean;
    isSubmitted: boolean;
  };
};
