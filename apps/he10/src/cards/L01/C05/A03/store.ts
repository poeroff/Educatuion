import { atom } from 'recoil';

export const L01C05A03 = atom<TL01C05A03>({
  key: 'TL01C05A03',
  default: {
    p01: {
      answer: 0,
      solution: 2,
      isCorrect: false,
      isSubmitted: false,
    },
    p02: {
      answer: 0,
      solution: 2,
      isCorrect: false,
      isSubmitted: false,
    },
    p03: {
      answer: 0,
      solution: 1,
      isCorrect: false,
      isSubmitted: false,
    },
    p04: {
      answer: 0,
      solution: 3,
      isCorrect: false,
      isSubmitted: false,
    },
    p05: {
      answer: 0,
      solution: 3,
      isCorrect: false,
      isSubmitted: false,
    },
    p06: {
      answer: 0,
      solution: 3,
      isCorrect: false,
      isSubmitted: false,
    },
  },
});

type TL01C05A03 = {
  p01: IL01C05A03;
  p02: IL01C05A03;
  p03: IL01C05A03;
  p04: IL01C05A03;
  p05: IL01C05A03;
  p06: IL01C05A03;
};

interface IL01C05A03 {
  answer: number | undefined;
  solution: number | undefined;
  isCorrect: boolean | undefined;
  isSubmitted: boolean;
}
