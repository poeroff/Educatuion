import { atom } from 'recoil';

type answerdType1 = {
  answer: string;
  solution: string;
  isCorrect: boolean;
  isSubmitted: boolean;
};

type answerdType2 = {
  answer: number[];
  solution: number[];
  isCorrect: boolean;
  isSubmitted: boolean;
};

type answerdType3 = {
  answer: number;
  solution: number;
  isCorrect: boolean;
  isSubmitted: boolean;
};

interface IL01SP03_2 {
  p05: answerdType3;
  p06: answerdType3;
  p09: answerdType1;
  p10: answerdType1;
  p21: answerdType2;
  p22: answerdType2;
  p23: answerdType2;
  p24: answerdType2;
}

export const L01SP03_2 = atom<IL01SP03_2>({
  key: 'L01SP03-2',
  default: {
    p05: {
      answer: 0,
      solution: 1,
      isCorrect: false,
      isSubmitted: false,
    },
    p06: {
      answer: 0,
      solution: 3,
      isCorrect: false,
      isSubmitted: false,
    },
    p09: {
      answer: '',
      solution: 'emergency',
      isCorrect: false,
      isSubmitted: false,
    },
    p10: {
      answer: '',
      solution: 'spine',
      isCorrect: false,
      isSubmitted: false,
    },
    p21: {
      answer: [],
      solution: [4, 2, 0, 1, 3],
      isCorrect: false,
      isSubmitted: false,
    },
    p22: {
      answer: [],
      solution: [0, 3, 2, 4, 1],
      isCorrect: false,
      isSubmitted: false,
    },
    p23: {
      answer: [],
      solution: [4, 3, 2, 0, 1],
      isCorrect: false,
      isSubmitted: false,
    },
    p24: {
      answer: [],
      solution: [2, 3, 1, 0, 4],
      isCorrect: false,
      isSubmitted: false,
    },
  },
});
