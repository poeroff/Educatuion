import { atom } from 'recoil';
export const L06C12A05 = atom<TL06C12A05>({
  key: 'L06C12A05',
  default: {
    p01: {
      answer: 0,
      solution: 2,
      isCorrect: false,
      isSubmitted: false,
    },
    p02: {
      answer: 0,
      solution: 1,
      isCorrect: false,
      isSubmitted: false,
    },
  },
});

type TL06C12A05 = {
  p01: {
    answer: Number;
    solution: Number;
    isCorrect: boolean;
    isSubmitted: boolean;
  };
  p02: {
    answer: Number;
    solution: Number;
    isCorrect: boolean;
    isSubmitted: boolean;
  };
};
