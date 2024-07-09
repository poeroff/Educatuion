import { atom } from 'recoil';

export const C03000440_store = atom<TC03000440_store>({
  key: 'C03000440',
  default: {
    p01: {
      answer1: ['', '', ''],
      solution1: [1, 2, 0],
      isCorrect: false,
      isSubmitted: false,
    },
  },
});

type TC03000440_store = {
  p01: {
    answer1: (number | string)[];
    solution1: number[];
    isCorrect: boolean;
    isSubmitted: boolean;
  };
};
