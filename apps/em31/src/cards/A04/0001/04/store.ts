import { atom } from 'recoil';

export const A04000104_store = atom<TA04000104>({
  key: 'A04000104',
  default: {
    P02: {
      answer1: false,
      answer2: false,
      answer3: false,
      solution1: true,
      solution2: false,
      solution3: true,
      isCorrect: false,
      isSubmitted: false,
    },
    P03: {
      answer1: '',
      answer2: '',
      answer3: '',
      answer4: '',
      solution1: '3',
      solution2: '9',
      solution3: '2',
      solution4: '12',
      isCorrect: false,
      isSubmitted: false,
    },
  },
});

type TA04000104 = {
  P02: {
    [key: string]: boolean;
  };
  P03: {
    [key: string]: string | boolean;
    answer1: string;
    answer2: string;
    answer3: string;
    answer4: string;
    solution1: string;
    solution2: string;
    solution3: string;
    solution4: string;
    isSubmitted: boolean;
  };
};
