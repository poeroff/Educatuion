import { atom } from 'recoil';

export const L03C06A03 = atom<TL03C06A03>({
  key: 'L03C06A03',
  default: {
    p02: {
      answer: ['', ''],
      solution: ['artists', 'challenges'],
      isCorrect: false,
      isSubmitted: false,
    },
  },
});

type TL03C06A03 = {
  p02: {
    answer: string[];
    solution: string[];
    isCorrect: boolean;
    isSubmitted: boolean;
  };
};
