import { atom } from 'recoil';

export const L04C07A02a = atom<TL04C07A02a>({
  key: 'L04C07A02a',
  default: {
    p01: {
      isSubmitted: false,
    },
    p02: {
      answer: '',
      isCorrect: false,
      isSubmitted: false,
    },
    p03: {
      answer1: '',
      answer2: '',
      isCorrect: false,
      isSubmitted: false,
    },
    p04: {
      answer1: '',
      answer2: '',
      isCorrect: false,
      isSubmitted: false,
    },
    p05: {
      answer1: '',
      answer2: '',
      isCorrect: false,
      isSubmitted: false,
    },
    p06: {
      answer: '',
      isCorrect: false,
      isSubmitted: false,
    },
  },
});

type TL04C07A02a = {
  p01: IL04C07A02aP1;
  p02: IL04C07A02aP2;
  p03: IL04C07A02aP3;
  p04: IL04C07A02aP4;
  p05: IL04C07A02aP5;
  p06: IL04C07A02aP6;
};

export interface IL04C07A02aP1 {
  isSubmitted: boolean;
}

interface IL04C07A02aP2 {
  answer: string;
  isCorrect?: boolean;
  isSubmitted: boolean;
}

interface IL04C07A02aP3 {
  answer1: string;
  answer2: string;
  isCorrect: boolean;
  isSubmitted: boolean;
}

interface IL04C07A02aP4 {
  answer1: string;
  answer2: string;
  isCorrect: boolean;
  isSubmitted: boolean;
}

interface IL04C07A02aP5 {
  answer1: string;
  answer2: string;
  isCorrect: boolean;
  isSubmitted: boolean;
}

interface IL04C07A02aP6 {
  answer: string;
  isCorrect: boolean;
  isSubmitted: boolean;
}
