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

interface IL02SP03_2 {
  p05: answerdType3;
  p06: answerdType3;
  p09: answerdType1;
  p10: answerdType1;
  p20: answerdType2;
  p21: answerdType2;
  p22: answerdType2;
  p23: answerdType2;
}

export const L02SP03_2 = atom<IL02SP03_2>({
  key: 'L02SP03_2',
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
      solution: 'cannot help but',
      isCorrect: false,
      isSubmitted: false,
    },
    p10: {
      answer: '',
      solution: 'lift up',
      isCorrect: false,
      isSubmitted: false,
    },
    p20: {
      answer: [],
      solution: [0, 2, 4, 1, 3],
      isCorrect: false,
      isSubmitted: false,
    },
    p21: {
      answer: [],
      solution: [4, 1, 3, 0, 2],
      isCorrect: false,
      isSubmitted: false,
    },
    p22: {
      answer: [],
      solution: [2, 1, 0, 4, 3],
      isCorrect: false,
      isSubmitted: false,
    },
    p23: {
      answer: [],
      solution: [1, 0, 4, 2, 3],
      isCorrect: false,
      isSubmitted: false,
    },
  },
});
