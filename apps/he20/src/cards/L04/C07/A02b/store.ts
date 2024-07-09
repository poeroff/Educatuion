import { atom } from 'recoil';

export const L04C07A02b = atom<TL04C07A02b>({
  key: 'L04C07A02b',
  default: {
    p01: {
      isSubmitted: false,
    },
    p02: {
      answer: 0,
      isCorrect: false,
      isSubmitted: false,
      solution: 1,
    },
    p03: {
      answer: 0,
      isCorrect: false,
      isSubmitted: false,
      solution: 2,
    },
    p04: {
      answer: 0,
      isCorrect: false,
      isSubmitted: false,
      solution: 1,
    },
    p05: {
      answer: 0,
      isCorrect: false,
      isSubmitted: false,
      solution: 2,
    },
    p06: {
      answer: 0,
      isCorrect: false,
      isSubmitted: false,
      solution: 1,
    },
  },
});

type TL04C07A02b = {
  p01: IL04C07A02bP1;
  p02: IL04C07A02bP2;
  p03: IL04C07A02bP3;
  p04: IL04C07A02bP4;
  p05: IL04C07A02bP5;
  p06: IL04C07A02bP6;
};

export interface IL04C07A02bP1 {
  isSubmitted: boolean;
}

interface IL04C07A02bP2 {
  answer: number;
  isCorrect?: boolean;
  isSubmitted: boolean;
  solution: number;
}

interface IL04C07A02bP3 {
  answer: number;
  isCorrect?: boolean;
  isSubmitted: boolean;
  solution: number;
}

interface IL04C07A02bP4 {
  answer: number;
  isCorrect?: boolean;
  isSubmitted: boolean;
  solution: number;
}

interface IL04C07A02bP5 {
  answer: number;
  isCorrect?: boolean;
  isSubmitted: boolean;
  solution: number;
}

interface IL04C07A02bP6 {
  answer: number;
  isCorrect?: boolean;
  isSubmitted: boolean;
  solution: number;
}
