import { atom } from 'recoil';

export const B03000370_store = atom<TB03000370_store>({
  key: 'B03000370',
  default: {
    p01: {
      answer1: [''],
      solution1: [8],
      isCorrect: false,
      isSubmitted: false,
    },
  },
});

type TB03000370_store = {
  p01: {
    answer1: (number | string)[];
    solution1: number[];
    isCorrect: boolean;
    isSubmitted: boolean;
  };
};
