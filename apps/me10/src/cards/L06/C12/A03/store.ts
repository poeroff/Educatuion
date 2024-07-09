import { atom } from 'recoil';

export const L06C12A03 = atom<TL06C12A03>({
  key: 'L06C12A03',
  default: {
    p01: {
      answer: undefined,
      solution: false,
      isCorrect: false,
      isSubmitted: false,
    },
    p03: {
      answer: undefined,
      solution: true,
      isCorrect: false,
      isSubmitted: false,
    },
  },
});

type TL06C12A03 = {
  [key: string]: {
    answer: boolean | undefined;
    solution: boolean;
    isCorrect: boolean;
    isSubmitted: boolean;
  };
};
