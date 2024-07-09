import { atom } from 'recoil';

export const L03C12A03 = atom<TL03C12A03>({
  key: 'L03C12A03',
  default: {
    p01: {
      answer1: '',
      answer2: '',
      solution1: 'science',
      solution2: 'test',
      isCorrect: false,
      isSubmitted: false,
    },
    p03: {
      answer1: '',
      solution1: 'tired',
      isCorrect: false,
      isSubmitted: false,
    },
  },
});

type TL03C12A03 = {
  p01: {
    answer1: string;
    answer2: string;
    solution1: string;
    solution2: string;
    isCorrect: boolean;
    isSubmitted: boolean;
  };
  p03: {
    answer1: string;
    solution1: string;
    isCorrect: boolean;
    isSubmitted: boolean;
  };
};
