import { atom } from 'recoil';

export const L01C06A03b = atom<Record<'p02', IL01C06A03b>>({
  key: 'L01C06A03b',
  default: {
    p02: {
      answer: 0,
      solution: 3,
      isCorrect: false,
      isSubmitted: false,
    },
  },
});

export interface IL01C06A03b {
  answer: number;
  solution: number;
  isCorrect: boolean;
  isSubmitted: boolean;
}
