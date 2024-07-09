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
  answer: number | null;
  solution: number;
  isCorrect: boolean;
  isSubmitted: boolean;
};

interface TL04SP03_2 {
  p05: answerdType3;
  p06: answerdType3;
  p09: answerdType1;
  p10: answerdType1;
  p20: answerdType2;
  p21: answerdType2;
  p22: answerdType2;
  p23: answerdType2;
}


export const L04SP03_2 = atom<TL04SP03_2>({
  key: 'L04SP03_2',
  default: {
    p05: {
      answer: null,
      solution: 1,
      isCorrect: false,
      isSubmitted: false,
    },
    p06: {
      answer: null,
      solution: 2,
      isCorrect: false,
      isSubmitted: false,
    },
    p09: {
      answer: '',
      solution: 'era',
      isCorrect: false,
      isSubmitted: false,
    },
    p10: {
      answer: '',
      solution: 'assess',
      isCorrect: false,
      isSubmitted: false,
    },
    p20: {
      answer: [],
      solution: [3, 0, 2, 1, 4],
      isCorrect: false,
      isSubmitted: false,
    },
    p21: {
      answer: [],
      solution: [3, 1, 4, 2, 0],
      isCorrect: false,
      isSubmitted: false,
    },
    p22: {
      answer: [],
      solution: [2, 0, 1, 4, 3],
      isCorrect: false,
      isSubmitted: false,
    },
    p23: {
      answer: [],
      solution: [3, 2, 0, 1, 4],
      isCorrect: false,
      isSubmitted: false,
    },
  },
});
