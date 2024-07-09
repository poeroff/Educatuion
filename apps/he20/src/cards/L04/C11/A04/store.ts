import { atom } from 'recoil';

export const L04C11A04 = atom<T04C11A04>({
  key: 'L04C11A04',
  default: {
    p01: {
      answer: -1,
      solution: 2,
      isCorrect: false,
      isSubmitted: false,
    },
    p02: {
      values: ['', '', ''],
      solution: ['raises', 'create', 'that'],
      isCorrect: false,
      isSubmitted: false,
    },
  },
});

type T04C11A04 = {
  p01: {
    answer: number;
    solution: number;
    isCorrect: boolean;
    isSubmitted: boolean;
  };
  p02: {
    values: Array<string>;
    solution: Array<string>;
    isCorrect: boolean;
    isSubmitted: boolean;
  };
};
