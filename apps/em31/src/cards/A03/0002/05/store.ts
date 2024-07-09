import { atom } from 'recoil';

export const A03_0002_05 = atom<TA03000205>({
  key: 'A03000205',
  default: {
    p01: {
      answer1: [],
      solution1: 4,
      answer2: [],
      solution2: 4,
      answer3: [],
      solution3: 4,
      isCorrect: false,
      isSubmitted: false,
    },
    p02: {
      answer1: '',
      answer2: '',
      solution1: '4',
      solution2: '4',
      isCorrect: false,
      isSubmitted: false,
    },
    p03: {
      answer1: '',
      answer2: '',
      answer3: '',
      solution1: '12',
      solution2: '3',
      solution3: '4',
      isCorrect: false,
      isSubmitted: false,
    },
  },
});

type TA03000205 = {
  p01: {
    answer1: number[];
    solution1: number;
    answer2: number[];
    solution2: number;
    answer3: number[];
    solution3: number;
    isCorrect: boolean;
    isSubmitted: boolean;
  };
  p02: {
    answer1: string;
    solution1: string;
    answer2: string;
    solution2: string;
    isCorrect: boolean;
    isSubmitted: boolean;
  };
  p03: {
    answer1: string;
    solution1: string;
    answer2: string;
    solution2: string;
    answer3: string;
    solution3: string;
    isCorrect: boolean;
    isSubmitted: boolean;
  };
};

export default A03_0002_05;
