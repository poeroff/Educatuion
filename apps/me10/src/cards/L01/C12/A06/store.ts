import { atom } from 'recoil';

export const L01C12A06 = atom<TL01C12A06>({
  key: 'L01C12A06',
  default: {
    P01: {
      answer: '',
      solution: 'am',
      isCorrect: false,
      isSubmitted: false,
    },
    P02: {
      answer: '',
      solution: 'is',
      isCorrect: false,
      isSubmitted: false,
    },
    P03: {
      answer: '',
      solution: "doesn't",
      isCorrect: false,
      isSubmitted: false,
    },
  },
});

type TL01C12A06 = {
  P01: {
    answer: string;
    solution: string;
    isCorrect: boolean;
    isSubmitted: boolean;
  };
  P02: {
    answer: string;
    solution: string;
    isCorrect: boolean;
    isSubmitted: boolean;
  };
  P03: {
    answer: string;
    solution: string;
    isCorrect: boolean;
    isSubmitted: boolean;
  };
};
