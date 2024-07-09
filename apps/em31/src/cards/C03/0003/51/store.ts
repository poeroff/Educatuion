import { atom } from 'recoil';

export const C03000351_store = atom<TC03000351_store>({
  key: 'C03000351',
  default: {
    p01: {
      answer1: [''],
      solution1: [8],
      isCorrect: false,
      isSubmitted: false,
    },
  },
});

type TC03000351_store = {
  p01: {
    answer1: (number | string)[];
    solution1: number[];
    isCorrect: boolean;
    isSubmitted: boolean;
  };
};
