import { atom } from 'recoil';

type answerdType1 = {
  answer: string;
  solution: string;
  isCorrect: boolean;
  isSubmitted: boolean;
};

type answerdType3 = {
  answer: number;
  solution: number;
  isCorrect: boolean;
  isSubmitted: boolean;
};

interface IHE10DT1 {
  p01: answerdType3;
  p02: answerdType3;
  p03: answerdType3;
  p04: answerdType3;
  p05: answerdType1;
  p06: answerdType3;
  p07: answerdType3;
  p08: answerdType3;
  p09: answerdType3;
  p10: answerdType3;
}

export const HE10DT1 = atom<IHE10DT1>({
  key: 'HE10DT1',
  default: {
    p01: {
      answer: 0,
      solution: 1,
      isCorrect: false,
      isSubmitted: false,
    },
    p02: {
      answer: 0,
      solution: 3,
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
      solution: 1,
      isCorrect: false,
      isSubmitted: false,
    },
    p05: {
      answer: '',
      solution: 'Personally, I hope I’ll start to learn Spanish.',
      isCorrect: false,
      isSubmitted: false,
    },
    p06: {
      answer: 0,
      solution: 3,
      isCorrect: false,
      isSubmitted: false,
    },
    p07: {
      answer: 0,
      solution: 1,
      isCorrect: false,
      isSubmitted: false,
    },
    p08: {
      answer: 0,
      solution: 2,
      isCorrect: false,
      isSubmitted: false,
    },
    p09: {
      answer: 0,
      solution: 2,
      isCorrect: false,
      isSubmitted: false,
    },
    p10: {
      answer: 0,
      solution: 2,
      isCorrect: false,
      isSubmitted: false,
    },
  },
});
