import { atom } from 'recoil';

export const C03000350_store = atom<TC03000350_store>({
  key: 'C03000350',
  default: {
    p01: {
      answer1: ['', ''],
      solution1: [9, 4],
      isCorrect: false,
      isSubmitted: false,
    },
  },
});

type TC03000350_store = {
  p01: {
    answer1: string[] | number[];
    solution1: number[];
    isCorrect: boolean;
    isSubmitted: boolean;
  };
};
