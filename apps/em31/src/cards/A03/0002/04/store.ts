import { atom } from 'recoil';

export const A03_0002_04 = atom<TA03000204>({
  key: 'A03000204',
  default: {
    p01: {
      answer1: [],
      solution1: 3,
      answer2: [],
      solution2: 3,
      isCorrect: false,
      isSubmitted: false,
    },
    p02: {
      answer: '',
      solution: '3',
      isCorrect: false,
      isSubmitted: false,
    },
  },
});

type TA03000204 = {
  p01: {
    answer1: number[];
    solution1: number;
    answer2: number[];
    solution2: number;
    isCorrect: boolean;
    isSubmitted: boolean;
  };
  p02: {
    answer: string;
    solution: string;
    isCorrect: boolean;
    isSubmitted: boolean;
  };
};

export default A03_0002_04;
