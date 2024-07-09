import { atom } from 'recoil';

export const L06C06A04 = atom<TL06C06A04>({
  key: 'L06C06A04',
  default: {
    p02: {
      answer: '',
      isSubmitted: false,
    },
    p03: {
      answer: '',
      solution: 'want to be',
      isSubmitted: false,
      isCorrect: false,
    },
  },
});

type TL06C06A04 = {
  p02: {
    answer: string;
    isSubmitted: boolean;
  };
  p03: {
    answer: string;
    solution: string;
    isSubmitted: boolean;
    isCorrect: boolean;
  };
};
