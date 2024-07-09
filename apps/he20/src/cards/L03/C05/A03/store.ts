import { atom } from 'recoil';

export const L03C05A03 = atom<TL03C05A03>({
  key: 'L03C05A03',
  default: {
    p01: {
      answer: 0,
      solution: 3,
      isCorrect: false,
      isSubmitted: false,
    },
    p02: {
      answer: 0,
      solution: 1,
      isCorrect: false,
      isSubmitted: false,
    },
    p03: {
      answer: 0,
      solution: 3,
      isCorrect: false,
      isSubmitted: false,
    },
    p04: {
      answer: 0,
      solution: 1,
      isCorrect: false,
      isSubmitted: false,
    },
    p05: {
      answer: 0,
      solution: 2,
      isCorrect: false,
      isSubmitted: false,
    },
    p06: {
      answer: 0,
      solution: 2,
      isCorrect: false,
      isSubmitted: false,
    },
  },
});

export type TL03C05A03Keys = 'p01' | 'p02' | 'p03' | 'p04' | 'p05' | 'p06';

export interface IL03C05A03 {
  answer: number;
  solution: number;
  isCorrect: boolean;
  isSubmitted: boolean;
}

type TL03C05A03 = {
  [key in TL03C05A03Keys]: IL03C05A03;
};
