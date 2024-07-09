import { atom } from 'recoil';
export const L07C12A05 = atom<TL07C12A05>({
  key: 'L07C12A05',
  default: {
    p01: {
      answer: 0,
      solution: 2,
      isCorrect: false,
      isSubmitted: false,
    },
    p02: {
      answer1: undefined,
      answer2: undefined,
      isCorrect: false,
      isSubmitted: false,
      solution1: false,
      solution2: true,
    },
  },
});

type TL07C12A05 = {
  p01: {
    answer: Number;
    solution: Number;
    isCorrect: boolean;
    isSubmitted: boolean;
  };
  p02: {
    answer1: boolean | undefined;
    answer2: boolean | undefined;
    isCorrect: boolean;
    isSubmitted: boolean;
    solution1: boolean;
    solution2: boolean;
  };
};
