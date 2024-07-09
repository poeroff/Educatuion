import { atom } from 'recoil';

export const L04C06A04 = atom<TL04C06A04>({
  key: 'L04C06A04',
  default: {
    P02: {
      answer1: '',
      answer2: '',
      solution1: 'targeted',
      solution1_2: 'argeted',
      solution2: 'regions',
      solution2_2: 'egions',
      isSubmitted: false,
      isCorrect: false,
    },
  },
});

export type TL04C06A04 = {
  P02: {
    answer1: string;
    answer2: string;
    solution1: string;
    solution1_2: string;
    solution2: string;
    solution2_2: string;
    isSubmitted: boolean;
    isCorrect: boolean;
  };
};
