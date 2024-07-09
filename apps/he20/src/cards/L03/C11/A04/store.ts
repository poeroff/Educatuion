import { atom } from 'recoil';

export const L03C11A04 = atom<TL03C11A04>({
  key: 'L03C11A04',
  default: {
    p01: {
      answer: -1,
      solution: 2,
      isCorrect: false,
      isSubmitted: false,
    },
    p02: {
      answer1: '',
      answer2: '',
      isSubmitted: false,
    },
  },
});

type TL03C11A04 = {
  p01: {
    answer: number;
    solution: number;
    isCorrect: boolean;
    isSubmitted: boolean;
  };
  p02: {
    answer1: string;
    answer2: string;
    isSubmitted: boolean;
  };
};
